import NavBar from "@/layouts/base/NavBar";
import "../assets/styles/home_page.css"
import { Button } from "@/components/ui/button";
import { ArrowRight, ChartLineIcon, Clock12Icon, FileQuestion, FolderClosed, Github, Handshake, MessageCircleMore, PlusSquare, Twitter, Workflow } from "lucide-react";
import Footer from "@/layouts/base/Footer";
import { useThemeStore } from "@/store/useThemeStore";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


export default function HomePage() {
    const {darkMode} = useThemeStore()
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const navigate = useNavigate()

    if(id) navigate(`/exam/${id}`)


    return <>
 
     <div className="w-[100%] flex flex-col justify-center items-center home-page h-[100vh] bg-transparent before:bg-amber-50">
        <NavBar />
        <div className="lg:pl-70 lg:pr-70 p-5 flex flex-col gap-6">
            <div className="flex-col flex gap-1 lg:mt-30 text-center">
                <div className="lg:text-7xl text-4xl opacity-95 font-bold">Lumen Academy</div>
                <div className="lg:text-5xl pt-2 pb-2 text-3xl font-bold text-gradient">Building Educational Experiences.</div>
                {/* <div className="lg:text-[20px] text-[16px] opacity-65 mt-3">
                    I create modern web applications with cutting-edge technologies and exceptional user experiences.</div> */}
            </div>

            <div className="flex gap-5 flex-wrap items-center">
                <Button className={`mt-5 p-3 flex justify-center items-center scale-btn cursor-pointer cta-btn`}>
                <div>Create Subject</div> <PlusSquare size={30} /></Button>

                <Button className={`mt-5 p-3 flex justify-center items-center scale-btn cursor-pointer cta-btn `}>
                <div>Create Question Pool</div> <FileQuestion size={30} /></Button>

                <Button className={`mt-5 p-3 flex justify-center items-center scale-btn cursor-pointer cta-btn`}>
                <div></div>Schedule Exam<Clock12Icon size={30} /></Button>
                
            </div>
        </div>
     </div>

     <Footer />
    </>
}