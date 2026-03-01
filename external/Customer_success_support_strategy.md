# Customer Success and Support Strategy

## 1. Introduction

### 1.1 Role and Objectives

Customer Success and Support own onboarding, issue resolution, and long-term satisfaction. Objectives are to reduce time-to-value, resolve tickets quickly, and keep health scores and retention high through clear processes and metrics.

### 1.2 Customer Success Vision

Every user reaches their first successful commitment and check-in quickly. Paid users see a direct link between the product and their goals. Issues are triaged, resolved, and used to improve the product.

---

## 2. Customer Onboarding and Training

### 2.1 Onboarding Process

1. **Sign-up**: Connect wallet (MetaMask/Core) or use magic link. Optional profile (name, photo) stored off-chain.
2. **First commitment**: Guided flow. User sets one goal, window, and optional partner. No stake required for first run.
3. **First check-in**: User uploads photo within window. Backend verifies and records. Success message and short explanation of what happens on success vs failure.
4. **Stake path (optional)**: For users who add a stake, show exact flow: approve tx, deposit to escrow, invite partner. Confirm they understand funds lock until resolution.

Hand off from marketing or self-serve to support: any user who opens a ticket or uses in-app help during onboarding gets a lightweight “onboarding support” tag so agents know to focus on first-value steps.

### 2.2 Training Materials and Sessions

- **Help center**: Short articles for: connecting wallet, creating a commitment, doing a photo check-in, adding a stake, inviting partners, understanding resolution (success vs failure).
- **Video**: One short walkthrough (create commitment, one check-in, resolution). No jargon. Show both no-stake and stake paths.
- **Live sessions (optional)**: Monthly “office hours” for new users. Q&A on onboarding and first commitment. Record and link from help center.

Training for support agents: product walkthrough, contract basics (stake lock, success/failure, partner payout), and where to escalate (wallet, chain, verification, billing).

### 2.3 User Resources and Documentation

- **In-app**: Tooltips at commitment creation, check-in upload, and partner invite. Link to help center from dashboard and settings.
- **Docs**: One page per major flow. Include Fuji testnet for testing without mainnet funds. List supported wallets and chains (Avalanche C-Chain only for MVP).
- **Status / transparency**: Public status page for app and API. If indexing or verification is delayed, say so and give a rough ETA.

---

## 3. Issue Management and Ticket Resolution

### 3.1 Ticketing System Workflow

- **Single queue**: All incoming requests (email, in-app, or form) create one ticket. Tag by type: onboarding, verification, stake/contract, billing, bug, feedback.
- **Triage**: First response within 24 hours (business hours). Assign severity: P1 (e.g. funds stuck, cannot resolve), P2 (blocking usage), P3 (workaround exists), P4 (question or suggestion).
- **Ownership**: Assign to an agent or team. Paid users get a designated owner where possible. Track response time and resolution time by tag and severity.
- **Closure**: Resolve with a short summary and, if relevant, a link to a help article. Optionally ask for CSAT on close.

### 3.2 Issue Prioritization and Escalation

- **P1**: Funds at risk, contract resolution failure, or security concern. Escalate immediately to engineering and ops. Customer gets proactive updates until resolved.
- **P2**: User blocked (e.g. cannot check in, cannot create commitment). Target resolution within one business day or provide clear workaround and ETA.
- **P3**: Feature broken but workaround exists. Fix in next release or document workaround and add to backlog.
- **P4**: Questions, feedback, feature requests. Answer or log for product. No formal SLA; aim for response within 48 hours.

Escalation path: Agent → Support Lead → Engineering/DevOps (for backend, contract, indexing). For disputes (e.g. verification or partner payout), follow documented dispute process and time limits (e.g. 24h dispute window).

### 3.3 Rapid Resolution Techniques

- **Runbooks**: Standard responses and steps for: “I didn’t get my stake back,” “Check-in failed,” “Partner didn’t receive payout,” “Wallet not connecting,” “Verification said fail but I did the thing.” Update runbooks when product or contract behavior changes.
- **Self-service**: Point users to help center and status page first. In-app FAQ for top 5 issues.
- **Proactive messaging**: If a known incident affects check-ins or resolution, notify affected users (email or in-app) with cause and expected fix time.

