"use server";

import { getSession } from "@/lib/auth";
import prisma from "@/prisma/db";
import { storageDir } from "@/constants";
import { redirect } from "next/navigation";
import { getFile } from "./categories/actions";

export const getPayload = async () => {
  const payload = await getSession();

  if (!payload) redirect("/auth/login");

  return payload;
};

export const getUserInfo = async () => {
  const { id: username } = await getPayload();

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      Cart: {
        include: {
          items: {
            include: {
              Product: true,
            },
          },
        },
      },
      Orders: {
        include: {
          items: {
            include: {
              Product: true,
            },
          },
        },
      },
    },
  });

  if (!user || !user.Cart || !user.Cart.items) {
    throw new Error(
      `Unable to locate the user details for the user with the username: ${username}.`
    );
  }

  const cartItems = await Promise.all(
    user.Cart.items.map(async (item) => {
      const cartProduct = item.Product;
      let fileName = item.Product.mainImagePathName;
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

      const product = {
        ...cartProduct,
        fileData: fileData,
        fileType: fileType,
      };

      return {
        ...item,
        product,
      };
    })
  );

  // const orderItems = await Promise.all(
  //   user.Orders.map(async (order) => {
  //     return await Promise.all(
  //       order.items.map(async (item) => {
  //         const orderProduct = item.Product;
  //         let fileName = item.Product.mainImagePathName;
  //         let fileData: string | null = null;
  //         let fileType: string | null = null;

  //         if (fileName) {
  //           try {
  //             const { file, type } = await getFile({
  //               storageDir: `${storageDir}\\`,
  //               fileName,
  //             });
  //             fileData = file;
  //             fileType = type;
  //           } catch (error) {
  //             // If there's an error, we'll just continue and use the fallback avatar.
  //           }
  //         }

  //         const product = {
  //           ...orderProduct,
  //           fileData: fileData,
  //           fileType: fileType,
  //         };

  //         return {
  //           ...item,
  //           product,
  //         };
  //       })
  //     );
  //   })
  // );

  const ordersWithItems = await Promise.all(
    user.Orders.map(async (order) => {
      const orderItems = await Promise.all(
        order.items.map(async (item) => {
          const orderProduct = item.Product;
          let fileName = item.Product.mainImagePathName;
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

          const product = {
            ...orderProduct,
            fileData,
            fileType,
          };

          return {
            ...item,
            product,
          };
        })
      );

      return {
        ...order,
        orderItems: orderItems,
      };
    })
  );

  return { ...user, cartItems, ordersWithItems };
};
