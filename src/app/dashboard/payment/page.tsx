export const dynamic = "force-dynamic";

import { getPayments } from "@/lib/actions/payment";
import { SectionHeader } from "../components/SectionHeader";
import AddBankDialog from "./AddBankDialog";
import PaymentTable from "./PaymentTable";
import InstallmentDialog from "./installmentDialog";
import { getInstallment } from "@/lib/actions/installment";

export default async function Payment() {
  const banks = await getPayments();
  const installment = await getInstallment();
  return (
    <>
      <div className="flex items-center justify-between mb-10">
        <SectionHeader headerName="Payment" />
        <div className="flex items-center gap-[2rem]">
          <div className="flex items-center gap-1">
            <p className="text-[0.75rem] font-semibold ">
              Years of installment:{installment.installment}
            </p>
            <InstallmentDialog />
          </div>
          <AddBankDialog />
        </div>
      </div>
      <PaymentTable banks={banks} />
    </>
  );
}
