'use client'
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import { addPet } from "@/actions/actions";
import { PetFormBtn } from "./pet_form_btn";



export const PetForm = ({ actionType, checkFormOpen }: PetFormProps) => {
    //get actionType handler form state manager 
    const { selectedPet } = usePetContext()

    // "client action"  for server action 
    async function submitForm(formData: unknown) {

        try {
            const res = await addPet(formData)
            res && checkFormOpen(false)

        } catch (error) {
            console.log(error);

            alert("failed to add pet ")
            checkFormOpen(false)
        }

    }




    return (
        <form action={submitForm} className="flex flex-col">
            <div className="space-y-4 ">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input

                        name="name"
                        id="name"
                        type="text"
                        required
                        defaultValue={actionType === 'edit' ? selectedPet?.name : ""}

                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="Owner Name">Owner Name</Label>
                    <Input name="ownerName" id="ownerName" type="text" required
                        defaultValue={actionType === 'edit' ? selectedPet?.ownerName : ""}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="Image url">Image url</Label>
                    <Input name="imageUrl" id="imageUrl" type="text" defaultValue={actionType === 'edit' ? selectedPet?.imageUrl : ""} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="Age">Age</Label>
                    <Input name="age" id="age" type="number" required defaultValue={actionType === 'edit' ? selectedPet?.age : ""} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="Notes">Notes</Label>
                    <Textarea name='notes' id="notes" rows={3} defaultValue={actionType === 'edit' ? selectedPet?.notes : ""} />
                </div>
            </div>
            <PetFormBtn actionType={actionType} />
        </form>
    );
};

