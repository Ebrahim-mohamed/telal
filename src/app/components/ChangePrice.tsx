"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeUnitPrices } from "@/lib/actions/unit";
import { Button } from "../dashboard/components/CustomButton";

const priceSchema = z.object({
  marketPrice: z.number().min(0, "Market price is required"),
  MOHPrice: z.number().min(0, "MOH price is required"),
});

type PriceFormType = z.infer<typeof priceSchema>;

export default function ChangePrices({ unitNumber }: { unitNumber: number }) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PriceFormType>({
    resolver: zodResolver(priceSchema),
  });

  async function onSubmitPrices(data: PriceFormType) {
    try {
      await changeUnitPrices(unitNumber, data.marketPrice, data.MOHPrice);
      setOpen(false);
      window.location.reload();
    } catch (err) {
      console.error("Price update failed:", err);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button name="Modify Prices" className="bg-green-600">
          Modify Price
        </Button>
      </DialogTrigger>

      <DialogContent className="!w-[60%] bg-[#FCF9F5] p-[3rem] rounded-[1rem] !max-w-none flex flex-col justify-center items-center [button[data-slot='dialog-close']]:w-20">
        <DialogHeader className="self-start mb-[0.5rem]">
          <DialogTitle className="text-[2rem] font-bold">
            Edit Prices
          </DialogTitle>
        </DialogHeader>

        <form
          className="w-full flex flex-col items-center gap-[1rem]"
          onSubmit={handleSubmit(onSubmitPrices)}
        >
          <div className="w-full flex flex-col gap-2">
            <label className="text-[1.5rem] text-black font-semibold">
              Market Price
            </label>
            <input
              {...register("marketPrice", { valueAsNumber: true })}
              type="number"
              placeholder="Enter Market Price"
              className="placeholder:text-[1rem] placeholder:text-[#CBCBCB] placeholder:font-semibold text-[1rem] text-black p-[1rem] border-[1px] border-black rounded-[0.5rem] w-full"
            />
            {errors.marketPrice && (
              <span className="text-red-500 text-sm">
                {errors.marketPrice.message}
              </span>
            )}
          </div>

          <div className="w-full flex flex-col gap-2">
            <label className="text-[1.5rem] text-black font-semibold">
              MOH Price
            </label>
            <input
              {...register("MOHPrice", { valueAsNumber: true })}
              type="number"
              placeholder="Enter MOH Price"
              className="placeholder:text-[1rem] placeholder:text-[#CBCBCB] placeholder:font-semibold text-[1rem] text-black p-[1rem] border-[1px] border-black rounded-[0.5rem] w-full"
            />
            {errors.MOHPrice && (
              <span className="text-red-500 text-sm">
                {errors.MOHPrice.message}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 w-full mt-4">
            <button
              type="submit"
              className="py-[1rem] w-full px-[3rem] bg-black text-white rounded-[1rem] text-[2rem] font-semibold cursor-pointer"
            >
              Submit
            </button>
            <DialogClose asChild>
              <button
                type="button"
                className="py-[1rem] w-full px-[3rem] bg-black text-white rounded-[1rem] text-[2rem] font-semibold cursor-pointer"
              >
                Cancel
              </button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
