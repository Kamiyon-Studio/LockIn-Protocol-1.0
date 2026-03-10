# LockIn Protocol

An open-source habit-tracking and accountability app that enforces commitments with optional peer verification and photo check-ins. No cryptocurrency or monetization.

**Status:** Draft · **Type:** Application

---

## What It Does

LockIn Protocol turns habit-building from intention into **structured, verifiable action**. You set commitments with optional photo check-ins and can invite accountability partners to verify completion. **Success** and **failure** are recorded in the app; there are **no stakes, no wallet, and no payments**. The project is open source and community-maintained.

**Target users:** Anyone who wants structured accountability beyond reminders—students, professionals, and teams—without any financial barrier.

---

## Core Concepts

| Concept | Description |
|--------|-------------|
| **Commitment** | A goal (e.g. "no social media", "study 4 hours") with a time window and optional photo check-ins. No money at risk. |
| **Check-in** | Evidence of compliance (e.g. daily photo); stored in the app; optionally verified by backend or partner. |
| **Accountability partners** | Peers you invite to approve or reject your check-in; they do not receive any payment. |
| **Resolution** | Outcome (success/fail/expired) recorded in the app; no funds moved. |

---

## Tech Stack

| Layer | Stack |
|-------|--------|
| **Frontend** | Next.js 15, Tailwind CSS · Vercel or similar |
| **Backend** | Optional Node.js/Express · Supabase or similar · optional photo verification |

**Design:** No wallet, no blockchain, no crypto. Application-only; optional peer review.

---

## Implementation Approach

1. **Frontend** — Sign-up, commitment UI, check-in upload, dashboard, history.
2. **Backend (optional)** — Persistence, verification, notifications.
3. **Testing and docs** — E2E tests, README, and user-facing help.

No chain deployment or smart contract audit.

---

## Scope (MVP)

**In scope:** Commitment creation and management, photo check-ins, optional accountability partners, resolution and history, web frontend, optional backend.

**Out of scope:** Any blockchain, wallet, token, staking, or payment. No mandatory KYC. Web-only for MVP unless otherwise scoped.

---

## Docs & Links

- **Full specification:** [spec.md](./spec.md)
- **Canonical product doc:** [DOCUMENTATION.MD](./DOCUMENTATION.MD)
- **MVP reference:** [docs/LockIn-Protocol-MVP.md](./docs/LockIn-Protocol-MVP.md)
- **Supporting documentation:** [external/README.md](./external/README.md) — PRD, customer success & support strategy, DevOps strategy, audit standards.
- **Spec audit report:** [spec_audit_report.md](./spec_audit_report.md) — audit of spec.md against [external/audit-standards.md](./external/audit-standards.md).
- **Repository:** [github.com/Kamiyon-Studio/LockIn-Protocol-1.0](https://github.com/Kamiyon-Studio/LockIn-Protocol-1.0)

---

## Authors

Sherwin Limosnero ([@sherwinlimosnero](https://github.com/sherwinlimosnero)), Christian Jude Villaber ([@christianjudevillaber](https://github.com/christianjudevillaber))

**License:** See [LICENSE](./LICENSE.md) (CC0).
