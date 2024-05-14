'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PlusIcon } from "lucide-react"
import { PetForm } from "./pet-form"
import { useState } from "react"



export function AddDialog({ actionType }: { actionType: "add" | "edit" }) {
    // managing dialog state 
    const [isFormOpen, setisFormOpen] = useState(false)

    const checkformOpen = (formResponce: boolean): void => {
        setisFormOpen(formResponce)
    }

    return (
        <Dialog open={isFormOpen} onOpenChange={setisFormOpen} >

            <DialogTrigger asChild>
                {actionType == "add" ?
                    <Button size='icon' className="h-14 w-14" > <PlusIcon /> </Button> :
                    <Button className=" bg-zinc-200 hover:bg-zinc-300" variant='secondary' >
                        Edit
                    </Button>}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">

                <DialogHeader>
                    <DialogTitle>
                        {actionType === "add" ? "Add" : "Edit"} a new pet
                    </DialogTitle>
                </DialogHeader>

                {/* dialog main content  */}
                <PetForm actionType={actionType} checkFormOpen={checkformOpen} />
            </DialogContent>

        </Dialog>
    )
}
