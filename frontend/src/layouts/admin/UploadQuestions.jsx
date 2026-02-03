import { useEffect, useState } from "react";
import axios from "axios";
import { useQuestionpoolStore } from "@/store/useQuestionPoolStore";
import { errorToaster } from "@/widget/toaster";
import { useQuestionStore } from "@/store/useQuestionStore";
import StaticQuestionCard from "@/widget/questionPool/StaticQuestionCard";
import { useSubjectStore } from "@/store/useSubjectStore";
import { Loader2 } from "lucide-react";

export default function UploadQuestions() {
  const [file, setFile] = useState(null);
  const [poolID, setPoolID] = useState("")
  const {questionPools} = useQuestionpoolStore()
  const {subjects} = useSubjectStore()
  const {uploadQuestions, questions} = useQuestionStore()
  const [currentQuestions, setCurrentQuestions] = useState([])

  const upload = async () => {
    if (!file) return errorToaster("Please Select a file");

    const formData = new FormData();
    formData.append("file", file)
    formData.append("poolID", poolID)

    await uploadQuestions(formData)
    setFile(null)
    setPoolID("")
  };

  const filterBySubject = async (subject) => {
    const filteredQuestions = await questions.filter(question => question.poolID.subjectID.name == subject)
    setCurrentQuestions(filteredQuestions); 
  }

  const filterByQuestionPool = (poolId) => {
    const filteredQuestions = questions.filter(question => question.poolID._id == poolId)
    setCurrentQuestions(filteredQuestions);
  }

  return (
    <>
    <div className="max-w-md bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Upload Questions</h2>

      <div className="select mb-5">
        <select className="w-full outline-0 border-0 rounded" onChange={e => setPoolID(e.target.value)}>
          <option>Select Question Pool to Upload To</option>
          {questionPools.map(p => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>
      </div>

      <input type="file" accept=".csv" onChange={e => setFile(e.target.files[0])} className="mb-4" />
      <button onClick={upload} className="w-full bg-black text-white p-2 rounded">Upload File</button>
    </div>

    <div className="flex lg:flex-row flex-col bg-white items-center rounded mt-3 p-4 lg:gap-10 gap-2">
      <h1 className="font-bold">Filter questions By: </h1>

      <div className="flex items-center gap-4">

        {/* filter by subject */}
        <div className="select">
          <select className="w-full outline-0 border-0 rounded" onChange={e => filterBySubject(e.target.value)}>
            <option>Subject</option>
            {subjects.map(p => (
              <option key={p._id} value={p.name}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* filter by question pool */}
        <div className="select">
          <select className="w-full outline-0 border-0 rounded" onChange={e => filterByQuestionPool(e.target.value)}>
            <option>Question Pool</option>
            {questionPools.map(p => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>
        </div>

      </div>

    </div>


    <div className="text-2xl font-bold">Questions Total question: {currentQuestions.length} </div>

    <div className="mt-5 grid lg:grid-cols-2 grid-cols-1 gap-4 px-2">
        {currentQuestions.map((question, id) => {
            return <StaticQuestionCard id={id} question={question} />
        })}
    </div>
    </>
  );
}
