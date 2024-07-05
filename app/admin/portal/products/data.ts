import { z } from "zod";
import { ProductStatus, ProductCategory } from "@prisma/client";
import { enumToValueLabelArray } from "@/lib/utils";

const productStatusList = enumToValueLabelArray(ProductStatus);
const productCategoryList = enumToValueLabelArray(ProductCategory);

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Programme name is required.",
  }),
  price: z.number().min(0, "Product price should be a positive number"),
  inStock: z.number().min(0, "Product stock should be a positive number"),
  ProductStatus: z.nativeEnum(ProductStatus),
  ProductCategory: z.nativeEnum(ProductCategory),
});

export { FormSchema, productStatusList, productCategoryList };
