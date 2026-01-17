import { useSubjectStore } from "@/store/useSubjectStore";
import { Trash } from "lucide-react";

export default function SubjectCard({ subject }) {
    const {deleteSubject} = useSubjectStore()

  return (
    <div className="bg-white border flex justify-between px-3 rounded-xl p-4 shadow-sm hover:shadow transition">
      <h3 className="text-lg font-semibold">{subject.name}</h3>

      <Trash onClick={() => deleteSubject(subject._id)} />
    </div>
  );
}
