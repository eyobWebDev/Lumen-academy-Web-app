import { useState, useEffect } from "react";
import axios from "axios";
import ExamList from "./ExamList";
import { useSubjectStore } from "@/store/useSubjectStore";
import { useExamStore } from "@/store/useExamStore";
import { useQuestionpoolStore } from "@/store/useQuestionPoolStore";

export default function CreateExam() {
  const {subjects} = useSubjectStore()
  const {questionPools} = useQuestionpoolStore()
  const [exam, setExam] = useState({
    title: "",
    subjectId: "",
    startTime: "",
    durationMinutes: 60
  });
  const {createExam} = useExamStore()
  const [subjectID, setSubjectID] = useState("")
  const [poolID, setPoolID] = useState("")
  const [startTime, setStartTime] = useState("")
  const [durationMinutes, setDurationMinutes] = useState(60)
  const [reviewDurationMinutes, setReviewDurationMinutes] = useState(30)

  const handleClick = async () => {
    await createExam({subjectID, poolID, startTime, durationMinutes, reviewDurationMinutes});
    alert("Exam created");
  };

  return (
    <>
    <div className="max-w-lg bg-white p-3 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Create Exam</h2>

        <select
            className="w-full border p-2 rounded mb-3"
            onChange={e => setSubjectID(e.target.value)}
        >
            <option>Select Subject</option>
            {subjects.map(s => (
                <option key={s._id} value={s._id}>{s.name}</option>
            ))}
        </select>

        <select
            className="w-full border p-2 rounded mb-3"
            onChange={e => setPoolID(e.target.value)}
        >
            <option>Select Question pool</option>
            {questionPools.map(s => (
                <option key={s._id} value={s._id}>{s.name}</option>
            ))}
        </select>

        <input
            type="datetime-local"
            className="w-full border p-2 rounded mb-3"
            onChange={e => setStartTime(e.target.value)} />

        <input
            type="number"
            className="w-full border p-2 rounded mb-4"
            placeholder="Duration (minutes)"
            onChange={e => setDurationMinutes(e.target.value)} />

        <input
            type="number"
            className="w-full border p-2 rounded mb-4"
            placeholder="Review Duraton (minutes)"
            onChange={e => setReviewDurationMinutes(e.target.value)} />

        <button
            onClick={handleClick}
            className="w-full bg-black text-white p-2 rounded"
        >
            Create Exam
        </button>
    </div>

    <div>
        <ExamList />
    </div>
    </>
  );
}
