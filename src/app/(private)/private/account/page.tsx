import H1 from "@/components/H1"
import { Contentblock } from "@/components/content-block"
import { SignOutBtn } from "@/components/sign-out-btn"
import { checkAuth, getSingleUser } from "@/utils/server_utils"


const page = async () => {

    const { user } = await checkAuth()
    const userAccount = await getSingleUser(user.id)
    console.log(userAccount);


    return (
        <>
            <H1 className='my-8 text-white' > Your Account </H1>

            <Contentblock className='h-[500px] flex items-center justify-center flex-col gap-4 ' >
                <p>  Email: <span className="text-lg" > {userAccount.username} </span></p>
                <SignOutBtn />
            </Contentblock>
        </>
    )
}

export default page