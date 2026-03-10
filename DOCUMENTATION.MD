LockIn Protocol
An open-source commitment and accountability app

1. Overview

LockIn Protocol is an open-source productivity application that uses commitment contracts and social accountability to help users achieve goals. Users define goals, submit proof of completion, and can have peers verify outcomes. There is no financial staking, no cryptocurrency, and no monetization—the project is maintained by the community.

The system combines:

- behavioral economics (commitment contracts, inspired by Beeminder and StickK)
- social accountability (goals can be verified by peers or by the user)
- transparency (goals, proof, and outcomes are recorded in the system)

2. Core Principles

- **Loss aversion** — People are more motivated to avoid losses than to gain rewards. LockIn uses commitment and social accountability (e.g. public goals, peer review) rather than money at risk.
- **Accountability** — Goals can be verified by the user or by trusted peers (e.g. friends, mentors) who confirm completion.
- **Transparency** — Goal definitions, proof references, and outcomes are stored and visible so progress is clear and auditable.

3. User Flow

Step 1 — Sign up

User creates an account (email or optional social login). No wallet or identity verification required.

Step 2 — Goal creation

User defines a goal with:

- title
- description
- deadline
- optional peer reviewer (friend, mentor, or self-verify)
- proof type (e.g. photo, text, link)

Example:

- Goal: Study Unity for 2 hours
- Deadline: Today 9 PM
- Reviewer: Self or trusted friend

Step 3 — Proof submission

User submits proof (image, text, or link) before the deadline. Proof is stored (e.g. in app storage or optional IPFS); only a reference or hash may be used for integrity.

Step 4 — Verification and completion

- **Self-verify:** User marks goal complete; system records outcome.
- **Peer review:** Reviewer approves or rejects; outcome is recorded. If no response by deadline, goal can be marked expired or auto-failed per product rules.

4. Goal Types

- **Binary** — Done or not (e.g. go to the gym, finish assignment).
- **Quantitative** — Measurable (e.g. write 1000 words, study 3 hours).
- **Streak** — Repeated (e.g. meditate daily for 7 days).

5. No financial stakes

LockIn is open source and does not use money at risk. Motivation comes from:

- commitment and planning
- social accountability (optional peer review)
- progress history and streaks
- optional public goals or sharing

6. Peer reviewers (optional)

Users can optionally ask a peer (friend, mentor, coach) to verify a goal. Reviewers:

- receive a link or notification to approve/reject
- do not receive any payment or stake
- are chosen by the goal-setter

No KYC or minimum participation is required; the product is trust-based and community-driven.

7. Penalty and rewards

There are no financial penalties or rewards. On “failure” (missed deadline or rejected proof), the system may:

- record the outcome and reset or adjust streaks
- show history for reflection

No funds, tokens, or revenue are involved.

8. Architecture (application only)

LockIn uses a simple application architecture.

**Stored data**

- goal metadata (title, description, deadline, reviewer, status)
- proof references or hashes (full proof in app storage or optional IPFS)
- user accounts and optional profile
- history and streaks

**No blockchain or smart contracts** — All logic runs in the application and optional backend. No wallet, no chain, no crypto.

9. Reputation and social layer (optional)

- Users can optionally make goals visible to friends or the community.
- Future social features could include: progress feeds, leaderboards, accountability groups—all non-financial and open source.

10. Key advantages

- **Open source** — No lock-in; community can extend and self-host.
- **No crypto** — No wallet, no gas, no tokens; lower barrier to use.
- **Social accountability** — Optional peer review and sharing without money at risk.
- **Transparency** — Goals and outcomes recorded in the system for the user (and optionally peers).

11. Technical scope

- **Frontend:** Web app (e.g. Next.js, Tailwind) for sign-up, goal creation, proof upload, dashboard, history.
- **Backend (optional):** API for goals, proof storage, notifications, and optional peer review flow.
- **Storage:** App database and file storage; optional IPFS or similar for proof integrity.
- **No:** Wallets, blockchains, smart contracts, KYC, or payment processing.

12. Legal and privacy

- **Data:** Comply with applicable data protection (e.g. GDPR-like) for user data and proof; retention and deletion as defined in privacy policy.
- **No financial regulation:** With no funds or tokens, the product avoids custody, gambling, or securities concerns from a protocol perspective. Any future add-ons (e.g. donations) would be separate and clearly scoped.

13. Final note

LockIn is an open-source project. There is no business monetization; the project is maintained by the community. All documentation and code are oriented toward a non-crypto, non-monetized commitment and accountability product.
