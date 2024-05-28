import { editPet } from "@/server_actions/editPetAction"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const useEditPet = () => {

    const queryClient = useQueryClient()

    const { isPending, mutate, isError } = useMutation({
        mutationFn: editPet,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['addPet'] })
            toast("pet edited successfully")
        },
        onError: (error) => {
            toast(error.message)
        }
    })
    return { isPending, mutate, isError }
}

export default useEditPet