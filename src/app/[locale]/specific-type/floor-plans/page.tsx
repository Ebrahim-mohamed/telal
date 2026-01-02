"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SpeTypeFloorPlan from "./SpeTypeFloorPlan";

export default function SpecificTypeFloorPlane() {
  const params = useParams();
  const [modelType, setModelType] = useState<string | null>(null);
  const [model, setModel] = useState<string>("");
  const router = useRouter();

  const modelRedirectMap: Record<string, string> = {
    "model-1": "https://model.hwadirealestate.com/model-1/",
    "model-2": "https://model.hwadirealestate.com/model-2/",
    "model-3": "https://model.hwadirealestate.com/model-3/",
    "model-4": "https://model.hwadirealestate.com/model-4/",
  };

  useEffect(() => {
    const storedType = JSON.parse(localStorage.getItem("model-type") || "null");
    setModelType(storedType);
    setModel(storedType); // Assuming model is the same
  }, []);

  const tour = () => {
    if (!modelType) return;
    const url = modelRedirectMap[modelType];
    if (url) {
      localStorage.setItem("tour-url", JSON.stringify(url));
      router.push(`/${params.locale}/specific-type/show3d`);
    } else {
      console.warn("Unknown model type:", modelType);
    }
  };

  if (!model) return null; // Optional loading state

  return (
    <div className="h-[80%] max-[700px]:h-[78%] flex items-center">
      <div className="flex items-center w-full justify-center h-[90%] bg-white rounded-[2.5rem] relative">
        <SpeTypeFloorPlan content={model} />
        <button
          className="absolute top-[5%] right-[3%] bg-[#57402B] text-white p-[4rem] w-[15rem] h-[15rem] z-[100] text-[5rem] rounded-[2.5rem] flex items-center justify-center font-bold cursor-pointer"
          onClick={tour}
        >
          360
        </button>
      </div>
    </div>
  );
}
