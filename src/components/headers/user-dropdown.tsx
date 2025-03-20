"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    ChevronDownIcon,
    LogOutIcon,
} from "lucide-react";

import { useAuthStore } from "@/store/auth-store";

export default function UserDropdown() {
    const { setAuthStatus, setUserData, userData } = useAuthStore()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
                    <Avatar>
                        <AvatarImage src="./avatar.jpg" alt="Profile image" />
                        <AvatarFallback>ID</AvatarFallback>
                    </Avatar>
                    <ChevronDownIcon size={16} className="opacity-60" aria-hidden="true" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-64">
                <DropdownMenuLabel className="flex min-w-0 flex-col">
                    <span className="text-foreground truncate text-sm font-medium">{userData?.username}</span>
                </DropdownMenuLabel>
                
                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer" onClick={() => {
                    setAuthStatus(false)
                    setUserData(null)
                }}>
                    <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
