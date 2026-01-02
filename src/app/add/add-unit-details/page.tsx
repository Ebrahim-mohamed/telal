import { Suspense } from "react";
import AddUnitDetails from "./AddUnitDetails";

export default function AddUnitDetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddUnitDetails />
    </Suspense>
  );
}
