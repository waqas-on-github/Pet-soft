import { Button } from "./ui/button"
import { AddDialog } from "./addDialog"

const PetButton = ({ disabled, children, actionType, onClk }: petButtonProps) => {

    if (actionType == 'add') {
        return (
            <AddDialog actionType="add" />
        )
    }

    if (actionType == "edit") {
        return (
            <AddDialog actionType="edit" />
        )
    }

    if (actionType == "checkout") {
        return (<Button onClick={onClk} disabled={disabled} className=" disabled:cursor-wait bg-zinc-200 hover:bg-zinc-300 " variant='secondary' > {children} </Button>)
    }

}

export default PetButton