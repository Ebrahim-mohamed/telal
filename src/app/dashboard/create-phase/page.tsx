"use client";
import { useRouter } from "next/navigation";
import { Button } from "../components/CustomButton";
import { SectionHeader } from "../components/SectionHeader";
import PhaseTable from "./PhaseTable";

export default function CreatePhase() {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between mb-10">
        <SectionHeader headerName="Create Phase" />
        <div className="flex items-center gap-[2rem]">
          <Button
            name="Add Phase"
            onClick={() => router.push("/add/add-phase")}
          />
        </div>
      </div>
      <PhaseTable />
    </>
  );
}
