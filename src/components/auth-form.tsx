'use client'
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import { useForm } from "react-hook-form"
import { authSchema, authType } from "@/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"



const AuthForm = () => {
    // getting current path name 
    const pathName = usePathname()

    // hooke form for form state managment 
    const { register, getValues, trigger, formState: { errors }, reset }
        = useForm<authType>(
            { resolver: zodResolver(authSchema) }
        )


    //"client action for server action"
    async function sub() {

        const res = await trigger()
        if (!res) return

        const values = getValues()

        reset()
    }




    return (
        <form action={sub} className="flex flex-col gap-3 items-center justify-center" >
            <div>
                <Label htmlFor="email"> Email </Label>
                <Input className="bg-white/50 " {...register("email", { required: "field is required " })} id="email" />
                {errors?.email && <p className="text-red-700" >{errors?.email.message}</p>}
            </div>
            <div>
                <Label htmlFor="password" >Password </Label>
                <Input className="bg-white/50" type="password" {...register("password")} id="password" />
                {errors?.password && <p className="text-red-700" >{errors?.password.message}</p>}

            </div>

            <Button size="smx" > {pathName === "/login" ? "SignUp" : "Login"} </Button>

        </form>
    )
}

export default AuthForm