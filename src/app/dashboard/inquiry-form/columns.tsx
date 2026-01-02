import type { ColumnTypes } from "../components/table/types";

import type { MRT_ColumnDef } from "mantine-react-table";

import { useMemo } from "react";
import { Button } from "../components/CustomButton";
import { inquiryFormType } from "@/types/inquiryForm";
import { deleteInquiryForm } from "@/lib/actions/inquiryForms";

const handleDelete = async (phone: string) => {
  const confirmation = confirm(`Delete inquiry with phone "${phone}"?`);
  if (!confirmation) return;

  const { success, message } = await deleteInquiryForm(phone);
  alert(message);
  if (success) {
    window.location.reload();
  } else {
    alert(message);
  }
};

export function Columns() {
  return useMemo<MRT_ColumnDef<inquiryFormType>[]>(
    () => [
      {
        size: 180,
        accessorKey: "firstName",
        header: "First Name",
      },
      {
        size: 180,
        accessorKey: "lastName",
        header: "Last Name",
      },
      {
        size: 180,
        accessorKey: "phone",
        header: "Phone Number",
      },
      {
        size: 180,
        accessorKey: "email",
        header: "Email",
      },
      {
        size: 180,
        accessorKey: "unit",
        header: "Unit Number",
      },
      {
        size: 180,
        accessorKey: "brokerName",
        header: "Broker Name",
      },
      {
        size: 180,
        accessorKey: "delete",
        header: "delete",
        enableClickToCopy: false,
        Cell: ({ cell }) => {
          return (
            <Button
              className="bg-red-800"
              name="Delete"
              onClick={() => handleDelete(cell.row.original.phone)}
            />
          );
        },
      },
    ],
    []
  );
}

export const columnTypes: ColumnTypes[] = [
  {
    id: "firstName",
    type: "string",
  },
  {
    id: "lastName",
    type: "string",
  },
  {
    id: "brokerName",
    type: "string",
  },
  {
    id: "phone",
    type: "integer",
  },
  {
    id: "email",
    type: "string",
  },
  {
    id: "unit",
    type: "integer",
  },
  {
    id: "read",
    type: "string",
  },
];

export function allowableSortableKeysFn(id: string) {
  const defaultSortableKey = "firstName";
  if (id === "default") return defaultSortableKey;

  const sortableKeys = [
    { name: "lastName" },
    { phone_number: "phone" },
    { email: "email" },
    { unit_number: "unit" },
    { broker_name: "brokerName" },
    { time: "time" },
    { read: "read" },
  ];

  const foundKey = sortableKeys.find((key) => Object.keys(key)[0] === id);
  return foundKey ? Object.values(foundKey)[0] : defaultSortableKey;
}
