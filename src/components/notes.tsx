import { petType } from "@/types/petTypes";

export const Notes = ({ pet }: { pet: petType }) => (
    <section className="flex-1  bg-white px-7 py-5 rounded-md mb-9 mx-8 border-b border-borderBtw " > {pet?.notes}</section>
)