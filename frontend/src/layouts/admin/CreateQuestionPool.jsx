import { useQuestionpoolStore } from "@/store/useQuestionPoolStore"
import { useSubjectStore } from "@/store/useSubjectStore"
import QuesionPoolCard from "@/widget/questionPool/QuesionPoolCard"
import { errorToaster } from "@/widget/toaster"
import { useState } from "react"


export default function CreateQuestionPool(){
    const [subjectID, setSubjectID] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [questionCount, setQuestionCount] = useState("")
    const {createQuestionPool, questionPools} = useQuestionpoolStore()
    const {subjects}= useSubjectStore()

    const handleSubmit = async () => {
      if(!title) return errorToaster("Need A title.")
      if(!questionCount) return errorToaster("Write the count of question.")
      if(!subjectID) return errorToaster("Choose at least one Subject.")

      await createQuestionPool({subjectID, name: title, description, totalQuestions: questionCount})
    }


    return <><div className="max-w-md bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Create Question Pool</h2>

      <select
        className="w-full border p-2 rounded mb-3"
        onChange={e => setSubjectID(e.target.value)}
      >
        <option>Select Subject</option>
        {subjects.map(s => (
          <option key={s._id} value={s._id}>{s.name}</option>
        ))}
      </select>

      <input
        className="w-full border p-2 rounded mb-4"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)} />

      <input
        className="w-full border p-2 rounded mb-4"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)} />

      <input
        className="w-full border p-2 rounded mb-4"
        placeholder="Number of Questions"
        type="number"
        value={questionCount}
        onChange={e => setQuestionCount(e.target.value)} />

      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white p-2 rounded"
      >
        Create
      </button>
    </div>
    
    <div className="flex mt-5 flex-col gap-5">
      <h1>All Question Pools</h1>
      {questionPools.map(pool => {
        return <QuesionPoolCard questionPool={pool} />
      })}

      </div></>
}