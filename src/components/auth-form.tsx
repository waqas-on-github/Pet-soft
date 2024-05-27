'use client'
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useForm } from "react-hook-form"
import { userSchema, userType } from "@/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { validateUserData } from "@/server_actions/helpers"
import AuthFormBtn from "./auth-form-btn"
import { signUpAction } from "@/server_actions/signUpAction"
import { redirect, useRouter } from "next/navigation"
import { logInAction } from "@/server_actions/loginAction"



const AuthForm = ({ type }: { type: 'login' | 'signup' }) => {

    const router = useRouter()

    // hooke form for form state managment 
    const { register, getValues, trigger, formState: { errors }, reset }
        = useForm<userType>(
            { resolver: zodResolver(userSchema) }
        )


    //"client action for server action"
    async function submit() {

        // trigger from 
        const res = await trigger()
        if (!res) return
        console.log("started submitting ");

        // get values from from 
        const values = getValues()

        // validate inputs 

        const validatedValues = validateUserData(values)

        if (type === "login") {
            const actionResponce = await logInAction(validatedValues)
            console.log(actionResponce);

            if (actionResponce.success) {
                redirect('/private/account')
            }

        }

        if (type === "signup") {
            const actionResponce = await signUpAction(validatedValues)
            console.log(actionResponce);

            if (actionResponce?.success) router.push('/login')
        }
        reset()
    }




    return (
        <form action={submit} className="flex flex-col gap-3 items-center justify-center" >
            <div>
                <Label htmlFor="userName"> User Name  </Label>
                <Input className="bg-white/50 " {...register("username", { required: "field is required " })} id="username" />
                {errors?.username && <p className="text-red-700" >{errors?.username.message}</p>}
            </div>
            <div>
                <Label htmlFor="password" >Password </Label>
                <Input className="bg-white/50" type="password" {...register("hashedpassword")} id="password" />
                {errors?.hashedpassword && <p className="text-red-700" >{errors?.hashedpassword.message}</p>}


            </div>
            <AuthFormBtn />
        </form>
    )
}

export default AuthForm