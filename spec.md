---
title: LockIn Protocol
description: An open-source habit tracking and accountability app that enforces commitments with optional peer verification and photo check-ins. No cryptocurrency or monetization.
author: Sherwin Limosnero (@sherwinlimosnero), Christian Jude Villaber (@christianjudevillaber)
website-to: https://github.com/Kamiyon-Studio/LockIn-Protocol-1.0
status: Draft
type: Application
created: 2025-03-01
updated: 2025-03-02
requires tech stack: Next.js 15, Tailwind CSS, Node.js/Express (optional), Supabase or similar, Firebase (optional for notifications)
---

## Abstract

LockIn Protocol turns habit-building from optional intention into structured, verifiable action. Users set commitments with optional photo check-ins and can invite accountability partners to verify completion. There is no staking, no cryptocurrency, and no monetization—the project is open source and community-maintained. All commitment and verification outcomes are recorded in the application for transparency and history.

## Specification

### 1. Scope and Actors

- **Users**: People who create commitments, submit check-ins (e.g. photos), and optionally invite peers to verify. No wallet or crypto required.
- **Accountability partners**: Peers who receive a link to approve or reject a check-in; they do not receive any payment. May be designated per commitment.

### 2. Core Entities

- **Commitment**: A user-defined goal (e.g. "no social media," "study 4 hours") with a time window, optional photo check-in requirements, and optional accountability partner. No stake amount.
- **Check-in**: Evidence of compliance (e.g. daily photo); stored in app; may be verified by backend (e.g. goal-aware checks) and/or by partner. No on-chain component.
- **Partner**: Optional peer invited to verify a commitment; receives notification and approves/rejects. No payout.

### 3. Application Behavior

- **Create commitment**: User sets goal, window, check-in rules, optional partner. Stored in app database.
- **Check-in**: User uploads photo or proof; backend stores and optionally verifies; partner can be asked to approve/reject. Outcome recorded (success/fail/expired).
- **Resolution**: By deadline, if required check-ins are missing or rejected, commitment is marked failed or expired. No funds moved; history updated.
- **Persistence**: All commitment and resolution data in application storage; transparent and auditable within the app.

### 4. Off-Chain and Client Components

- **Photo check-ins**: Submitted via app; stored in app or optional object storage; verification can be backend (e.g. goal-aware logic) and/or partner review.
- **Commitment and partner setup**: Users configure commitments and partners in the client; no wallet or chain.
- **Notifications**: Optional (e.g. Firebase) for reminders and partner requests.
- **Data governance**: Retention for photos and metadata defined at app layer; user rights (access, deletion) per privacy policy.

### 5. Technical Stack (Reference)

- **Frontend**: Next.js 15, Tailwind; Vercel or similar.
- **Backend (optional)**: Node.js/Express or serverless; Supabase or similar for DB and storage; optional Firebase for push/email.
- **Verification**: Optional goal-aware checks (e.g. backend logic or third-party API); no on-chain verification.

No chain, no wallet, no crypto.

### 6. Compliance and Verification

- Commitment parameters (deadlines, check-in rules) are defined at creation and enforced by application logic.
- Success/failure is determined by app logic (e.g. check-ins submitted and approved, or timeout). Disputes (if any) handled by product rules (e.g. optional secondary reviewer).
- **Security and testing**: App and API tests; no smart contract audit (no contracts).

### 7. Technical Documentation

**Tech stack**

- **Frontend**: Next.js 15 (React), Tailwind CSS; hosted on Vercel or similar. Web-only for MVP.
- **Backend**: Optional Node.js/Express or serverless; Supabase for profiles and check-in metadata; optional Firebase for notifications. Optional photo verification (e.g. goal-aware logic or external API).
- **Data**: Commitments and check-ins in DB; photos in app storage or object storage; only references/hashes as needed for integrity.

**Architecture decisions**

- **No custodial or on-chain funds**: No wallet, no escrow, no tokens.
- **Verification**: Backend and/or partner review; all state in application layer.
- **Optional staking**: Not applicable; product is commitment and accountability only.

**Implementation approach**

1. Next.js frontend (commitment UI, check-in upload, dashboard, history).
2. Optional backend (verification, notifications, persistence).
3. E2E tests and documentation.

**Out of scope (explicit)**

- Any blockchain, L2, or wallet integration.
- Any token, stake, or payment.
- Mandatory KYC (optional account only).
- Custodial or financial services.
- Native mobile app (web-only for MVP unless otherwise scoped).

