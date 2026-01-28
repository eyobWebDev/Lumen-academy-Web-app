import { useEffect, useState } from "react";
import axios from "axios";
import { useExamStore } from "@/store/useExamStore";

export default function ExamList() {
  const {exams} = useExamStore()
  const baseUrl = import.meta.env.MODE == "development" ? "http://localhost:5173" : "https://lumen-academy-web-app.vercel.app"
  console.log(exams);
  
  return (
    <div>
      <h2 className="text-2xl font-bold mt-2 mb-4">Exams</h2>

      <div className="space-y-4">
        {exams.map(exam => (
          <div key={exam._id} className={`bg-white/80 border-l-5 border-gray-500 p-4 rounded shadow ${exam.status == "scheduled" ? "border-green-500" : exam.status == "live" && "border-green-500" }`}>
            <div>
              <h3 className="w-full flex justify-between font-bold">
                starts in {new Date(exam.startTime).toLocaleDateString()}, {new Date(exam.startTime).toLocaleTimeString()}
                <div className="flex items-center gap-3"> 
                  <div className={`h-3 w-3 rounded-full ${exam.status == "scheduled" ? "bg-green-500" : exam.status == "live" ? "bg-red-500" : "bg-gray-500"} `}></div>
                  {exam.status.toUpperCase()}
                </div>
              </h3>

              <h3 className="font-bold flex items-center gap-3 w-full">Live URL: <div className="p-1 px-2 rounded-xl bg-white inset-shadow-2xs shadow-2xl">{baseUrl}?id={exam._id}</div></h3>

              <p className="text-sm text-gray-500">ends in {new Date(exam.endTime).toLocaleDateString()}, {new Date(exam.endTime).toLocaleTimeString()}</p>
            </div>     
          </div>
        ))}
      </div>
    </div>
  );
}
