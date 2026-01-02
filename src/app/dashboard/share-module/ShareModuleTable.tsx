"use client";
import OurTable from "../components/table/our-table";

import { Columns, allowableSortableKeysFn } from "./columns";
import { shareType } from "@/types/shares";

export default function ShareModuleTable({ data }: { data: shareType[] }) {
  return (
    <div className="w-full p-0 m-0">
      <OurTable
        columnsFn={Columns}
        allowableSortableKeysFn={allowableSortableKeysFn}
        data={data}
      ></OurTable>
    </div>
  );
}
