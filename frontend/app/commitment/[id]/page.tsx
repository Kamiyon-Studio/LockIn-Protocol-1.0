"use client";

import { useAccount } from "wagmi";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getCommitmentById,
  recordCheckIn,
  resolveCommitment,
  type Commitment,
} from "@/lib/mockCommitments";
import { CheckInUpload } from "@/components/CheckInUpload";
import { SNOWTRACE_FUJI } from "@/lib/constants";

function useCommitment(id: string | undefined) {
  const [commitment, setCommitment] = useState<Commitment | null>(null);
  useEffect(() => {
    if (!id) return;
    setCommitment(getCommitmentById(id) ?? null);
  }, [id]);
  return commitment;
}

function Countdown({ deadline }: { deadline: string }) {
  const [left, setLeft] = useState("");
  useEffect(() => {
    const update = () => {
      const end = new Date(deadline).getTime();
      const now = Date.now();
      if (now >= end) {
        setLeft("Ended");
        return;
      }
      const d = Math.floor((end - now) / 86400);
      const h = Math.floor(((end - now) % 86400) / 3600);
      const m = Math.floor(((end - now) % 3600) / 60);
      setLeft(`${d}d ${h}h ${m}m`);
    };
    update();
    const t = setInterval(update, 60000);
    return () => clearInterval(t);
  }, [deadline]);
  return <span>{left}</span>;
}

export default function CommitmentDetailPage() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const commitment = useCommitment(id);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!isConnected) router.replace("/");
  }, [isConnected, router]);

  useEffect(() => {
    if (id && !commitment && typeof window !== "undefined") {
      const c = getCommitmentById(id);
      if (!c) router.replace("/dashboard");
    }
  }, [id, commitment, router]);

  if (!isConnected || !commitment) return null;

  const isActive = commitment.status === "active";
  const canResolve =
    isActive &&
    (commitment.checkInsDone >= commitment.checkInsRequired ||
      new Date(commitment.deadline) < new Date());

  const handleResolve = (outcome: "success" | "failed") => {
    resolveCommitment(commitment.id, outcome);
    setRefresh((r) => r + 1);
    router.push("/dashboard");
  };

  if (commitment.status !== "active") {
    return (
      <div className="space-y-4">
        <Link href="/history" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
          Back to history
        </Link>
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{commitment.goal}</h1>
          <p
            className={`mt-2 font-medium ${commitment.status === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
          >
            {commitment.status === "success" ? "Success" : "Failed"}
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {commitment.status === "success"
              ? "Stake returned to you (mock)."
              : "Stake sent to partners per contract (mock)."}
          </p>
          <a
            href={`${SNOWTRACE_FUJI}/address/${commitment.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            View on Snowtrace (placeholder)
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href="/dashboard" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
        Back to dashboard
      </Link>
      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">{commitment.goal}</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {commitment.window} · {commitment.checkInsDone}/{commitment.checkInsRequired} check-ins
        </p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Deadline: <Countdown deadline={commitment.deadline} /> (
          {new Date(commitment.deadline).toLocaleString()})
        </p>

        <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-600">
          <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Submit check-in
          </h2>
          <div className="mt-2">
            <CheckInUpload
              commitmentId={commitment.id}
              onSuccess={() => setRefresh((r) => r + 1)}
            />
          </div>
        </div>

        {canResolve && (
          <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-600">
            <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">Resolution</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {commitment.checkInsDone >= commitment.checkInsRequired
                ? "Check-ins met. Resolve as success?"
                : "Deadline passed or check-ins missing. Resolve as failure?"}
            </p>
            <div className="mt-3 flex gap-3">
              <button
                onClick={() => handleResolve("success")}
                className="rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
              >
                Resolve success
              </button>
              <button
                onClick={() => handleResolve("failed")}
                className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
              >
                Resolve failure
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
