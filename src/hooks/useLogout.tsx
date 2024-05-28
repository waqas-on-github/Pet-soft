import { logout } from "@/server_actions/signout"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const useLogout = () => {

    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({

        mutationFn: logout,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['logout'] })
            toast("logged out successfully")
        },
        onError: (error) => {
            toast(error.message)
        }
    })
    return { mutate, isPending }
}

export default useLogout