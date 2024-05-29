import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css"
import QueryProvider from "@/context/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PetSoft - pet daycare software",
  description: "Take care of people's pets responsibly with petsoft",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-auto text-sm min-h-[100vh]  text-zinc-900 bg-[#E5E8EC] `}>
        <Suspense fallback={<Loading />}>
          <QueryProvider>
            {children}
        </QueryProvider>
        <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
