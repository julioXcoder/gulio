"use server";

import { getMimeType } from "@/lib/utils";
import {
  createReadStream,
  createWriteStream,
  promises as fsPromises,
} from "fs";
import { join, extname } from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import { z } from "zod";
import { FormSchema } from "./data";
import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";

const pipe = promisify(pipeline);
const storageDir = "D:\\gulio-files\\products";

interface FilePath {
  storageDir: string;
  fileName: string;
}

type FileData = {
  file: File;
  fileName: string;
};

export async function uploadFile(
  formData: FormData,
  { storageDir, fileName }: FilePath
): Promise<string> {
  const file = formData.get("file") as File;
  const nodeStream = file.stream() as unknown as NodeJS.ReadableStream;
  const originalExtension = extname(file.name);
  const filePath = join(storageDir, `${fileName}${originalExtension}`);

  try {
    await fsPromises.mkdir(storageDir, { recursive: true });
    const fileStream = createWriteStream(filePath);
    await pipe(nodeStream, fileStream);
    return `${fileName}${originalExtension}`;
  } catch (error) {
    throw new Error(`File upload failed`);
  }
}

export async function uploadMultipleFiles(
  fileDataArray: FileData[]
): Promise<{ imageId: string; pathName: string }[]> {
  const uploadedFilePaths: { imageId: string; pathName: string }[] = [];

  for (const { file, fileName } of fileDataArray) {
    const nodeStream = file.stream() as unknown as NodeJS.ReadableStream;
    const originalExtension = extname(file.name);
    const filePath = join(storageDir, `${fileName}${originalExtension}`);

    try {
      await fsPromises.mkdir(storageDir, { recursive: true });
      const fileStream = createWriteStream(filePath);
      await pipe(nodeStream, fileStream);
      uploadedFilePaths.push({
        imageId: fileName,
        pathName: `${fileName}${originalExtension}`,
      });
    } catch (error) {
      console.error(`File upload failed for ${fileName}`);
    }
  }

  return uploadedFilePaths;
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

export const getAllProducts = async () => {
  const products = await prisma.product.findMany();

  const data = await Promise.all(
    products.map(async (product) => {
      let fileName = product.mainImagePathName;
      let fileData: string | null = null;
      let fileType: string | null = null;

      if (fileName) {
        try {
          const { file, type } = await getFile({
            storageDir: `${storageDir}\\`,
            fileName,
          });
          fileData = file;
          fileType = type;
        } catch (error) {
          // If there's an error, we'll just continue and use the fallback avatar.
        }
      }

      return {
        ...product,
        fileData: fileData,
        fileType: fileType,
      };
    })
  );

  return data;
};

const createProductImages = async (
  files: File[],
  productId: number
): Promise<FileData[]> => {
  const fileData: FileData[] = [];
  for (const file of files) {
    const newProductImage = await prisma.productImages.create({
      data: {
        Product: {
          connect: {
            id: productId,
          },
        },
      },
    });

    fileData.push({ file, fileName: newProductImage.imageId });
  }

  return fileData;
};

interface NewProduct extends z.infer<typeof FormSchema> {
  formData: FormData;
}

export const addNewProduct = async (data: NewProduct) => {
  const { formData, productCategory, productStatus, inStock, name, price } =
    data;
  const files = formData.getAll("images") as File[];

  const newProduct = await prisma.product.create({
    data: {
      inStock,
      name,
      price,
      Category: productCategory,
      status: productStatus,
    },
  });

  const mainImageFileName = await uploadFile(formData, {
    storageDir,
    fileName: newProduct.mainImageId,
  });

  await prisma.product.update({
    where: {
      id: newProduct.id,
    },
    data: {
      mainImagePathName: mainImageFileName,
    },
  });

  const fileDataArray = await createProductImages(files, newProduct.id);
  const uploadedFilePaths = await uploadMultipleFiles(fileDataArray);

  for (const { imageId, pathName } of uploadedFilePaths) {
    await prisma.productImages.update({
      where: {
        imageId,
      },
      data: {
        pathName,
      },
    });
  }

  revalidatePath("/admin/portal/products");
};
