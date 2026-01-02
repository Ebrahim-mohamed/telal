// models/Share.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IShare extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  unitNumber: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ShareSchema = new Schema<IShare>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    unitNumber: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Share ||
  mongoose.model<IShare>("Share", ShareSchema);
