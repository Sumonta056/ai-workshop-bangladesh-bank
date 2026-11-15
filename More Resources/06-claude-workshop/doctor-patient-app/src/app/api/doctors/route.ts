import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const doctors = await prisma.doctor.findMany({ orderBy: { id: "asc" } });
  return NextResponse.json(doctors);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const doctor = await prisma.doctor.create({ data });
  return NextResponse.json(doctor);
}

export async function PUT(request: NextRequest) {
  const { id, ...data } = await request.json();
  const doctor = await prisma.doctor.update({ where: { id }, data });
  return NextResponse.json(doctor);
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  await prisma.appointment.deleteMany({ where: { doctorId: id } });
  await prisma.doctor.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted" });
}
