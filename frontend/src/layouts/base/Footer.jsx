import { Button } from "@/components/ui/button";
import { Copyright, Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
    
    return <>
    <div className="p-20 mt-10">
        <div className="flex gap-5 w-full justify-between">
            <div className="w-2/3">
                <div className="font-light opacity-80">This portfolio is more than just a showcase of projects — it’s a reflection of my journey as a developer, my passion for building meaningful digital experiences, and my constant drive to learn and grow. Every line of code is written with curiosity, creativity, and care.</div>
            </div>

            <div className="flex flex-col w-1/6 items-center gap-6">
                <h1 className="font-bold lg:text-xl opacity-90 sm:text-[12px]">Quick links</h1>
                <div className="flex gap-5 justify-around w-full items-center">
                    <a  className="hover:text-blue-400"><Github /></a>
                    <a  className="hover:text-blue-400"><Twitter /></a>
                    <a  className="hover:text-blue-400"><Linkedin /></a>
                </div>
            </div>
        </div>

        <div className="h-[2px] m-4 bg-base-100 w-full"></div>

        <div style={{fontSize: "smaller"}} className="flex gap-4 mt-4 text-gray-400 justify-between">
            <div className="flex gap-3 items-center">

                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                    <Copyright size={20} /> 
                    2025 Eyob Tilahun · Full-Stack Developer.
                </div>
                <div>
                    Crafted with ❤️ using modern web technologies. Always learning, always building.
                </div>
                </div>
                <br />
                
            </div>
            <div>
                <div>Privacy Policy Terms of Service</div>
            </div>
        </div>
    </div>
    </>
}