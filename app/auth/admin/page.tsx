import Link from "next/link";
import { Button } from "@/components/ui/button";
import { setSession } from "@/lib/auth";
import bcrypt from "bcrypt";
import prisma from "@/prisma/db";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Page = () => {
  async function loginAdmin(formData: FormData) {
    "use server";

    const data = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    const { username, password } = data;

    const user = await prisma.admin.findUnique({
      where: {
        username,
      },
    });

    if (!user) return;

    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) return;

    const payload = { id: user.username, role: "ADMIN" };

    await setSession(payload);

    redirect("/admin/portal/products");
  }

  return (
    <Card className="mx-auto mt-20 max-w-sm">
      <form action={loginAdmin}>
        <CardHeader>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Enter your username below to login to your account
          </CardDescription>
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
              Login
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
};

export default Page;
