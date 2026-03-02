# LockIn Protocol – Web App Prototype

Frontend-only **prototype** of the LockIn Protocol web app. All flows (wallet connect, create commitment, check-in, resolution, history) are implemented with **mocked** chain and backend: no real EscrowLock/CommitmentResolver calls, no Moralis/Supabase/Firebase.

## Run locally

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Connect a wallet (MetaMask/Core) on Avalanche Fuji or mainnet. Create commitments, submit photo check-ins (mock verification), and resolve as success or failure.

## References

- **Product & scope:** [PRD-LockIn-Protocol.md](../external/PRD-LockIn-Protocol.md)
- **Business model & tiers:** [lockin-business-model.md](../external/lockin-business-model.md)
- **Onboarding & support:** [Customer_success_support_strategy.md](../external/Customer_success_support_strategy.md)
- **DevOps & stack:** [DevOps_strategy.md](../external/DevOps_strategy.md)

## Tech stack

- Next.js 15 (App Router), Tailwind CSS, TypeScript
- wagmi + viem for wallet connect (Avalanche C-Chain / Fuji)
- Mock commitment store in `localStorage` (`lockin_commitments`)

## Free tier (prototype)

- Max 3 active commitments, 1 partner, no stake. Upgrade prompts when at limit or when trying to add stake.

## Disclaimer

This is a **prototype** for demonstration. It does not send real transactions or call deployed contracts. For full product behavior (escrow, attestations, indexing), see the PRD and spec.
