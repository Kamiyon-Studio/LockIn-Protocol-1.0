"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useEffect, useState } from "react";

const PROFILE_KEY = "lockin_profile";

export interface Profile {
  name: string;
  photoUrl: string;
}

function loadProfile(): Profile {
  if (typeof window === "undefined") return { name: "", photoUrl: "" };
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : { name: "", photoUrl: "" };
  } catch {
    return { name: "", photoUrl: "" };
  }
}

function saveProfile(p: Profile) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
}

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [profile, setProfile] = useState<Profile>({ name: "", photoUrl: "" });
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  const updateProfile = (p: Partial<Profile>) => {
    const next = { ...profile, ...p };
    setProfile(next);
    saveProfile(next);
  };

  if (!isConnected) {
    return (
      <div className="flex items-center gap-2">
        {connectors.map((c) => (
          <button
            key={c.uid}
            onClick={() => connect({ connector: c })}
            disabled={isPending}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? "Connecting…" : "Connect wallet"}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {editOpen ? (
        <div className="flex items-center gap-2 rounded border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-800">
          <input
            type="text"
            placeholder="Name"
            value={profile.name}
            onChange={(e) => updateProfile({ name: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 dark:border-gray-600 dark:bg-gray-700"
          />
          <input
            type="text"
            placeholder="Photo URL"
            value={profile.photoUrl}
            onChange={(e) => updateProfile({ photoUrl: e.target.value })}
            className="w-32 rounded border border-gray-300 px-2 py-1 dark:border-gray-600 dark:bg-gray-700"
          />
          <button
            onClick={() => setEditOpen(false)}
            className="rounded bg-gray-200 px-2 py-1 text-sm dark:bg-gray-600"
          >
            Done
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-600"
          title="Edit profile"
        >
          {profile.photoUrl ? (
            <img src={profile.photoUrl} alt="" className="h-6 w-6 rounded-full object-cover" />
          ) : (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 text-xs dark:bg-gray-600">
              {profile.name?.slice(0, 1) || "?"}
            </span>
          )}
          <span>{profile.name || "Profile"}</span>
        </button>
      )}
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {address?.slice(0, 6)}…{address?.slice(-4)}
      </span>
      <button
        onClick={() => disconnect()}
        className="rounded border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
      >
        Disconnect
      </button>
    </div>
  );
}
