"use client";

import { Card, Statistic } from "antd";
import type { ReactNode } from "react";

export default function StatsCard({
  title,
  value,
  prefix,
  color,
}: {
  title: string;
  value: number | string;
  prefix?: ReactNode;
  color?: string;
}) {
  return (
    <Card>
      <Statistic title={title} value={value} prefix={prefix} styles={{ content: { color } }} />
    </Card>
  );
}
