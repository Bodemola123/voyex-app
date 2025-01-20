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
import { Checkbox } from "@/components/ui/checkbox";
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
import { keywordUsageData } from "@/constants/workspace-page";
import { useState } from "react";

export const columns = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="border-btnlime"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="border-btnlime"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "seoSets",
    header: "SEO sets",
    cell: ({ row }) => (
      <div className="flex items-center justify-start text-btnlime text-center text-sm font-medium   capitalize">
        <span className="py-2 px-3 rounded-2xl bg-[#84DE7C40]">
          {row.getValue("seoSets")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "topSearch",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-btnlime"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Top searches
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("topSearch")}</div>
    ),
  },
  {
    accessorKey: "averageClick",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-btnlime"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Average Clicks
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("averageClick")}</div>
    ),
  },
  {
    accessorKey: "averageComment",
    header: "Average Comments",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("averageComment")}</div>
    ),
  },
  {
    accessorKey: "totalPost",
    header: "Total posts",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("totalPost")}</div>
    ),
  },
];

function KeywordUsage() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const data = keywordUsageData;

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
    <Card className="text-white rounded-3xl bg-transparent bg-gradient-to-r from-[#00a766]/10 to-gray/10 backdrop-blur-[9.3px] border-none col-span-2">
      <CardHeader>
        <CardTitle className="text-2xl text-btnlime font-medium capitalize">
          Keyword Usage
        </CardTitle>
        <CardDescription className="text-base font-medium text-fontlight">
          SEO sets noticed
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-5">
        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter SEO sets..."
              value={table.getColumn("seoSets")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("seoSets")?.setFilterValue(event.target.value)
              }
              className="max-w-sm bg-transparent outline-none border-card"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="ml-auto bg-btnlime hover:bg-btnlime">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-[#1C1C1C] text-fontlight rounded-2xl border-none p-4"
              >
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
                      className="border-b-0 hover:bg-btnlime/20 data-[state=selected]:bg-btnlime/30"
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
          {/* <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                // variant="outline"
                className="text-fontlight bg-btnlime border-none"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                // variant="outline"
                className="text-fontlight bg-btnlime border-none"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}

export default KeywordUsage;
