'use client'
import Image from "next/image";
import PetButton from "./pet-button";
import DeletePetBtn from "./delete-pet_btn";
import { petType } from "@/types/petTypes";

export function TopView({ pet }: { pet: petType }) {


    return (<div className="flex items-center bg-white px-8 py-5 border-b  border-borderBtw " >
        <Image
            src={pet?.imageUrl}
            alt="pet image"
            width={75}
            height={75}
            className="h-[75px] w-[75px] rounded-full object-cover"
        />
        <h2 className="text-3xl font-semibold leading-7 ml-5" >{pet?.name}</h2>
        <div className="ml-auto flex items-center justify-center gap-3" >
            <PetButton actionType="edit" > Edit</PetButton>
            <DeletePetBtn />
        </div>
    </div>
    )
}   