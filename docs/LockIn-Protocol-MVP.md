# LockIn Protocol — Comprehensive MVP Documentation

**Version:** 1.0  
**Date:** 2025-03-02  
**Status:** Draft  

This document consolidates LockIn Protocol for MVP implementation. The **canonical** source for product and architecture is [DOCUMENTATION.MD](../DOCUMENTATION.MD). Where other project docs (spec, PRD, business model, DevOps, Customer Success, audit-standards) are used, they are cited; any conflict with DOCUMENTATION.MD is resolved in favor of DOCUMENTATION.MD. An implementer can use this file as the single reference; unknowns are listed in **Open questions / TBD**.

---

## 1. Overview and core principles

LockIn Protocol is a **SocialFi productivity application** that uses financial commitment contracts to help users achieve goals. Users stake **Tether (USDT)** against their own failure, creating a strong behavioral incentive to complete tasks.

The system combines:

- **Behavioral economics** — commitment contracts (inspired by Beeminder and StickK).
- **Social accountability** — goals verified by other users with proven participation (validators).
- **Crypto escrow transparency** — stakes and outcomes settled via smart contracts; no trust in the platform required.

**Core principles:**

| Principle | Description |
|-----------|-------------|
| **Loss aversion** | People are more motivated to avoid losses than to gain rewards; users stake funds they risk losing if they fail. |
| **Accountability** | Goals are verified by validators — users who have proven participation in the system. |
| **Transparency** | Goal stakes and outcomes are settled on-chain via smart contracts. |

---

## 2. Target users and value proposition

- **Goal-setters:** Users who create goals, stake USDT, submit proof, and receive stake back on success or forfeit to a chosen penalty destination on failure.
- **Validators:** Users who verify others’ goals (after completing KYC and ≥5 goals themselves); they receive validation rewards and may receive part of forfeited stakes.
- **Penalty destinations:** Validator reward, verified charity wallet, protocol development treasury, community pool (redistributed to successful users). Users choose the split at goal creation.

**Revenue (protocol fees):** Small fees on goal creation, validator matching, and dispute resolution (e.g. 0.5% of stake). Revenue must not come from user failure so incentives stay aligned. See §15 below.

---

## 3. MVP scope

### 3.1 In scope

- **Wallet and balance:** Connect wallet; deposit USDT into LockIn balance (escrow flow).
- **KYC:** All participants complete identity verification before using the system (per DOCUMENTATION.MD; use third-party provider).
- **Goal creation:** Title, description, deadline, stake amount, validator type (random or trusted), penalty destination (and optional split).
- **USDT escrow:** Lock stake on goal creation; release to user on success or to penalty destination(s) on failure via TreasuryRouter.
- **Proof submission:** User submits proof; only **proofHash** (e.g. IPFS reference) stored on-chain; full proof (image, video, text, GPS) off-chain.
- **Validator assignment:** Random (high-reputation) or trusted (user-selected); validators must meet eligibility (KYC + ≥5 goals completed).
- **Validation flow:** submitProof → validator validateGoal → finalizeGoal; states Pending / Approved / Rejected / Expired; validator timeout with reassignment or auto-fail.
- **Core contracts:** GoalRegistry, EscrowVault, ValidationManager, ReputationManager, TreasuryRouter.
- **Web frontend:** Wallet connect, goal creation, proof upload, dashboard, history (stack: Next.js, wagmi/viem or equivalent, Tailwind).
- **Off-chain:** Goal text, proof storage (e.g. IPFS), validator matchmaking, reputation analytics.
- **Single chain for MVP:** One of Base or Polygon (DOCUMENTATION.MD §11); low fees for frequent interactions.

### 3.2 Out of scope for MVP

- Multi-chain deployment.
- Multi-stablecoin (USDC, DAI); USDT only for MVP.
- Full social layer: progress feeds, leaderboards, community challenges, accountability groups (defer to post-MVP).
- Derailment escalation (Beeminder-style stake escalation after repeated failures) — optional to defer; see TBD.
- Full dispute appeal flow (secondary validator + majority decision) — may be minimal or post-MVP; see TBD.

