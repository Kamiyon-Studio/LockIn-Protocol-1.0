const STORAGE_KEY = "lockin_commitments";

export type CommitmentStatus = "active" | "success" | "failed";

export interface Commitment {
  id: string;
  goal: string;
  window: string;
  deadline: string;
  checkInsRequired: number;
  checkInsDone: number;
  stakeAmount?: string;
  partner?: string;
  status: CommitmentStatus;
  createdAt: string;
  resolvedAt?: string;
}

function load(): Commitment[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(commitments: Commitment[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(commitments));
}

export function getCommitments(): Commitment[] {
  return load();
}

export function getActiveCommitments(): Commitment[] {
  return load().filter((c) => c.status === "active");
}

export function getResolvedCommitments(): Commitment[] {
  return load().filter((c) => c.status === "success" || c.status === "failed");
}

export function getCommitmentById(id: string): Commitment | undefined {
  return load().find((c) => c.id === id);
}

export function addCommitment(c: Omit<Commitment, "id" | "createdAt" | "checkInsDone">): Commitment {
  const commitments = load();
  const newOne: Commitment = {
    ...c,
    id: crypto.randomUUID(),
    checkInsDone: 0,
    createdAt: new Date().toISOString(),
  };
  commitments.push(newOne);
  save(commitments);
  return newOne;
}

export function recordCheckIn(commitmentId: string): Commitment | undefined {
  const commitments = load();
  const idx = commitments.findIndex((c) => c.id === commitmentId);
  if (idx === -1) return undefined;
  commitments[idx].checkInsDone += 1;
  save(commitments);
  return commitments[idx];
}

export function resolveCommitment(
  commitmentId: string,
  outcome: "success" | "failed"
): Commitment | undefined {
  const commitments = load();
  const idx = commitments.findIndex((c) => c.id === commitmentId);
  if (idx === -1) return undefined;
  commitments[idx].status = outcome;
  commitments[idx].resolvedAt = new Date().toISOString();
  save(commitments);
  return commitments[idx];
}
