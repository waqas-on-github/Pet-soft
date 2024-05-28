import { logInAction } from "@/server_actions/loginAction"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const useLogin = () => {

    const queryClient = useQueryClient()

    const { status, mutate } = useMutation({

        mutationFn: logInAction,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['login'] })
            toast("logged In successfully")
        },
        onError: (error) => {
            toast(error.message)
        }
    })
    return { status, mutate }
}

export default useLogin