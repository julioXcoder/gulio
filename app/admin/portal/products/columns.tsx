"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { createBlob } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Product, ProductImages } from "@prisma/client";
import Link from "next/link";
import { Pen } from "lucide-react";

export interface ProductData extends Product {
  fileData: string | null;
  fileType: string | null;
}

// FIXME: Add availability
export const columns: ColumnDef<ProductData>[] = [
  {
    id: "image",
    cell: ({ row }) => {
      const product = row.original;
      let file = product.fileData;
      let type = product.fileType;
      let blobUrl = undefined;

      if (file && type) {
        const blob = createBlob(file, type);
        blobUrl = URL.createObjectURL(blob);
      }

      return (
        <div className="h-20 w-20">
          <Image
            alt="Product image"
            className="aspect-square w-full rounded-md object-cover"
            height="64"
            src={blobUrl || ""}
            width="64"
          />
        </div>
      );
    },
  },
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
