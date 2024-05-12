import { cn } from "@/lib/utils"

export const Contentblock = ({ children, className }: childernType & { className?: string }) => {
    return (
        <div className={cn("bg-[#EFF1F2] shadow-sm rounded-md overflow-hidden h-full w-full", className)} >{children}</div>
    )
}
