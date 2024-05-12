import { AppFooter } from "@/components/app-footer"
import { AppHeader } from "@/components/app-header"
import { BackgroundPattern } from "@/components/background-pattern"
import PetContextProvider from "@/context/pet-context-provider"
import SearchContextProvider from "@/context/search-context_prvider"

const Layout = async ({ children }: childernType) => {


    const responce = await fetch("https://bytegrad.com/course-assets/projects/petsoft/api/pets")

    if (!responce.ok) {
        throw new Error("failed to fetch pets")
    }
    const pets: petType[] = await responce.json()



    return (
        <>
            <BackgroundPattern />
            <div className="max-w-[1050px] mx-auto flex flex-col min-h-screen" >
                <AppHeader />
                <SearchContextProvider>
                <PetContextProvider data={pets} >
                        {children}
                </PetContextProvider>
                </SearchContextProvider>
                <AppFooter />
            </div>
        </>
    )
}

export default Layout