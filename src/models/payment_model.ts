// models/payment_model.ts
import mongoose, { Schema, Document, Model } from "mongoose";

// Interface that extends Document
export interface IPayment extends Document {
  bankName: string;
  bankLogo: Buffer;
  interestRate: number;
  createdAt: Date;
  updatedAt: Date;
}

// Define schema
const PaymentSchema = new Schema<IPayment>(
  {
    bankName: { type: String, required: true },
    bankLogo: { type: Buffer, required: true },
    interestRate: { type: Number, required: true },
  },
  { timestamps: true }
);

// ✅ Safely access model registry, fallback to defining model
let PaymentModel: Model<IPayment>;

try {
  PaymentModel = mongoose.model<IPayment>("PaymentPlan");
} catch {
  PaymentModel = mongoose.model<IPayment>("PaymentPlan", PaymentSchema);
}

export default PaymentModel;
