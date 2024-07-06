import { Product } from "@prisma/client";

type ImageData = {
  fileData: string | null;
  fileType: string | null;
};

interface ProductData extends Product {
  productImagesData: ImageData[];
}

export type { ProductData };
