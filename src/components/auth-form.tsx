'use client'
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useForm } from "react-hook-form"
import { authSchema, authType } from "@/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { validateUserData } from "@/server_actions/helpers"
import AuthFormBtn from "./auth-form-btn"



const AuthForm = ({ type }: { type: 'login' | 'signup' }) => {
    // getting current path name 



    // hooke form for form state managment 
    const { register, getValues, trigger, formState: { errors }, reset }
        = useForm<authType>(
            { resolver: zodResolver(authSchema) }
        )


    //"client action for server action"
    async function submit() {
        // trigger from 
        const res = await trigger()
        if (!res) return

        // get values from from 
        const values = getValues()

        // validate inputs 

        const validatedValues = validateUserData(values)

        if (type === "login") {
            // await login(validatedValues)
        }

        if (type === "signup") {
            // await signup(validatedValues)
        }
        reset()
    }




    return (
        <form action={submit} className="flex flex-col gap-3 items-center justify-center" >
            <div>
                <Label htmlFor="email"> Email </Label>
                <Input className="bg-white/50 " {...register("email", { required: "field is required " })} id="email" />
                {errors?.email && <p className="text-red-700" >{errors?.email.message}</p>}
            </div>
            <div>
                <Label htmlFor="password" >Password </Label>
                <Input className="bg-white/50" type="password" {...register("hashedPassword")} id="password" />
                {errors?.hashedPassword && <p className="text-red-700" >{errors?.hashedPassword.message}</p>}


            </div>
            <AuthFormBtn />



        </form>
    )
}

export default AuthForm