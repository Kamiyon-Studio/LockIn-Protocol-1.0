# LockIn Protocol

A habit-tracking and accountability app that enforces commitments, supports peer challenges, and optionally stakes AVAX in smart contracts for verifiable, reward-driven focus.

**Status:** Draft · **Type:** Application

---

## What It Does

LockIn Protocol turns habit-building from intention into **structured, verifiable action**. You set daily commitments with optional photo check-ins; you can stake AVAX in escrow on Avalanche. Stakes stay locked until the commitment is resolved: **success** returns your stake (and optional rewards), **failure** automatically sends stakes to your accountability partners or the Lock In Reserve. All outcomes are recorded on-chain.

**Target users:** Students and young professionals who want enforceable accountability beyond reminders and bypassable blockers.

---

## Core Concepts

| Concept | Description |
|--------|-------------|
| **Commitment** | A goal (e.g. "no social media", "study 4 hours") with a time window, optional photo check-ins, and optional stake in AVAX. |
| **Stake** | AVAX locked in a smart contract; released on success (back to you) or failure (to partners / reserve). |
| **Check-in** | Evidence of compliance (e.g. daily photo); verified off-chain, hash + attestation stored on-chain. |
| **Accountability partners** | Peers you designate; they receive a share of your stake if you fail. Invite via magic link or wallet. |
| **Challenge** | Peer-to-peer: two or more users commit to related goals; stakes and payouts can be linked. |

---

## Tech Stack

| Layer | Stack |
|-------|--------|
| **Chain** | Avalanche C-Chain (EVM) |
| **Contracts** | Solidity 0.8.25+, Foundry — EscrowLock, CommitmentResolver |
| **Frontend** | Next.js 15, wagmi/viem, Tailwind CSS · Vercel |
| **Backend** | Node.js/Express · Moralis, Supabase, Firebase · goal-aware photo verification |

**Design choices:** Non-custodial escrow (contract-only control), hybrid verification (backend AI + signed attestation on-chain), optional staking, single chain (AVAX only for MVP).

---

## Implementation Approach

1. **Contracts** — Foundry; unit/integration tests; deploy to Fuji testnet.
2. **Frontend** — Wallet connect, commitment UI, dashboard, history via indexer.
3. **Backend** — Photo verification, notifications, indexing.
4. **E2E on Fuji** → **Security audit** → **Mainnet deploy.**

A professional security audit of EscrowLock and CommitmentResolver is required before mainnet.

---

## Scope (MVP)

**In scope:** Commitment creation and management, photo check-ins, AVAX staking, accountability partners, on-chain resolution, web frontend, backend verification and notifications.

**Out of scope:** Multi-chain/L2, ERC-20 staking, mandatory KYC at protocol layer, custodial controls, native mobile app (web-only for MVP).

---

## Docs & Links

- **Full specification:** [spec.md](./spec.md)
- **Repository:** [github.com/LockIn-Protocol](https://github.com/LockIn-Protocol)

---

## Authors

Sherwin Limosnero ([@sherwinlimosnero](https://github.com/sherwinlimosnero)), Christian Jude Villaber ([@christianjudevillaber](https://github.com/christianjudevillaber))

**License:** See [LICENSE](./LICENSE.md) (CC0).
