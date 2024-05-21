import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css"
import NextAuthProvider from "@/context/nextAuthProvider";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/fetchers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PetSoft - pet daycare software",
  description: "Take care of people's pets responsibly with petsoft",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  const session = await auth()

  if (!session) {
    redirect("/login")
  }



  // geting pets from db 
  const user = await getUser(session?.user?.email)

  return (
    <html lang="en">
      <body className={`${inter.className} text-sm min-h-[100vh]  text-zinc-900 bg-[#E5E8EC] `}>
        <NextAuthProvider  >
        {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
