import { DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function AdminPanelDrawer({trigger}){
    const navigate = useNavigate()
    const [openDrawer, setOpenEditDrawer] = useState(false)

    const handleClick = () => {
        navigate("/")
    }

    return <Drawer direction='left' open={openDrawer} onOpenChange={setOpenEditDrawer}>
        <DrawerTrigger asChild>
            {trigger}
        </DrawerTrigger>
        <DrawerContent className={`w-3/4 h-full text-blue-100 border-none outline-0 bg-black`}>
            {/* Sidebar */}
            <aside className="flex flex-col text-white p-6">
                <DialogTitle>
                    <div className="flex py-3 items-center gap-5">
                        <div className="font-bold" onClick={handleClick}><ArrowLeft /></div>
                        <h1 className="text-xl font-bold">Admin Panel</h1>
                    </div>
                </DialogTitle>

                <nav className="space-y-4 p-4">
                    <Link onClick={() => setOpenEditDrawer(false)} to="/admin" className="block hover:text-gray-300">Dashboard</Link>
                    <Link onClick={() => setOpenEditDrawer(false)} to="/admin/subjects" className="block hover:text-gray-300">Subjects</Link>
                    <Link onClick={() => setOpenEditDrawer(false)} to="/admin/exams" className="block hover:text-gray-300">Exams</Link>
                    <Link onClick={() => setOpenEditDrawer(false)} to="/admin/questions" className="block hover:text-gray-300">Upload Questions</Link>
                    <Link onClick={() => setOpenEditDrawer(false)} to="/admin/questions-pool" className="block hover:text-gray-300">Create Question Pool</Link>
                    <Link onClick={() => setOpenEditDrawer(false)} to="/admin/katext" className="block hover:text-gray-300">TRy Katex</Link>
                </nav>
            </aside>
        </DrawerContent>
    </Drawer>
}