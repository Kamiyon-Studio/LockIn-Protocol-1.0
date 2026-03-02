# DevOps and Infrastructure Strategy

## 1. Introduction

### 1.1 Role Responsibilities

DevOps and SRE are responsible for deployment automation, monitoring, infrastructure reliability, incident response, and performance of the LockIn Protocol application stack: smart contracts (Avalanche C-Chain), frontend (Next.js on Vercel), backend (Node.js/Express), and off-chain services (Supabase, Firebase, Moralis).

### 1.2 Objectives and Scope

- **Automate** builds, tests, and deployments for contracts (Foundry), frontend (Vercel), and backend (e.g. AWS Lambda or Vercel serverless).
- **Monitor** app and API availability, verification latency, indexing health, and contract-related metrics.
- **Ensure** infrastructure is reliable, scalable, and recoverable within defined SLAs.
- **Respond** to outages and performance issues with clear runbooks and rollback paths.

Scope: Single chain (Avalanche C-Chain), Fuji testnet and mainnet. No multi-chain or L2 in MVP.

---

## 2. Deployment Automation

### 2.1 CI/CD Pipeline Design

- **Contracts (Foundry)**  
  - On push to main (or release branch): run `forge test`. On success, build and deploy to Fuji (or mainnet via tagged release).  
  - Use Foundry scripts for deploy; store contract addresses and constructor args in config (env or repo-secret).  
  - Mainnet deploys only from tagged releases and after audit; require manual approval or protected pipeline.

- **Frontend (Next.js)**  
  - Vercel: connect repo; build on push to main (or preview branches). Use env vars for RPC, chain id, Moralis API key, backend URL.  
  - Run lint and unit tests in CI (e.g. GitHub Actions) before deploy. Preview deployments for PRs.

- **Backend (Node.js/Express)**  
  - Build and test in CI. Deploy to Vercel serverless or AWS Lambda (e.g. via GitHub Actions and AWS SAM/Serverless).  
  - Migrations or one-off jobs (e.g. Supabase schema, indexes) run as separate steps or manual until tooled.

- **Secrets**: No secrets in repo. Use Vercel env, AWS Secrets Manager, or GitHub Secrets. Backend attestation key stored securely and rotated per policy.

### 2.2 Tools and Technologies

| Layer        | Tooling                          | Notes                                      |
|-------------|-----------------------------------|--------------------------------------------|
| Contracts   | Foundry, Forge                   | Test, build, deploy scripts                |
| Chain       | Avalanche C-Chain (Fuji/Mainnet) | Sub-second finality, low fees             |
| Frontend    | Next.js 15, Vercel               | Serverless, edge, env per environment      |
| Backend     | Node.js/Express                  | Vercel serverless or AWS Lambda           |
| Indexing    | Moralis API                      | Events, balances; monitor sync/health     |
| DB / Auth   | Supabase                         | Profiles, check-in metadata, migrations   |
| Notifications | Firebase                       | Push, email                                |
| CI          | GitHub Actions                   | Test, build, deploy (contracts, backend)   |
| CD          | Vercel (frontend), scripts (contracts) | Tagged releases for mainnet contracts |

### 2.3 Deployment Best Practices

- **Immutable deploys**: Each deploy is a new version; no in-place edits to running containers/functions. Rollback = redeploy previous version.
- **Config per environment**: Fuji vs mainnet RPC, chain id, contract addresses, API keys. Never mix mainnet secrets in testnet.
- **Contract upgrades**: MVP contracts are non-upgradeable (immutable). For future upgrades, use proxy pattern and formal change process.
- **Database**: Supabase migrations versioned; apply in order. Back up before major releases.

---

## 3. System Monitoring and Alerting

### 3.1 Monitoring Architecture

- **Frontend**: Vercel Analytics and/or custom health check endpoint (e.g. “/api/health”) that returns 200 when app and critical env are present. Optionally ping from external monitor (e.g. UptimeRobot, Better Uptime).
- **Backend**: Health endpoint that checks Supabase connectivity, Moralis (or indexer) reachability, and optionally attestation signer availability. Log errors and latency.
- **Contracts**: No direct “uptime” beyond chain RPC. Monitor RPC availability and indexer lag (e.g. Moralis sync delay). Track tx success rate for key methods (deposit, submitCheckIn, resolve).
- **Indexing**: Moralis (or chosen indexer): alert if event backlog grows or sync falls behind by more than N blocks or M minutes.

### 3.2 Key Metrics and Dashboards

- **Availability**: Uptime % for frontend and backend (e.g. 99.5% target). Status page reflects this.
- **Latency**: P95/P99 for backend API (e.g. photo verification, attestation). Target e.g. &lt;5s for verification.
- **Chain**: Tx success rate, gas price (Avalanche is low; monitor for spikes). Failed txs: count and alert on spike.
- **Business**: Commitments created per day, check-ins per day, resolutions (success/failure). Optional: stake volume. Dashboard for product and ops.
- **Errors**: Backend error rate (4xx/5xx), verification failures, attestation errors. Log aggregation (e.g. Vercel Logs, CloudWatch, or dedicated logger) with alerts on threshold.

### 3.3 Alerting Strategies

