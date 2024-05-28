import { deletePet } from "@/server_actions/deletePetAction"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const useDeletePet = () => {

    const queryClient = useQueryClient()

    const { isPending, mutate } = useMutation({
        mutationFn: deletePet,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['deletePet'] })
            toast("pet deleted successfully")
        },
        onError: (error) => {
            toast(error.message)
        }
    })
    return { isPending, mutate }
}

export default useDeletePet