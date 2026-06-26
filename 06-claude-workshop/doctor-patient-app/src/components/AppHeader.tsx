"use client";

import { Layout, Button, Dropdown, Avatar, Typography } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Header } = Layout;
const { Text } = Typography;

export default function AppHeader({ userName }: { userName: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <Header className="flex items-center justify-between px-6 shadow-sm" style={{ background: "var(--ant-color-bg-container)", padding: "0 24px" }}>
      <Text strong style={{ fontSize: 18 }}>Doctor-Patient Management</Text>
      <Dropdown
        menu={{
          items: [
            { key: "logout", icon: <LogoutOutlined />, label: "Logout", onClick: handleLogout },
          ],
        }}
        placement="bottomRight"
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar icon={<UserOutlined />} />
          <Text>{userName}</Text>
        </div>
      </Dropdown>
    </Header>
  );
}
