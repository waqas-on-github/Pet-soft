import { PlusIcon } from "lucide-react"
import { Button } from "./ui/button"

const PetButton = ({ children, actionType }: petButtonProps) => {
    if (actionType == 'add') {
        return (<Button size='icon' className="h-14 w-14" > <PlusIcon /> </Button>)
    }

    if (actionType == "edit") {
        return (<Button className=" bg-zinc-200 hover:bg-zinc-300" variant='secondary' >  {children} </Button>)
    }

    if (actionType == "checkout") {
        return (<Button className=" bg-zinc-200 hover:bg-zinc-300" variant='secondary' > {children} </Button>)
    }

}

export default PetButton