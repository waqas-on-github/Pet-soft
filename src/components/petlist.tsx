'use client'
import { usePetContext, usePetSearchContext } from "@/lib/hooks"
import { petType, petvalueType } from "@/types/petTypes"
import Image from "next/image"

export const Petlist = () => {

    const { searchQuery } = usePetSearchContext() 

    const { pets, handlePetChange }: { pets: petType[]; handlePetChange: petvalueType["handlePetChange"] } = usePetContext()

    // data filtration logic 
    let filterdPets; 
    if (searchQuery) {
        filterdPets = pets.filter((pet) => pet?.name.toLowerCase().includes(searchQuery))
    }

    let allPets;
    if (!filterdPets) {
        allPets = pets
    }
    if (filterdPets) {
        allPets = filterdPets
    }

    // data filtration logic 

    // if (allPets && allPets.length === 0) {
    //     return <div className="flex items-center justify-center mt-[58%]" > no pet found  </div>
    // }

    return (
        <ul className=" bg-white border-b border-black/[0.08]" >
            {allPets && allPets.map((pet: petType) => (

                <li key={pet.id}>
                    <button onClick={() => handlePetChange(pet.id)} className="flex items-center h-[70px] w-full cursor-pointer px-5 text-base gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition" >
                        <Image src={pet.imageUrl}
                            alt="placeholder"
                            width={50}
                            height={50}
                            className=" hover:w-[55px] hover:h-[55px] transition-all h-[50px] w-[50px] rounded-full object-cover"

                        />
                        <p className="font-semibold" >{pet.name}</p>
                    </button>
                </li>
            ))} 
        </ul>
    )
}






































