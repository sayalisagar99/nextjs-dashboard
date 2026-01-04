"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname(); // current route
  const router = useRouter();
  const [active, setActive] = useState<string>("");

  const handleLogout = () => {
    setActive("logout");      // mark logout as active
    router.push("/");         // redirect to welcome page
  };

  // Helper function to determine active link
  const isActive = (path: string) => {
    return pathname === path || active === path;
  };

  return (
    <aside className="h-full p-4 bg-white shadow-lg flex flex-col justify-between">
      <nav className="space-y-2 flex-1">

        {/* Home Tab */}
        <Link
          href="/dashboard/home"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${
            isActive("/dashboard/home") ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
          }`}
          onClick={() => setActive("/dashboard/home")}
        >
          <i className="fas fa-home"></i>
          <span>Home</span>
        </Link>

        {/* New Data Tab */}
        <Link
          href="/dashboard/new-data"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${
            isActive("/dashboard/new-data") ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
          }`}
          onClick={() => setActive("/dashboard/new-data")}
        >
          <i className="fas fa-chart-bar"></i>
          <span>New Data</span>
        </Link>

        {/* Daily Call Tab */}
        <Link
          href="/dashboard/daily-call"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${
            isActive("/dashboard/daily-call") ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
          }`}
          onClick={() => setActive("/dashboard/daily-call")}
        >
          <i className="fas fa-phone"></i>
          <span>Daily Call</span>
        </Link>

        {/* Sales Report Tab */}
        <Link
          href="/dashboard/sales-report"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${
            isActive("/dashboard/sales-report") ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
          }`}
          onClick={() => setActive("/dashboard/sales-report")}
        >
          <i className="fas fa-chart-line"></i>
          <span>Sales Report</span>
        </Link>

        {/* AMC Tab */}
        <Link
          href="/dashboard/amc"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${
            isActive("/dashboard/amc") ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
          }`}
          onClick={() => setActive("/dashboard/amc")}
        >
          <i className="fas fa-cogs"></i>
          <span>AMC</span>
        </Link>

        {/* Task Board Tab */}
        <Link
          href="/dashboard/task-board"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${
            isActive("/dashboard/task-board") ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
          }`}
          onClick={() => setActive("/dashboard/task-board")}
        >
          <i className="fas fa-tasks"></i>
          <span>Task Board</span>
        </Link>

        {/* View Data Tab */}
        <Link
          href="/dashboard/view-data"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${
            isActive("/dashboard/view-data") ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
          }`}
          onClick={() => setActive("/dashboard/view-data")}
        >
          <i className="fas fa-eye"></i>
          <span>View Data</span>
        </Link>

      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className={`flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 w-full mt-4 font-medium ${
          active === "logout" ? "bg-red-200" : "hover:bg-red-50"
        }`}
      >
        <i className="fas fa-sign-out-alt"></i>
        <span>Logout</span>
      </button>
    </aside>
  );
}
