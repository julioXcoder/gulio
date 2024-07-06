"use client";

import React from "react";
import { ProductData } from "@/app/admin/portal/products/columns";
import { createBlob } from "@/lib/utils";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  items: ProductData[];
}

const CartContainer = ({ items }: Props) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>product details</TableHead>
            <TableHead>quantity</TableHead>
            <TableHead className="w-[100px]">price</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, i) => {
            let file = item.fileData;
            let type = item.fileType;
            let blobUrl = undefined;

            if (file && type) {
              const blob = createBlob(file, type);
              blobUrl = URL.createObjectURL(blob);
            }

            return (
              <TableRow key={i}>
                <TableCell className="flex gap-3">
                  <div className="w-20">
                    <Image
                      alt="Product image"
                      className="aspect-square w-full rounded-md object-cover"
                      height="64"
                      src={blobUrl || ""}
                      width="64"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-between">
                    <h1>{item.name}</h1>
                    <button>remove</button>
                  </div>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CartContainer;