**Do / Don't**

| Do | Don't |
|----|--------|
| Store commitments and check-ins in app DB; keep photos in defined storage with retention. | Don't store unnecessary PII or raw data longer than needed. |
| Use backend or partner review for check-ins; document rules. | Don't promise financial rewards or penalties. |
| Document retention and user rights (access, deletion). | Don't add wallet, chain, or crypto without explicit scope change. |

### 8. Architecture Design Overview

**Main components**

- **User** → **Frontend** (Next.js) → **Backend** (optional) → **Database / Storage**.
- **Partners**: Notified via link/email; approve/reject in app; no payout.

**Workflows**

1. **Create**: User sets goal, window, check-in rules, optional partner. Stored in DB.
2. **Check-in**: User uploads photo → backend stores and optionally verifies → partner can approve/reject if configured. Outcome recorded.
3. **Resolution**: Deadline or rules determine success/fail/expired; history updated. No funds.

## User Journey

1. **Onboarding**: Open web app, sign up (email or optional social). Optional profile (name, photo). Browse or create first commitment without any stake.
2. **Create commitment**: Set goal (e.g. "No Instagram 8h"), window/deadline, check-in requirements (e.g. 1 photo), optional partner (email or in-app invite). No wallet or payment.
3. **During period**: Optional reminders. User uploads photo; backend stores and optionally verifies; partner (if any) can approve/reject. Dashboard shows progress.
4. **Resolution**: Deadline or rules → success/fail/expired recorded. No funds; history and streaks updated.
5. **Post-resolution**: History dashboard (past commitments and outcomes); repeat as desired.

## Feature Prioritization (MoSCoW)

**Must Have (MVP)**

- Commitment creation/management: goal, window, check-in rules via frontend.
- Photo check-ins: upload, store, optional backend verification, optional partner review.
- Accountability partners: invite via link or in-app; partner approves/rejects; no payout.
- Resolution: success/fail/expired by rules; history and dashboard.
- Web frontend: sign-up, UI for all flows, basic dashboard.
- Backend basics: persistence, optional verification, optional notifications.

**Should Have**

- Configurable deadlines/timezones per commitment.
- Richer UI: streaks, history charts.

**Could Have**

- Peer challenges: linked commitments and shared progress (no money).
- Optional IPFS or similar for proof integrity.
- Mobile-friendly or native app.

**Won't Have**

- Any blockchain, wallet, or cryptocurrency.
- Any staking, fees, or monetization.
- Mandatory KYC (optional account only).
- Custodial or financial services.

## Photo Verification and Dispute System

- **Primary verification**: Optional backend logic (e.g. goal-aware checks, metadata). Result stored; no on-chain component.
- **Partner review**: For edge cases or by design, partner can approve/reject; outcome recorded.
- **Timeout**: If partner doesn’t respond by deadline, commitment can be marked expired or failed per product rules.
- **Disputes**: No financial stake; any appeal flow (e.g. secondary reviewer) is optional and product-defined.

## Rationale

LockIn provides structured commitment and accountability without cryptocurrency. Benefits:

- **Enforcement**: Commitment and optional peer review create accountability without money at risk.
- **Verifiability**: Records in the app give users and partners a clear history.
- **Open source**: Community can self-host and extend; no lock-in or monetization.
- **Low barrier**: No wallet, no gas, no tokens; sign up and use.

## Security Considerations

- **Application security**: Auth, input validation, and access control for commitments and proof.
- **Data and privacy**: Retention and deletion per policy; comply with applicable data protection.
- **Verification**: If backend performs verification, secure the pipeline and avoid storing unnecessary raw data.
- **No key or wallet risk**: No user-held keys or funds.

## Compliance and Regulatory Context

- **Data protection**: Off-chain user data and photos; implement retention and user rights (access, deletion) per applicable law (e.g. GDPR-like).
- **No financial regulation**: No custody, staking, or transfer of value; no KYC or financial licensing from the product itself.
- **Legal review**: Recommended for target jurisdictions (e.g. data protection, terms of use).

## Changelog

- **2025-03-01**: Initial spec (with chain and staking).
- **2025-03-02**: Converted to open-source, no-crypto spec; removed AVAX, staking, wallet, chain, Lock In Reserve, and monetization; reframed around commitment and optional peer review only.

## Copyright

Copyright and related rights waived via [CC0](./LICENSE.md).
