import Link from "next/link";
import { WeatherCard } from "@/components/WeatherCard";
import { SegmentTabs } from "@/components/SegmentTabs";
import { RoomCard } from "@/components/RoomCard";
import { BottomNav } from "@/components/BottomNav";

const ROOMS = [
  { name: "Kitchen", subtitle: "3 active", gradient: "from-amber-100 to-orange-200", defaultOn: true },
  { name: "Lounge", subtitle: "12 total", gradient: "from-slate-200 to-slate-300", defaultOn: false },
  { name: "Bedroom", subtitle: "5 active", gradient: "from-blue-100 to-indigo-200", defaultOn: false },
  { name: "Office", subtitle: "2 total", gradient: "from-emerald-100 to-teal-200", defaultOn: false },
];

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <header className="border-b border-gray-200/60 bg-white/80 px-4 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Overview</h1>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-sm text-gray-500">Household</span>
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-7 w-7 rounded-full border-2 border-white bg-gray-300"
                    title={`User ${i}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Settings"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-6">
        <WeatherCard />
        <div className="mt-6">
          <SegmentTabs />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {ROOMS.map((room) => (
            <RoomCard
              key={room.name}
              name={room.name}
              subtitle={room.subtitle}
              gradient={room.gradient}
              defaultOn={room.defaultOn}
            />
          ))}
        </div>
        <div className="mt-6">
          <Link
            href="/climate"
            className="block rounded-2xl border-2 border-dashed border-gray-300 bg-white/50 py-6 text-center text-sm font-medium text-gray-600 hover:border-orange-400 hover:bg-orange-50/50 hover:text-orange-600"
          >
            Open Climate Control
          </Link>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
