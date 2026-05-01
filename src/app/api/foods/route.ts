import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const foods = await prisma.food.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(foods);
  } catch (error) {
    console.error("Prisma GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch foods" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newFood = await prisma.food.create({
      data: {
        title: body.title,
        thumb: body.thumb,
        times: body.times,
        portion: body.portion,
        difficulty: body.difficulty,
        category: body.category,
      },
    });
    return NextResponse.json(newFood);
  } catch (error) {
    console.error("Prisma POST Error:", error);
    return NextResponse.json({ error: "Failed to add food" }, { status: 500 });
  }
}
