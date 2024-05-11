'use client'
import { usePetContext } from "@/lib/hooks"
import Image from "next/image"

export const Petlist = () => {

    const { pets, handlePetChange }: { pets: petType[]; handlePetChange: petvalueType["handlePetChange"] } = usePetContext()

    return (
        <ul className=" bg-white border-b border-black/[0.08]" >
            {pets.map((pet: petType) => (
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






































