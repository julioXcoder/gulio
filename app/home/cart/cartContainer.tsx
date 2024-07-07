"use client";

import React, { useState, useEffect } from "react";
import { ProductData } from "@/app/admin/portal/products/columns";
import { createBlob, showErrorToast } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Quantity from "./quantity";
import { LOCATIONS } from "@/constants";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { CartItem } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Product } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Smartphone, HandCoins, Trash2 } from "lucide-react";
import { addOrder, deleteCartItem } from "../categories/actions";

const paymentMethods = [
  { title: "pay with card", value: "card", Icon: CreditCard },
  { title: "pay with m-pesa", value: "phone", Icon: Smartphone },
  { title: "pay with cash", value: "cash", Icon: HandCoins },
];

interface Props {
  items: CartItemType[];
  location: string;
}

export interface CartItemType extends CartItem {
  product: ProductData;
}

const CartContainer = ({ items, location }: Props) => {
  const [productItems, setProductItems] = useState<CartItemType[]>([]);
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setProductItems(items);
  }, [items]);

  const userLocation = LOCATIONS.find((item) => item.name === location);

  const locationPrice = userLocation?.transportFee || 2000;

  const totalCartPrice = productItems.reduce((total, item) => {
    return total + item.product.price * item.quantity + locationPrice;
  }, 0);

  const handleQuantityChange = (index: number, quantity: number) => {
    // if()

    setProductItems((prevItems) =>
      prevItems.map((item, i) => (i === index ? { ...item, quantity } : item))
    );
  };

  const isEmpty = productItems.length == 0;

  const handleRemove = async (id: number) => {
    setProductItems((prevItems) => prevItems.filter((item) => item.id !== id));
    await deleteCartItem(id);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const productItemsWithoutProduct = productItems.map(
      ({ product, ...rest }) => rest
    );

    try {
      await addOrder(productItemsWithoutProduct, totalCartPrice);
      router.push("/home/track-order");
    } catch (error) {
      showErrorToast();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-10 gap-2">
      <div className="col-span-7 px-3">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Shopping cart
        </h2>
        <Table className="max-w-4xl">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Product Details</TableHead>
              <TableHead className="w-[150px]">Quantity</TableHead>
              <TableHead className="w-[100px]">Price</TableHead>
              <TableHead className="text-right w-[100px]">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productItems.map((item, i) => {
              const product = item.product;
              let file = product.fileData;
              let type = product.fileType;
              let blobUrl = undefined;

              if (file && type) {
                const blob = createBlob(file, type);
                blobUrl = URL.createObjectURL(blob);
              }

              const totalPrice = product.price * item.quantity;

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
                      <h1>{product.name}</h1>
                      <Button
                        onClick={() => handleRemove(item.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="mr-2 size-4 shrink-0" /> remove
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Quantity
                      quantity={item.quantity}
                      onQuantityChange={(quantity) =>
                        handleQuantityChange(i, quantity)
                      }
                    />
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell className="text-right">{totalPrice}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="col-span-3 px-3">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Order summary
        </h2>
        <div className="flex flex-col my-4 gap-5">
          <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Shipping details
            </h4>
            <Card>
              <CardHeader>
                <CardTitle>Address Book</CardTitle>
                <CardDescription className="w-full flex items-center justify-between">
                  <span>Tanzania, {location}</span>
                </CardDescription>
              </CardHeader>
              <CardHeader>
                <CardTitle>Shipping cost</CardTitle>
                <CardDescription className="w-full flex items-center justify-between">
                  <span>{locationPrice}</span>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          {/* <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Contact info
            </h4>
            <Card>
              <CardHeader>
                <CardTitle>Email</CardTitle>
                <CardDescription className="w-full flex items-center justify-between">
                  <span>userEmail@gmail.com</span>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Phone number</CardTitle>
                <CardDescription className="w-full flex items-center justify-between">
                  <span>+255798340941</span>
                </CardDescription>
              </CardHeader>
            </Card>
          </div> */}
          <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Payment methods
            </h4>
            <Card className="p-2">
              <RadioGroup defaultValue="cash">
                {paymentMethods.map(({ title, value, Icon }, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <Icon className="mr-2 shrink-0" />
                      <Label>{title}</Label>
                    </div>
                    <RadioGroupItem
                      value={value}
                      disabled={value != "cash"}
                      id={value}
                    />
                  </div>
                ))}
              </RadioGroup>
            </Card>
          </div>
        </div>
        <Separator className="h-1.5" />
        <div className="flex justify-between mt-2 items-center">
          <span>Total cost</span>
          <span>{totalCartPrice} Tsh</span>
        </div>
        <Button
          size="lg"
          onClick={handleSubmit}
          variant="secondary"
          className="mt-4 w-full"
          disabled={isEmpty || loading}
        >
          CHECKOUT
        </Button>
      </div>
    </div>
  );
};

export default CartContainer;
