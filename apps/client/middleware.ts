import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Simple auth guard for client dashboard
  // In a real app, you would verify the session cookie or token here
  // For now, we just let it pass or redirect if we had a way to check auth synchronously

  // Tenant resolver logic could go here, e.g., extracting companyId from URL or token
  // const companyId = request.cookies.get('companyId')?.value;

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
