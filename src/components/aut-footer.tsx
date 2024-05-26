"use client"
import { childernType } from "@/types/petTypes"
import Link from "next/link"
import { usePathname } from "next/navigation"

const AuthFooter = ({ children }: childernType) => {
    const pathName = usePathname()


    return (
        <div className="flex flex-col items-center justify-center gap-2" >
            {children}
            {pathName === '/login' ? <>
                <p>dont have account yet? <Link href='/signup'> Sing Up</Link></p>
            </> : <>
                <p>already have account?  <Link href='/login' > Log In</Link></p>

            </>}

        </div>
    )
}

export default AuthFooter