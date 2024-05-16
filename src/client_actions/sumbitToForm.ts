import { addPet } from "@/server_actions/addPetAction";
import { editPet } from "@/server_actions/editPetAction";

export const formSumbitAction = async (
  formData,
  actionType,
  checkFormOpen,
  selectedPet
) => {
  if (actionType === "add") {
    try {
      const res = await addPet(formData);
      res && checkFormOpen(false);
    } catch (error) {
      console.log(error);

      alert(`${error}`);
      checkFormOpen(false);
    }
  }

  if (actionType === "edit") {
    try {
      if (selectedPet) {
        const res = await editPet(selectedPet?.id, formData);
        res && checkFormOpen(false);
      }
    } catch (error) {
      console.log(error);

      alert(`${error}`);
      checkFormOpen(false);
    }
  }
};
