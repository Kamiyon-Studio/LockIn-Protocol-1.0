import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Home",
  description: "Household overview and climate control",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
