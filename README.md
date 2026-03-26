# Samsara TrustLoop — APM Portfolio Project

**Live Demo:** [Deploy link here]
**Built by:** Ali Hasan · CS Senior · Spring 2026 · [LinkedIn](https://linkedin.com/in/alihasan-786)
**Context:** Portfolio project built to demonstrate PM + engineering capability for Samsara's APM program

---

## What Is TrustLoop?

TrustLoop is an RLHF-powered driver dispute layer for Samsara's Video-Based Safety product. When Samsara's AI flags a safety event (distraction, phone use, fatigue), drivers currently have no structured way to challenge false positives. TrustLoop closes that loop:

1. **Driver disputes** the AI flag in 2 taps via a mobile-first workflow
2. **Manager reviews** a side-by-side AI vs. Driver comparison in a desktop dashboard
3. **Every resolution** is written back to the model as labeled training data (RLHF flywheel)

The result: fewer false positives, higher driver trust, and a continuously improving safety AI.

---

## The Problem (Why This Matters to Samsara)

| Signal | Evidence |
|--------|----------|
| **Legal risk** | BNSF Railway paid **$75M** to settle a BIPA class action (N.D. Ill., 2022) for collecting biometric data without consent — Samsara's AI dashcams capture eye-tracking and facial data in Illinois under the same statute |
| **Retention risk** | Large truckload carriers see **~90% annual driver turnover** (ATA, Q3 2023); average replacement cost **$11,626/driver** (Conversion Interactive Agency, 2019) |
| **Data quality risk** | Samsara's AI coaching reduces review workload by up to **90%** (Samsara, 2024) — false positives that go unchallenged contaminate that automation's training data |
| **Media documentation** | The Markup (2023): *"Truckers Say AI Surveillance Dashcams Are Ruining Their Lives"* — systematic investigation across Samsara, Lytx, and Netradyne fleets |

---

## Demo Structure

The app has four fully interactive views:

| Route | View | Description |
|-------|------|-------------|
| `/` | Landing Page | Problem framing, how it works, ROI calculator |
| `/driver` | Driver Mobile View | Submit a dispute in 2 taps — mobile-first, pre-categorized reasons |
| `/manager` | Fleet Manager Dashboard | Review pending disputes with AI vs. Driver side-by-side comparison |
| `/analytics` | Trust Impact Analytics | Live charts showing dispute outcomes, confidence distribution, ROI |
| `/case-study` | PM Case Study | Full product spec: problem, users, solution, metrics, RLHF architecture |

**Real-time state:** Disputes submitted in the Driver view appear instantly in the Manager dashboard and Analytics — no page refresh.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Samsara enterprise design tokens)
- **Charts:** Recharts
- **Icons:** Lucide React
- **State:** React Context (shared dispute state across all views)
- **Deploy:** Vercel

---

## PM Artifacts Included

- **Full case study** (`/case-study`) — problem definition, user personas, solution design, success metrics, RLHF flywheel, ROI model, technical architecture
- **ROI model** — $60,730 annual value for a 500-driver fleet (driver retention + manager productivity), sourced from ATA 2023 turnover data and Conversion Interactive Agency cost-per-hire research
- **Success metrics** — dispute rate by confidence bucket, driver churn rate, AI model accuracy by quarter
- **"What I'd Build Next"** — Driver Reputation Score, Bulk AI Auto-Review, Cross-Fleet Benchmarking

---

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Key Product Insights Demonstrated

**1. Dispute resolution = data labeling pipeline**
Every approved dispute creates a high-quality negative training example (this pattern ≠ distraction). Every rejected dispute confirms a true positive. The product workflow *is* the ML pipeline.

**2. Lowest-friction input = highest-quality structured data**
Pre-categorized reason codes (Mirror Check, Sun Glare, Radio/HVAC) instead of free text reduces cognitive load for drivers *and* produces structured data for the RLHF pipeline — vs. free text which is hard to vectorize.

**3. Confidence score triage**
Color-coding manager review by AI confidence (amber <60%, orange 60–75%, red >75%) enables instant visual triage without requiring managers to dig through logs — reducing decision time and improving consistency.

---

*Samsara TrustLoop is an independent portfolio project and is not affiliated with or endorsed by Samsara, Inc.*