- **P1 (page immediately)**: Frontend or backend down, attestation signer down, indexer stopped, or spike in failed resolutions that might indicate contract/backend bug.
- **P2 (notify within 15–30 min)**: Latency above target, error rate above threshold, RPC or indexer degraded.
- **P3 (ticket, next business day)**: Gradual degradation, non-critical dependency issues.

Channels: P1/P2 to Slack/email/PagerDuty; P3 to ticket queue. Runbooks linked in alerts (e.g. “Check backend logs,” “Verify Moralis status,” “Rollback backend to previous version”).

---

## 4. Infrastructure Management and Scalability

### 4.1 Containerization (Optional for MVP)

- **MVP**: Frontend and backend may run as Vercel serverless without Docker. If backend moves to ECS/EKS or a VM, containerize with Docker; use a minimal Node image and non-root user.
- **Future**: Optional Kubernetes or managed containers for backend workers (e.g. verification queue). Not required for initial scale.

### 4.2 Cloud Platforms (AWS, Vercel)

- **Vercel**: Frontend and optionally backend serverless. Use env and project settings; avoid hardcoded URLs. Enable preview deployments and protect production branch.
- **AWS (if used)**: Lambda for backend or verification; S3 for temporary photo storage if needed; Secrets Manager for attestation key. IAM least privilege; no long-lived keys in code.
- **Supabase**: Managed Postgres and auth. Scale tier as usage grows. Backups and point-in-time recovery per Supabase plan.
- **Firebase**: Push and email. Monitor delivery and errors.

### 4.3 Infrastructure as Code

- **Contracts**: Foundry deploy scripts and config (e.g. JSON or env) in repo. Document deploy steps in README or runbook.
- **Backend / infra**: If using AWS, define Lambda, API Gateway, and permissions in Terraform or AWS SAM/Serverless so changes are reviewable and repeatable.
- **Secrets and config**: No IaC for secret values; reference secret names/ARNs in IaC. Rotate attestation key and API keys per policy.

---

## 5. Incident Response and Management

### 5.1 Outage Detection and Mitigation

- **Detection**: Alerts from monitoring (availability, error rate, P1/P2). User reports and status page checks.
- **Mitigation**: Follow runbooks. Examples: backend down → check logs and deploy rollback; verification slow → scale or restart worker; indexer lag → check Moralis status and open ticket with provider. For contract bug (e.g. wrong payout): no in-place fix; document and prepare communication and, if needed, legal/audit follow-up. New contracts require audit and redeploy.

### 5.2 Incident Handling Workflow

1. **Declare**: First responder declares incident and severity (P1/P2). Notify channel and, for P1, page on-call.
2. **Communicate**: Update status page and, for major impact, notify affected users (email or in-app). Internal updates every 15–30 min until stable.
3. **Resolve**: Apply fix or rollback. Verify with health checks and smoke tests.
4. **Close**: Post-incident summary: what happened, root cause, what was done, and follow-up actions (e.g. runbook update, code fix, config change). Store in incident log.

### 5.3 Disaster Recovery and Rollback Plans

- **Frontend**: Rollback via Vercel (previous deployment). Revert code and redeploy if needed.
- **Backend**: Redeploy previous version from CI artifact or Git tag. Restore config and secrets from secure store. If DB corrupted (Supabase), use backups and point-in-time recovery per Supabase.
- **Contracts**: No admin pause or upgrade in MVP. If critical bug, document and coordinate with security/legal; user communication and potential migration path (new contract, user migration) are out of scope for this doc but must be planned at org level.
- **Attestation key compromise**: Rotate key immediately; deploy new backend config. Old attestations remain valid for already-resolved commitments; new check-ins use new key. Document in security runbook.

---

## 6. Performance Optimization

- **Frontend**: Use Next.js best practices (e.g. static where possible, lazy load). Keep bundle size small; monitor Core Web Vitals on Vercel.
- **Backend**: Optimize verification path (e.g. async queue, caching of model or heavy calls). Keep cold starts low for serverless (small bundle, minimal deps).
- **Indexing**: Ensure Moralis (or indexer) is tuned for Avalanche C-Chain; use filters to reduce event volume. Cache read-heavy data where appropriate.
- **Chain**: Avalanche fees are low; optimize contract calls (batch where possible, avoid redundant reads). Monitor gas per tx for future cost control.

---

## 7. Best Practices and Continuous Improvement

- **Automate first**: Prefer CI/CD and scripts over manual deploy. Manual steps only where required (e.g. mainnet contract deploy after audit).
- **Monitor and alert**: Proactive alerts with clear runbooks. Review and tune thresholds and runbooks after each incident.
- **Document**: Runbooks for deploy, rollback, and top 5 incidents. Keep in repo or wiki and link from alerts.
- **Review**: Post-incident review and blameless culture. Update runbooks, add tests or checks to prevent recurrence.
- **Security**: Audit contracts before mainnet. Secure attestation key and API keys; rotate per policy. No secrets in code or public repos.

---

## References

- LockIn Protocol spec: technical stack (Avalanche, Foundry, Next.js, Node/Express, Moralis, Supabase, Firebase), architecture, and threat model.
- Internal: CI/CD configs, runbooks, status page, and incident log location.
- Avalanche (llms.txt): [https://build.avax.network/llms.txt](https://build.avax.network/llms.txt) (index), [https://build.avax.network/llms-full.txt](https://build.avax.network/llms-full.txt) (full). Append `.md` to page URLs for markdown; use for automation or AI-assisted runbooks.
