"use client";

import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getResolvedCommitments } from "@/lib/mockCommitments";
import { CommitmentCard } from "@/components/CommitmentCard";

export default function HistoryPage() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [commitments, setCommitments] = useState<ReturnType<typeof getResolvedCommitments>>([]);

  useEffect(() => {
    if (!isConnected) {
      router.replace("/");
      return;
    }
    setCommitments(getResolvedCommitments());
  }, [isConnected, router]);

  if (!isConnected) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">History</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Past commitments and resolution outcomes (mock data).
      </p>
      {commitments.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-600">
          <p className="text-gray-500 dark:text-gray-400">No resolved commitments yet.</p>
          <Link
            href="/dashboard"
            className="mt-4 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            Go to dashboard
          </Link>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {commitments.map((c) => (
            <li key={c.id}>
              <CommitmentCard commitment={c} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
