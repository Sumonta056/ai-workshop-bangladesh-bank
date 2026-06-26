"use client";

import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";

const { Sider } = Layout;

const menuItems = [
  { key: "/dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
  { key: "/doctors", icon: <MedicineBoxOutlined />, label: "Doctors" },
  { key: "/patients", icon: <UserOutlined />, label: "Patients" },
  { key: "/settings", icon: <SettingOutlined />, label: "Settings" },
];

export default function Sidebar({
  collapsed,
  onCollapse,
}: {
  collapsed: boolean;
  onCollapse: (v: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      className="min-h-screen"
      theme="dark"
    >
      <div className="h-16 flex items-center justify-center text-white text-lg font-bold">
        {collapsed ? "MC" : "MediClinic"}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems}
        onClick={({ key }) => router.push(key)}
      />
    </Sider>
  );
}
