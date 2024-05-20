import H1 from "@/components/H1"
import AuthForm from "@/components/auth-form"

const page = () => {
    return (
        <main>
            <H1 className="text-center" >Log In</H1>

            <AuthForm type='login' />
        </main>
    )
}

export default page