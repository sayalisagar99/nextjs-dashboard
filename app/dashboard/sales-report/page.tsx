"use client";

import { useState } from "react";
import { saveData } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";

export default function SalesReportPage() {
  const loggedInUser = "Sayalisagar";

  const [form, setForm] = useState({
    reportDateTime: "",
    companyName: "",
    salesExecutive: "",
    reportPeriod: "This Month",
    dealStatus: "Open",
    expectedAmount: "",
    finalAmount: "",
    productsServices: "",
    notes: "",
    followUpAction: "",
    priority: "Normal",
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
      date: form.reportDateTime || new Date().toLocaleString(),
      type: "Sales Report",
      company: form.companyName,
      details: `${form.productsServices} | Expected: ₹${form.expectedAmount} | Final: ₹${form.finalAmount}`,
      amount: Number(form.finalAmount || form.expectedAmount || 0),
      status: form.dealStatus,
      submittedBy: loggedInUser,
      fullData: form,
    });

    alert("✅ Sales report saved successfully!");

    /* ===== RESET FORM ===== */
    setForm({
      reportDateTime: "",
      companyName: "",
      salesExecutive: "",
      reportPeriod: "This Month",
      dealStatus: "Open",
      expectedAmount: "",
      finalAmount: "",
      productsServices: "",
      notes: "",
      followUpAction: "",
      priority: "Normal",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-2">Sales Report</h1>
        <p className="text-gray-600 mb-6">
          Submit detailed sales performance report
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Input type="datetime-local" label="Report Date & Time *" name="reportDateTime" value={form.reportDateTime} onChange={handleChange} />
          <Input label="Company Name *" name="companyName" value={form.companyName} onChange={handleChange} />
          <Input label="Sales Executive *" name="salesExecutive" value={form.salesExecutive} onChange={handleChange} />
          <Select label="Report Period" name="reportPeriod" value={form.reportPeriod} onChange={handleChange} options={["This Week","This Month","This Quarter"]} />
          <Select label="Deal Status" name="dealStatus" value={form.dealStatus} onChange={handleChange} options={["Open","Closed","Lost"]} />
          <Input type="number" label="Expected Amount (₹)" name="expectedAmount" value={form.expectedAmount} onChange={handleChange} />
          <Input type="number" label="Final Amount (₹)" name="finalAmount" value={form.finalAmount} onChange={handleChange} />
          <Input label="Products / Services Sold" name="productsServices" value={form.productsServices} onChange={handleChange} />
          <Textarea label="Sales Summary / Notes" name="notes" value={form.notes} onChange={handleChange} className="md:col-span-2" />
          <Input label="Follow-up Action" name="followUpAction" value={form.followUpAction} onChange={handleChange} />
          <Select label="Priority" name="priority" value={form.priority} onChange={handleChange} options={["High","Normal","Low"]} />

          <div className="md:col-span-2 flex justify-between">
            <button
              type="reset"
              onClick={() =>
                setForm({
                  reportDateTime: "",
                  companyName: "",
                  salesExecutive: "",
                  reportPeriod: "This Month",
                  dealStatus: "Open",
                  expectedAmount: "",
                  finalAmount: "",
                  productsServices: "",
                  notes: "",
                  followUpAction: "",
                  priority: "Normal",
                })
              }
              className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
            >
              Clear Form
            </button>

            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
            >
              Save Sales Report
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
      <input {...props} className="w-full border rounded px-3 py-2" required={props.required} />
    </div>
  );
}

function Select({ label, options, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select {...props} className="w-full border rounded px-3 py-2">
        {options.map((op: string) => <option key={op}>{op}</option>)}
      </select>
    </div>
  );
}

function Textarea({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea {...props} className="w-full border rounded px-3 py-2 h-24" />
    </div>
  );
}
