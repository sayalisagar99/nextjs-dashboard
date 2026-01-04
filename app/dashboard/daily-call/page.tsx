"use client";

import { useState } from "react";
import { saveData } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";

export default function DailyCallPage() {
  const loggedInUser = "Sayalisagar";

  const [form, setForm] = useState({
    callDateTime: "",
    companyName: "",
    contactPerson: "",
    contactNumber: "",
    callType: "Incoming",
    callDuration: "",
    callPurpose: "",
    callOutcome: "",
    nextAction: "",
    followUpDate: "",
    callTakenBy: loggedInUser,
    priority: "Normal",
    callSummary: "",
    topicsDiscussed: "",
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
      date: form.callDateTime || new Date().toLocaleString(),
      type: "Daily Call",
      company: form.companyName,
      details: `${form.callType} | ${form.callOutcome} | Next Action: ${form.nextAction || "-"}`,
      amount: 0,
      status: form.callOutcome || "Pending",
      submittedBy: loggedInUser,
      fullData: form,
    });

    alert("✅ Daily Call record saved successfully!");

    /* ===== RESET FORM ===== */
    setForm({
      callDateTime: "",
      companyName: "",
      contactPerson: "",
      contactNumber: "",
      callType: "Incoming",
      callDuration: "",
      callPurpose: "",
      callOutcome: "",
      nextAction: "",
      followUpDate: "",
      callTakenBy: loggedInUser,
      priority: "Normal",
      callSummary: "",
      topicsDiscussed: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-2">All Daily Call Report</h1>
        <p className="text-gray-600 mb-6">
          Record your daily customer interactions and follow-ups
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Input type="datetime-local" label="Call Date & Time *" name="callDateTime" value={form.callDateTime} onChange={handleChange} />
          <Input label="Company Name *" name="companyName" value={form.companyName} onChange={handleChange} />
          <Input label="Contact Person *" name="contactPerson" value={form.contactPerson} onChange={handleChange} />
          <Input label="Contact Number *" name="contactNumber" value={form.contactNumber} onChange={handleChange} />
          <Select label="Call Type" name="callType" value={form.callType} onChange={handleChange} options={["Incoming","Outgoing"]} />
          <Input type="number" label="Call Duration (minutes)" name="callDuration" value={form.callDuration} onChange={handleChange} />
          <Input label="Call Purpose" name="callPurpose" value={form.callPurpose} onChange={handleChange} />
          <Input label="Call Outcome" name="callOutcome" value={form.callOutcome} onChange={handleChange} />
          <Input label="Next Action Required" name="nextAction" value={form.nextAction} onChange={handleChange} />
          <Input type="date" label="Follow-up Date" name="followUpDate" value={form.followUpDate} onChange={handleChange} />
          <Input label="Call Taken By *" name="callTakenBy" value={form.callTakenBy} onChange={handleChange} readOnly />
          <Select label="Priority" name="priority" value={form.priority} onChange={handleChange} options={["High","Normal","Low"]} />
          <Textarea label="Call Summary *" name="callSummary" value={form.callSummary} onChange={handleChange} className="md:col-span-2" />
          <Textarea label="Topics Discussed" name="topicsDiscussed" value={form.topicsDiscussed} onChange={handleChange} className="md:col-span-2" />

          <div className="md:col-span-2 flex justify-between">
            <button
              type="reset"
              onClick={() =>
                setForm({
                  callDateTime: "",
                  companyName: "",
                  contactPerson: "",
                  contactNumber: "",
                  callType: "Incoming",
                  callDuration: "",
                  callPurpose: "",
                  callOutcome: "",
                  nextAction: "",
                  followUpDate: "",
                  callTakenBy: loggedInUser,
                  priority: "Normal",
                  callSummary: "",
                  topicsDiscussed: "",
                })
              }
              className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
            >
              Clear Form
            </button>

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Save Call Report
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
