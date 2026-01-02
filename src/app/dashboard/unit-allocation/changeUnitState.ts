import { changeUnitStatus } from "@/lib/actions/unit";

export const handleStatusChange = async (
  unitNumber: number,
  currentStatus: string
) => {
  const confirmation = confirm(
    `Change unit status to ${
      currentStatus === "available" ? "sold" : "available"
    }?`
  );
  if (!confirmation) return;

  const { success, message } = await changeUnitStatus(unitNumber);
  alert(message);
  if (success) {
    window.location.reload();
  }
};
