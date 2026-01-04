"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Sidebar toggle state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // ✅ Toggle function
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      
      {/* HEADER – PASS toggleSidebar */}
      <Header toggleSidebar={toggleSidebar} />

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* SIDEBAR */}
        {isSidebarOpen && (
          <aside className="w-64 bg-white border-r">
            <Sidebar />
          </aside>
        )}

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}
