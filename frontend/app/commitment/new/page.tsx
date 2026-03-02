"use client";

import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { CreateCommitmentForm } from "@/components/CreateCommitmentForm";

export default function NewCommitmentPage() {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) router.replace("/");
  }, [isConnected, router]);

  if (!isConnected) return null;

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <Link href="/dashboard" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
          Back to dashboard
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
          Create commitment
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Set a goal, time window, and optional partner. No stake on Free tier.
        </p>
      </div>
      <CreateCommitmentForm />
    </div>
  );
}
