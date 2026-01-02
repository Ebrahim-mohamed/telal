import { Schema, models, model } from "mongoose";

export interface IUnit {
  shapes: { x: number; y: number }[][];
  unitNumber: number;
  unitType: string;
  unitBlock: string;
  unitArea: number;
  unitStatus: "sold" | "available";
  unitPhase: string;
  marketPrice: number;
  MOHPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const UnitSchema = new Schema<IUnit>(
  {
    shapes: { type: [[{ x: Number, y: Number }]], required: false },
    unitNumber: { type: Number, required: true, unique: true },
    unitType: { type: String, required: true },
    unitBlock: { type: String, required: true },
    unitArea: { type: Number, required: true },
    unitStatus: {
      type: String,
      enum: ["sold", "available"],
      default: "available",
    },
    unitPhase: { type: String, required: true },
    marketPrice: { type: Number, required: true },
    MOHPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// ✅ Correct check for existing model
const Unit = models.Unit || model<IUnit>("Unit", UnitSchema);

export default Unit;
