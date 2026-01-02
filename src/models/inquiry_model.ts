import { Schema, model, models, Document, Model } from "mongoose";

// Extend Document to include MongoDB metadata fields
export interface IInquiry extends Document {
  firstName: string;
  lastName: string;
  brokerName: string;
  email: string;
  phone: string;
  unit?: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    brokerName: { type: String, required: false },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    unit: { type: String, required: false },
    read: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// ✅ Safe fallback in case `models` is undefined
const Inquiry: Model<IInquiry> =
  (typeof models === "object" && models.Inquiry) ||
  model<IInquiry>("Inquiry", InquirySchema);

export default Inquiry;
