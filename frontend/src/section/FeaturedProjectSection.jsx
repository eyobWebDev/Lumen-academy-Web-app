import { Button } from "@/components/ui/button";
import ProjectView from "@/widget/ProjectView";
import { ArrowRight, ArrowUpRightFromSquareIcon } from "lucide-react";
import chatAppUrl from "../assets/images/chat-app-imgUrl.png";
import taskFlowUrl from "../assets/images/taskFlow.png";

export default function FeaturedProjectSection(){

    return <>
    <div id="projects" className="mt-30 mb-30 lg:p-5">
        <div className="font-bold p-7 lg:text-5xl md:text-5xl text-3xl flex gap-2 justify-center"><div className="p-2">Featured</div><div className="text-gradient p-2">Projects</div></div>

        <div className="grid p-3 lg:grid-cols-3 lg:mt-30 gap-10 sm:grid-cols-1">

            <ProjectView 
            alt={`Chat me`}
            description={`A fully featured chat app with both individual chat room and group chat. with the feature to search for user. mostly Inspired By Telegram.`}
            title={`Chat me`}
            type={`FullStack`}
            imgUrl={chatAppUrl}
            uses={["React", "Express", "Socket", "more..."]}
            key={Date.now}
            url={`https://mern-chat-app-rho-blue.vercel.app/`}
            />

            <ProjectView 
            alt={`TaskFlow`}
            description={`Full project and team management. create workspace and invite people to collaborate, schedule task with due date etc...`}
            title={`TaskFlow`}
            type={`FullStack`}
            uses={["React", "Express", "TailwindCSS", "more..."]}
            key={Date.now}
            imgUrl={taskFlowUrl}
            url={"https://task-flow-red-pi.vercel.app"}
            />

            

        </div>

    </div>
    </>
}