---

## 4. User flow

1. **Wallet connection** — User connects wallet and deposits USDT into their LockIn balance (or approves escrow for a specific goal).
2. **Identity verification (KYC)** — All participants complete KYC before using the system (prevents Sybil attacks, reward farming, ensures fair validation).
3. **Goal creation** — User defines goal with: title, description, deadline, stake amount, validator type (random or trusted), penalty destination (and split). Example: *Goal: Study Unity for 2 hours | Deadline: Today 9 PM | Stake: 10 USDT | Validator: Random | Penalty: Charity.*
4. **Proof submission** — User submits proof (image/video/text/GPS as applicable); backend stores proof off-chain, submits proofHash on-chain; validator is notified.
5. **Validator review** — Validator approves or rejects (or proof expires); ValidationManager and EscrowVault finalize; stake released to user (success) or to penalty destination(s) (failure).

---

## 5. Goal types

LockIn supports structured goals for verification clarity:

| Type | Description | Examples |
|------|-------------|----------|
| **Binary** | Completed or not. | Go to the gym, finish assignment. |
| **Quantitative** | Measurable output. | Write 1000 words, study 3 hours. |
| **Streak** | Repeated daily or weekly. | Meditate daily for 7 days. |

---

## 6. Escrow and staking

- When a goal is created, user stakes USDT; funds are locked in escrow via smart contract.
- **Success:** Stake returned to user (via EscrowVault releaseToUser).
- **Failure:** Stake redirected to selected penalty destination(s) via TreasuryRouter (releaseToPenaltyDestination).
- **Derailment (optional for MVP):** On failure, stake is forfeited, streak resets, funds redistributed; stakes may escalate after repeated failures (e.g. 5 → 10 → 25 USDT). See Open questions / TBD.

---

## 7. Validators

**Requirements:** Validators must (1) complete KYC, (2) successfully complete at least 5 goals. This ensures proven participation and system understanding.

**Assignment:**

- **Random validator (recommended):** User is assigned a high-reputation validator; reduces collusion, increases fairness.
- **Trusted validator:** User selects a friend, mentor, or coach; validator must still meet minimum participation requirements.

**Incentives:** Validators receive rewards (e.g. 1–5% of stake as validation reward); if goal fails, validator may receive part of forfeited stake. This encourages active, honest verification.

---

## 8. Penalty destinations

On failure, forfeited stake is distributed according to user’s pre-selection at goal creation:

- **Validator reward** — Stake (or portion) to validator.
- **Charity** — Stake to verified charity wallet.
- **Protocol development** — Portion to LockIn treasury.
- **Community pool** — Redistributed to successful users.

Users choose the split when creating the goal (e.g. 5 USDT → validator, 3 → community pool, 2 → treasury).

---

## 9. Smart contract architecture

LockIn uses **modular contracts** (not a single monolithic contract).

### 9.1 GoalRegistry

- **Purpose:** Store goal metadata and lifecycle state; minimal data on-chain.
- **Example structure:** goalId, creator, stakeAmount, deadline, validator, penaltyDestination, status.
- **States:** Created → Active → ProofSubmitted → Validated / Failed → Resolved.
- **Proof:** Do not store photos or logs on-chain; store **proofHash** only (e.g. IPFS reference: `ipfs://QmProofHash`).

### 9.2 EscrowVault

- **Purpose:** USDT locking and release; withdrawals only when triggered by goal resolution.
- **Functions:** depositStake(goalId), releaseToUser(goalId), releaseToPenaltyDestination(goalId).
- **Stablecoin:** Tether (USDT) for MVP.
- **Security:** Use **pull payments** (not push) to avoid reentrancy.

### 9.3 ValidationManager

- **Purpose:** Validation workflow.
- **Functions:** submitProof(goalId, proofHash), validateGoal(goalId, decision), finalizeGoal(goalId).
- **States:** Pending, Approved, Rejected, Expired.
- **Validator timeout:** If validator does not respond before deadline → auto-fail or reassign validator (reassignment protects users from inactive validators).

### 9.4 ReputationManager

