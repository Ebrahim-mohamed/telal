"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { installmentSchema, InstallmentType } from "@/schema/payment.schema";
import { updateInstallment } from "@/lib/actions/installment";

export default function InstallmentDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<InstallmentType>({
    resolver: zodResolver(installmentSchema),
  });

  async function onSubmitBankData(data: InstallmentType) {
    try {
      await updateInstallment(Number(data.installment)); // Call server action
      console.log("Installment updated:", data.installment);
      setIsDialogOpen(false);
      reset();
      window.location.reload();
    } catch (err) {
      console.error("Error updating installment:", err);
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button className="rounded-[0.3rem] cursor-pointer border py-[0.4rem] px-[1.5rem] text-[0.75rem] font-medium flex items-center justify-center text-[#57402B] border-[#57402B]">
          Change
        </button>
      </DialogTrigger>
      <DialogContent className="!w-[60%] bg-[#FCF9F5] p-[3rem] rounded-[1rem] !max-w-none flex flex-col justify-center items-center [button[data-slot='dialog-close']]:w-20">
        <DialogHeader className="self-start mb-[0.5rem]">
          <DialogTitle className="text-[2rem] font-bold">
            Edit Installment
          </DialogTitle>
        </DialogHeader>
        <form
          className="w-full flex flex-col items-center gap-[1rem]"
          onSubmit={handleSubmit(onSubmitBankData)}
        >
          <div className="w-full flex flex-col gap-2">
            <label className="text-[1.5rem] text-black font-semibold">
              Installment
            </label>
            <Controller
              name="installment"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    placeholder="Enter Installment"
                    type="number"
                    className="placeholder:text-[1rem] placeholder:text-[#CBCBCB] placeholder:font-semibold text-[1rem] text-black p-[1rem] border-[1px] border-black rounded-[0.5rem] w-full"
                  />
                  {errors.installment && (
                    <span className="text-red-500 text-sm">
                      {errors.installment.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>
          <div className="flex items-center gap-4 w-full">
            <button
              type="submit"
              className="py-[1rem] w-full px-[3rem] bg-black text-white rounded-[1rem] text-[2rem] font-semibold cursor-pointer"
            >
              Submit
            </button>
            <button
              type="button"
              className="py-[1rem] w-full px-[3rem] bg-black text-white rounded-[1rem] text-[2rem] font-semibold cursor-pointer"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
