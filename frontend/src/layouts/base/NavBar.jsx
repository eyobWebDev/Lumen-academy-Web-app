import { NavLink, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useThemeStore } from "@/store/useThemeStore"
import { Loader2, LogIn, LogOut, MenuIcon, MoonStar, Sun } from "lucide-react"
import { Menu } from "@radix-ui/react-menubar"
import DropDownMenu from "@/widget/DropDownMenu"
import { useAuthStore } from "@/store/useAuthStore"
import AdminLogInDialog from "../auth/AdminLogInDialog"


export default function NavBar() {
    const {darkMode, toggleDarkMode} = useThemeStore()
    const [scrolled, setScrolled] = useState(false)
    const navigate = useNavigate()
    const {authUser, isLoggingOut, logout} = useAuthStore()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        };
    }, []);

    const handleLogOut = () => {
        logout()
        navigate("/")
    }

    const navbarStyle = scrolled ? darkMode ? "backdrop-blur-xl bg-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-6" : "backdrop-blur-xl bg-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-1" : ""
    const navbarBtnStyle = darkMode ? "px-4 py-1 rounded-lg border border-white/10 bg-white/10 hover:bg-white/20 transition" : "px-4 py-1 rounded-lg border border-black/10 bg-black/5 hover:bg-black/10 transition"

    return <>
        <div className={`flex fixed top-0 z-50  ${navbarStyle} justify-between lg:p-5 p-3 items-center w-full`}>
            <div className="flex gap-2 items-center">
                {/* add a logo */}
                <div className="lg:text-3xl md:text-2xl  navbar-title font-bold">Lumen Academy</div>
            </div>

            <div className="flex items-center gap-7">
                {authUser && authUser.role == "admin" ? <a onClick={() => navigate("/admin")} className={`${navbarBtnStyle} cursor-pointer`}>Admin</a> : ""}
                
                {authUser ? <button onClick={handleLogOut} className="btn btn-error btn-link btn-sm flex gap-3">
                    {isLoggingOut ? <Loader2 className="animate-spin" /> : `Log Out`} <LogOut size={15} /> </button> : 
                    <AdminLogInDialog  trigger={<a className={`hover:text-blue-500`}><Button variant={`outline`} className={`hover:bg-blue-200`}>
                    Sign In</Button></a>} />}
            </div>
        </div>
    </>
}