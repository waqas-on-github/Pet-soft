"use client"
import { petType, petvalueType } from '@/types/petTypes'
import React, { createContext, useState } from 'react'


// creating context to share pets data and to track pet id state and provide it globally 
export const petContext = createContext<petvalueType | null>(null)

const PetContextProvider = ({ children, data: pets }: { children: React.ReactNode, data: petType[] }) => {
    // state 
    const [selectedPetId, setselectedPetId] = useState<string | null>(null)

    // action on state 
    const handlePetChange = (id: string) => {
        setselectedPetId(id)
    }


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

        }}>
            {children}

        </petContext.Provider>
    )
}

export default PetContextProvider