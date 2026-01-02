"use client";
import OurTable from "../components/table/our-table";
import { Columns, allowableSortableKeysFn } from "./columns";
import { bank } from "@/types/bank";
import { useState, useMemo } from "react";

export default function PaymentTable({ banks }: { banks: bank[] }) {
  const [globalFilter, setGlobalFilter] = useState("");

  const filteredData = useMemo(() => {
    if (!globalFilter) return banks;

    return banks.filter(
      (bank) =>
        bank.bankName.toLowerCase().includes(globalFilter.toLowerCase()) ||
        bank.interestRate.toString().includes(globalFilter)
    );
  }, [banks, globalFilter]);

  return (
    <div className="w-full p-0 m-0">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search banks..."
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
