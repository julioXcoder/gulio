"use server";

import { getSession } from "@/lib/auth";
import prisma from "@/prisma/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getPayload = async () => {
  const payload = await getSession();

  if (!payload) redirect("/auth/admin");

  return payload;
};

export const getAdminInfo = async () => {
  const { id: username } = await getPayload();

  const user = await prisma.admin.findUnique({
    where: { username },
  });

  if (!user) {
    throw new Error(
      `Unable to locate the user details for the user with the username: ${username}.`
    );
  }

  return user;
};

export const logoutAdmin = async () => {
  cookies().set("session", "");

  redirect(`/auth/admin`);
};
