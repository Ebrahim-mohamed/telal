import { z } from "zod";
export const paymentSchema = z.object({
  bankName: z.string().nonempty(),
  bankInterestRate: z.number().min(1),
  bankLogo: z.instanceof(File),
});

export type PaymentType = z.infer<typeof paymentSchema>;

export const installmentSchema = z.object({
  installment: z.string().min(1),
});

export type InstallmentType = z.infer<typeof installmentSchema>;
