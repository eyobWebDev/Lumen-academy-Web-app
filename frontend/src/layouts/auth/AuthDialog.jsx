import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuthStore } from "@/store/useAuthStore";
import { Eye, EyeClosed, EyeOff } from "lucide-react";
import { useState } from "react";

export default function AuthDialog({trigger}) {
    const {login} = useAuthStore()
    const [username, setUsername] = useState("") 
    const [password, setPassword] = useState("") 
    const [passwordView, setPassowrdView] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()
        await login({username, password})
    }

    return <Dialog>
        <DialogTrigger asChild>
            {trigger || "Log In"}
        </DialogTrigger>

        <DialogContent className={`bg-base-200`}>
            <DialogHeader>
                <DialogTitle className={`text-center`}>Log In As An Admin</DialogTitle>
            </DialogHeader>
            <div className="p-2 border-black/45 rounded-xl">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="username">Usrename</label>
                        <div>
                            <input value={username} onChange={(e) => setUsername(e.target.value)} name="username" placeholder="Username" className="input w-full input-neutral focus:outline-0" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password">Password</label>
                        <div className="relative">
                            <input type={passwordView ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Password" className="input w-full input-neutral focus:outline-0" />
                            <button  type="button" className="absolute right-1 p-1" onClick={() => setPassowrdView(!passwordView)}>
                                {passwordView ? <EyeOff /> : <Eye />}
                            </button>

                        </div>
                    </div>

                    <button type="submit" className="btn btn-wide btn-success w-full">Log In</button>
                </form>
            </div>
        </DialogContent>
    </Dialog>
}