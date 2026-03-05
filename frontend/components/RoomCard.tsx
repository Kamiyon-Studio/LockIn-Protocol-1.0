"use client";

import { useState } from "react";

interface RoomCardProps {
  name: string;
  subtitle: string;
  imageUrl?: string;
  gradient?: string;
  defaultOn?: boolean;
}

export function RoomCard({ name, subtitle, imageUrl, gradient = "from-amber-100 to-amber-200", defaultOn = false }: RoomCardProps) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md">
      <div className={`relative aspect-[4/3] w-full bg-gradient-to-br ${gradient}`}>
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
        ) : null}
      </div>
      <div className="flex items-center justify-between p-3">
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={on}
          onClick={() => setOn(!on)}
          className={`relative h-8 w-14 rounded-full transition-colors ${on ? "bg-orange-500" : "bg-gray-300"}`}
        >
          <span
            className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-transform ${on ? "left-7" : "left-1"}`}
          />
        </button>
      </div>
    </div>
  );
}
