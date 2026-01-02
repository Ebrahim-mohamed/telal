import type { ColumnTypes } from "../components/table/types";

import type { MRT_ColumnDef } from "mantine-react-table";

import { useMemo } from "react";
import { Button } from "../components/CustomButton";
import { shareType } from "@/types/shares";
import { deleteShare } from "@/lib/actions/shareModule";

const handleDelete = async (phone: string) => {
  const confirmation = confirm(`Delete inquiry with phone "${phone}"?`);
  if (!confirmation) return;

  const { success, message } = await deleteShare(phone);
  alert(message);
  if (success) {
    window.location.reload();
  } else {
    alert(message);
  }
};

export function Columns() {
  return useMemo<MRT_ColumnDef<shareType>[]>(
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
        accessorKey: "email",
        header: "E-mail",
      },
      {
        size: 180,
        accessorKey: "phone",
        header: "Phone",
      },
      {
        size: 180,
        accessorKey: "unitNumber",
        header: "Unit Number",
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
    id: "email",
    type: "string",
  },
  {
    id: "phone",
    type: "string",
  },
  {
    id: "unitNumber",
    type: "integer",
  },
];

export function allowableSortableKeysFn(id: string) {
  const defaultSortableKey = "firstName";
  if (id === "default") return defaultSortableKey;

  const sortableKeys = [
    { unit_number: "lastName" },
    { time: "email" },
    { read: "phone" },
    { read: "unitNumber" },
    { read: "time" },
    { read: "read" },
  ];

  const foundKey = sortableKeys.find((key) => Object.keys(key)[0] === id);
  return foundKey ? Object.values(foundKey)[0] : defaultSortableKey;
}
