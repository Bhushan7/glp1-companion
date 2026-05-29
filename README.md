
# GLP-1 Companion

> AI-powered health tracking for GLP-1 medication users.

**Live app:** https://myglp1companion.com

---

## What it does

GLP-1 Companion helps people on Ozempic, Wegovy, Mounjaro, and Zepbound 
track their journey and understand why their weight loss slows down.

- **AI weekly insights** — every Friday, a personalised 200-word report 
  correlating your food, hydration, energy, and weight data
- **Doctor visit PDF report** — one-tap summary of the last 4 weeks to 
  bring to appointments
- **Daily health log** — weight, dose, side effects, protein, water, energy

---

## Tech stack

| Layer | Tool |
|---|---|
| Framework | Next.js 14 (App Router) |
| Database | Supabase (Postgres + Auth) |
| AI insights | Anthropic Claude API |
| Email | Loops |
| Payments | Lemon Squeezy |
| Hosting | Vercel |

---

## Local development

```bash
git clone https://github.com/Bhushan7/glp1-companion
cd glp1-companion
npm install
cp .env.local.example .env.local
# fill in your env vars
npm run dev
```

---

## Environment variables
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
ANTHROPIC_API_KEY
LOOPS_API_KEY
LOOPS_WEEKLY_TEMPLATE_ID
NEXT_PUBLIC_APP_URL
CRON_SECRET

---

## Project structure
app/
├── page.tsx              ← landing page
├── dashboard/            ← main user dashboard
├── log/                  ← daily health log entry
├── report/               ← weekly insights history
├── onboarding/           ← first-login setup
└── api/
├── log/              ← save daily entry
├── onboarding/       ← upsert user profile
├── waitlist/         ← waitlist signups
└── send-weekly-insights/ ← Vercel cron (Fridays 8am UTC)

---

## Guardrails

- Not a medical device — positioned as a personal wellness journal
- No HIPAA obligations at MVP — users log their own lifestyle data
- Claude system prompt explicitly forbids medical advice
- PDF reports framed as personal reference, not clinical documentation

---

## Roadmap

- [ ] Lemon Squeezy payments ($9.99/month Pro)
- [ ] Doctor visit PDF generation
- [ ] Cohort community (group by start week)
- [ ] Medication cost and discount tracker
- [ ] Post-GLP-1 maintenance mode
- [ ] Medicare coverage wave (July 2026)
