"use client"
import { logOut } from "@/server_actions/userActions"
import { Button } from "./ui/button"

export const SignOutBtn = () => {

    return (
        <Button onClick={async () => { await logOut() }} >SignOut</Button>
    )
}
