# StudySprout Launch Page

A beautiful, forest-themed landing page for StudySprout with a waitlist and referral system. Built with Next.js 14, Tailwind CSS, and Supabase.

## Features

- 🌱 Forest-themed UI with smooth animations
- 📝 Waitlist form with validation
- 🔗 Referral system with tier rewards
- 📱 Responsive design for all devices
- 🚀 Deployable on Vercel Hobby (free tier)
- 💾 Supabase Free plan compatible

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **TypeScript**: Full type safety
- **Deployment**: Vercel

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor and run the schema from `supabase/schema.sql`
3. Go to Settings > API and copy your Project URL and anon key
4. Create a `.env.local` file based on `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the page.

### 4. Deploy to Vercel

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com) and import the repository
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

**⚠️ Important:** After deploying, make sure to run the database schema in Supabase (see `supabase/schema.sql`).

## Troubleshooting

**Waitlist form not working after deployment?** See the detailed troubleshooting guide:

👉 **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**

The guide covers:
- Setting up Supabase database schema
- Checking Vercel function logs
- Verifying environment variables
- Testing the API directly
- Common issues and solutions

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── waitlist/route.ts    # POST endpoint for waitlist
│   │   └── referral/route.ts    # GET endpoint for referral stats
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
├── components/
│   ├── Header.tsx               # Navigation header
│   ├── Hero.tsx                 # Hero section with waitlist form
│   ├── WaitlistForm.tsx         # Form with validation & referral
│   ├── HowItWorks.tsx           # How it works section
│   ├── BetaRewards.tsx          # Beta member benefits
│   ├── ReferralRewards.tsx      # Referral tier rewards
│   ├── FAQ.tsx                  # FAQ accordion
│   └── Footer.tsx               # Site footer
├── lib/
│   └── supabase.ts              # Supabase client
├── types/
│   └── index.ts                 # TypeScript types
├── supabase/
│   └── schema.sql               # Database schema
├── .env.example                 # Environment variables template
├── tailwind.config.ts           # Tailwind configuration
└── package.json
```

## API Endpoints

### POST /api/waitlist

Join the waitlist.

**Request Body:**
```json
{
  "email": "user@example.com",
  "platforms": { "android": true, "ios": false, "web": true },
  "priority": "economy",
  "referred_by": "ABCDEFGH",
  "company": "" // honeypot - leave empty
}
```

**Response:**
```json
{
  "ok": true,
  "ref_code": "ABCDEFGH",
  "ref_count": 0
}
```

### GET /api/referral?code=ABCDEFGH

Get referral statistics.

**Response:**
```json
{
  "ok": true,
  "ref_code": "ABCDEFGH",
  "ref_count": 3
}
```

## Referral Tiers

| Referrals | Tier Name | Reward |
|-----------|-----------|--------|
| 1 | Early Sprout | 7-day +10% fruit yield (beta-only boost) |
| 3 | Growing Garden | Priority support + exclusive beta badge |
| 5 | Thriving Grove | Exclusive winter cosmetic bundle |
| 10 | Master Gardener | Beta access + lifetime premium features |

## License

MIT
