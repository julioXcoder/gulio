import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setSession } from "@/lib/auth";
import prisma from "@/prisma/db";
import bcrypt from "bcrypt";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = () => {
  async function createAdmin(formData: FormData) {
    "use server";

    const data = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    const { username, password } = data;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = await prisma.admin.create({
      data: {
        username,
        hashedPassword,
      },
    });

    const sessionData = { id: username, role: "ADMIN" };

    await setSession(sessionData);

    redirect("/admin/portal/products");
  }

  return (
    <Card className="mx-auto mt-20 max-w-sm">
      <form action={createAdmin}>
        <CardHeader>
          <CardTitle className="text-2xl">Admin setup</CardTitle>
          <CardDescription>Enter your username below</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Username</Label>
              <Input name="username" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Setup
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
};

export default Page;
