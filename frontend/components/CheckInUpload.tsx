"use client";

import { useState } from "react";

interface CheckInUploadProps {
  onSuccess: () => void;
  commitmentId: string;
}

export function CheckInUpload({ onSuccess, commitmentId }: CheckInUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "verifying" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setStatus("verifying");
    // Mock: 1–2s delay then success
    await new Promise((r) => setTimeout(r, 1500));
    try {
      const { recordCheckIn } = await import("@/lib/mockCommitments");
      recordCheckIn(commitmentId);
      setStatus("done");
      onSuccess();
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <p className="rounded bg-green-100 py-2 text-center text-sm font-medium text-green-800 dark:bg-green-900/30 dark:text-green-200">
        Check-in recorded.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Upload photo (mock verification)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-2 file:rounded file:border-0 file:bg-blue-50 file:px-3 file:py-1 file:text-blue-700 dark:file:bg-blue-900/30 dark:file:text-blue-300"
        />
      </div>
      <button
        type="submit"
        disabled={!file || status === "verifying"}
        className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {status === "verifying" ? "Verifying…" : "Submit check-in"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
