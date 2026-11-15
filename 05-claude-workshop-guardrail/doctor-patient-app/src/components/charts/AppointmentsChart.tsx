"use client";

import { Card } from "antd";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AppointmentsChart({ data }: { data: { date: string; count: number }[] }) {
  return (
    <Card title="Appointments (Last 7 Days)">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#1677ff" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
