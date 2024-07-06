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

const pipe = promisify(pipeline);

interface FilePath {
  storageDir: string;
  fileName: string;
}

import prisma from "@/prisma/db";

const storageDir = "D:\\gulio-files\\products";

export async function uploadFile(
  formData: FormData,
  { storageDir, fileName }: FilePath
) {
  const file = formData.get("file") as File;

  // Convert the ReadableStream from the Fetch API to a Node.js stream
  const nodeStream = file.stream() as unknown as NodeJS.ReadableStream;

  // Get the original file extension
  const originalExtension = extname(file.name);

  // const storageDir = "D:\\smart-files\\tester";
  // const filePath = join(storageDir, file.name);
  const filePath = join(storageDir, `${fileName}${originalExtension}`);

  // Ensure the directory exists
  try {
    await fsPromises.mkdir(storageDir, { recursive: true });

    // Use the 'pipeline' method to pipe the streams, which handles backpressure and errors
    const fileStream = createWriteStream(filePath);
    await pipe(nodeStream, fileStream);
    return `${fileName}${originalExtension}`;
  } catch (err) {
    throw err; // Or handle the error as needed
  }
}

type FileData = {
  file: File;
  fileName: string;
};

export async function uploadFiles(
  fileDataArray: FileData[]
): Promise<{ imageId: string; pathName: string }[]> {
  const uploadedFilePaths: { imageId: string; pathName: string }[] = [];

  for (const { file, fileName } of fileDataArray) {
    const nodeStream = file.stream() as unknown as NodeJS.ReadableStream;
    const originalExtension = extname(file.name);
    const filePath = join(storageDir, `${fileName}${originalExtension}`);

    try {
      await fsPromises.mkdir(storageDir, { recursive: true });
      pipeline(nodeStream, createWriteStream(filePath));
      uploadedFilePaths.push({
        imageId: fileName,
        pathName: `${fileName}${originalExtension}`,
      });
    } catch (err) {
      // Handle the error as needed (e.g., log it)
    }
  }

  return uploadedFilePaths;
}

export async function getFile({ storageDir, fileName }: FilePath) {
  // const storageDir = "D:\\smart-files\\tester\\";

  const filePath = join(storageDir, fileName);

  try {
    const fileStream = createReadStream(filePath);

    // Convert the stream to a buffer
    const chunks = [];
    for await (const chunk of fileStream) {
      chunks.push(chunk);
    }
    const fileBuffer = Buffer.concat(chunks);

    // Determine the MIME type based on the file extension
    const mimeType = getMimeType(fileName);

    // Get the file size
    const { size } = await fsPromises.stat(filePath);

    // Return the buffer and MIME type as an object
    return {
      file: fileBuffer.toString("base64"),
      type: mimeType,
      size,
    };
  } catch (error) {
    // Handle the error or rethrow it
    throw error;
  }
}

export const getProducts = async () => {
  const products = await prisma.product.findMany({
    include: {
      Images: true,
    },
  });

  return products;
};

const createProductImages = async (
  files: File[],
  id: number
): Promise<FileData[]> => {
  const fileData: FileData[] = [];
  for (const file of files) {
    // Create a new ProductImages record
    const newProductImage = await prisma.productImages.create({
      data: {
        Product: {
          connect: {
            id,
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

  const fileName = await uploadFile(formData, {
    storageDir,
    fileName: newProduct.mainImageId,
  });

  await prisma.product.update({
    where: {
      id: newProduct.id,
    },
    data: {
      mainImagePathName: fileName,
    },
  });

  const fileDataArray = await createProductImages(files, newProduct.id);

  const uploadedFilePaths = await uploadFiles(fileDataArray);

  uploadedFilePaths.map(async (paths) => {
    const { imageId, pathName } = paths;

    await prisma.productImages.update({
      where: {
        imageId,
      },
      data: {
        pathName,
      },
    });
  });
};
