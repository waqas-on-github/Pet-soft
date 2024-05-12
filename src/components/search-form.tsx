"use client"
import { usePetSearchContext } from "@/lib/hooks"


const Searchform = () => {
    const { searchQuery, handleSrachState } = usePetSearchContext()

    return (
        <form className="w-full h-full" >
            <input

                type="text"
                className="w-full h-full bg-white/20 outline-none text-lg  px-5"
                placeholder="search your pet ..."
                value={searchQuery}
                onChange={(e) => handleSrachState(e.target.value)}

            />  
        </form>
    )
}

export default Searchform