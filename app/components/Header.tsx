"use client";

import Image from "next/image";
import { useState } from "react";

export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <>
      <div className="bg-white border-b relative z-40">
        <header className="h-16 px-6 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            {/* ✅ TOGGLE BUTTON */}
            <i
              className="fas fa-bars text-xl text-gray-700 cursor-pointer"
              onClick={toggleSidebar}
            ></i>
            <h1 className="text-blue-600 text-xl font-semibold">
              Bizonance
            </h1>
          </div>

          {/* RIGHT LOGO */}
          <div className="relative">
            <Image
              src="/logo.png.jpeg"
              alt="Bizonance Logo"
              width={36}
              height={36}
              className="cursor-pointer hover:scale-105 transition"
              onClick={() => setOpenProfile(true)}
            />

            {openProfile && (
              <div
                className="absolute right-0 mt-3 w-[340px] bg-white rounded-xl shadow-xl border p-4 z-50"
                onClick={(e) => e.stopPropagation()}
              >
                {/* PROFILE CONTENT (UNCHANGED) */}
                <div className="flex items-center gap-3 mb-3">
                  <Image src="/logo.png.jpeg" alt="Bizonance" width={40} height={40} />
                  <div>
                    <h2 className="font-bold text-lg">BIZONANCE</h2>
                    <p className="text-sm text-gray-500">
                      Business Intelligence Solutions
                    </p>
                  </div>
                </div>

                <hr className="mb-3" />

                <div className="space-y-2 text-sm">
                  <Info label="Owner" value="Pratik Gawande" />
                  <Info label="Contact" value="+91 89567 27311" />
                  <Info label="Email" value="bizonance@gmail.com" />
                  <Info label="Location" value="Amravati, India" />
                  <Info
                    label="Address"
                    value="2nd Floor, Shilangan Rd, Saturna, Amravati, Maharashtra 444605"
                  />
                </div>

                <hr className="my-3" />

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-blue-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500">Total Forms</p>
                    <p className="font-bold text-blue-600">3</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500">Total Revenue</p>
                    <p className="font-bold text-green-600">₹1,03,000</p>
                  </div>
                </div>

                <hr className="my-3" />

                <p className="text-xs text-gray-600 leading-relaxed">
                  BiZONANCE provides business intelligence solutions to track sales,
                  manage data, and improve decision-making. Established in 2017,
                  registered trademark under IP India.
                </p>

                <div className="text-right mt-3">
                  <button
                    onClick={() => setOpenProfile(false)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* COLOR STRIP */}
        <div className="h-1 w-full flex">
          <div className="flex-1 bg-yellow-400"></div>
          <div className="flex-1 bg-orange-400"></div>
          <div className="flex-1 bg-blue-500"></div>
          <div className="flex-1 bg-red-500"></div>
        </div>
      </div>

      {/* OVERLAY */}
      {openProfile && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpenProfile(false)}
        />
      )}
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-800 text-right">{value}</span>
    </div>
  );
}
