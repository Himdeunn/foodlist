import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { id } = await params;

    const updatedFood = await prisma.food.update({
      where: { key: id },
      data: {
        title: body.title,
        thumb: body.thumb,
        times: body.times,
        portion: body.portion,
        difficulty: body.difficulty,
        category: body.category,
      },
    });

    return NextResponse.json(updatedFood);
  } catch (error) {
    console.error("Prisma PUT Error:", error);
    return NextResponse.json({ error: "Failed to update food" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;

    await prisma.food.delete({
      where: { key: id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Prisma DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete food" }, { status: 500 });
  }
}
