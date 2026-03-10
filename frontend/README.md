# LockIn Protocol – Web App

Frontend for the LockIn Protocol web app. LockIn is **open source** with **no cryptocurrency or monetization**. This app supports commitment creation, check-ins, and optional peer review; all flows use application storage (e.g. mock or backend API)—no wallet, no chain.

## Run locally

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign up (or use mock auth), create commitments, submit check-ins, and view history. No wallet or stake required.

## References

- **Product & scope:** [PRD-LockIn-Protocol.md](../external/PRD-LockIn-Protocol.md)
- **Canonical product doc:** [DOCUMENTATION.MD](../DOCUMENTATION.MD)
- **MVP reference:** [docs/LockIn-Protocol-MVP.md](../docs/LockIn-Protocol-MVP.md)
- **Onboarding & support:** [Customer_success_support_strategy.md](../external/Customer_success_support_strategy.md)
- **DevOps & stack:** [DevOps_strategy.md](../external/DevOps_strategy.md)

## Tech stack

- Next.js 15 (App Router), Tailwind CSS, TypeScript
- Optional mock commitment store in `localStorage` for prototype; production would use backend API.

No wallet libraries or chain integration; the product is application-only.

## Disclaimer

This is a **prototype** or **early build** for demonstration. For full product behavior (persistence, verification, partner review), see the PRD and spec. LockIn does not use or hold any funds or tokens.
