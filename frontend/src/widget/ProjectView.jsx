import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRightFromSquareIcon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function ProjectView({title, description, imgUrl, alt, type, uses, url}) {
    const navigate = useNavigate()
    

    return <div className="project-card rounded-2xl flex lg:p-2 p-0 tras-bg shadow gap-2 flex-col">
                <div className="w-full h-52 relative">
                    <img className="absolute proj-img-border rounded w-full hover:scale-105 transition-all duration-500 h-full object-cover"  src={imgUrl} alt={alt || ""}/>
                </div>

                <div className="flex lg:p-3 pt-5 pb-5 p-3 flex-col gap-3">
                    <div className="flex font-bold justify-between">
                        <a  href={url} target="_blank">
                        <div className="text-2xl title">{title || ""}</div>
                        </a>
                        <Badge variant={`outline`} className={`rounded-3xl scale-90`}>{type || ""}</Badge>
                    </div>
                    <div className="text-[15px] mt-3 opacity-75">
                        {description || ""}
                    </div>
                    <div className="flex gap-1.5 font-bold mt-2">
                        {uses &&
                            uses.map(use => {
                                return <Badge variant={`outline`} className={`rounded-3xl lg:scale-100 scale-90`}>{use}</Badge>
                            })
                        }
                    </div>

                    <div className="mt-2 flex gap-6">
                        
                        <a  href={url} target="_blank">
                            <Button className={`cursor-pointer p-3`}><ArrowUpRightFromSquareIcon /><div>Live Demo</div>
                            </Button>
                        </a>
                        
                        <Button variant={`outline`} className={`flex cursor-pointer justify-around hover:bg-base-100 p-3`}><div>Details</div><ArrowRight /> </Button>
                    </div>
                </div>
            </div>
}