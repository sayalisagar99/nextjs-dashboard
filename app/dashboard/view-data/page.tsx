"use client";

import { useEffect, useState } from "react";
import {
  Eye,
  Trash2,
  RefreshCw,
  FileSpreadsheet,
} from "lucide-react";
import { getAllData, deleteData } from "@/lib/storage";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ViewDataPage() {
  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState("All Data");

  /* ================= LOAD ================= */
  const loadData = () => {
    setData(getAllData());
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ================= FILTER ================= */
  const filtered =
    filter === "All Data"
      ? data
      : data.filter((d) => d.type === filter);

  /* ================= EXPORT ================= */
  const exportExcel = () => {
    if (filtered.length === 0) return alert("No data to export");

    // Prepare data for Excel
    const excelData = filtered.map((d) => ({
      Date: d.date,
      Type: d.type,
      "Name / Company": d.company,
      Details: d.details,
      "Amount / Value": d.amount ? `₹${d.amount}` : "-",
      Status: d.status,
      "Submitted By": d.submittedBy,
    }));

    // Create worksheet and workbook
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "View Data");

    // Export to Excel
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "bizonance-view-data.xlsx");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-xl shadow p-6">

        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">View Data</h1>
            <p className="text-gray-500">
              View all submitted forms and records
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-lg px-4 py-2"
            >
              <option>All Data</option>
              <option>New Data</option>
              <option>Call</option>
              <option>Sales Report</option>
              <option>AMC</option>
            </select>

            <button
              onClick={exportExcel}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <FileSpreadsheet size={18} />
              Export Excel
            </button>

            <button
              onClick={() => {
                setFilter("All Data");
                loadData();
              }}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Name/Company</th>
                <th className="p-3 text-left">Details</th>
                <th className="p-3 text-left">Amount/Value</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Submitted By</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-gray-500">
                    No data found
                  </td>
                </tr>
              )}

              {filtered.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-3">{item.date}</td>

                  <td className="p-3">
                    <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs">
                      {item.type}
                    </span>
                  </td>

                  <td className="p-3 font-medium">{item.company}</td>

                  <td className="p-3">{item.details}</td>

                  <td className="p-3">
                    {item.amount ? `₹${item.amount}` : "-"}
                  </td>

                  <td className="p-3">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                      {item.status}
                    </span>
                  </td>

                  <td className="p-3">{item.submittedBy}</td>

                  <td className="p-3">
                    <div className="flex justify-center gap-3">
                      <button
                        title="View"
                        className="text-indigo-600 hover:scale-110"
                        onClick={() =>
                          alert(JSON.stringify(item, null, 2))
                        }
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        title="Delete"
                        className="text-red-600 hover:scale-110"
                        onClick={() => {
                          if (confirm("Delete record?")) {
                            deleteData(item.id);
                            loadData();
                          }
                        }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <p>Showing {filtered.length} entries</p>

          <div className="flex gap-2">
            <button className="border px-3 py-1 rounded">«</button>
            <button className="bg-indigo-600 text-white px-3 py-1 rounded">
              1
            </button>
            <button className="border px-3 py-1 rounded">»</button>
          </div>
        </div>
      </div>
    </div>
  );
}
