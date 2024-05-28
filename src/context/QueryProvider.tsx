"use client"
import { childernType } from "@/types/petTypes"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"



const QueryProvider = ({ children }: childernType) => {

    const queryClient = new QueryClient()


    return (
        <>
            <QueryClientProvider client={queryClient} >
                {children}
            </QueryClientProvider>
        </>
    )
}

export default QueryProvider