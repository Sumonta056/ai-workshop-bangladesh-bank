import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [totalPatients, totalDoctors, appointments] = await Promise.all([
    prisma.patient.count(),
    prisma.doctor.count(),
    prisma.appointment.findMany({ include: { doctor: true, patient: true }, orderBy: { date: "desc" } }),
  ]);

  const today = new Date().toISOString().split("T")[0];
  const todaysAppointments = appointments.filter((a) => a.date?.startsWith(today)).length;

  // Last 7 days chart data
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split("T")[0];
    return {
      date: d.toLocaleDateString("en-US", { weekday: "short" }),
      count: appointments.filter((a) => a.date?.startsWith(dateStr)).length,
    };
  });

  // Patients by department
  const deptMap: Record<string, number> = {};
  appointments.forEach((a) => {
    if (a.doctor?.specialization) {
      deptMap[a.doctor.specialization] = (deptMap[a.doctor.specialization] || 0) + 1;
    }
  });
  const byDepartment = Object.entries(deptMap).map(([name, count]) => ({ name, count }));

  // Recent 5 appointments
  const recent = appointments.slice(0, 5).map((a) => ({
    id: a.id,
    doctor: a.doctor?.name || "Unknown Doctor",
    patient: a.patient?.name || "Unknown Patient",
    date: a.date,
    status: a.status,
  }));

  return NextResponse.json({
    totalPatients,
    totalDoctors,
    todaysAppointments,
    revenue: 24500,
    last7Days,
    byDepartment,
    recent,
  });
}
