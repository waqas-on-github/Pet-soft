"use client"
import { usePetSearchContext } from '@/lib/hooks'
import React, { createContext, useState } from 'react'


// creating context to share pets data and to track pet id state and provide it globally 
export const petContext = createContext<petvalueType | null>(null)

const PetContextProvider = ({ children, data }: { children: React.ReactNode, data: petType[] }) => {
    // state 
    const [pets, setPets] = useState(data)
    const [selectedPetId, setselectedPetId] = useState<string | null>(null)
    const { searchQuery } = usePetSearchContext()

    // action on state 
    const handlePetChange = (id: string) => {
        setselectedPetId(id)
    }

    // add a new pet 
    const handleAddNewPet = (newPet: Omit<petType, "id">) => {

        setPets(prev => [...prev, {
            ...newPet, id: new Date().toString()
        }])
    }

    // edit new pet  
    const handleEditNewPet = (newId: string, newPetData: Omit<petType, "id">) => {

    // setPets((prev) => {
    //     prev.map((pet) => {
    //         if (pet?.id === newId) {
    //             return {
    //                 id: newId,
    //                 ...newPetData
    //             }
    //         }
    //         return pet
    //     })
    // })

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

    const handlePetCheckOut = (id: string) => {
        setPets((perv) => perv?.filter(pet => pet?.id !== id))
    } 

    // drived state 

    // for pet selection
    const selectedPet = pets?.find((pet) => {
        return selectedPetId === pet.id
    })

    // for pet stats 
    const totalPets = pets?.length

    let filterdPets: petType[];
    // for search feature 
    if (searchQuery) {  // if there is search query filter the pet array 
        filterdPets = pets?.filter((pet) => pet?.name.toLowerCase().includes(searchQuery))

    }




    return (
        <petContext.Provider value={{
            pets,
            selectedPetId,
            selectedPet,
            totalPets,
            handlePetChange,
            handlePetCheckOut,
            handleAddNewPet,
            handleEditNewPet

        }}>
            {children}

        </petContext.Provider>
    )
}

export default PetContextProvider