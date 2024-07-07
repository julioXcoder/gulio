"use server";

import { getMimeType } from "@/lib/utils";
import prisma from "@/prisma/db";
import { CartItem } from "@prisma/client";
import { createReadStream, promises as fsPromises } from "fs";
import { revalidatePath } from "next/cache";
import { join } from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import { getUserInfo } from "../actions";

const pipe = promisify(pipeline);
const storageDir = "D:\\gulio-files\\products";

interface FilePath {
  storageDir: string;
  fileName: string;
}

export async function getFile({ storageDir, fileName }: FilePath) {
  const filePath = join(storageDir, fileName);

  try {
    const fileStream = createReadStream(filePath);
    const chunks = [];
    for await (const chunk of fileStream) {
      chunks.push(chunk);
    }
    const fileBuffer = Buffer.concat(chunks);
    const mimeType = getMimeType(fileName);
    const { size } = await fsPromises.stat(filePath);

    return {
      file: fileBuffer.toString("base64"),
      type: mimeType,
      size,
    };
  } catch (error) {
    throw new Error(`File retrieval failed`);
  }
}

type ImageData = {
  fileData: string | null;
  fileType: string | null;
};

export const getAllProducts = async () => {
  const products = await prisma.product.findMany({
    include: {
      Images: true,
    },
  });

  const categoriesSet = new Set<string>();

  const data = await Promise.all(
    products.map(async (product) => {
      let productImagesData: ImageData[] = [];

      const processImage = async (fileName: string | null) => {
        if (!fileName) return { fileData: null, fileType: null };

        try {
          const { file, type } = await getFile({
            storageDir: `${storageDir}\\`,
            fileName,
          });
          return { fileData: file, fileType: type };
        } catch (error) {
          console.error(`Error retrieving file ${fileName}`);
          return { fileData: null, fileType: null };
        }
      };

      // Process main image
      const mainImage = await processImage(product.mainImagePathName);
      productImagesData.push(mainImage);

      // Process additional images
      const additionalImages = await Promise.all(
        product.Images.map(async (image) => await processImage(image.pathName))
      );
      productImagesData.push(...additionalImages);

      // Add the product's category to the set
      if (product.Category) {
        categoriesSet.add(product.Category);
      }

      return {
        ...product,
        productImagesData,
      };
    })
  );

  // Convert the set to an array
  const categories = Array.from(categoriesSet);

  return { data, categories };
};

export const addToCart = async (productId: number) => {
  try {
    const user = await getUserInfo();

    const cartId = user.Cart?.id;

    if (!cartId) {
      throw new Error();
    }

    await prisma.cartItem.create({
      data: {
        cartId,
        productId,
      },
    });

    revalidatePath("/home");
  } catch (error) {
    throw new Error();
  }
};

export const deleteCartItem = async (id: number) => {
  await prisma.cartItem.delete({
    where: {
      id,
    },
  });
  revalidatePath("/home");
};

const updateProductStock = async (id: number, quantity: number) => {
  await prisma.product.update({
    where: {
      id,
    },
    data: {
      inStock: {
        decrement: quantity, // Use decrement to properly reduce the stock
      },
    },
  });
};

export const addOrder = async (data: CartItem[], total: number) => {
  try {
    const user = await getUserInfo();

    const order = await prisma.order.create({
      data: {
        userId: user.username,
        total,
      },
    });

    const orderPromises = data.map(async (item) => {
      await prisma.orderItem.create({
        data: {
          quantity: item.quantity,
          orderId: order.id,
          productId: item.productId,
        },
      });

      await deleteCartItem(item.id);
      await updateProductStock(item.productId, item.quantity);
    });

    await Promise.all(orderPromises);
    revalidatePath("/home");
  } catch (error) {
    console.error("Error adding order:", error);
    throw error; // Re-throw the error after logging it
  }
};
