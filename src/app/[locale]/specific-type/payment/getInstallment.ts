import { getInstallment } from "@/lib/actions/installment";

export async function getInstallmentFromDataBase(
  setInstallmentYears: (installment: number | null) => void
) {
  const installment = await getInstallment().then((data) =>
    setInstallmentYears(data.installment)
  );
  return installment;
}
