# LockIn Protocol Business Model

LockIn Protocol-based applications work with a **freemium model**: free tier delivers core value (habit tracking, check-ins, accountability), paid tiers unlock staking, scale, and advanced features.

## Freemium Tier Structure

| **Tier** | **Price** | **Target User** | **Core Limits** | **Key Features** |
|----------|-----------|-----------------|-----------------|------------------|
| Free | $0 | Students, casual users | 3 active commitments<br>No staking<br>1 accountability partner | Photo check-ins, reminders, basic dashboard, on-chain history (read-only) |
| Starter | $4.99/mo | Serious habit-builders | 10 commitments<br>Stake up to 0.5 AVAX total<br>2 partners | AVAX staking, partner payouts, configurable deadlines |
| Growth | $14.99/mo | Power users, small teams | 30 commitments<br>Stake up to 5 AVAX total<br>5 partners, peer challenges | Peer challenges, streaks/charts, priority verification |
| Enterprise | Custom | Orgs, cohorts, institutions | Unlimited<br>Custom stake caps<br>Unlimited partners | SSO, admin dashboard, Lock In Reserve split, API, SLA |

**Upgrade Triggers** (freemium pattern):
- Need to stake AVAX for real accountability → Starter
- Want peer challenges or more commitments/partners → Growth
- Need team/cohort management or custom limits → Enterprise

## Use-Case / Vertical Freemium Models

### 1. Personal Productivity
```
Free: 3 commitments, no stake, 1 partner
Starter ($4.99/mo): Stake up to 0.5 AVAX, 2 partners, reminders
Growth ($14.99/mo): Peer challenges, 5 partners, streaks and history
```
**Monetization**: Conversion when users want enforceable stakes and more partners.

### 2. Study & Exam Prep (Best Starter)
```
Free: 3 study commitments, no stake
Starter ($4.99/mo): Stake with study buddy, 2 partners
Growth ($14.99/mo): Study groups as challenges, 5 partners
```
**Monetization**: Students convert after first exam cycle when they want stakes with peers.

### 3. Fitness & Health
```
Free: 3 fitness commitments, photo check-ins only
Starter ($4.99/mo): Stake with gym partner, 2 partners
Growth ($14.99/mo): Challenge friends, 5 partners, history charts
```
**Monetization**: Conversion when users add accountability partners and want stakes.

### 4. Digital Wellness (No Social Media, Screen Time)
```
Free: 3 commitments, 1 partner
Starter ($4.99/mo): Stake up to 0.5 AVAX, 2 partners
Growth ($14.99/mo): Family/roommate challenges, 5 partners
```
**Monetization**: Households and couples upgrade for shared stakes and challenges.

### 5. Remote Work & Focus
```
Free: 3 focus commitments, no stake
Starter ($4.99/mo): Stake with coworker or accountability buddy
Growth ($14.99/mo): Team challenges, 5 partners, configurable timezones
```
**Monetization**: Remote workers and small teams pay for stakes and challenges.

### 6. Education & Bootcamps
```
Free: 3 commitments per student
Starter ($4.99/mo): Stake with peer, 2 partners
Enterprise (custom): Cohort management, instructor dashboard, custom stake caps
```
**Monetization**: Bootcamps and courses license Enterprise for cohorts.

### 7. Creator & Content Consistency
```
Free: 3 commitments, 1 partner
Starter ($4.99/mo): Stake with accountability partner
Growth ($14.99/mo): Challenge other creators, 5 partners, history
```
**Monetization**: Creators upgrade when they want stakes and peer challenges.

## Revenue Projections & Validation

**Conservative Year 1** (Personal Productivity + Study focus):
```
Users: 10,000 Free → 4% conversion = 400 Starter ($4.99)
Monthly Recurring Revenue: ~$2,000
Annual: ~$24,000
CAC: $15–30 (organic + light paid)
LTV: $80–120 (18–24 month retention for paid)
```

**Proven Freemium Success Patterns**:
- **Habitica**: Free habits → Premium (subscription) for power users
- **Streaks / Way of Life**: Free limited → Paid for unlimited and widgets
- **Beeminder**: Free tier → Paid for more goals and stakes

## Technical Implementation

**LockIn Protocol Integration**:
```
Free tier: 3 commitments, no stake tx, 1 partner; read-only chain history
Paid tiers: EscrowLock/CommitmentResolver for stakes; partner payouts; challenge logic
Usage tracking: Commitments created, check-ins, stake volume (backend + indexer)
Billing: Stripe → enforce tier limits at backend; block stake/create above limit
```

**Key Freemium Levers**:
- **Time to value**: First commitment + check-in in under 5 minutes (onboarding flow)
- **Clear upgrade path**: In-app prompts when user hits 3 commitments or tries to add stake
- **Viral sharing**: Partner invite (magic link) brings new users; challenge invites
- **Data moat**: On-chain history and streaks; better verification over time

## Recommended MVP: Personal Productivity + Study

**Why**:
- Aligns with primary users (students and young professionals) in spec
- Single vertical simplifies messaging and limits
- Staking is optional; free tier validates habit + check-in value first
- Study buddy / exam prep is a natural first paid use case

**Week 1 MVP**:
```
1. Ship Free: 3 commitments, 1 partner, photo check-ins, no stake
2. Stripe integration for Starter ($4.99); gate stake and 2nd partner
3. Landing page + one clear CTA: "Add stakes and a second partner"
4. Analytics: signups, commitment completion rate, upgrade clicks
```

**Expected**: 500 signups week 1 → 15–20 Starter → ~$75–100 MRR for immediate validation
