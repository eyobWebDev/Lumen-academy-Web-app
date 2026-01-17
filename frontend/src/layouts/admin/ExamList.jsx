import { useEffect, useState } from "react";
import axios from "axios";
import { useExamStore } from "@/store/useExamStore";

export default function ExamList() {
  const {exams} = useExamStore()

/*   useEffect(() => {
    axios.get("/api/admin/exams").then(res => setExams(res.data));
  }, []);

  const toggleStatus = async (id) => {
    await axios.patch(`/api/admin/exams/${id}/toggle`);
    setExams(exams =>
      exams.map(e =>
        e._id === id ? { ...e, status: e.status === "scheduled" ? "live" : "scheduled" } : e
      )
    );
  }; */

  console.log("exams", exams);
  

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Exams</h2>

      <div className="space-y-4">
        {exams.map(exam => (
          <div key={exam._id} className="bg-white p-4 rounded shadow flex justify-between">
            <div>
              <h3 className="font-bold">starts in {new Date(exam.startTime).toLocaleDateString()}, {new Date(exam.startTime).toLocaleTimeString()}</h3>
              <h3 className="font-bold">ID: {exam._id}</h3>
              <p className="text-sm text-gray-500">ends in {new Date(exam.endTime).toLocaleDateString()}, {new Date(exam.endTime).toLocaleTimeString()}</p>
            </div>

            <button
              onClick={() => toggleStatus(exam._id)}
              className="bg-black text-white px-4 rounded"
            >
              Toggle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
