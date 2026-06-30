import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { setSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.password !== password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await setSession({ id: user.id, email: user.email, name: user.name, role: user.role });

  return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });
}
