import { NextResponse } from "next/server";

export async function GET() {
  // Mock stats
  return NextResponse.json({
    totalRevenue: 15000000,
    totalClients: 42,
  });
}
