import H1 from "@/components/H1"
import { Contentblock } from "@/components/content-block"

const page = () => {
    return (
        <>
            <H1 className='my-8 text-white' > Your Account </H1>

            <Contentblock className='h-[500px]' >

                <p>login as ....</p>
            </Contentblock>
        </>
    )
}

export default page