import H1 from "@/components/H1"
import AuthForm from "@/components/auth-form"

const page = () => {
    return (
        <main>

            <H1 className="text-center" >Sign Up </H1>
            <AuthForm type='signup' />
        </main>
    )
}

export default page