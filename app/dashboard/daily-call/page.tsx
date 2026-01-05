"use client";

import { useState } from "react";

export default function DailyCallPage() {
  const [form, setForm] = useState({
    callDateTime: "",
    companyName: "",
    contactPerson: "",
    contactNumber: "",
    callType: "",
    callDuration: "",
    callPurpose: "",
    callOutcome: "",
    nextAction: "",
    followUpDate: "",
    callTakenBy: "", // now editable
    priority: "",
    callSummary: "",
    topicsDiscussed: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("✅ Daily Call Data Saved Successfully");
    console.log(form);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Daily Call Report</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Call Date & Time"
            type="datetime-local"
            name="callDateTime"
            value={form.callDateTime}
            onChange={handleChange}
            required
          />

          <Input
            label="Company Name"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            required
          />

          <Input
            label="Contact Person"
            name="contactPerson"
            value={form.contactPerson}
            onChange={handleChange}
            required
          />

          <Input
            label="Contact Number"
            type="tel"
            name="contactNumber"
            value={form.contactNumber}
            onChange={handleChange}
            required
          />

          <Select
            label="Call Type"
            name="callType"
            value={form.callType}
            onChange={handleChange}
            options={["Inbound Call", "Outbound Call", "Follow Up"]}
          />

          <Input
            label="Call Duration (minutes)"
            type="number"
            name="callDuration"
            value={form.callDuration}
            onChange={handleChange}
          />

          <Textarea
            label="Call Purpose"
            name="callPurpose"
            value={form.callPurpose}
            onChange={handleChange}
          />

          <Select
            label="Call Outcome"
            name="callOutcome"
            value={form.callOutcome}
            onChange={handleChange}
            options={["Positive", "Negative", "Neutral"]}
          />

          <Textarea
            label="Next Action Required"
            name="nextAction"
            value={form.nextAction}
            onChange={handleChange}
          />

          <Input
            label="Follow-up Date"
            type="date"
            name="followUpDate"
            value={form.followUpDate}
            onChange={handleChange}
          />

          <Input
            label="Call Taken By"
            name="callTakenBy"
            value={form.callTakenBy}
            onChange={handleChange} // editable now
          />

          <Select
            label="Priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
            options={["Low", "Medium", "High"]}
          />

          <Textarea
            label="Call Summary"
            name="callSummary"
            value={form.callSummary}
            onChange={handleChange}
          />

          <Textarea
            label="Topics Discussed"
            name="topicsDiscussed"
            value={form.topicsDiscussed}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Save Call Report
          </button>
        </form>
      </div>
    </div>
  );
}

/* ================= Reusable Components ================= */

function Input({
  label,
  ...props
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        {...props}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
      />
    </div>
  );
}

function Select({
  label,
  options,
  ...props
}: {
  label: string;
  options: string[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        {...props}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
      >
        <option value="">Select</option>
        {options.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}

function Textarea({
  label,
  ...props
}: {
  label: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea
        {...props}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
        rows={4}
      />
    </div>
  );
}
