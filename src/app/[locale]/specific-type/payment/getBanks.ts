import { getPayments } from "@/lib/actions/payment";
import { bank } from "@/types/bank";

export async function getBanksFromDataBase(
  setBanks: (banks: bank[]) => void
): Promise<bank[] | null> {
  try {
    const banks = await getPayments();
    setBanks(banks);
    return banks;
  } catch (error) {
    console.error("Failed to fetch banks:", error);
    setBanks([]);
    return null;
  }
}
