// app/components/AddBankDialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../components/CustomButton";
import { useState } from "react";
import { createPayment } from "@/lib/actions/payment";
import { useForm } from "react-hook-form";
import { paymentSchema, PaymentType } from "@/schema/payment.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AddBankDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageName, setImageName] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PaymentType>({
    resolver: zodResolver(paymentSchema),
  });

  const onSubmit = async (data: PaymentType) => {
    try {
      const formData = new FormData();
      formData.append("bankName", data.bankName);
      formData.append("interestRate", data.bankInterestRate.toString());
      formData.append("bankLogo", data.bankLogo as File);

      await createPayment(formData);

      // Success: close dialog and reset state
      setIsDialogOpen(false);
      setImageName("");
      window.location.reload();
    } catch (error) {
      console.error("Failed to create payment:", error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button name="Add Bank" />
      </DialogTrigger>
      <DialogContent className="!w-[60%] bg-[#FCF9F5] p-[3rem] rounded-[1rem] !max-w-none flex flex-col justify-center items-center [button[data-slot='dialog-close']]:w-20">
        <DialogHeader className="self-start mb-[0.5rem]">
          <DialogTitle className="text-[2rem] font-bold">
            Add a New Bank
          </DialogTitle>
        </DialogHeader>

        <form
          className="w-full flex flex-col items-center gap-[1rem]"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Bank Name */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-[1.5rem] text-black font-semibold">
              Bank Name
            </label>
            <input
              type="text"
              placeholder="Enter Bank Name"
              {...register("bankName")}
              className="placeholder:text-[1rem] placeholder:text-[#CBCBCB] placeholder:font-semibold text-[1rem] text-black p-[1rem] border-[1px] border-black rounded-[0.5rem] w-full"
            />
            {errors.bankName && (
              <span className="text-red-500 text-sm">
                {errors.bankName.message}
              </span>
            )}
          </div>

          {/* Interest Rate */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-[1.5rem] text-black font-semibold">
              Interest Rate
            </label>
            <input
              type="number"
              step="any"
              placeholder="Enter Interest Rate"
              {...register("bankInterestRate", { valueAsNumber: true })}
              className="placeholder:text-[1rem] placeholder:text-[#CBCBCB] placeholder:font-semibold text-[1rem] text-black p-[1rem] border-[1px] border-black rounded-[0.5rem] w-full"
            />
            {errors.bankInterestRate && (
              <span className="text-red-500 text-sm">
                {errors.bankInterestRate.message}
              </span>
            )}
          </div>

          {/* Bank Logo Upload */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-[1.5rem] text-black font-semibold">
              Bank Logo
            </label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="bankLogoInput"
              {...register("bankLogo", {
                required: "Bank logo is required",
                onChange: (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImageName(file.name);
                    setValue("bankLogo", file);
                  }
                },
              })}
            />
            <button
              type="button"
              onClick={() => document.getElementById("bankLogoInput")?.click()}
              className="bg-black text-white font-bold cursor-pointer p-[1rem] border-[1px] border-black rounded-[0.5rem] w-full"
            >
              {imageName || "Add Bank Logo"}
            </button>
            {errors.bankLogo && (
              <span className="text-red-500 text-sm">
                {errors.bankLogo.message as string}
              </span>
            )}
          </div>

          {/* Submit and Cancel */}
          <div className="flex items-center gap-4 w-full">
            <button
              type="submit"
              className="py-[1rem] w-full px-[3rem] bg-black text-white rounded-[1rem] text-[2rem] font-semibold cursor-pointer"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => {
                setIsDialogOpen(false);
                setImageName("");
              }}
              className="py-[1rem] w-full px-[3rem] bg-black text-white rounded-[1rem] text-[2rem] font-semibold cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
