"use client"
import { Button } from "./ui/button"
import useLogout from "@/hooks/useLogout"

export const SignOutBtn = () => {

    const { mutate, isPending } = useLogout()

    return (
        <Button disabled={isPending} onClick={() => {
            mutate()
        }} >SignOut
        </Button>
    )
}
