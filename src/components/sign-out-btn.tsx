"use client"
import { logout } from "@/server_actions/signout"
import { Button } from "./ui/button"

export const SignOutBtn = () => {

    return (
        <Button onClick={async () => {
            await logout()
        }} >SignOut</Button>
    )
}
