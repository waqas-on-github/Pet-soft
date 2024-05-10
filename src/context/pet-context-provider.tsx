"use client"
import React, { createContext, useState } from 'react'


// creating context to share pets data and to track pet id state and provide it globally 
export const petContext = createContext<petvalueType | null>(null)

const PetContextProvider = ({ children, data }: { children: React.ReactNode, data: petType[] }) => {

    const [pets, setPets] = useState(data)
    const [selectedPetId, setselectedPetId] = useState<string | null>(null)

    const handlePetChange = (id: string) => {
        setselectedPetId(id)
    }

    console.log(selectedPetId);


    return (
        <petContext.Provider value={{
            pets,
            selectedPetId,
            handlePetChange
        }}>
            {children}

        </petContext.Provider>
    )
}

export default PetContextProvider