import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { WalletConnect } from "@/components/WalletConnect";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LockIn Protocol",
  description: "Habit-tracking and accountability with optional AVAX stakes on Avalanche",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Providers>
          <header className="border-b border-gray-200 dark:border-gray-700">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
              <nav className="flex items-center gap-6">
                <Link href="/" className="font-semibold text-gray-900 dark:text-white">
                  LockIn
                </Link>
                <Link
                  href="/dashboard"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Dashboard
                </Link>
                <Link
                  href="/history"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  History
                </Link>
                <a
                  href="https://build.avax.network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Help
                </a>
              </nav>
              <WalletConnect />
            </div>
          </header>
          <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
