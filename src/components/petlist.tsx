import Image from "next/image"

export const Petlist = async () => {

    const responce = await fetch("https://bytegrad.com/course-assets/projects/petsoft/api/pets")
    if (!responce.ok) {
        throw new Error("failed to fetch pets")
    }
    const pets: petType[] = await responce.json()
    // console.log(pets);


    return (
        <ul className=" bg-white border-b border-black/[0.08]" >
            {pets.map((pet: petType) => (
                <li key={pet.id}>
                    <button className="flex items-center h-[70px] w-full cursor-pointer px-5  text-base gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition" >
                        <Image src={pet.imageUrl}
                            alt="placeholder"
                            width={50}
                            height={50}
                            className="rounded-full object-cover"
                        />
                        <p className="font-semibold" >{pet.name}</p>
                    </button>
                </li>
            ))}
        </ul>
    )
}


