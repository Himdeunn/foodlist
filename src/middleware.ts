import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  // Protect Admin Routes
  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    try {
      const parsed = await decrypt(session);
      if (parsed.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/catalog", request.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Redirect if logged in
  if ((pathname === "/login" || pathname === "/register") && session) {
     try {
      const parsed = await decrypt(session);
      if (parsed.role === "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      return NextResponse.redirect(new URL("/catalog", request.url));
    } catch (err) {
       // invalid session, let them login
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
