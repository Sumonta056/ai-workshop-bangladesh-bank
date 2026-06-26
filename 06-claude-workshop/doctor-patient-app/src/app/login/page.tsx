"use client";

import { useState } from "react";
import { Card, Form, Input, Button, Typography, App, Checkbox } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { message } = App.useApp();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.ok) {
        message.success("Login successful!");
        router.push("/dashboard");
      } else {
        message.error(data.error || "Login failed");
      }
    } catch {
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-6">
          <Title level={2} className="!mb-1">Welcome Back</Title>
          <Text type="secondary">Sign in to your account</Text>
        </div>
        <Form layout="vertical" onFinish={onFinish} initialValues={{ email: "admin@clinic.com", password: "password123" }}>
          <Form.Item name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}>
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Please enter your password" }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              Sign In
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center">
          <Text>Don&apos;t have an account? <Link href="/signup">Sign up</Link></Text>
        </div>
      </Card>
    </div>
  );
}
