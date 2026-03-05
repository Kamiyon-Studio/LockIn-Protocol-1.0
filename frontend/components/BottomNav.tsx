"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isClimate = pathname === "/climate";
  const isProfile = pathname === "/profile";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t border-gray-200 bg-gray-900 px-6 py-3 shadow-lg">
      <div className="mx-auto flex max-w-lg items-center justify-between">
        <Link
          href="/"
          className={`flex flex-col items-center gap-0.5 rounded-lg px-4 py-2 ${isHome ? "text-orange-400" : "text-gray-400 hover:text-white"}`}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs font-medium">Home</span>
        </Link>
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-orange-400/50 bg-gray-800 ring-4 ring-gray-700">
            <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          </div>
          <span className="mt-1 text-xs text-gray-400">Voice</span>
        </div>
        <Link
          href="/profile"
          className={`flex flex-col items-center gap-0.5 rounded-lg px-4 py-2 ${isProfile ? "text-orange-400" : "text-gray-400 hover:text-white"}`}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-xs font-medium">Profile</span>
        </Link>
      </div>
    </nav>
  );
}
