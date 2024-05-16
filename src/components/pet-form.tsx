'use client'
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import { PetFormBtn } from "./pet_form_btn";
import { addPet, editPet } from "@/server_actions/actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petFormSchem } from "@/lib/schemas";


export const PetForm = ({ actionType, checkFormOpen }: PetFormProps) => {

    //get actionType handler form state manager 
    const { selectedPet } = usePetContext()

    // getting conditionla default value 
    let defaultvalue;
    if (actionType === "edit") {
        if (selectedPet && selectedPet) {
            defaultvalue = selectedPet
        }
    }


    const { formState: { errors, isSubmitting }, register, trigger, getValues } = useForm<Omit<petType, "id">>(
        { resolver: zodResolver(petFormSchem), defaultValues: defaultvalue }

    )

    // "client action"  for server action 
    async function submitForm(formData: FormData) {

        let responce = await trigger()
        if (!responce) return null

        if (actionType === "add") {
            try { 

            const res = await addPet(formData)
            res && checkFormOpen(false)

        } catch (error) {
            console.log(error);

                alert(`${error}`)
                checkFormOpen(false)
        }

    }

        if (actionType === "edit") {
            try {
                if (selectedPet) {

                    const res = await editPet(selectedPet?.id, formData)
                    res && checkFormOpen(false)


                }

            } catch (error) {
                console.log(error);

                alert(`${error}`)
                checkFormOpen(false)
            }
        }
    }


    return (
        <form action={submitForm} className="flex flex-col">
            <div className="space-y-4 ">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        {...register("name", { required: "name is", maxLength: 20 })}
                    />
                    {errors.name && <p className="text-red-700" >{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="Owner Name">Owner Name</Label>
                    <Input
                        id="ownerName"
                        {...register("ownerName")}
                    />
                    {errors.ownerName && <p className="text-red-700">{errors.ownerName.message}</p>}

                </div>

                <div className="space-y-2">
                    <Label htmlFor="Image url">Image url</Label>
                    <Input
                        id="imageUrl"
                        {...register("imageUrl")}
                    />
                    {errors.imageUrl && <p className="text-red-700">{errors.imageUrl.message}</p>}

                </div>

                <div className="space-y-2">
                    <Label htmlFor="Age">Age</Label>
                    <Input
                        id="age"
                        {...register("age")}
                        disabled={isSubmitting}

                    />
                    {errors.age && <p className="text-red-700">{errors.age.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="Notes">Notes</Label>
                    <Textarea id="notes"
                        {...register("notes")}
                    />
                    {errors.notes && <p className="text-red-700">{errors.notes.message}</p>}
                </div>
            </div>
            <PetFormBtn actionType={actionType} />
        </form>
    );
}


