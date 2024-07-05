"use client";

import { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ChevronLeft, Filter, Plus } from "lucide-react";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  addComponent?: ReactElement;
  addButton?: boolean;
  placeholder: string;
  title: string;
  searchTerm: string;
}

const DataTable = <TData, TValue>({
  columns,
  data,
  addComponent,
  addButton,
  title,
  placeholder,
  searchTerm,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [showAddComponent, setShowAddComponent] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
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
    <div>
      {!showAddComponent && (
        <div>
          <div className="flex justify-between py-2">
            {/* <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {title}
        </h3> */}
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              {title}
            </h2>
            <div className="flex items-center gap-1">
              <Input
                placeholder={placeholder}
                value={
                  (table.getColumn(searchTerm)?.getFilterValue() as string) ??
                  ""
                }
                type="text"
                onChange={(event) =>
                  table
                    .getColumn(searchTerm)
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-md"
              />

              {addButton && (
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto hidden h-8 lg:flex"
                  onClick={() => setShowAddComponent(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              )}
            </div>
          </div>
          <Card>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
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
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
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
          </Card>
        </div>
      )}

      {showAddComponent && addComponent && (
        <>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setShowAddComponent(false)}
              variant="outline"
              size="icon"
              className="h-7 w-7"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="flex-1 capitalize shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Add product
            </h1>
          </div>

          {addComponent}
        </>
      )}
    </div>
  );
};

export default DataTable;
