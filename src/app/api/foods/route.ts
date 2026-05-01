import { NextResponse } from "next/server";

const NEON_API_URL = process.env.NEXT_PUBLIC_NEON_API_URL;
const NEON_API_KEY = process.env.NEXT_PUBLIC_NEON_API_KEY;

export async function GET() {
  if (!NEON_API_URL) return NextResponse.json({ error: "Config missing" }, { status: 500 });

  try {
    const response = await fetch(NEON_API_URL, {
      headers: {
        "Authorization": `Bearer ${NEON_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch from Neon" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!NEON_API_URL) return NextResponse.json({ error: "Config missing" }, { status: 500 });

  try {
    const body = await req.json();
    const response = await fetch(NEON_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${NEON_API_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data[0] || data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to add food" }, { status: 500 });
  }
}
