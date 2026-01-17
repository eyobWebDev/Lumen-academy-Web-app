import { CodeIcon } from "lucide-react";


export default function TechstackTile({name, icon}) {

    return <div className="tech-card bg-base-300 lg:text-[20px] text-[17px] shadow-lg rounded">
        {icon || <CodeIcon className="text-green-500" />} <div>{name}</div> </div>
}