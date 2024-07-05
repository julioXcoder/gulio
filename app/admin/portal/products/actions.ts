"use server";

import prisma from "@/prisma/db";

export const getProducts = async () => {
  const products = await prisma.product.findMany({
    include: {
      Images: true,
    },
  });

  return products;
};
