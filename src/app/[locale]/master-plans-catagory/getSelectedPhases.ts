import { getPhases } from "@/lib/actions/phase";
import { PhaseTypeAllData } from "@/types/phase";

export async function getSelectedPhases({
  setPhase,
  selectedPhase,
}: {
  setPhase: (phases: PhaseTypeAllData | undefined) => void;
  selectedPhase: string;
}) {
  const data = await getPhases();

  const rawPhase = data.find((phase) => phase.phaseName === selectedPhase);

  if (rawPhase) {
    setPhase(rawPhase);
  } else {
    console.warn(`Phase "${selectedPhase}" not found.`);
    setPhase(undefined);
    // Optionally: handle the missing phase case here
  }
}
