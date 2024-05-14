import React from 'react'
import { Button } from './ui/button'
import { useFormStatus } from 'react-dom'

export const PetFormBtn = ({ actionType }: Omit<PetFormProps, "checkFormOpen">) => {
    const { pending } = useFormStatus()
    return (
        <Button className="self-end mt-6" disabled={pending}  >
            {actionType === "add" ? "Add" : "Edit"} Pet
        </Button>
    )
}
