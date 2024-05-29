import { petType } from "@/types/petTypes";

export const DetailsArea = ({ pet }: { pet: petType }) => (

    <div className="flex items-center justify-around px-5 py-10 text-center" >

        <div>
            <h3 className="text-[13px] font-medium  uppercase text-zinc-800" >Owner name </h3>
            <p className="mt-1 text-lg text-zinc-800" > {pet?.ownerName} </p>
        </div>

        <div>
            <h3 className="text-[13px] font-medium  uppercase text-zinc-800" >age </h3>
            <p className="mt-1 text-lg text-zinc-800" > {pet?.age} </p>
        </div>

    </div>
)