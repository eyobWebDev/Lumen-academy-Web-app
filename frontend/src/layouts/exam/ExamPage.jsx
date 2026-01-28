import { useExamStore } from "@/store/useExamStore";
import Countdown from "@/widget/exam/CountDown";
import QuestionCard from "@/widget/questionPool/QuestionCard";
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
    submitExam,
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
        <div className="bg-white">
          <h2>Exam starts at {startTime.toLocaleTimeString()}</h2>
          <Countdown targetTime={startTime} />
        </div>
      )}

      {examStatus === "live" && (
        <>
          <h2 className="sticky top-0 bg-base-300 p-3 drop-shadow font-bold">Time left: {timeLeft}s</h2>

          <div className="grid lg:grid-cols-3 grid-cols-1 px-3 gap-4">
            {questions.map((q, i) => (
              <QuestionCard question={q} number={i+1} examStatus={examStatus} />
            ))}
          </div>

          <button onClick={() => {
            submitExam(questions)
            updateExamStatus("review") 
          } } className="btn btn-wide my-10 btn-success">Submit</button>
        </>
      )}

      {examStatus === "review" && (
        <>
          <div className="sticky flex justify-between top-0 bg-base-300 p-3 drop-shadow mb-0.5 font-bold">
            <div className="flex flex-col">
              <span>Review</span>
              <span className=" text-sm font-light">You can review your answers now!</span>
            </div>

            <div>Result: <span className="text-green-500">{score} / 50</span> </div>
          </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 px-3 gap-4">
          {questions.map((q, i) => {
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
