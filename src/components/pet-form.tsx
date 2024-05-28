'use client'
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import { PetFormBtn } from "./pet_form_btn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petFormSchem } from "@/lib/schemas";
import { PetFormProps, petType } from "@/types/petTypes";
import { editPet } from "@/server_actions/editPetAction";
import useCreatePet from "@/hooks/useCreatePet";
import useEditPet from "@/hooks/useEditPet";


export const PetForm = ({ actionType, checkFormOpen }: Omit<PetFormProps, "pending">) => {

    //get actionType handler form state manager 
    const { selectedPet } = usePetContext()
    const { mutate, isPending, isError } = useCreatePet()
    const { mutate: editMutate, isPending: editPending, isError: editError } = useEditPet()
    // getting conditional default value 
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
    async function submitForm() {

        let responce = await trigger()
        if (!responce) return null
        const data = getValues()


        if (actionType === "add") {
            mutate(data, { onSuccess: () => { checkFormOpen(false) } })
            if (isError) {
                checkFormOpen(false)
            }

    }

        if (actionType === "edit") {


            if (selectedPet) {
                const editpetData = { id: selectedPet.id, ...data }
                editMutate(editpetData, { onSuccess: () => { checkFormOpen(false) } })
                if (isError) {
                    checkFormOpen(false)    
                }

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
            <PetFormBtn actionType={actionType} pending={isPending} />
        </form>
    );
}


