export const dynamic = "force-dynamic";
import { getShares } from "@/lib/actions/shareModule";
import { SectionHeader } from "../components/SectionHeader";
import ShareModuleTable from "./ShareModuleTable";

export default async function ShareModule() {
  const shares = await getShares();
  return (
    <>
      <div className="mb-10">
        <SectionHeader headerName="Share Module" />
      </div>
      <ShareModuleTable data={shares} />
    </>
  );
}
