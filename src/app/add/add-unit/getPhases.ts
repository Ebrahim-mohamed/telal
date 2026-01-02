import { getPhases } from "@/lib/actions/phase";
import { PointType } from "@/types/phase";

export async function getExistPhases({
  setShapes,
  selectedPhase,
}: {
  setShapes: (shapes: PointType[][]) => void;
  selectedPhase: string;
}) {
  const data = await getPhases();
  const phase = data.find((phase) => phase.phaseName === selectedPhase);

  if (phase?.shapes) {
    setShapes(phase.shapes);
  } else {
    setShapes([]);
  }
}
