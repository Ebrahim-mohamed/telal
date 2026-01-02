import { getUnitByNumber } from "@/lib/actions/unit";
import { unitTypeAllData } from "@/schema/unitAllocation.schema";

export async function getUnitByUnitNumber({
  unitNumber,
  setUnit,
}: {
  unitNumber: number;
  setUnit: (unit: unitTypeAllData | null) => void;
}) {
  const unit = await getUnitByNumber(unitNumber).then((data) => setUnit(data));
  return unit;
}