---

## 4. Customer Satisfaction and Health

### 4.1 NPS and CSAT Measurement

- **NPS**: Send quarterly to a sample of active users. One question: “How likely are you to recommend LockIn Protocol?” (0–10). Segment by free vs paid and by tenure. Track trend and follow up on detractors.
- **CSAT**: Optional survey on ticket close: “How satisfied were you with this support?” (1–5). Use to improve agent quality and runbooks.

Report NPS and CSAT to leadership and product. Set targets (e.g. NPS > 30, CSAT > 4.0) and review when below.

### 4.2 Customer Health Scoring Models

- **Signals**: Login frequency, commitments created, check-ins completed, stakes placed, resolution outcomes (success vs failure), support tickets (count and severity), payment status (paid tiers).
- **Score**: Simple model for MVP: Green (active last 14 days, at least one check-in or resolution), Yellow (inactive 14–30 days or one P2+ ticket open), Red (inactive 30+ days or churned or repeated P1).
- **Use**: Prioritize outreach for Yellow (e.g. check-in email or offer to help). Red: win-back or understand churn. Green: minimal touch unless they ask for help or expansion.

Refine over time with more data (e.g. streak length, partner engagement).

### 4.3 Feedback Collection and Analysis

- **In-product**: Optional feedback widget or short survey after key actions (e.g. after first resolution). One open question: “What would make LockIn more useful for you?”
- **Support**: Tag tickets that contain feature requests or complaints. Monthly summary for product: top themes, recurring issues, requested features.
- **Reviews**: Monitor app stores and social mentions. Respond to negative reviews with a short, empathetic reply and offer to fix via support.

---

## 5. Proactive Communication and Relationship Building

### 5.1 Regular Check-ins and Updates

- **Paid users**: Light touch. After first paid resolution, one short email: “How did your first stake go?” with link to help or feedback. No heavy cadence unless they opt in.
- **Product updates**: Release notes (email or in-app) for major features or contract changes. Explain what changed and what the user should do, if anything.
- **Incidents**: Status page and, for major outages, email to affected users. Post-mortem summary where appropriate (e.g. “Verification was slow due to X; we did Y to prevent recurrence”).

### 5.2 Managing Customer Expectations

- **Stakes**: Before first stake, set expectation: funds lock until resolution; success returns stake, failure sends to partners per contract. No exceptions by support; contract rules only.
- **Verification**: Explain that check-ins are verified by automated system and, in edge cases, partner review. No guarantee of approval for borderline cases; point to dispute window and rules.
- **SLAs**: P1 and P2 targets communicated internally. For Enterprise, document response and resolution SLAs in contract.

---

## 6. Continuous Improvement and Feedback Integration

### 6.1 Using Feedback to Drive Product and Process Enhancements

- **Product**: Prioritize backlog using support themes, NPS comments, and health score drivers. E.g. repeated “check-in failed” or “partner didn’t get payout” should drive fixes and docs.
- **Process**: If certain ticket types spike, update runbooks and help content. If onboarding tickets are high, improve first-run flow and in-app guidance.

### 6.2 Team Training and Development

- **New hires**: Product training, contract and wallet basics, ticketing workflow, escalation paths. Shadow existing agents before handling alone.
- **Ongoing**: Monthly review of tough cases and runbook updates. Share NPS/CSAT and health score trends. Training on new features before release.

---

## 7. Best Practices Summary

- **Respond fast**: First response within 24 hours; P1/P2 get same-day attention.
- **One owner**: Each ticket has an owner; paid users have a clear point of contact where possible.
- **Document once**: Use runbooks and help center so repeat issues are solved with links, not long explanations.
- **Measure**: NPS, CSAT, response time, resolution time, health score. Review and act when metrics slip.
- **Escalate cleanly**: P1 to engineering/ops immediately; disputes follow the documented process and time limits.
- **Proactive when it matters**: Status page, incident comms, and light check-ins for paid users and at-risk health scores.

---

## References

- LockIn Protocol spec: scope, actors, commitment/stake flows, resolution, and compliance context.
- Internal: Escalation runbooks, status page, help center, and ticketing system configuration.
