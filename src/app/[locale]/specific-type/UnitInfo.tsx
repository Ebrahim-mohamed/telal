"use client";
import { useEffect, useState } from "react";

export function UnitInfo() {
  const [model, setModel] = useState<string | null>(null);
  const [unitNumber, setUnitNumber] = useState<string | null>(null);

  useEffect(() => {
    const storedModel = localStorage.getItem("model-type");
    const storedUnit = localStorage.getItem("unit-number");
    if (storedModel) setModel(JSON.parse(storedModel));
    if (storedUnit) setUnitNumber(JSON.parse(storedUnit));
  }, []);

  if (!model || !unitNumber) return null; // or show a loading placeholder

  return (
    <div className="absolute -top-[2rem] left-1/2 transform -translate-x-1/2 ">
      <p className="dark:text-white text-black text-[4.5rem] max-[1100px]:text-[6rem] font-medium">
        Unit {unitNumber} -
        {model == "model-1"
          ? "Model 1"
          : model == "model-2"
          ? "Model 2"
          : model == "model-3"
          ? "Model 3"
          : model == "model-4"
          ? "Model 4"
          : ""}
      </p>
    </div>
  );
}
