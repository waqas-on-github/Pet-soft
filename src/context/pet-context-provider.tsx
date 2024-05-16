"use client"
import { usePetSearchContext } from '@/lib/hooks'
import React, { createContext, useState } from 'react'


// creating context to share pets data and to track pet id state and provide it globally 
export const petContext = createContext<petvalueType | null>(null)

const PetContextProvider = ({ children, data: pets }: { children: React.ReactNode, data: petType[] }) => {
    // state 
    const [selectedPetId, setselectedPetId] = useState<string | null>(null)
    const { searchQuery } = usePetSearchContext()

    // action on state 
    const handlePetChange = (id: string) => {
        setselectedPetId(id)
    }

    // add a new pet 
    const handleAddNewPet = (newPet: Omit<petType, "id">) => {


    }

    // edit new pet  
    const handleEditNewPet = (newId: string, newPetData: Omit<petType, "id">) => {


        const result = pets.filter((pet) => {

            if (pet.id === newId) {
                return {
                    id: newId,
                    ...newPetData
                }
            }
            return pet
        })

        console.log(result);




    }

    // check/delete pet 



    // drived state 

    // for pet selection
    const selectedPet = pets?.find((pet) => {
        return selectedPetId === pet.id
    })

    // for pet stats 
    const totalPets = pets?.length






    return (
        <petContext.Provider value={{
            pets,
            selectedPetId,
            selectedPet,
            totalPets,
            handlePetChange,
            handleAddNewPet,
            handleEditNewPet

        }}>
            {children}

        </petContext.Provider>
    )
}

export default PetContextProvider