- **Purpose:** Validator credibility.
- **Metrics:** validationsCompleted, approvalAccuracy, disputesRaised, goalsCompleted.
- **Eligibility:** goalsCompleted >= 5 (validators must complete 5 goals first).
- **Tiers:** Bronze, Silver, Gold, Elite; random assignment favors high-reputation validators.

### 9.5 TreasuryRouter

- **Purpose:** Penalty distribution.
- **Destinations:** Validator reward, charity wallet, community pool, protocol treasury.
- **Split:** User-defined at goal creation (e.g. 10 USDT failed → 5 validator, 3 community, 2 treasury).

---

## 10. Validation security and proof

- **Validator timeout:** If validator does not respond within X hours → auto reassignment (or auto-fail). Exact X is TBD.
- **Dispute mechanism:** Users may dispute validator decisions; flow: user appeals → secondary validator review → majority decision; appeal may require small stake to prevent spam. Scope for MVP: TBD (minimal or post-MVP).
- **Evidence:** Proof submissions may include image, video, text log, GPS timestamp to reduce fraud.

---

## 11. Off-chain vs on-chain

| Off-chain | On-chain |
|-----------|----------|
| Goal descriptions, proof assets, habit logs, timestamps | USDT escrow, goal settlement, validator reward distribution |
| Proof storage (e.g. IPFS), validator matchmaking, reputation analytics | Minimal goal state + proofHash only |

**Chain for MVP:** One of **Base** or **Polygon** (DOCUMENTATION.MD); single chain only.

---

## 12. Tech stack and deployment

| Layer | Technology |
|-------|------------|
| **Chain** | Base or Polygon (choose one for MVP); RPC and block explorer per chain. |
| **Contracts** | Solidity; Foundry for test, build, deploy. |
| **Frontend** | Next.js, wagmi/viem (or equivalent), Tailwind; wallet connect, USDT approve and balance, goal creation and proof upload UI. |
| **Backend / off-chain** | Proof storage (IPFS or similar), validator matching, KYC provider (e.g. Sumsub, Persona, Veriff per DOCUMENTATION.MD §18.3). |
| **CI/CD** | Foundry tests on push; deploy scripts; env per environment (testnet vs mainnet); no secrets in repo (use platform secrets / env). |

Deployment practices: immutable deploys; config per environment; contract addresses and constructor args in config/env; mainnet only after audit and tagged release.

---

## 13. Security and non-negotiables

- **Non-custodial escrow only** — Users retain wallet control; no platform custody of funds.
- **Pull payments** — EscrowVault uses pull (user/contract pulls) not push to avoid reentrancy.
- **Validator timeout and reassignment** — Prevents users from being stuck on inactive validators.
- **KYC** — Required to limit Sybil attacks and reward farming.
- **Proof on-chain** — Only proofHash on-chain; full proof off-chain (IPFS or similar) to reduce cost and privacy exposure.
- **Audit** — Professional security audit of core contracts required before mainnet.

---

## 14. Legal and regulatory

- **Custody:** Use non-custodial escrow only; avoid platform custody to reduce money-transmitter/custodial licensing risk.
- **Gambling:** Frame product as commitment contracts; avoid lottery-like reward pools; redirect penalties to charities or validators (StickK-style) to reduce gambling classification risk.
- **KYC and data privacy:** Use third-party KYC providers (Sumsub, Persona, Veriff); do not store raw identity data in-house; comply with GDPR-like and local financial rules as applicable.
- **Stablecoin risk:** USDT dependency (Tether Limited); mitigate by designing for future multi-stablecoin (USDC, DAI) post-MVP.

---

## 15. Revenue and fees

- **Revenue structure:** Small protocol fees only (e.g. 0.5% of stake on goal creation; optional fees on validator matching and dispute resolution).
- **Do not** derive revenue from user failure; that would create misaligned incentives.
- Exact fee percentage and which actions are charged are TBD (see §18).

---

## 16. Operations and support

