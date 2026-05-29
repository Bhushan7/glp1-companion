
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
