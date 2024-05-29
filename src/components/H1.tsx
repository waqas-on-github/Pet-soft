import { cn } from "@/lib/utils"
import { childernType } from "@/types/petTypes"

const H1 = ({ children, className }: childernType & { className?: string }) => {
    return (
        <h1 className={cn("font-medium text-2xl leading-6", className)}>{children}</h1>
    )
}

export default H1