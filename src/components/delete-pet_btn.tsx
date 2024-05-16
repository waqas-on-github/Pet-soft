import React, { useTransition } from 'react'
import PetButton from './pet-button'
import { usePetContext } from '@/lib/hooks'
import { deletePet } from '@/server_actions/actions'

const DeletePetBtn = () => {

    const { selectedPetId } = usePetContext()
    const [isPending, startTransition] = useTransition()



    return (<>
        {selectedPetId &&
            <PetButton
                disabled={isPending}
                actionType="checkout"
                onClk={async () => startTransition(() => {
                    deletePet(selectedPetId)
                })
                }>
                checkout
            </PetButton>}
    </>
    )
}

export default DeletePetBtn