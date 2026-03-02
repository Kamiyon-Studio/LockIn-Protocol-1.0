"use client";

import { useAccount } from "wagmi";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getActiveCommitments } from "@/lib/mockCommitments";
import { CommitmentCard } from "@/components/CommitmentCard";
import { UpgradePrompt } from "@/components/UpgradePrompt";
import { MAX_FREE_COMMITMENTS } from "@/lib/constants";

export default function DashboardPage() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const pathname = usePathname();
  const [commitments, setCommitments] = useState<ReturnType<typeof getActiveCommitments>>([]);

  useEffect(() => {
    if (!isConnected) {
      router.replace("/");
      return;
    }
    setCommitments(getActiveCommitments());
  }, [isConnected, router, pathname]);

  if (!isConnected) return null;

  const atLimit = commitments.length >= MAX_FREE_COMMITMENTS;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        {!atLimit && (
          <Link
            href="/commitment/new"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Create commitment
          </Link>
        )}
      </div>

      {atLimit && (
        <UpgradePrompt reason="commitments" />
      )}

      {commitments.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-600">
          <p className="text-gray-500 dark:text-gray-400">No active commitments yet.</p>
          <Link
            href="/commitment/new"
            className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            Create your first commitment
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
