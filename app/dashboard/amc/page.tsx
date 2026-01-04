"use client";

import { useState } from "react";
import { saveData } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";

export default function AMCPage() {
  const loggedInUser = "Sayalisagar";

  const [form, setForm] = useState({
    companyName: "",
    clientName: "",
    contact: "",
    amcType: "Software AMC",
    startDate: "",
    endDate: "",
    amount: "",
    status: "Active",
    notes: "",
  });

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    /* ===== SAVE TO CENTRAL VIEW DATA ===== */

    saveData({
      id: uuidv4(),
      date: new Date().toLocaleDateString(),
      type: "AMC",
      company: form.companyName,
      details: `${form.amcType} | ${form.clientName}`,
      amount: Number(form.amount),
      status: form.status,
      submittedBy: loggedInUser,
    });

    alert("✅ AMC record saved successfully!");

    /* ===== RESET FORM ===== */

    setForm({
      companyName: "",
      clientName: "",
      contact: "",
      amcType: "Software AMC",
      startDate: "",
      endDate: "",
      amount: "",
      status: "Active",
      notes: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          AMC (Annual Maintenance Contract)
        </h1>
        <p className="text-gray-600 mb-6">
          Manage and record AMC details
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <Input label="Company Name" name="companyName" value={form.companyName} onChange={handleChange} />
          <Input label="Client Name" name="clientName" value={form.clientName} onChange={handleChange} />
          <Input label="Contact Number" name="contact" value={form.contact} onChange={handleChange} />

          <Select
            label="AMC Type"
            name="amcType"
            value={form.amcType}
            onChange={handleChange}
            options={["Software AMC", "Hardware AMC", "Full Support AMC"]}
          />

          <Input type="date" label="AMC Start Date" name="startDate" value={form.startDate} onChange={handleChange} />
          <Input type="date" label="AMC End Date" name="endDate" value={form.endDate} onChange={handleChange} />

          <Input type="number" label="AMC Amount (₹)" name="amount" value={form.amount} onChange={handleChange} />

          <Select
            label="AMC Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={["Active", "Expired", "Renewal Due"]}
          />

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Notes / Description
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 h-28"
            />
          </div>

          <div className="md:col-span-2 text-right">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-8 py-2 rounded-lg hover:bg-indigo-700"
            >
              Save AMC
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ================= REUSABLE UI ================= */

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input {...props} className="w-full border rounded-lg px-3 py-2" required />
    </div>
  );
}

function Select({ label, options, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select {...props} className="w-full border rounded-lg px-3 py-2">
        {options.map((op: string) => (
          <option key={op}>{op}</option>
        ))}
      </select>
    </div>
  );
}
