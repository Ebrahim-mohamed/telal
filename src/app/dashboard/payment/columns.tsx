import { bank } from "@/types/bank";
import type { ColumnTypes } from "../components/table/types";

import type { MRT_ColumnDef } from "mantine-react-table";

import { useMemo } from "react";
import { Button } from "../components/CustomButton";
import { deletePayment } from "@/lib/actions/payment";

const handleDelete = async (bankName: string) => {
  const { success, message } = await deletePayment(bankName);
  if (success) {
    window.location.reload();
  } else {
    alert(message);
  }
};
export function Columns() {
  return useMemo<MRT_ColumnDef<bank>[]>(
    () => [
      {
        size: 180,
        accessorKey: "bankLogo",
        header: "Bank Logo",
        enableClickToCopy: false,
        Cell: ({ cell }) => {
          // Render custom component for bankLogo column
          return (
            <img
              src={`data:image/png;base64,${cell.row.original.bankLogo}`}
              className="w-[3rem] self-center h-[3rem] rounded-full"
            />
          );
        },
      },
      {
        size: 180,
        accessorKey: "bankName",
        header: "Bank Name",
        enableClickToCopy: false,
      },
      {
        size: 180,
        accessorKey: "interestRate",
        header: "Interest Rate",
        enableClickToCopy: false,
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
              onClick={() => handleDelete(cell.row.original.bankName)}
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
    id: "bank_logo",
    type: "string",
  },
  {
    id: "bank_name",
    type: "string",
  },
  {
    id: "interest_rate",
    type: "integer",
  },
];

export function allowableSortableKeysFn(id: string) {
  const defaultSortableKey = "bank_logo";
  if (id === "default") return defaultSortableKey;

  const sortableKeys = [
    { bank_logo: "bank_logo" },
    { bank_name: "bank_name" },
    { interest_rate: "interest_rate" },
  ];

  const foundKey = sortableKeys.find((key) => Object.keys(key)[0] === id);
  return foundKey ? Object.values(foundKey)[0] : defaultSortableKey;
}
