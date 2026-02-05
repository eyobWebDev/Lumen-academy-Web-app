import AdminDashboard from "@/layouts/admin/AdminDashboard"
import AdminPanelDrawer from "@/layouts/admin/AdminPanelDrawer"
import CreateExam from "@/layouts/admin/CreateExam"
import CreateQuestionPool from "@/layouts/admin/CreateQuestionPool"
import CreateSubject from "@/layouts/admin/CreateSubject"
import KatextDisplay from "@/layouts/admin/KatextDisplay"
import UploadQuestions from "@/layouts/admin/UploadQuestions"
import { useAuthStore } from "@/store/useAuthStore"
import { ArrowLeft, Menu } from "lucide-react"
import { Route, Link, Routes, useNavigate } from "react-router-dom"


export default function AdminPage(){
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/")
    }

    return <>
        <div className="flex lg:flex-row flex-col min-h-screen bg-gray-100">
            <div className="py-3 lg:hidden flex items-center px-3 gap-5">
                <AdminPanelDrawer trigger={<div className="font-bold"><Menu /></div>} />
                <h1 className="text-xl font-bold">Admin Panel</h1>
            </div>
        {/* Sidebar */}
        <aside className="w-64 lg:flex flex-col hidden bg-black text-white p-6">
            <div className="flex py-3 items-center gap-5">
                <div className="font-bold" onClick={handleClick}><ArrowLeft /></div>
                <h1 className="text-xl font-bold">Admin Panel</h1>
            </div>

            <nav className="space-y-4">
            <Link to="/admin" className="block hover:text-gray-300">Dashboard</Link>
            <Link to="/admin/subjects" className="block hover:text-gray-300">Subjects</Link>
            <Link to="/admin/exams" className="block hover:text-gray-300">Exams</Link>
            <Link to="/admin/questions" className="block hover:text-gray-300">Upload Questions</Link>
            <Link to="/admin/questions-pool" className="block hover:text-gray-300">Create Question Pool</Link>
            <Link to="/admin/katext" className="block hover:text-gray-300">TRy Katex</Link>
            </nav>
        </aside>

      {/* Content */}
      <main className="flex-1 lg:p-8 p-1">
        <div className="px-5">
            <Routes>
                <Route index element={<AdminDashboard />} />
                <Route path="subjects" element={<CreateSubject />} />
                <Route path="exams" element={<CreateExam />} />
                <Route path="questions" element={<UploadQuestions />} />
                <Route path="questions-pool" element={<CreateQuestionPool />} />
                <Route path="katext" element={<KatextDisplay />} />
            </Routes>
        </div>
      </main>
    </div>
        
    </>
}