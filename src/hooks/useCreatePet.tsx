import { addPet } from "@/server_actions/addPetAction"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const useCreatePet = () => {

    const queryClient = useQueryClient()

    const { isPending, mutate, isError } = useMutation({
        mutationFn: addPet,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['addPet'] })
            toast("pet added successfully")
        },
        onError: (error) => {
            toast(error.message)
        }
    })
    return { isPending, mutate, isError }
}

export default useCreatePet