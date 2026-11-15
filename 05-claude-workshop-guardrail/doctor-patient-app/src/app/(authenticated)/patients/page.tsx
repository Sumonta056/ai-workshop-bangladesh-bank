"use client";

import { useEffect, useState } from "react";
import { Table, Button, Input, Modal, Form, Select, Space, Popconfirm, App } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  bloodGroup: string;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Patient | null>(null);
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const load = () => fetch("/api/patients").then((r) => r.json()).then(setPatients);
  useEffect(() => { load(); }, []);

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async (values: Omit<Patient, "id">) => {
    if (editing) {
      await fetch("/api/patients", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, ...values }) });
      message.success("Patient updated");
    } else {
      await fetch("/api/patients", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      message.success("Patient added");
    }
    setModalOpen(false);
    setEditing(null);
    form.resetFields();
    load();
  };

  const handleDelete = async (id: number) => {
    await fetch("/api/patients", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    message.success("Patient deleted");
    load();
  };

  const openEdit = (pat: Patient) => {
    setEditing(pat);
    form.setFieldsValue(pat);
    setModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input prefix={<SearchOutlined />} placeholder="Search patients..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditing(null); form.resetFields(); setModalOpen(true); }}>
          Add Patient
        </Button>
      </div>

      <Table dataSource={filtered} rowKey="id" columns={[
        { title: "Name", dataIndex: "name", sorter: (a: Patient, b: Patient) => a.name.localeCompare(b.name) },
        { title: "Email", dataIndex: "email" },
        { title: "Phone", dataIndex: "phone" },
        { title: "Gender", dataIndex: "gender" },
        { title: "Blood Group", dataIndex: "bloodGroup" },
        {
          title: "Actions",
          render: (_: unknown, record: Patient) => (
            <Space>
              <Button size="small" onClick={() => openEdit(record)}>Edit</Button>
              <Popconfirm title="Delete this patient?" onConfirm={() => handleDelete(record.id)}>
                <Button size="small" danger>Delete</Button>
              </Popconfirm>
            </Space>
          ),
        },
      ]} />

      <Modal title={editing ? "Edit Patient" : "Add Patient"} open={modalOpen} onCancel={() => { setModalOpen(false); setEditing(null); }} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}><Input /></Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="dateOfBirth" label="Date of Birth" rules={[{ required: true }]}><Input type="date" /></Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select options={[{ value: "Male" }, { value: "Female" }, { value: "Other" }]} />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="bloodGroup" label="Blood Group" rules={[{ required: true }]}>
            <Select options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((v) => ({ value: v, label: v }))} />
          </Form.Item>
          <Form.Item><Button type="primary" htmlType="submit" block>Save</Button></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
