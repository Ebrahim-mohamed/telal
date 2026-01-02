"use server";
import { uploadImage } from "@/lib/mongodb/imageUpload";

export async function addImageToDataBase({
  image,
  type,
}: {
  image: File;
  type: string;
}) {
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer); // Convert the ArrayBuffer to Buffer

  if (type === "Main Gallery") {
    await uploadImage({
      filename: image.name,
      contentType: image.type,
      buffer, // Pass the raw Buffer here
      type: "GALLERY",
    });
  } else if (type === "Model 1") {
    await uploadImage({
      filename: image.name,
      contentType: image.type,
      buffer, // Pass the raw Buffer here
      type: "MODEL_1",
    });
  } else if (type === "Model 2") {
    await uploadImage({
      filename: image.name,
      contentType: image.type,
      buffer, // Pass the raw Buffer here
      type: "MODEL_2",
    });
  } else if (type === "Model 3") {
    await uploadImage({
      filename: image.name,
      contentType: image.type,
      buffer, // Pass the raw Buffer here
      type: "MODEL_3",
    });
  } else if (type === "Model 4") {
    await uploadImage({
      filename: image.name,
      contentType: image.type,
      buffer, // Pass the raw Buffer here
      type: "MODEL_4",
    });
  }
}
