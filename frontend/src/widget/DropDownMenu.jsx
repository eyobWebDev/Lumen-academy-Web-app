import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useThemeStore } from "@/store/useThemeStore";
import { Home, InfoIcon, MenuIcon, Settings } from "lucide-react";


export default function DropDownMenu() {
    const {darkMode} = useThemeStore()

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <div className={`navbar-link p-2 rounded ${darkMode ? "hover:bg-gray-600": "hover:bg-gray-300"}`}>{ <MenuIcon />}</div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className={`p-3 bg-base-300`} align="start">

            <DropdownMenuGroup className="flex gap-1.5 flex-col">
                <DropdownMenuItem>
                    Home
                    <DropdownMenuShortcut><Home /></DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    About
                    <DropdownMenuShortcut><InfoIcon /></DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Settings
                    <DropdownMenuShortcut><Settings /></DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className={`hover:bg-gray-100`}>
                    <Button className={`w-full`} >Hire Me</Button>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
}