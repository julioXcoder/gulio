"use server";

import { setSession } from "@/lib/auth";
import prisma from "@/prisma/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const authorizeUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) return { message: "Invalid username or password" };

    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) return { message: "Invalid username or password" };

    const payload = { id: user.username, role: "USER" };

    await setSession(payload);

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

export const logoutUser = async () => {
  // users / student staff applicant
  cookies().set("session", "");

  redirect(`/auth/login`);
};
