// models/PaymentPlan.ts
import mongoose, { Schema } from "mongoose";

export interface IInstallment {
  installment: number;
  createdAt: Date;
  updatedAt: Date;
}

const InstallmentSchema = new Schema<IInstallment>(
  {
    installment: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Installment ||
  mongoose.model<IInstallment>("Installment", InstallmentSchema);
