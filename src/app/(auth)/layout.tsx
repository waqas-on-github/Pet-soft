import AuthFooter from "@/components/aut-footer";
import Logo from "@/components/logo"

const Layout = ({ children }: childernType) => {
    console.log(children);

    return (
        <div className="flex flex-col gap-y-3 justify-center items-center min-h-screen">
            <Logo />
            <AuthFooter>
                {children}
            </AuthFooter>

        </div>
    )
}

export default Layout