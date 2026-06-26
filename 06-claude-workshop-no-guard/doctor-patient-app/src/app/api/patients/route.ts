import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const patients = await prisma.patient.findMany({ orderBy: { id: "asc" } });
  return NextResponse.json(patients);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const patient = await prisma.patient.create({ data });
  return NextResponse.json(patient);
}

export async function PUT(request: NextRequest) {
  const { id, ...data } = await request.json();
  const patient = await prisma.patient.update({ where: { id }, data });
  return NextResponse.json(patient);
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  await prisma.appointment.deleteMany({ where: { patientId: id } });
  await prisma.patient.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted" });
}
