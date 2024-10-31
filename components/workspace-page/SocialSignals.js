"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { socialSignalData } from "@/constants/workspace-page";

export const columns = [
  {
    accessorKey: "rank",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-btnlime"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rank
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("rank")}</div>,
  },
  {
    accessorKey: "socialMedia",
    header: "Social Media",
    cell: ({ row }) => (
      <div className="flex items-center justify-start text-btnlime text-center text-sm font-medium capitalize">
        <span className="py-2 px-3 rounded-2xl bg-[#84DE7C40]">
          {row.getValue("socialMedia")}
        </span>
      </div>
    ),
  },

  {
    accessorKey: "usage",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-btnlime"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Usage(%)
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("usage")}</div>,
  },
];

function SocialSignals() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const data = socialSignalData;

  const table = useReactTable({
    //note: {data} is a constant variable name. it shouldn't be changed when getting external api. instead make api name also {data}
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <Card className="text-white rounded-3xl bg-transparent bg-gradient-to-r from-[#00a766]/10 to-[#999999]/10 backdrop-blur-[9.3px] border-none">
      <CardHeader>
        <CardTitle className="text-2xl text-btnlime font-medium capitalize">
          Social Signals
        </CardTitle>
        <CardDescription className="text-base font-medium text-fontlight">
          Social media mostly Engaged from
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-5">
        <div className="w-full">
          <div className="rounded-md border-none">
            <Table>
              <TableHeader className="[&_tr]:border-b-0">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="border-b-0 hover:bg-btnlime/20 data-[state=selected]:bg-btnlime/30"
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className=" text-fontlight">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody className="[&_tr:last-child]:border-0">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="border-b border-b-btnlime/10 hover:bg-btnlime/20 data-[state=selected]:bg-btnlime/30"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SocialSignals;
