
'use client'
import { usePetContext } from "@/lib/hooks"
import { TopView } from "./top-view"
import { DetailsArea } from "./details-area"
import { Notes } from "./notes"
import { EmptyView } from "./empty-view"

// show the signle pets detail in dashboard 
export const Petdetails = () => {

    const { selectedPet } = usePetContext()

    return (
        <>
            {selectedPet ?
                <section className="h-full w-full flex flex-col" >

                    <TopView pet={selectedPet} />
                    <DetailsArea pet={selectedPet} />
                    <Notes pet={selectedPet} />
                </section>
                :
                <div className="flex items-center justify-center h-full">
                    <EmptyView />
                </div>
            }
        </>
    )
}
