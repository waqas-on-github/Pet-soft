import Branding from "@/components/branding"
import { Contentblock } from "@/components/content-block"
import { Petdetails } from "@/components/pet-details"
import { Petlist } from "@/components/petlist"
import Searchform from "@/components/search-form"
import Stats from "@/components/stats"

const page = () => {
    return (
        <main>

            <div className="flex items-center justify-between text-white py-8">
                <Branding />
                <Stats />
            </div>

            <div className="grid md:grid-cols-3 md:grid-rows-[45px_1fr] grid-rows-[45px_300px_500px] gap-4 md:h-[600px]"  >
                <div className=" md:row-start-1  md:row-span-1  md:col-start-1  md:col-span-1" >
                    <Searchform />
                </div>
                <div className=" md:row-start-2  md:row-span-full   md:col-start-1  md:col-span-1" >
                    <Contentblock>
                        <Petlist />
                    </Contentblock>
                </div>
                <div className=" md:row-span-full  md:row-start-1  md:col-start-2  md:col-span-full">
                    <Contentblock>
                        <Petdetails />
                    </Contentblock>
                </div>

            </div>


        </main>
    )
}

export default page