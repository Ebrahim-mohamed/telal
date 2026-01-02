import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for the Image document with GridFS
export interface IImage extends Document {
  filename: string;
  contentType: string;
  size: number;
  uploadDate?: Date;
  metadata?: Record<string, unknown>;
  fileId?: string;
  type: string;
}

const ImageSchema = new Schema<IImage>({
  filename: { type: String, required: false },
  contentType: { type: String, required: true },
  size: { type: Number, required: true },
  uploadDate: { type: Date, default: Date.now },
  metadata: { type: Schema.Types.Mixed },
  fileId: { type: Schema.Types.ObjectId },
  type: { type: String, required: true },
});

// Safely access model registry
let GeneralImageModel: Model<IImage>;
try {
  GeneralImageModel = mongoose.model<IImage>("Image", ImageSchema, "images_data");
} catch {
  GeneralImageModel = mongoose.model<IImage>("Image");
}

export default GeneralImageModel;
