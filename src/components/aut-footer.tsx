"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const AuthFooter = ({ children }: childernType) => {

    const pathName = usePathname()

    function checkPathName(onLogInPath: string, onSignUppath: string) {
        return pathName === "/login" ? onLogInPath : onSignUppath
    }

    return (
        <div className="flex flex-col items-center justify-center gap-2" >
            {children}
            <div className="text-center flex  items-center justify-center gap-2 ">
                <p className="text-sm text-black/55" > {checkPathName("Already have account?", "don't have Account yet?")}</p>
                <Link className="text-sm text-zinc-500" href={checkPathName("/signup", "/login ")} > {checkPathName('Login ', "Signup")} </Link>
            </div>
        </div>
    )
}

export default AuthFooter