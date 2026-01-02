"use client";

import { useEffect, useState } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  MRT_ColumnDef,
  MRT_PaginationState,
  MRT_SortingState,
} from "mantine-react-table";
import { clsx } from "clsx";
import classes from "./table.module.css";

interface OurTableProps<TData extends Record<string, any>> {
  columnsFn: () => MRT_ColumnDef<TData>[];
  allowableSortableKeysFn: (id: string) => string;
  data: TData[];
}

export default function OurTable<TData extends Record<string, any>>({
  columnsFn,
  data,
}: OurTableProps<TData>) {
  const [columnsCount, setColumnsCount] = useState(0);

  const columns = columnsFn() ?? [];
  const safeData = data ?? [];

  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    setColumnsCount((pagination.pageIndex + 1) * pagination.pageSize + 5);
  }, [pagination.pageSize, pagination.pageIndex]);

  const table = useMantineReactTable({
    columns,
    data: safeData,
    manualPagination: true,
    manualSorting: true,
    rowCount: columnsCount,
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    enableGlobalFilter: false,
    enableGrouping: true,
    enableRowSelection: true,
    enableBottomToolbar: true,
    enableFullScreenToggle: true,
    enableColumnResizing: true,
    enablePagination: true,
    enableColumnPinning: true,
    enableRowNumbers: true,
    defaultColumn: { size: 350 },
    enableClickToCopy: true,
    enableStickyFooter: true,
    mantineTableBodyProps: {
      style: {
        padding: "0px 15px",
      },
    },
    mantineTableHeadProps: {
      style: {
        padding: "0px 15px",
      },
    },
    mantineTableProps: {
      className: clsx(classes.table),
      highlightOnHover: false,
      withColumnBorders: true,
    },
  });

  return (
    <main>
      <div className="max-w-full">
        <MantineReactTable table={table} />
      </div>
    </main>
  );
}
