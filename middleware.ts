import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "./lib/auth";

const roleConfig: {
  [key: string]: {
    dashboardUrl: string;
    allowedUrls: string[];
  };
} = {
  USER: {
    dashboardUrl: "/home/categories",
    allowedUrls: ["/home"],
  },
  ADMIN: {
    dashboardUrl: "/admin/products",
    allowedUrls: ["/admin"],
  },
};

const pathToAuthUrl: {
  [key: string]: string;
} = {
  "/home": "/auth/login",
  "/admin": "/auth/admin",
};

const authPaths = ["/auth/login", "/auth/admin"];

export async function middleware(request: NextRequest) {
  let token = request.cookies.get("session")?.value;
  const authUser =
    token && (await verifyAuth(token).catch((ex) => console.log(ex)));

  if (authUser) {
    const userId = authUser.id;
    const response = NextResponse.next();

    // response.headers.set("userId", userId);

    const config = roleConfig[authUser.role];

    if (config) {
      const { dashboardUrl, allowedUrls } = config;

      if (
        authUser &&
        authPaths.some((path) => request.nextUrl.pathname.startsWith(path))
      ) {
        if (dashboardUrl) {
          return NextResponse.redirect(new URL(dashboardUrl, request.url));
        }
      }

      if (
        !allowedUrls.some(
          (url) =>
            request.nextUrl.pathname === url ||
            request.nextUrl.pathname.startsWith(url + "/")
        )
      ) {
        return NextResponse.redirect(new URL("/not_authorized", request.url));
      }
    }

    return response;
  }

  for (const path in pathToAuthUrl) {
    if (
      request.nextUrl.pathname.startsWith(path) &&
      request.nextUrl.pathname !== pathToAuthUrl[path]
    ) {
      return NextResponse.redirect(new URL(pathToAuthUrl[path], request.url));
    }
  }
}

export const config = {
  matcher: ["/home/:path*", "/admin/:path*", "/auth/:path*"],
};