- **Onboarding:** Wallet connection, KYC, first goal creation; help center and tooltips at key steps (goal creation, proof upload, validator selection).
- **Support:** Single queue; tag by type (onboarding, verification, stake/contract, billing, bug, feedback); first response within 24h (business hours); severity P1 (e.g. funds stuck) → immediate escalation, P2 (blocking) → resolve or workaround within one business day, P3/P4 as capacity allows.
- **Status:** Public status page for app and API; proactive messaging for incidents.
- **Runbooks:** Standard responses for “stake not returned,” “proof rejected,” “validator unresponsive,” “wallet issues.”

---

## 17. Audit and quality

- **Pre-audit checklist:** Scope and objectives defined; documentation and access ready; security and compliance checks; testing and validation in place; communication and reporting channels set. (Full checklist: [external/audit-standards.md](../external/audit-standards.md); full rule: [.cursor/rules/audit.md](../.cursor/rules/audit.md).)
- **Areas:** Security (vulnerability assessment, threat modeling, incident response), code quality (review, static analysis, test coverage), compliance and data (retention, user rights).

---

## 18. Open questions / TBD

The following are **not** decided in this doc; resolve before or during implementation.

| # | TBD | Impact |
|---|-----|--------|
| 1 | **Validator timeout** — Exact hours (X) before reassignment or auto-fail. | Affects ValidationManager logic and user experience. |
| 2 | **Stake bounds** — Minimum and maximum USDT per goal for MVP. | Affects EscrowVault and frontend validation. |
| 3 | **Derailment escalation** — In MVP or post-MVP (Beeminder-style increasing stakes after failures). | Affects scope and contract/UX. |
| 4 | **Dispute flow** — Full appeal (secondary validator + majority) in MVP or minimal/post-MVP. | Affects ValidationManager and support runbooks. |
| 5 | **Proof storage** — IPFS only or centralized fallback; retention period for proof assets. | Affects backend and compliance. |
| 6 | **KYC provider** — Choice (Sumsub / Persona / Veriff) and integration scope (e.g. which jurisdictions). | Affects onboarding and legal. |
| 7 | **Chain choice** — Base vs Polygon for first deployment. | Affects RPC, explorer, and USDT contract address. |
| 8 | **Protocol fee** — Exact percentage(s) and which actions are charged (goal creation, matching, dispute). | Affects TreasuryRouter and economics. |

---

## 19. MVP checklist (implementation)

Use this to tick off against the doc:

- [ ] **User flow:** Wallet connect, USDT deposit/approve, KYC, goal create, proof submit, validator review, stake release.
- [ ] **Contracts:** GoalRegistry, EscrowVault, ValidationManager, ReputationManager, TreasuryRouter; Foundry tests; deploy to testnet.
- [ ] **Frontend:** Pages for connect, KYC, create goal, submit proof, dashboard, history; USDT and chain integration.
- [ ] **Backend / off-chain:** Proof storage, validator matching, KYC provider integration.
- [ ] **Deployment:** CI (tests), deploy scripts, env and secrets; mainnet only after audit.
- [ ] **Audit:** Pre-audit checklist; security audit of contracts before mainnet.
- [ ] **Docs and support:** Help center, runbooks, status page.

---

## 20. References

| Document | Role |
|----------|------|
| [DOCUMENTATION.MD](../DOCUMENTATION.MD) | Canonical product and architecture (USDT, validators, contracts, legal, revenue). |
| [spec.md](../spec.md) | User journey and flows (supplemental; chain/token/verification follow DOCUMENTATION.MD). |
| [external/PRD-LockIn-Protocol.md](../external/PRD-LockIn-Protocol.md) | Scope and NFRs (supplemental). |
| [external/lockin-business-model.md](../external/lockin-business-model.md) | Tiers and verticals (optional summary for MVP). |
| [external/DevOps_strategy.md](../external/DevOps_strategy.md) | CI/CD, monitoring, incident response. |
| [external/Customer_success_support_strategy.md](../external/Customer_success_support_strategy.md) | Onboarding, support, runbooks. |
| [external/audit-standards.md](../external/audit-standards.md) | Audit checklist summary. |
| [external/Programming_Service_Contract.md](../external/Programming_Service_Contract.md) | Scope and legal (service agreement). |
