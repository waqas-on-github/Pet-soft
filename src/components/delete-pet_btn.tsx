"use client"
import React from 'react'
import PetButton from './pet-button'
import { usePetContext } from '@/lib/hooks'
import useDeletePet from '@/hooks/useDeletePet'

const DeletePetBtn = () => {

    const { selectedPetId } = usePetContext()
    // Mutations
    const { isPending, mutate } = useDeletePet()


    return (<>
        {selectedPetId &&
            <PetButton
                disabled={isPending}
                actionType="checkout"
                onClk={async () => {
                    mutate(selectedPetId)
                }
                }>
                checkout
            </PetButton>}
    </>
    )
}

export default DeletePetBtn