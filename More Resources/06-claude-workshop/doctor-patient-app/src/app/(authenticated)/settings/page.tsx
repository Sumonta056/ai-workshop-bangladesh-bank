"use client";

import { Card, Switch, Typography, Descriptions } from "antd";
import { useTheme } from "@/lib/theme";

const { Title } = Typography;

export default function SettingsPage() {
  const { mode, toggle } = useTheme();

  return (
    <div className="space-y-6 max-w-2xl">
      <Title level={3}>Settings</Title>

      <Card title="Appearance">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Dark Mode</div>
            <div className="text-gray-500 text-sm">Toggle between light and dark theme</div>
          </div>
          <Switch checked={mode === "dark"} onChange={toggle} />
        </div>
      </Card>

      <Card title="System Information">
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="App Version">0.1.0</Descriptions.Item>
          <Descriptions.Item label="Framework">Next.js 16.2.1 + Ant Design 6.3.4</Descriptions.Item>
          <Descriptions.Item label="Database">SQLite (Prisma 7.5.0 + libSQL adapter)</Descriptions.Item>
          <Descriptions.Item label="UI">Tailwind CSS 4.2.2 + Recharts 3.8.1</Descriptions.Item>
          <Descriptions.Item label="Runtime">React 19.2.4 + TypeScript 5.9.3</Descriptions.Item>
          <Descriptions.Item label="Theme">{mode === "dark" ? "Dark" : "Light"}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
