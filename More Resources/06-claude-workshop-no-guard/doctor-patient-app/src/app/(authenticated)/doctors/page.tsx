"use client";

import { useEffect, useState } from "react";
import { Table, Button, Input, Tag, Modal, Form, Select, Space, Popconfirm, App } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

interface Doctor {
  id: number;
  name: string;
  email: string;
  specialization: string;
  phone: string;
  status: string;
}

const specializations = ["Cardiology", "Neurology", "Pediatrics", "Orthopedics", "Dermatology", "General Medicine", "Gynecology", "ENT"];

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Doctor | null>(null);
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const load = () => fetch("/api/doctors").then((r) => r.json()).then(setDoctors);
  useEffect(() => { load(); }, []);

  const filtered = doctors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async (values: Omit<Doctor, "id">) => {
    if (editing) {
      await fetch("/api/doctors", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, ...values }) });
      message.success("Doctor updated");
    } else {
      await fetch("/api/doctors", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      message.success("Doctor added");
    }
    setModalOpen(false);
    setEditing(null);
    form.resetFields();
    load();
  };

  const handleDelete = async (id: number) => {
    await fetch("/api/doctors", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    message.success("Doctor deleted");
    load();
  };

  const openEdit = (doc: Doctor) => {
    setEditing(doc);
    form.setFieldsValue(doc);
    setModalOpen(true);
  };

  const statusColors: Record<string, string> = { Active: "green", "On Leave": "orange", Inactive: "red" };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input prefix={<SearchOutlined />} placeholder="Search doctors..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditing(null); form.resetFields(); setModalOpen(true); }}>
          Add Doctor
        </Button>
      </div>

      <Table dataSource={filtered} rowKey="id" columns={[
        { title: "Name", dataIndex: "name", sorter: (a: Doctor, b: Doctor) => a.name.localeCompare(b.name) },
        { title: "Specialization", dataIndex: "specialization" },
        { title: "Phone", dataIndex: "phone" },
        { title: "Status", dataIndex: "status", render: (s: string) => <Tag color={statusColors[s]}>{s}</Tag> },
        {
          title: "Actions",
          render: (_: unknown, record: Doctor) => (
            <Space>
              <Button size="small" onClick={() => openEdit(record)}>Edit</Button>
              <Popconfirm title="Delete this doctor?" onConfirm={() => handleDelete(record.id)}>
                <Button size="small" danger>Delete</Button>
              </Popconfirm>
            </Space>
          ),
        },
      ]} />

      <Modal title={editing ? "Edit Doctor" : "Add Doctor"} open={modalOpen} onCancel={() => { setModalOpen(false); setEditing(null); }} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}><Input /></Form.Item>
          <Form.Item name="specialization" label="Specialization" rules={[{ required: true }]}>
            <Select options={specializations.map((s) => ({ value: s, label: s }))} />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="status" label="Status" initialValue="Active">
            <Select options={[{ value: "Active" }, { value: "On Leave" }, { value: "Inactive" }]} />
          </Form.Item>
          <Form.Item><Button type="primary" htmlType="submit" block>Save</Button></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
