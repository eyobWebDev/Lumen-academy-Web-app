import { useExamStore } from "@/store/useExamStore";
import Countdown from "@/widget/exam/CountDown";
import QuestionCard from "@/widget/questionPool/QuestionCard";
import StaticQuestionCard from "@/widget/questionPool/StaticQuestionCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function ExamPage() {
  const { examID } = useParams();
  
  const {
    examStatus,
    questions,
    startTime,
    timeLeft,
    loading,
    fetchExam,
    tick,
    updateExamStatus,
    correctQuestions,
    score
  } = useExamStore();

  // Initial fetch
  useEffect(() => {
    fetchExam(examID);
  }, [examID]);

  // Countdown BEFORE exam starts
  useEffect(() => {
    if (examStatus !== "scheduled" || !startTime) return;

    const interval = setInterval(() => {
      const diff = Math.max(0, Math.floor((startTime - new Date()) / 1000));

      if (diff === 0) {
        fetchExam(examID); // re-fetch to enter live state
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [examStatus, startTime]);

  // Exam timer DURING live
  useEffect(() => {
    if (examStatus !== "live") return;

    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [examStatus]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);
  

  if (loading) return <p>Loading...</p>;  

  return (
    <>
      {examStatus === "scheduled" && (
        <><h2>Exam starts at {startTime.toLocaleTimeString()}</h2><Countdown targetTime={startTime} /></>
      )}

      {examStatus === "live" && (
        <>
          <h2>Time left: {timeLeft}s</h2>
          <div className="grid lg:grid-cols-3 grid-cols-1 px-3 gap-4">
            {questions.map((q, i) => (
              <QuestionCard question={q} number={i+1} examStatus={examStatus} />
            ))}
          </div>

          <button onClick={() => updateExamStatus("review") } className="btn btn-wide my-10 btn-success">Submit</button>
        </>
      )}

      {examStatus === "review" && (
        <>
          <h2>Review</h2>
        <div className="grid lg:grid-cols-3 grid-cols-1 px-3 gap-4">
          {questions.map((q, i) => {
            /* if (correctQuestions.includes(q)) {
              return <QuestionCard question={q} number={i+1} examStatus={examStatus} correct={true} />
            } else {
              return <QuestionCard question={q} number={i+1} examStatus={examStatus} />
            } */
           return <QuestionCard question={q} number={i+1} examStatus={examStatus} />
          })}
          </div>

          <h1 className="text-2xl p-10 font-bold">
            Result: {score} / 50
          </h1>
        </>
      )}

      {examStatus === "locked" && (
        <h2>Exam has ended</h2>
      )}
    </>
  );
}
