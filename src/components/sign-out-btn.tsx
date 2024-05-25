"use client"
import { Button } from "./ui/button"

export const SignOutBtn = () => {

    return (
        <Button onClick={async () => {
            console.log("logging user out ");
        }} >SignOut</Button>
    )
}
