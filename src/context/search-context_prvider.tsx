'use client'
import { createContext, useState } from "react"



export const searchContext = createContext<Omit<searchConextType, "children"> | null>(null)


const SearchContextProvider = ({ children }: Pick<searchConextType, "children">) => {

    const [searchQuery, setsearchQuery] = useState("")

    // actions on state 
    const handleSrachState = (text: string) => {

        setsearchQuery(text)

    }

    return <searchContext.Provider value={{
        searchQuery,
        handleSrachState
    }} >
        {children}
    </searchContext.Provider>

}


export default SearchContextProvider