import { NextResponse } from "next/server";

const NEON_API_URL = process.env.NEXT_PUBLIC_NEON_API_URL;
const NEON_API_KEY = process.env.NEXT_PUBLIC_NEON_API_KEY;

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  if (!NEON_API_URL) return NextResponse.json({ error: "Config missing" }, { status: 500 });

  try {
    const body = await req.json();
    const { id } = await params;
    // Assuming the API URL in .env is the base collection URL
    const url = `${NEON_API_URL}?key=eq.${id}`; 
    
    const response = await fetch(url, {
      method: "PATCH", // PostgREST uses PATCH for updates
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
    return NextResponse.json({ error: "Failed to update food" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  if (!NEON_API_URL) return NextResponse.json({ error: "Config missing" }, { status: 500 });

  try {
    const { id } = await params;
    const url = `${NEON_API_URL}?key=eq.${id}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${NEON_API_KEY}`,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete food" }, { status: 500 });
  }
}
