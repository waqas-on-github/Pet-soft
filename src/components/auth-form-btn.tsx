'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'
import { useFormStatus } from 'react-dom'

const AuthFormBtn = () => {

    const pathName = usePathname()
    const { pending } = useFormStatus()
    return (
        <>
            <Button className='self-center' size="smx" disabled={pending} > {pathName === "/login" ? "Login" : "Signup"} </Button>
        </>
    )
}

export default AuthFormBtn