"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { getNumberValueFromEvent, showErrorToast } from "@/lib/utils";
import AddImage from "./addImage";
import { productCategoryList, productStatusList, FormSchema } from "./data";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useImageData } from "@/hooks/useImageData";
import { useImagesData } from "@/hooks/useImagesData";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { Table, PlusCircle, Upload, PencilLine, Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const AddProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      price: 0.0,
      inStock: 0,
    },
  });
  const {
    imagePreview,
    imageSize,
    imageFile,
    imageType,
    setImageFile,
    setImagePreview,
    setImageSize,
    setImageType,
  } = useImageData();
  const { images, addImage, updateImage, removeImage } = useImagesData();

  const handleSetImage = (image: File) => {
    setImageFile(image);
    const url = URL.createObjectURL(image);
    const size = image.size;
    const type = image.type;
    setImagePreview(url);
    setImageSize(size);
    setImageType(type);
  };

  const handleAddImage = (image: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newImage = {
        imagePreview: reader.result as string,
        imageFile: image,
        imageSize: image.size,
        imageType: image.type,
      };
      addImage(newImage);
    };
    reader.readAsDataURL(image);
  };

  const handleImageDelete = () => {
    setImagePreview(null);
    setImageSize(0);
    setImageType("");
  };

  const handleDeleteImage = (index: number) => {
    removeImage(index);
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!imageFile) {
      toast.error("Product image required!", {
        duration: 6000,
      });
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", imageFile);

    // const { userRole: _, ...otherData } = data;
    // const userRole = UserRole[data.userRole as keyof typeof UserRole];

    console.log("The data is", data);

    try {
      // await addStaff({ formData, userRole, ...otherData });
    } catch (error) {
      showErrorToast();
    } finally {
      setIsOpen(false);
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-6">
      <Form {...form}>
        {/* <form onSubmit={form.handleSubmit(onSubmit)}> */}
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0">
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>Add product details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product name</FormLabel>
                          <FormControl>
                            <Input
                              className="w-full"
                              placeholder="Enter product name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-1">
              <CardHeader>
                <CardTitle>Stock</CardTitle>
                <CardDescription>Add product stock and price</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="inStock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>product stock</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter product stock"
                              {...field}
                              onChange={(e) => {
                                // Convert the input value to a number before setting it
                                const value = getNumberValueFromEvent(e);
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>product price</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter product price"
                              {...field}
                              onChange={(e) => {
                                // Convert the input value to a number before setting it
                                const value = getNumberValueFromEvent(e);
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-2">
              <CardHeader>
                <CardTitle>Product Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="ProductCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {productCategoryList.map(
                                ({ value, label }, index) => (
                                  <SelectItem key={index} value={value}>
                                    {label}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="ProductStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {productStatusList.map(
                                ({ value, label }, index) => (
                                  <SelectItem key={index} value={value}>
                                    {label}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>Add product images</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {imagePreview ? (
                    <div className="relative group">
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="300"
                        src={imagePreview}
                        width="300"
                      />

                      <div className="absolute gap-2 hidden group-hover:flex top-2 right-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleImageDelete}
                        >
                          <Trash2 className="text-red-500 size-5" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-[300px] h-[300px]">
                      <AddImage
                        onSetImage={handleSetImage}
                        placeholder="Add staff image"
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: 3 }, (_, i) => i).map((index) => (
                      <div key={index}>
                        {images[index]?.imagePreview ? (
                          <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="84"
                            src={images[index].imagePreview}
                            width="84"
                          />
                        ) : (
                          <div className="w-[84px] h-[84px] flex aspect-square items-center justify-center rounded-md border border-dashed">
                            <AddImage
                              onSetImage={handleAddImage}
                              placeholder="Add staff image"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex items-center gap-3">
              {/* <Button variant="outline">Discard</Button> */}
              <Button
                size="lg"
                className="w-full"
                onClick={() => form.handleSubmit(onSubmit)()}
              >
                Save Product
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddProduct;
