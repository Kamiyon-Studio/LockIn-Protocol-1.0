# Product Requirements Document (PRD): LockIn Protocol

**Document version:** 1.0  
**Date:** 2025-03-01  
**Product:** LockIn Protocol  
**Status:** Draft  

---

## 1. Executive Summary

LockIn Protocol is a habit-tracking and accountability application that lets users set daily commitments with optional photo check-ins and optional staking of AVAX on the Avalanche C-Chain. Stakes are held in non-custodial smart contract escrow and released only on success (back to the user) or failure (to designated accountability partners or a protocol reserve). The product targets students and young professionals who want enforceable accountability beyond reminders and soft blockers.

This PRD defines the scope, features, and technical requirements for the custom application to support a service agreement and delivery expectations.

---

## 2. Product Overview

### 2.1 Purpose

- Turn habit-building into structured, verifiable action with optional financial commitment.
- Provide transparent, on-chain records for commitments and outcomes.
- Support peer accountability through designated partners and optional peer challenges.
- Keep staking optional so users can start with reminders and check-ins only.

### 2.2 Target Users

- **Primary:** Students and young professionals (B2C) who create commitments, optionally stake AVAX, and use accountability partners or challenges.
- **Secondary:** Accountability partners who receive a share of failed stakes or provide support; they may be invited via magic link or wallet.

### 2.3 Key Differentiators

- Non-custodial escrow: only smart contract logic controls funds; no admin override.
- On-chain resolution: success/failure and payouts determined by contract and attested inputs.
- Hybrid verification: backend goal-aware AI for check-ins, with signed attestation on-chain.
- Single chain (Avalanche C-Chain) for low fees and fast finality.

---

## 3. Scope and Deliverables

### 3.1 In Scope (MVP)

| # | Deliverable | Description |
|---|-------------|-------------|
| 1 | Commitment creation/management | User sets goal, time window, check-in rules; optional stake and partners. Implemented in frontend and contracts. |
| 2 | Photo check-ins | Upload via app; backend verifies (goal-aware AI); hash and signed attestation submitted on-chain. |
| 3 | AVAX staking | Escrow deposit at commitment creation; funds locked until resolution. EscrowLock and CommitmentResolver contracts. |
| 4 | Accountability partners | Invite via magic link or wallet; on failure, stake split (e.g. 50/50) to partner addresses. |
| 5 | On-chain resolution | Success returns stake to user; failure auto-payout to partners; events for history. |
| 6 | Web frontend | Wallet connect (e.g. MetaMask, Core), UI for all flows, basic dashboard. Next.js 15, wagmi/viem, Tailwind; hosted on Vercel. |
| 7 | Backend | Photo verification, notifications (Firebase), indexing (Moralis). Node.js/Express; Supabase for profiles and check-in metadata. |

### 3.2 Out of Scope (Explicit)

- Multi-chain or L2 support.
- ERC-20 or other token staking (AVAX only for MVP).
- Mandatory KYC at protocol layer (app-layer opt-in only if required by jurisdiction).
- Custodial controls or admin override of fund release.
- Full decentralization of verification (oracles/ZK post-MVP).
- Native mobile app (web-only for MVP; React Native is future).
- Legal/regulatory implementation (handled by client/legal; spec defines compliance context only).

---

## 4. Functional Requirements

### 4.1 User and Partner Flows

- **FR-1** User can connect wallet (MetaMask/Core) and optionally create an off-chain profile (name, photo).
- **FR-2** User can create a commitment with: goal text, time window/deadline, check-in rules (e.g. one photo per day), optional stake amount (AVAX), and one or more accountability partners (magic link or wallet address).
- **FR-3** User can approve and deposit stake into escrow; contract emits CommitmentCreated and locks funds until resolution.
- **FR-4** User can submit photo check-ins within the commitment window; backend verifies and returns signed attestation; frontend submits attestation to contract; contract emits CheckInAttested.
- **FR-5** When deadline passes or required check-ins are missing, anyone (user, partner, keeper) may call resolve; contract evaluates and either returns stake to user (success) or distributes to partners (failure).
- **FR-6** Partner can be invited via magic link; partner binds wallet on claim to receive payouts.
- **FR-7** User can view commitment and resolution history (from indexer) and see stake/resolution status on-chain (e.g. Snowtrace).

### 4.2 Verification and Disputes

- **FR-8** Backend performs goal-aware AI verification on each photo; result is pass/fail/borderline; backend signs attestation (hash + result).
- **FR-9** For borderline scores (e.g. 60–80%), system may flag for partner review within a defined window; contract does not perform content judgment, only signature/hash verification.
- **FR-10** Resolution logic is fully on-chain; no off-chain override of success/failure or payouts.

### 4.3 Non-Functional Requirements

- **NFR-1** Contracts: Solidity 0.8.25+; EscrowLock and CommitmentResolver; unit and integration tests (Foundry); deployment to Fuji testnet for E2E validation.
- **NFR-2** Professional security audit of EscrowLock and CommitmentResolver required before mainnet deployment.
- **NFR-3** Frontend: responsive web; works with specified wallets and Avalanche C-Chain only.
- **NFR-4** Backend: attestation key secured and rotatable; off-chain data (profiles, photos) with defined retention and user access/deletion in line with data protection requirements.
- **NFR-5** Documentation: user-facing help and technical docs for integration and operations.

---

## 5. Technical Stack (Summary)

| Component | Technology |
|-----------|------------|
| Chain | Avalanche C-Chain (EVM) |
| Contracts | Solidity 0.8.25+, Foundry |
| Frontend | Next.js 15, wagmi/viem, Tailwind CSS; Vercel |
| Backend | Node.js/Express; Moralis, Supabase, Firebase |
| Verification | Goal-aware AI (e.g. multimodal LLM); signed attestation to chain |
| Hosting | Vercel (frontend, optional backend); Supabase (DB); Firebase (notifications) |

---

## 6. Acceptance Criteria (High Level)

- User can complete full flow: connect wallet, create commitment with optional stake and partner, perform check-in(s), and reach resolution (success or failure) with correct on-chain outcome.
- Partner can be invited via magic link, bind wallet, and receive failure payout per contract.
- All stake movements are governed only by contract logic; no custodial or admin override.
- Contracts pass audit and testnet validation before mainnet.
- Off-chain data handling (retention, access, deletion) is documented and implemented per compliance context.

---

## 7. Assumptions and Dependencies

- Client provides or approves: branding, copy, legal/compliance requirements (e.g. KYC, disclosures) for target jurisdictions.
- Third-party services: Moralis, Supabase, Firebase, and verification APIs (e.g. AWS Rekognition or LLM APIs) are available and within budget.
- Avalanche C-Chain remains supported and suitable for low-fee, fast-finality use case.
- Security audit is scheduled and funded before mainnet launch.

---

## 8. Success Metrics (Examples)

- Successful E2E flow on Fuji testnet (create, check-in, resolve).
- Contracts audited with no critical/high findings unresolved.
- Mainnet launch with non-custodial escrow and on-chain resolution as specified.
- Documentation and runbooks sufficient for operations and support.

---

## 9. Approval and Sign-off

This PRD is intended to support a service agreement for the custom LockIn Protocol application. Scope and deliverables may be refined in change orders. Final sign-off by client and delivery team is required before mainnet deployment.

**Document owner:** [To be assigned]  
**Client approval:** [To be signed]  
**Delivery team approval:** [To be signed]
