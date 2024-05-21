import { AppFooter } from "@/components/app-footer"
import { AppHeader } from "@/components/app-header"
import { BackgroundPattern } from "@/components/background-pattern"
import PetContextProvider from "@/context/pet-context-provider"
import SearchContextProvider from "@/context/search-context_prvider"
import { getPets, getUser } from "@/lib/fetchers"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { childernType, petType } from "@/types/petTypes"


const Layout = async ({ children }: childernType) => {

    const session = await auth()

    if (!session) {
        redirect("/login")
    }



    // geting pets from db 
    const user = await getUser(session?.user?.email)
    const pets: petType[] = await getPets(user?.id)
    // type narrowning for fix ing type issues and better error handling
    return (
        <> 
            <BackgroundPattern />
            <div className="max-w-[1050px] mx-auto flex flex-col min-h-screen" >
                <AppHeader />
                <SearchContextProvider>
                    <PetContextProvider data={[...pets]} >
                        {children}
                </PetContextProvider>
                </SearchContextProvider>
                <AppFooter />
            </div>
        </>
    )
}

export default Layout