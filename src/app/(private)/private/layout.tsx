import { AppFooter } from "@/components/app-footer"
import { AppHeader } from "@/components/app-header"
import { BackgroundPattern } from "@/components/background-pattern"
import PetContextProvider from "@/context/pet-context-provider"
import SearchContextProvider from "@/context/search-context_prvider"
import { CheckAuth, getPets } from "@/server_actions/helpers_for_server"
import { childernType, petType } from "@/types/petTypes"


const Layout = async ({ children }: childernType) => {

    const session = await CheckAuth()


    // geting pets from db 
    const pets: petType[] = await getPets(session.user?.id)
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