import { deleteUnit } from "@/lib/actions/unit";

export const handleDelete = async (unitNumber: number) => {
  const confirmation = confirm(
    `Are you sure you want to delete unit ${unitNumber}?`
  );
  if (!confirmation) return;

  const { success, message } = await deleteUnit(unitNumber);

  if (success) {
    window.location.reload();
  } else {
    alert(message);
  }
};
