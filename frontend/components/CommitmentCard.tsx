"use client";

import Link from "next/link";
import type { Commitment } from "@/lib/mockCommitments";

interface CommitmentCardProps {
  commitment: Commitment;
}

export function CommitmentCard({ commitment }: CommitmentCardProps) {
  const isActive = commitment.status === "active";
  const progress =
    commitment.checkInsRequired > 0
      ? `${commitment.checkInsDone}/${commitment.checkInsRequired} check-ins`
      : "No check-ins";

  return (
    <Link
      href={`/commitment/${commitment.id}`}
      className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
    >
      <h3 className="font-medium text-gray-900 dark:text-white">{commitment.goal}</h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {commitment.window} · {progress}
      </p>
      {commitment.deadline && (
        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          Deadline: {new Date(commitment.deadline).toLocaleString()}
        </p>
      )}
      {!isActive && (
        <p
          className={`mt-2 text-sm font-medium ${commitment.status === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
        >
          {commitment.status === "success" ? "Success" : "Failed"}
        </p>
      )}
    </Link>
  );
}
