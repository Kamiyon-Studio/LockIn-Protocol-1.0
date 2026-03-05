"use client";

import { useState } from "react";

type Tab = "rooms" | "devices";

export function SegmentTabs() {
  const [active, setActive] = useState<Tab>("rooms");
  return (
    <div className="inline-flex rounded-xl bg-gray-200/80 p-1">
      <button
        type="button"
        onClick={() => setActive("rooms")}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${active === "rooms" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
      >
        Rooms
      </button>
      <button
        type="button"
        onClick={() => setActive("devices")}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${active === "devices" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
      >
        Devices
      </button>
    </div>
  );
}
