"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Product, ProductImages } from "@prisma/client";
import Link from "next/link";
import { Pen } from "lucide-react";

interface ProductData extends Product {
  images: ProductImages[];
}

// FIXME: Add availability
export const columns: ColumnDef<Product, ProductImages>[] = [
  {
    accessorKey: "name",
    header: "product name",
  },
  {
    accessorKey: "status",
    header: "status",
  },
  {
    accessorKey: "inStock",
    header: "in stock",
  },
  {
    accessorKey: "price",
    header: "product price",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // const module = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            {/* <DropdownMenuItem>Delete</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
