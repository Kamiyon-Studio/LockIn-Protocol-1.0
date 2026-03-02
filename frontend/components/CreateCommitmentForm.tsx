"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addCommitment, getActiveCommitments } from "@/lib/mockCommitments";
import { MAX_FREE_COMMITMENTS, MAX_FREE_PARTNERS } from "@/lib/constants";
import { UpgradePrompt } from "./UpgradePrompt";
import { PartnerInvite } from "./PartnerInvite";

const CHECK_IN_TOOLTIP = "e.g. one photo per day; verified by our system (mock in prototype).";
const PARTNER_TOOLTIP = "Invite via magic link or wallet; they receive a share of your stake if you fail (Free: 1 partner).";

export function CreateCommitmentForm() {
  const router = useRouter();
  const [goal, setGoal] = useState("");
  const [windowType, setWindowType] = useState("daily");
  const [deadline, setDeadline] = useState("");
  const [checkInsRequired, setCheckInsRequired] = useState(1);
  const [partner, setPartner] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!goal.trim()) {
      setError("Goal is required.");
      return;
    }
    const activeCount = getActiveCommitments().length;
    if (activeCount >= MAX_FREE_COMMITMENTS) {
      setError("Free tier limit: 3 active commitments. Upgrade to add more.");
      return;
    }
    const d = deadline || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16);
    const commitment = addCommitment({
      goal: goal.trim(),
      window: windowType,
      deadline: new Date(d).toISOString(),
      checkInsRequired,
      partner: partner.trim() || undefined,
      status: "active",
    });
    router.push(`/commitment/${commitment.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Goal
          <span className="ml-1 text-gray-400" title="e.g. No Instagram 8h, study 4 hours">
            (i)
          </span>
        </label>
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g. No social media until 8pm"
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Time window
        </label>
        <select
          value={windowType}
          onChange={(e) => setWindowType(e.target.value)}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Deadline (local)
        </label>
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Check-ins required
          <span className="ml-1 text-gray-400" title={CHECK_IN_TOOLTIP}>
            (i)
          </span>
        </label>
        <input
          type="number"
          min={0}
          max={10}
          value={checkInsRequired}
          onChange={(e) => setCheckInsRequired(Number(e.target.value))}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="rounded border border-amber-200 bg-amber-50 p-2 dark:border-amber-800 dark:bg-amber-900/20">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          Stake: Free tier does not support staking. Upgrade to Starter ($4.99/mo) to add stakes.
        </p>
      </div>

      <PartnerInvite
        value={partner}
        onChange={setPartner}
        tooltip={PARTNER_TOOLTIP}
      />

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

      <button
        type="submit"
        className="w-full rounded bg-blue-600 py-2 font-medium text-white hover:bg-blue-700"
      >
        Create commitment
      </button>
    </form>
  );
}
