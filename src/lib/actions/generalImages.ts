// src/lib/actions/imageActions.ts
"use server";

import connectMongoDB from "@/lib/mongodb/connection";
import GeneralImageModel, { IImage } from "@/models/generalGallery";

// Add a new image
export async function addImage(imageData: {
  image: Buffer;
  contentType: string;
}): Promise<IImage> {
  await connectMongoDB();

  const newImage = new GeneralImageModel({
    image: imageData.image,
    contentType: imageData.contentType,
  });

  await newImage.save();
  return newImage.toObject();
}

// Get all images
export async function getAllImages(): Promise<IImage[]> {
  await connectMongoDB();

  const images = await GeneralImageModel.find().lean();
  return images;
}

// Optional: Get a single image by ID
export async function getImageById(id: string): Promise<IImage | null> {
  await connectMongoDB();

  const image = await GeneralImageModel.findById(id).lean();
  return image;
}

// Optional: Delete an image by ID
export async function deleteImage(id: string): Promise<void> {
  await connectMongoDB();

  await GeneralImageModel.findByIdAndDelete(id);
}
