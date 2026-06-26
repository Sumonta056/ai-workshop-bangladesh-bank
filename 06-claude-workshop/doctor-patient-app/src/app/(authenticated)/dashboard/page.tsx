"use client";

import { useEffect, useState } from "react";
import { Row, Col, Table, Tag, Spin } from "antd";
import { TeamOutlined, MedicineBoxOutlined, CalendarOutlined, DollarOutlined } from "@ant-design/icons";
import StatsCard from "@/components/StatsCard";
import AppointmentsChart from "@/components/charts/AppointmentsChart";
import PatientGrowthChart from "@/components/charts/PatientGrowthChart";

interface Stats {
  totalPatients: number;
  totalDoctors: number;
  todaysAppointments: number;
  revenue: number;
  last7Days: { date: string; count: number }[];
  byDepartment: { name: string; count: number }[];
  recent: { id: number; doctor: string; patient: string; date: string; status: string }[];
}

const statusColors: Record<string, string> = {
  Scheduled: "blue",
  Completed: "green",
  Cancelled: "red",
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/stats").then((r) => r.json()).then(setStats);
  }, []);

  if (!stats) return <div className="flex justify-center py-20"><Spin size="large" /></div>;

  return (
    <div className="space-y-6">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard title="Total Patients" value={stats.totalPatients} prefix={<TeamOutlined />} color="#1677ff" />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard title="Total Doctors" value={stats.totalDoctors} prefix={<MedicineBoxOutlined />} color="#52c41a" />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard title="Today's Appointments" value={stats.todaysAppointments} prefix={<CalendarOutlined />} color="#faad14" />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard title="Revenue" value={`$${stats.revenue.toLocaleString()}`} prefix={<DollarOutlined />} color="#722ed1" />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <AppointmentsChart data={stats.last7Days} />
        </Col>
        <Col xs={24} lg={12}>
          <PatientGrowthChart data={stats.byDepartment} />
        </Col>
      </Row>

      <Table
        title={() => <strong>Recent Appointments</strong>}
        dataSource={stats.recent}
        rowKey="id"
        pagination={false}
        columns={[
          { title: "Doctor", dataIndex: "doctor" },
          { title: "Patient", dataIndex: "patient" },
          { title: "Date", dataIndex: "date", render: (d: string) => new Date(d).toLocaleString() },
          { title: "Status", dataIndex: "status", render: (s: string) => <Tag color={statusColors[s]}>{s}</Tag> },
        ]}
      />
    </div>
  );
}
