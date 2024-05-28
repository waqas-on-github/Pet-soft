import { cn } from "@/lib/utils"
import { childernType } from "@/types/petTypes"

export const Contentblock = ({ children, className }: childernType & { className?: string }) => {
    return (
        <div className={cn("bg-[#EFF1F2]  shadow-sm rounded-md overflow-hidden h-[97%] w-full", className)} >{children}</div>
    )
}
