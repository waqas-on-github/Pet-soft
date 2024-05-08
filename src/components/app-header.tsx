'use client'

import Link from "next/link"
import Logo from "./logo"
import { usePathname } from "next/navigation"

export const AppHeader = () => {
    const activePathname = usePathname()
    const routes = [
        {
            label: "Dashboard",
            path: "/private/dashboard"
        },
        {
            label: "Account",
            path: "/private/account"
        }
    ]

    return (
        <header className="flex justify-between py-2 items-center  px-4 lg:px-0 border-b border-white/10">
            <Logo />
            <nav>
                <ul className={`flex text-xs gap-2`}>
                    {routes.map((route) => (
                        <li key={route.path} >
                            <Link
                                href={route.path}
                                className={`text-white/70 rounded-sm px-2 py-1 hover:text-white focus:text-white transition
                                ${activePathname === route.path && "bg-black/10"}
                                `}

                            >
                                {route.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}
