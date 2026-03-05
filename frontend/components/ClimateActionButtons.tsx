"use client";

import { useState } from "react";

type Action = "mode" | "fan" | "timer" | "data";

const ACTIONS: { id: Action; label: string; icon: React.ReactNode }[] = [
  {
    id: "mode",
    label: "MODE",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    id: "fan",
    label: "FAN",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "timer",
    label: "TIMER",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "data",
    label: "DATA",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

export function ClimateActionButtons() {
  const [selected, setSelected] = useState<Action>("mode");
  return (
    <div className="flex justify-between gap-2">
      {ACTIONS.map(({ id, label, icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => setSelected(id)}
          className={`flex flex-1 flex-col items-center gap-2 rounded-2xl p-4 transition ${
            selected === id
              ? "bg-orange-500 text-white shadow-md"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          {icon}
          <span className="text-xs font-semibold">{label}</span>
        </button>
      ))}
    </div>
  );
}
