import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { plan } = await request.json();

    const prices: Record<string, number> = {
      ACCESS: 200000,
      TERRA: 700000,
      MARS: 1900000,
      KRYPTON: 3900000,
    };

    if (!prices[plan]) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    // Mock Fiko Pay URL
    const paymentUrl = `https://pay.fiko.com/checkout?plan=${plan}&amount=${prices[plan]}`;

    return NextResponse.json({ paymentUrl });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
