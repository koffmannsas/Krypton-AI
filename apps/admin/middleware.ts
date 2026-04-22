import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Simple auth guard for admin dashboard
  // In a real app, you would verify the session cookie or token here
  // and ensure the user has the 'admin' role

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
