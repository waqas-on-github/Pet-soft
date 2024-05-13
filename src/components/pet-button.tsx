import { Button } from "./ui/button"
import { AddDialog } from "./addDialog"

const PetButton = ({ children, actionType, onClk }: petButtonProps) => {
    if (actionType == 'add') {
        return (
            <AddDialog action="add" />
        )
    }

    if (actionType == "edit") {
        return (
            <AddDialog action="edit" />
        )
    }

    if (actionType == "checkout") {
        return (<Button onClick={onClk} className=" bg-zinc-200 hover:bg-zinc-300" variant='secondary' > {children} </Button>)
    }

}

export default PetButton