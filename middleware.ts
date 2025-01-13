import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const session = await getToken({
    req,
    secret: process.env.JWT_SECRET || "default_secret",
  });

  const isAuthPath = req.nextUrl.pathname.startsWith("/auth");

  if (!isAuthPath && !session) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth";
    url.searchParams.set("authType", "signin");
    url.searchParams.set(
      "callbackUrl",
      req.nextUrl.pathname + req.nextUrl.search
    );
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|api/|auth).*)",
  ],
};
