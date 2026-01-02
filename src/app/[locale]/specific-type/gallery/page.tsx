"use client";
import GalleryDialog from "@/app/components/GalleryDialog";
import { getImagesFromDataBase } from "@/app/dashboard/gallery/getImages";
import { IImage } from "@/models/generalGallery";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SpecificTypeGallery() {
  const [images, setImages] = useState<IImage[] | null>(null);
  const searchParams = useSearchParams();

  const modelParam = searchParams.get("model");
  const unitNumber = searchParams.get("unit-number");

  // Safely retrieve or fallback from localStorage
  let model: string | null = modelParam;
  if (!model && typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("model-type");
      if (stored) model = JSON.parse(stored);
    } catch (e) {
      console.error("Invalid JSON in model-type:", e);
    }
  }

  // Save values back to localStorage
  useEffect(() => {
    if (model) localStorage.setItem("model-type", JSON.stringify(model));
    if (unitNumber)
      localStorage.setItem("unit-number", JSON.stringify(unitNumber));
  }, [model, unitNumber]);

  const modelLabel = (() => {
    switch (model) {
      case "model-1":
        return "Model 1";
      case "model-2":
        return "Model 2";
      case "model-3":
        return "Model 3";
      case "model-4":
        return "Model 4";
      default:
        return "";
    }
  })();

  // LocalStorage cache key based on model
  const cacheKey = `gallery-${model}`;

  // Handle loading images
  useEffect(() => {
    if (!modelLabel) return;

    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed: IImage[] = JSON.parse(cached);
        if (Array.isArray(parsed)) {
          setImages(parsed);
          return; // No need to fetch again
        }
      } catch (e) {
        console.error("Failed to parse cached gallery data", e);
      }
    }

    // Fetch from DB if not in cache
    getImagesFromDataBase({
      setImage: (images: IImage[]) => {
        setImages(images);
        sessionStorage.setItem(cacheKey, JSON.stringify(images));
      },
      type: modelLabel,
    });
  }, [modelLabel, cacheKey]);

  if (!images) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex gap-[4rem] items-center w-full h-[80%] max-[700px]:h-[78%]  overflow-auto">
      <div className="h-full">
        <div className="my-[5rem] flex flex-wrap w-full justify-start gap-[3rem]">
          {images.map((image) => (
            <GalleryDialog
              key={image.id}
              imageName={image.fileId || ""}
              images={images}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
