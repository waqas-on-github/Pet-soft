import { signUpAction } from "@/server_actions/signUpAction"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const useSignUp = () => {

    const queryClient = useQueryClient()

    const { isPending, mutate, isError } = useMutation({
        mutationFn: signUpAction,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['signup'] })
            toast(" account created successfully")
        },
        onError: (error) => {
            toast(error.message)
        }
    })
    return { isPending, mutate, isError }
}

export default useSignUp