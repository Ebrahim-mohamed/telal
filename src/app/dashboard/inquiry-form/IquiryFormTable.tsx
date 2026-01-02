"use client";
import OurTable from "../components/table/our-table";

import { Columns, allowableSortableKeysFn } from "./columns";
import { inquiryFormType } from "@/types/inquiryForm";

export default function IquiryFormTable({ data }: { data: inquiryFormType[] }) {
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
