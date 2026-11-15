import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Admin user
  await prisma.user.upsert({
    where: { email: "admin@clinic.com" },
    update: {},
    create: { email: "admin@clinic.com", password: "password123", name: "Admin User", role: "admin" },
  });

  // Doctors
  const doctors = [
    { name: "Dr. Sarah Johnson", email: "sarah@clinic.com", specialization: "Cardiology", phone: "+1-555-0101", status: "Active" },
    { name: "Dr. Michael Chen", email: "michael@clinic.com", specialization: "Neurology", phone: "+1-555-0102", status: "Active" },
    { name: "Dr. Emily Davis", email: "emily@clinic.com", specialization: "Pediatrics", phone: "+1-555-0103", status: "Active" },
    { name: "Dr. James Wilson", email: "james@clinic.com", specialization: "Orthopedics", phone: "+1-555-0104", status: "On Leave" },
    { name: "Dr. Lisa Anderson", email: "lisa@clinic.com", specialization: "Dermatology", phone: "+1-555-0105", status: "Active" },
    { name: "Dr. Robert Taylor", email: "robert@clinic.com", specialization: "General Medicine", phone: "+1-555-0106", status: "Active" },
    { name: "Dr. Maria Garcia", email: "maria@clinic.com", specialization: "Gynecology", phone: "+1-555-0107", status: "Active" },
    { name: "Dr. David Brown", email: "david@clinic.com", specialization: "ENT", phone: "+1-555-0108", status: "Inactive" },
  ];

  for (const doc of doctors) {
    await prisma.doctor.upsert({ where: { email: doc.email }, update: {}, create: doc });
  }

  // Patients
  const patients = [
    { name: "John Smith", email: "john@email.com", phone: "+1-555-1001", dateOfBirth: "1985-03-15", gender: "Male", address: "123 Oak St", bloodGroup: "A+" },
    { name: "Jane Doe", email: "jane@email.com", phone: "+1-555-1002", dateOfBirth: "1990-07-22", gender: "Female", address: "456 Elm St", bloodGroup: "B+" },
    { name: "Robert Brown", email: "rbrown@email.com", phone: "+1-555-1003", dateOfBirth: "1978-11-30", gender: "Male", address: "789 Pine Ave", bloodGroup: "O+" },
    { name: "Alice Johnson", email: "alice@email.com", phone: "+1-555-1004", dateOfBirth: "1995-01-10", gender: "Female", address: "321 Maple Dr", bloodGroup: "AB+" },
    { name: "Carlos Rivera", email: "carlos@email.com", phone: "+1-555-1005", dateOfBirth: "1982-06-18", gender: "Male", address: "654 Cedar Ln", bloodGroup: "A-" },
    { name: "Priya Patel", email: "priya@email.com", phone: "+1-555-1006", dateOfBirth: "1998-09-05", gender: "Female", address: "987 Birch Rd", bloodGroup: "B-" },
    { name: "Tom Williams", email: "tom@email.com", phone: "+1-555-1007", dateOfBirth: "1970-12-25", gender: "Male", address: "147 Walnut St", bloodGroup: "O-" },
    { name: "Sarah Lee", email: "slee@email.com", phone: "+1-555-1008", dateOfBirth: "1988-04-02", gender: "Female", address: "258 Ash Blvd", bloodGroup: "AB-" },
    { name: "Mike Taylor", email: "miket@email.com", phone: "+1-555-1009", dateOfBirth: "1992-08-14", gender: "Male", address: "369 Spruce Way", bloodGroup: "A+" },
    { name: "Emma Wilson", email: "emma@email.com", phone: "+1-555-1010", dateOfBirth: "2000-02-28", gender: "Female", address: "741 Poplar Ct", bloodGroup: "B+" },
    { name: "David Kim", email: "dkim@email.com", phone: "+1-555-1011", dateOfBirth: "1975-05-20", gender: "Male", address: "852 Hickory Pl", bloodGroup: "O+" },
    { name: "Maria Santos", email: "msantos@email.com", phone: "+1-555-1012", dateOfBirth: "1993-10-08", gender: "Female", address: "963 Cypress Ave", bloodGroup: "A+" },
    { name: "James Chen", email: "jchen@email.com", phone: "+1-555-1013", dateOfBirth: "1987-01-17", gender: "Male", address: "159 Redwood St", bloodGroup: "AB+" },
    { name: "Fatima Ali", email: "fatima@email.com", phone: "+1-555-1014", dateOfBirth: "1996-07-30", gender: "Female", address: "267 Sequoia Dr", bloodGroup: "B-" },
    { name: "Chris Martin", email: "cmartin@email.com", phone: "+1-555-1015", dateOfBirth: "1980-03-12", gender: "Male", address: "378 Magnolia Ln", bloodGroup: "O+" },
    { name: "Nina Johansson", email: "nina@email.com", phone: "+1-555-1016", dateOfBirth: "1991-11-25", gender: "Female", address: "489 Willow Way", bloodGroup: "A-" },
    { name: "Ahmed Hassan", email: "ahmed@email.com", phone: "+1-555-1017", dateOfBirth: "1983-09-03", gender: "Male", address: "591 Chestnut Rd", bloodGroup: "B+" },
    { name: "Lucy Zhang", email: "lucy@email.com", phone: "+1-555-1018", dateOfBirth: "1997-06-14", gender: "Female", address: "602 Beech Ct", bloodGroup: "O-" },
    { name: "Oscar Nguyen", email: "oscar@email.com", phone: "+1-555-1019", dateOfBirth: "1974-04-22", gender: "Male", address: "713 Sycamore Pl", bloodGroup: "AB-" },
    { name: "Hannah Green", email: "hannah@email.com", phone: "+1-555-1020", dateOfBirth: "1999-12-01", gender: "Female", address: "824 Juniper Ave", bloodGroup: "A+" },
  ];

  for (const pat of patients) {
    await prisma.patient.upsert({ where: { email: pat.email }, update: {}, create: pat });
  }

  // Appointments
  const now = new Date();
  for (let i = 0; i < 30; i++) {
    const dayOffset = Math.floor(Math.random() * 21) - 14;
    const date = new Date(now);
    date.setDate(date.getDate() + dayOffset);
    date.setHours(8 + Math.floor(Math.random() * 10), Math.random() > 0.5 ? 0 : 30, 0, 0);

    const status = dayOffset < 0 ? (Math.random() > 0.2 ? "Completed" : "Cancelled") : "Scheduled";

    await prisma.appointment.create({
      data: {
        doctorId: (i % 8) + 1,
        patientId: (i % 20) + 1,
        date: date.toISOString(),
        status,
        notes: `Appointment note #${i + 1}`,
      },
    });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
