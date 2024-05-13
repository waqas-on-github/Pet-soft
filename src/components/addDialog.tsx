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


export function AddDialog({ action }: { action: "add" | "edit" }) {

    const [isFormOpen, setisFormOpen] = useState(false)

    return (
        <Dialog open={isFormOpen} onOpenChange={setisFormOpen} >

            <DialogTrigger asChild>
                {action == "add" ?
                    <Button size='icon' className="h-14 w-14" > <PlusIcon /> </Button> :
                    <Button className=" bg-zinc-200 hover:bg-zinc-300" variant='secondary' >
                        Edit
                    </Button>}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">

                <DialogHeader>
                    <DialogTitle>
                        {action === "add" ? "Add" : "Edit"} a new pet
                    </DialogTitle>
                </DialogHeader>

                {/* dialog main content  */}
                <PetForm action={action} onFormSubmit={() => {
                    setisFormOpen(false)
                }} />
            </DialogContent>

        </Dialog>
    )
}
