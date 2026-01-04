"use client";

import { useState } from "react";
import { saveData } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";

export default function NewDataPage() {
  const loggedInUser = "Sayalisagar";

  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    businessType: "",
    industry: "",
    annualRevenue: "",
    employeeCount: "",
    location: "",
    website: "",
    leadSource: "",
    leadStatus: "New",
    products: [] as string[],
    notes: "",
  });

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  /* ================= CHECKBOX HANDLER ================= */

  const handleCheckbox = (value: string) => {
    setForm((prev) => ({
      ...prev,
      products: prev.products.includes(value)
        ? prev.products.filter((v) => v !== value)
        : [...prev.products, value],
    }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    saveData({
      id: uuidv4(),
      date: new Date().toLocaleDateString(),
      type: "New Data",
      company: form.companyName,
      details: `${form.contactPerson} | ${form.phone}`,
      amount: Number(form.annualRevenue || 0),
      status: form.leadStatus,
      submittedBy: loggedInUser,
      fullData: form,
    });

    alert("✅ New Business Data saved successfully!");

    setForm({
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      businessType: "",
      industry: "",
      annualRevenue: "",
      employeeCount: "",
      location: "",
      website: "",
      leadSource: "",
      leadStatus: "New",
      products: [],
      notes: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">

        <h1 className="text-2xl font-bold mb-1">New Data Entry</h1>
        <p className="text-gray-600 mb-6">
          Add new business data to the Bizonance system
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <Input label="Company Name *" name="companyName" value={form.companyName} onChange={handleChange} />
          <Input label="Contact Person *" name="contactPerson" value={form.contactPerson} onChange={handleChange} />
          <Input type="email" label="Email Address" name="email" value={form.email} onChange={handleChange} />
          <Input label="Phone Number *" name="phone" value={form.phone} onChange={handleChange} />

          <Select
            label="Business Type"
            name="businessType"
            value={form.businessType}
            onChange={handleChange}
            options={["Startup", "SME", "Enterprise"]}
          />

          <Input label="Industry" name="industry" value={form.industry} onChange={handleChange} />
          <Input type="number" label="Annual Revenue (₹)" name="annualRevenue" value={form.annualRevenue} onChange={handleChange} />
          <Input type="number" label="Employee Count" name="employeeCount" value={form.employeeCount} onChange={handleChange} />
          <Input label="Location" name="location" value={form.location} onChange={handleChange} />
          <Input label="Website" name="website" value={form.website} onChange={handleChange} />

          <Select
            label="Lead Source"
            name="leadSource"
            value={form.leadSource}
            onChange={handleChange}
            options={["Website", "Referral", "Cold Call", "Social Media", "Other"]}
          />

          <Select
            label="Lead Status"
            name="leadStatus"
            value={form.leadStatus}
            onChange={handleChange}
            options={["New", "Contacted", "Interested", "Converted", "Lost"]}
          />

          {/* PRODUCTS */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Products / Services Interested
            </label>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "Business Analytics",
                "CRM Software",
                "ERP Solutions",
                "Cloud Services",
                "Consulting",
                "Training",
              ].map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.products.includes(item)}
                    onChange={() => handleCheckbox(item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* NOTES */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 h-28"
              placeholder="Enter any additional notes or observations"
            />
          </div>

          {/* BUTTONS */}
          <div className="md:col-span-2 flex justify-between">
            <button
              type="reset"
              onClick={() =>
                setForm({
                  companyName: "",
                  contactPerson: "",
                  email: "",
                  phone: "",
                  businessType: "",
                  industry: "",
                  annualRevenue: "",
                  employeeCount: "",
                  location: "",
                  website: "",
                  leadSource: "",
                  leadStatus: "New",
                  products: [],
                  notes: "",
                })
              }
              className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
            >
              Clear Form
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700"
            >
              Submit Data
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
      <input
        {...props}
        className="w-full border rounded-lg px-3 py-2"
        required={label.includes("*")}
      />
    </div>
  );
}

function Select({ label, options, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select {...props} className="w-full border rounded-lg px-3 py-2">
        <option value="">Select</option>
        {options.map((op: string) => (
          <option key={op}>{op}</option>
        ))}
      </select>
    </div>
  );
}
