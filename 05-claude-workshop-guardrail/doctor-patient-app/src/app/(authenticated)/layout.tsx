"use client";

import { useState } from "react";
import { Layout } from "antd";
import Sidebar from "@/components/Sidebar";
import AppHeader from "@/components/AppHeader";

const { Content } = Layout;

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  // userName is read from cookie on client side
  const [userName] = useState(() => {
    if (typeof document === "undefined") return "User";
    try {
      const cookie = document.cookie.split("; ").find((c) => c.startsWith("session="));
      if (!cookie) return "User";
      const val = decodeURIComponent(cookie.split("=").slice(1).join("="));
      return JSON.parse(val).name || "User";
    } catch {
      return "User";
    }
  });

  return (
    <Layout className="min-h-screen">
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout>
        <AppHeader userName={userName} />
        <Content className="m-6">{children}</Content>
      </Layout>
    </Layout>
  );
}
