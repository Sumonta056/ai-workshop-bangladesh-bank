import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 400 });
  }

  await prisma.user.create({ data: { name, email, password, role: "admin" } });

  return NextResponse.json({ message: "Account created" });
}
