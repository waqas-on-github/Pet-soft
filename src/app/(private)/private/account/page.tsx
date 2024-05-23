import H1 from "@/components/H1"
import { Contentblock } from "@/components/content-block"
import { SignOutBtn } from "@/components/sign-out-btn"
import { CheckAuth } from "@/server_actions/helpers_for_server"


const page = async () => {

    const session = await CheckAuth()



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