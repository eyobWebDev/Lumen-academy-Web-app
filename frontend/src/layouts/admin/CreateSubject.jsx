import { useState } from "react";
import axios from "axios";
import { useSubjectStore } from "@/store/useSubjectStore";
import { errorToaster } from "@/widget/toaster";
import SubjectCard from "@/widget/subject/SubjectCard";

export default function CreateSubject() {
  const [name, setName] = useState("");
  const {createSubject, subjects} = useSubjectStore()

  const handleClick = async () => {
    if (!name) return errorToaster("Enter subject name");
    createSubject({name})
    setName("");
  };

  console.log(subjects);

  return (
    <><div className="max-w-md bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Create Subject</h2>

      <input
        className="w-full border p-2 rounded mb-4"
        placeholder="Subject name"
        value={name}
        onChange={e => setName(e.target.value)} />

      <button
        onClick={handleClick}
        className="w-full bg-black text-white p-2 rounded"
      >
        Create
      </button>
    </div>

    <div className="flex mt-5 flex-col gap-3">
      <h1>All Subjects</h1>
        {subjects.map(subject => {
          return <SubjectCard subject={subject} />
        })}

    </div>
    </>
  );
}
