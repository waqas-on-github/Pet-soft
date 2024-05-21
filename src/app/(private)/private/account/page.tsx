import H1 from "@/components/H1"
import { Contentblock } from "@/components/content-block"
import { auth } from "../../../../lib/auth"
import { redirect } from "next/navigation"
import { SignOutBtn } from "@/components/sign-out-btn"


const page = async () => {

    const session = await auth()

    if (!session) {
        redirect("/login")
    }


    return (
        <>
            <H1 className='my-8 text-white' > Your Account </H1>

            <Contentblock className='h-[500px] flex items-center justify-center flex-col gap-4 ' >
                <p>  Email: <span className="text-lg" > {session.user?.email} </span></p>
                <SignOutBtn />
            </Contentblock>
        </>
    )
}

export default page