"use client";

import { useState } from "react";

/* ================= TYPES ================= */
type Activity = {
  text: string;
  time: string;
};

/* ================= UTIL ================= */
const now = () =>
  new Date().toLocaleString("en-IN", {
    dateStyle: "short",
    timeStyle: "medium",
  });

/* ================= MAIN ================= */
export default function DashboardHome() {
  const loggedInUser = "Sayalisagar";

  const [showAll, setShowAll] = useState(false);

  /* 🔥 ACTIVITY STATE (DYNAMIC) */
  const [activities, setActivities] = useState<Activity[]>([
    {
      text: `${loggedInUser} logged in to Bizonance`,
      time: now(),
    },
  ]);

  /* ================= ACTIVITY HELPER ================= */
  const addActivity = (text: string) => {
    setActivities((prev) => [
      {
        text: `${loggedInUser} ${text}`,
        time: now(),
      },
      ...prev, // newest on top
    ]);
  };

  /* ================= ACTIONS ================= */

  const handleGenerateReport = () => {
    addActivity("exported revenue report to Excel");

    const rows = [
      ["Month", "Revenue (₹k)"],
      ["Aug", 464],
      ["Sep", 468],
      ["Oct", 205],
      ["Nov", 594],
      ["Dec", 522],
      ["Jan", 223],
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], {
      type: "application/vnd.ms-excel",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bizonance_revenue_report.xls";
    a.click();
  };

  const handleCardClick = (title: string) => {
    addActivity(`clicked on ${title}`);
  };

  /* ================= DATA ================= */

  const revenueData = [
    { month: "Aug", value: 464, height: 120 },
    { month: "Sep", value: 468, height: 130 },
    { month: "Oct", value: 205, height: 70 },
    { month: "Nov", value: 594, height: 160 },
    { month: "Dec", value: 522, height: 140 },
    { month: "Jan", value: 223, height: 80, active: true },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-4 space-y-4">

        {/* ================= TOP CARDS ================= */}
        <div className="grid grid-cols-4 gap-4">
          <Card title="Total Forms Submitted" value="1" sub="Today: 0" color="green" onClick={handleCardClick} />
          <Card title="Daily Calls" value="0" sub="Today: 0" color="blue" onClick={handleCardClick} />
          <Card title="Pending Tasks" value="2" sub="Active tasks" color="yellow" onClick={handleCardClick} />
          <Card title="Total Revenue" value="₹25,000" sub="This month: ₹0" color="purple" onClick={handleCardClick} />
        </div>

        {/* ================= LOWER ================= */}
        <div className="grid grid-cols-3 gap-4 h-[320px]">

          {/* ===== Revenue ===== */}
          <div className="col-span-2 bg-white rounded-xl shadow p-4 flex flex-col">
            <div className="flex justify-between mb-2">
              <h2 className="font-semibold">Revenue Overview</h2>
              <button
                onClick={handleGenerateReport}
                className="text-indigo-600 text-sm hover:underline"
              >
                Generate Report
              </button>
            </div>

            <div className="flex items-end justify-between flex-1 px-2">
              {revenueData.map((r) => (
                <div key={r.month} className="text-center">
                  <div
                    className={`w-10 rounded-md ${
                      r.active ? "bg-indigo-600" : "bg-blue-400"
                    }`}
                    style={{ height: r.height }}
                  />
                  <p className="text-xs mt-1">{r.month}</p>
                  <p className="text-xs text-indigo-700">₹{r.value}k</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-2">Active Month: Jan</p>
          </div>

          {/* ===== Activities ===== */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col">
            <div className="flex justify-between mb-3">
              <h2 className="font-semibold">Recent Activities</h2>
              <button
                onClick={() => setShowAll(true)}
                className="text-indigo-600 text-sm hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-2 overflow-hidden">
              {activities.slice(0, 1).map((a, i) => (
                <div key={i} className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm font-medium">{a.text}</p>
                  <p className="text-xs text-gray-500">{a.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= VIEW ALL MODAL ================= */}
      {showAll && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[520px] rounded-xl p-5">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold">All Activities</h2>
              <button onClick={() => setShowAll(false)}>✖</button>
            </div>

            <div className="max-h-[350px] overflow-y-auto">
              {activities.map((a, i) => (
                <div key={i} className="py-3 border-b">
                  <p className="font-medium">{a.text}</p>
                  <p className="text-sm text-gray-500">{a.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= CARD ================= */
function Card({ title, value, sub, color, onClick }: any) {
  return (
    <div
      onClick={() => onClick(title)}
      className="bg-white rounded-xl shadow p-4 cursor-pointer hover:ring-1 hover:ring-gray-300"
    >
      <p className="font-medium">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p className={`text-${color}-600 text-sm`}>{sub}</p>
    </div>
  );
}
