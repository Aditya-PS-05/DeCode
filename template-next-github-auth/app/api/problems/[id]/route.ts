// app/api/problems/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = 1;
    console.log("The id is : ", id);

    if (isNaN(id)) {
  return NextResponse.json({ error: 'Invalid problem ID' }, { status: 400 });
}

    const problem = await prisma.problem.findUnique({
      where: { id },
    });

    if (!problem) {
      return NextResponse.json({ message: "Problem not found" }, { status: 404 });
    }

    return NextResponse.json({ problem });
  } catch (error) {
    console.error("Error fetching problem by ID:", error);
    return NextResponse.json(
      { message: "Failed to fetch problem" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await req.json();

    const updatedProblem = await prisma.problem.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({
      message: "Problem updated successfully",
      problem: updatedProblem,
    });
  } catch (error) {
    console.error("Error updating problem:", error);
    return NextResponse.json(
      { message: "Failed to update problem" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    await prisma.problem.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Problem deleted successfully" });
  } catch (error) {
    console.error("Error deleting problem:", error);
    return NextResponse.json(
      { message: "Failed to delete problem" },
      { status: 500 }
    );
  }
}