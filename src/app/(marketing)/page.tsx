import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="  min-h-screen bg-[#5DC9A8] flex flex-col lg:flex-row items-center justify-center md:gap-10 gap-6  p-4 md:py-6  " >
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        width={500}
        height={500}
        alt="home image preview"
        className=" w-[100%] sm:w-[400px] md:w-[500px] object-cover p-2 "

      />
      <div className="flex items-start justify-center flex-col gap-4 text-4xl md:text-5xl md:gap-8 font-semibold my-5 w-[100%] sm:w-[400px] md:w-[500px] ">
        <Logo />
        <h1 className="font-semibold text-black/90" >Manage your <span className="font-extrabold text-black  " >pet daycare</span> with ease</h1>
        <p className="text-2xl font-medium max-w-[600px]" >use petsoft to easily keep track of pets under your care. Get lifetime access for $299</p>

        <div className="space-x-3 mt-10">
          <Button> <Link href='/signup'> Get started</Link></Button>
          <Button variant='secondary' > <Link href='/login' >Log in </Link> </Button>
        </div>

      </div>
    </section>
  );
}
