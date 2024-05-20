"use client"
import { logOut } from "@/server_actions/actions"
import { Button } from "./ui/button"

export const SignOutBtn = () => {

    return (
        <Button onClick={async () => { await logOut() }} >SignOut</Button>
    )
}
