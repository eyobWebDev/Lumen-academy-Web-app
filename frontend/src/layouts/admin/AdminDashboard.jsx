import { useExamStore } from "@/store/useExamStore";
import { useQuestionStore } from "@/store/useQuestionStore";
import { useSubjectStore } from "@/store/useSubjectStore";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const {subjects} = useSubjectStore()
  const {exams} = useExamStore()
  const {questions} = useQuestionStore()
  


  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Subjects" value={subjects?.length} path={`/admin/subjects`} />
        <StatCard title="Exams" value={exams?.length} path={`/admin/exams`} />
        <StatCard title="Questions" value={questions?.length} path={`/admin/questions`} />
      </div>
    </div>
  );
}

function StatCard({ title, value, path }) {
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(path)} className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
