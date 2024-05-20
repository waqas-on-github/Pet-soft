'use client'
import { SessionContext } from "next-auth/react"

const SessionProvider = ({ children }: childernType) => {
    return (
        <SessionContext.Provider value={""} >

            {children}

        </SessionContext.Provider>
    )
}

export default SessionProvider