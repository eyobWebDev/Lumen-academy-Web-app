import { Atom, BoxIcon, BracesIcon, Code, Code2Icon, Database, FileCode, GitBranchIcon, LucideCode2, LucideNetwork, Paintbrush2, PawPrintIcon, Pyramid, RectangleEllipsis } from "lucide-react";
import pythonIcon from "../assets/images/python.svg"
import djangoIcon from "../assets/images/django.svg"
import TechstackTile from "@/widget/TechstackTile";


export default function TeckStackSection(){

    return <>
    <div id="skills" className="mt-20 flex flex-col gap-10 mb-20">
        <div className="text-center text-3xl opacity-90 font-bold">My Tech Stack and Skills</div>

        <div className="flex flex-col p-4 pl-7 gap-5">
            <div className="text-2xl mb-2 font-bold">Frontend</div>
            <div className="grid lg:grid-cols-4 gap-5 md:grid-cols-3 grid-cols-2">
                <TechstackTile icon={<Atom className="text-blue-500 lg:scale-100 scale-90" />} name={`React`}/>
                <TechstackTile icon={<PawPrintIcon className="text-blue-300 lg:scale-100 scale-90" />} name={`Tailwind`}/>
                <TechstackTile icon={<BoxIcon className="text-purple-500 lg:scale-100 scale-90" />} name={`Vite`}/>
                <TechstackTile icon={<Paintbrush2 className="text-blue-600 lg:scale-100 scale-90" />} name={`CSS`}/>
                <TechstackTile icon={<Code className="text-orange-500 lg:scale-100 scale-90" />} name={`HTML`}/>
                <TechstackTile icon={<BracesIcon className="text-orange-300 lg:scale-100 scale-90" />} name={`JavaScript`}/>
                
            </div>
        </div>

        <div className="flex flex-col p-4 pl-7 gap-5">
            <div className="text-2xl mb-2 font-bold">Backend</div>
            <div className="grid lg:grid-cols-4 gap-5 md:grid-cols-2 grid-cols-2">

                <TechstackTile icon={<RectangleEllipsis className="text-green-500 lg:scale-100 scale-90" />} name={`Nodejs`}/>
                <TechstackTile icon={<RectangleEllipsis className="text-gray-500 lg:scale-100 scale-90" />} name={`Express`}/>
                <TechstackTile icon={<Database className="text-orange-500 lg:scale-100 scale-90" />} name={`MySql`}/>
                <TechstackTile icon={<Database className="text-blue-300 lg:scale-100 scale-90" />} name={`Postgres`}/>
                <TechstackTile icon={<FileCode className="text-blue-500 lg:scale-100 scale-90" />} name={`MongoDB`}/>
                <TechstackTile icon={<LucideNetwork className="text-purple-500 lg:scale-100 scale-90" />} name={`Socket`}/>
                <TechstackTile icon={<img height={`25px`} width={`25px`} src={pythonIcon} className="text-green-500" />} name={`Python`}/>
                <TechstackTile icon={<img height={`25px`} width={`25px`} src={djangoIcon} className="text-green-500" />} name={`Django`}/>
                
            </div>
        </div>

        <div className="flex flex-col p-4 pl-7 gap-5">
            <div className="text-2xl font-bold mb-2">Tools</div>
            <div className="grid lg:grid-cols-4 gap-5 md:grid-cols-3 grid-cols-2">

                <TechstackTile icon={<GitBranchIcon className="text-blue-500 lg:scale-100 scale-90" />} name={`Git`}/>
                <TechstackTile icon={<GitBranchIcon className="text-purple-500 lg:scale-100 scale-90" />} name={`GitHub`}/>
                <TechstackTile icon={<LucideCode2 className="text-orange-500 lg:scale-100 scale-90" />} name={`Terminal`}/>
                
            </div>
        </div>

        
    </div>
    </>
}