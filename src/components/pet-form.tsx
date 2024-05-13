'use client'
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";



export const PetForm = ({ action, onFormSubmit }: PetFormProps) => {
    //get action handler form state manager 
    const { handleAddNewPet, handleEditNewPet, selectedPet } = usePetContext()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // retrive data from form 
        const formData = new FormData(event.currentTarget)
        const newPet: Omit<petType, "id"> = {
            name: formData.get('name') as string,
            ownerName: formData.get("ownerName") as string,
            imageUrl: formData.get("imageUrl") as string || ("https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=100&w=1970&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") as string,
            age: +(formData.get("age") as string),
            notes: formData.get('notes') as string
        }


        // send it to state manager to do actios on data
        if (action == 'add') {
            handleAddNewPet(newPet)
        }

        else if (action == 'edit') {
            if (selectedPet) handleEditNewPet(selectedPet?.id, newPet)

        }

        onFormSubmit()
    }


    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="space-y-4 ">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input

                        name="name"
                        id="name"
                        type="text"
                        required
                        defaultValue={action === 'edit' ? selectedPet?.name : ""}

                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="Owner Name">Owner Name</Label>
                    <Input name="ownerName" id="ownerName" type="text" required
                        defaultValue={action === 'edit' ? selectedPet?.ownerName : ""}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="Image url">Image url</Label>
                    <Input name="imageUrl" id="imageUrl" type="text" defaultValue={action === 'edit' ? selectedPet?.imageUrl : ""} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="Age">Age</Label>
                    <Input name="age" id="age" type="number" required defaultValue={action === 'edit' ? selectedPet?.age : ""} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="Notes">Notes</Label>
                    <Textarea name='notes' id="notes" rows={3} defaultValue={action === 'edit' ? selectedPet?.notes : ""} />
                </div>
            </div>
            <Button className="self-end mt-6">
                {action === "add" ? "Add" : "Edit"} Pet
            </Button>
        </form>
    );
};
