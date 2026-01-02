"use client";
import { AllLocationsGoogleMapComponent } from "@/app/components/AllLocationsGoogleMap";

import { SecondaryNavBar } from "@/app/components/SecondaryNavBar";
import { useState } from "react";

export default function Location() {
  const [selected, setSelected] = useState("");
  const locations = [
    "landmarks",
    "hospitals",
    "education",
    "shopping",
    "entertainment",
  ];
  return (
    <>
      <AllLocationsGoogleMapComponent selected={selected} />

      <SecondaryNavBar
        isSelected={selected}
        setSelected={setSelected}
        content={locations}
      />
    </>
  );
}
