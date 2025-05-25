import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface ProblemType {
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
  constraints: string[];
  examples: Prisma.JsonArray; // updated key to match model
}

export async function POST(req: NextRequest) {
  try {
    const body: ProblemType = await req.json();

    // Check if problem with the same title already exists
    const existingProblems = await prisma.problem.findMany({
      where: {
        title: body.title,
      },
    });

    if (existingProblems.length > 0) {
      return NextResponse.json(
        { message: "Problem already exists" },
        { status: 400 }
      );
    }

    const newProblem = await prisma.problem.create({
      data: body,
    });

    return NextResponse.json({
      message: "Problem created successfully",
      problem: newProblem,
    });
  } catch (error) {
    console.error("Error creating problem:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const problems = await prisma.problem.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json({ problems });
  } catch (error) {
    console.error("Error fetching problems:", error);
    return NextResponse.json(
      { message: "Failed to fetch problems" },
      { status: 500 }
    );
  }
}
