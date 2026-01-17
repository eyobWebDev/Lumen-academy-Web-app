import { useState } from "react";
import axios from "axios";
import { useQuestionpoolStore } from "@/store/useQuestionPoolStore";
import { errorToaster } from "@/widget/toaster";
import { useQuestionStore } from "@/store/useQuestionStore";
import StaticQuestionCard from "@/widget/questionPool/StaticQuestionCard";

export default function UploadQuestions() {
  const [file, setFile] = useState(null);
  const [poolID, setPoolID] = useState("")
  const {questionPools} = useQuestionpoolStore()
  const {uploadQuestions, questions} = useQuestionStore()

  const upload = async () => {
    if (!file) return errorToaster("Please Select a file");

    const formData = new FormData();
    formData.append("file", file)
    formData.append("poolID", poolID)

    await uploadQuestions(formData)
    setFile(null)
    setPoolID("")
  };
  

  return (
    <><div className="max-w-md bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Upload Questions</h2>

      <div className="select mb-5">
        <select
          className="w-full outline-0 border-0 rounded"
          onChange={e => setPoolID(e.target.value)}
        >
          <option>Select Question Pool to Upload To</option>
          {questionPools.map(p => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>
      </div>

      <input
        type="file"
        accept=".csv"
        onChange={e => setFile(e.target.files[0])}
        className="mb-4" />

      <button
        onClick={upload}
        className="w-full bg-black text-white p-2 rounded"
      >
        Upload File
      </button>
    </div>
    <div className="mt-5 grid lg:grid-cols-2 grid-cols-1 gap-4 px-2">
        {questions.map(question => {
          return <StaticQuestionCard question={question} />
        })}
    </div>
    </>
  );
}
