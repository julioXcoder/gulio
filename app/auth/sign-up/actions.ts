"use server";

import { setSession } from "@/lib/auth";
import prisma from "@/prisma/db";
import bcrypt from "bcrypt";

import { FormData } from "./page";

export const createUser = async (data: FormData) => {
  const { username, firstName, lastName, phone, password, location } = data;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (user) {
      return {
        message: "username already exist.",
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username,
        firstName,
        lastName,
        phone,
        hashedPassword,
        location,
      },
    });

    await prisma.cart.create({
      data: {
        userId: newUser.username,
      },
    });

    const data = { id: username, role: "USER" };

    await setSession(data);

    return {
      redirect: "/home/categories",
    };
  } catch (error) {
    return {
      message:
        "We’re sorry, but an issue arose while signing in. Please try again later. For further assistance, please don’t hesitate to reach out to our dedicated support team.",
    };
  }
};
