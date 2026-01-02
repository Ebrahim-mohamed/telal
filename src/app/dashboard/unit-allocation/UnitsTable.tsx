"use client";
import OurTable from "../components/table/our-table";
import { Columns, allowableSortableKeysFn } from "./columns";
import { useEffect, useState, useMemo } from "react";
import { unitTypeAllData } from "@/schema/unitAllocation.schema";
import { getUnits } from "@/lib/actions/unit";

export default function UnitsTable() {
  const [units, setUnits] = useState<unitTypeAllData[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  useEffect(() => {
    console.log(units);
  }, [units]);
  useEffect(() => {
    async function allUnitsFun() {
      const data = await getUnits();
      setUnits(data);
    }
    allUnitsFun();
  }, []);

  const filteredData = useMemo(() => {
    if (!globalFilter) return units;

    return units.filter((unit) =>
      Object.values(unit).some((value) =>
        value?.toString().toLowerCase().includes(globalFilter.toLowerCase())
      )
    );
  }, [units, globalFilter]);

  return (
    <div className="w-full p-0 m-0">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search units..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="p-2 border rounded border-blue-800 w-[20rem]"
        />
      </div>
      <OurTable
        columnsFn={Columns}
        allowableSortableKeysFn={allowableSortableKeysFn}
        data={filteredData}
      />
    </div>
  );
}
