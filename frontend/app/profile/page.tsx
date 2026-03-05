import { BottomNav } from "@/components/BottomNav";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <header className="border-b border-gray-200/60 bg-white/80 px-4 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Profile</h1>
        </div>
      </header>
      <main className="mx-auto max-w-lg px-4 py-8">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-gray-500">Profile settings (placeholder).</p>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
