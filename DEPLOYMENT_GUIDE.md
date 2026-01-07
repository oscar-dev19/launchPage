# Complete Setup Guide: StudySprout Launch Page

This guide walks you through deploying the StudySprout waitlist landing page to Vercel with Supabase as the database.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Local Setup](#2-local-setup)
3. [Supabase Setup](#3-supabase-setup)
4. [Database Setup](#4-database-setup)
5. [Environment Variables](#5-environment-variables)
6. [Local Testing](#6-local-testing)
7. [Git & GitHub](#7-git--github)
8. [Vercel Deployment](#8-vercel-deployment)
9. [Post-Deployment Verification](#9-post-deployment-verification)

---

## 1. Prerequisites

Before starting, ensure you have:

- A GitHub account (for Vercel deployment)
- A Supabase account (free plan is sufficient)
- Node.js 18+ installed locally
- Git installed and configured

---

## 2. Local Setup

### Step 2.1: Navigate to Project Directory

```bash
cd /Users/oscarlopez/Apps/StudySprout/launchPage
```

### Step 2.2: Install Dependencies

```bash
npm install
```

### Step 2.3: Verify Build Works

```bash
npm run build
```

**Expected Output:**
```
✓ Compiled successfully
✓ Generating static pages (6/6)
Route (app)                              Size     First Load JS
┌ ○ /                                    5.57 kB        92.5 kB
```

If successful, you should see `.next` folder created.

### Step 2.4: Test Locally (Optional)

```bash
npm run dev
```

Visit `http://localhost:3000` to see the page (without backend functionality until Supabase is set up).

---

## 3. Supabase Setup

### Step 3.1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in or create an account
4. Click "New Project"
5. Fill in project details:
   - **Name**: `studysprout-waitlist`
   - **Database Password**: Create a strong password and save it somewhere safe
   - **Region**: Choose a region close to your target users
6. Click "Create new project"
7. Wait for your project to initialize (typically 1-2 minutes)

### Step 3.2: Get Project Credentials

Once the project is ready:

1. Go to **Project Settings** (gear icon on left)
2. Click **API** in the sidebar
3. Copy the following values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: Starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**Save these securely - you'll need them for environment variables.**

---

## 4. Database Setup

### Step 4.1: Open SQL Editor

1. In Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click "New query"

### Step 4.2: Run Schema Migration

Open the file `supabase/schema.sql` from your project and **copy the entire content**.

Paste it into the SQL Editor and click **Run**.

The script will:
- Create the `waitlist` table with all required columns
- Create indexes for performance
- Create the `increment_ref_count` function for atomic updates
- Enable Row Level Security (RLS)
- Create policies for public access

**Expected Result**: You should see "Success" in the query result output.

### Step 4.3: Verify Table Structure

1. Go to **Table Editor** in the left sidebar
2. You should see a `waitlist` table with columns:
   - `id` (UUID)
   - `email` (text, unique)
   - `platforms` (jsonb)
   - `priority` (text)
   - `ref_code` (text, unique)
   - `referred_by` (text)
   - `ref_count` (integer)
   - `created_at` (timestamptz)

### Step 4.4: Test the Database (Optional)

Click the **Insert row** button in the `waitlist` table to verify it works. You can delete this test row afterward.

---

## 5. Environment Variables

### Step 5.1: Create Local .env.local

The `.env.local` file already exists in your project. Edit it:

```bash
nano .env.local
# or open it in your favorite text editor
```

### Step 5.2: Add Supabase Credentials

Replace the placeholder values with your actual credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**:
- Do NOT include the `anon public key` label - only the actual key value
- The URL should be exactly as shown in Supabase settings
- Do NOT add quotes around the values
- Save the file

### Step 5.3: Verify Environment Variables Work

```bash
npm run dev
```

Open `http://localhost:3000`. The page should load without errors. Check the browser console for any Supabase connection errors.

---

## 6. Local Testing

### Step 6.1: Test the Waitlist Form

1. Open `http://localhost:3000`
2. Fill out the form:
   - Email: `test@example.com`
   - Select at least one platform
   - Select a priority
3. Click "Join Beta Waitlist"

### Step 6.2: Check Success State

You should see:
- Success message: "You're on the list!"
- Your unique referral code (8 characters)
- Copy button and share buttons
- Referral progress bars

### Step 6.3: Verify in Supabase

1. Go back to Supabase Table Editor
2. Click the `waitlist` table
3. You should see the new entry with:
   - Your test email
   - Selected platforms
   - A unique `ref_code`
   - `ref_count` = 0

### Step 6.4: Test Referral Link

1. Copy your referral link from the success screen
2. Open it in an incognito window: `http://localhost:3000?ref=YOURCODE`
3. Fill out the form with a different email
4. After success, check the original user's `ref_count` - it should be 1!

---

## 7. Git & GitHub

### Step 7.1: Initialize Git (if not already)

```bash
# Check if already initialized
git status

# If not initialized, initialize
git init
```

### Step 7.2: Create .gitignore

The `.gitignore` file is already in your project. It excludes:
- `node_modules/`
- `.next/` (build files)
- `.env.local` (your secrets!)
- `.DS_Store` (Mac system files)

### Step 7.3: Stage Files

```bash
git add .
```

### Step 7.4: Commit Initial Code

```bash
git commit -m "Initial commit: StudySprout waitlist landing page

- Next.js 14 with App Router
- Tailwind CSS with forest theme
- Supabase integration for waitlist
- Referral system with tier rewards
- Responsive design for all devices"
```

### Step 7.5: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click the **+** icon → **New repository**
3. Fill in:
   - Repository name: `studysprout-launchpage`
   - Make it **Public** or **Private** (your choice)
   - **DO NOT** initialize with README, .gitignore, or license (we already have them)
4. Click **Create repository**

### Step 7.6: Push to GitHub

```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/studysprout-launchpage.git

# Push to main branch
git push -u origin main
```

Or if your local branch is named `master`:

```bash
git branch -M main
git push -u origin main
```

**Expected Output**: Code uploads and you see a success message with a link to view your repository.

---

## 8. Vercel Deployment

### Step 8.1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose **Continue with GitHub** (easiest)
4. Authorize Vercel to access your GitHub account

### Step 8.2: Import Repository

1. On your Vercel dashboard, click **"Add New..."** → **Project**
2. You'll see a list of your GitHub repositories
3. Find and click **Import** next to `studysprout-launchpage`

### Step 8.3: Configure Project

Vercel will auto-detect this as a **Next.js** project. Review settings:

#### Framework Preset
- Should say "Next.js" ✓

#### Root Directory
- Should stay as `./` ✓

#### Build Command
- Should be `npm run build` ✓

#### Output Directory
- Should be `.next` ✓

#### Install Command
- Should be `npm install` or `npm ci` ✓

### Step 8.4: Add Environment Variables

This is CRITICAL. Scroll down to **Environment Variables** section:

Click **Add New** and add:

**Variable 1:**
- Name: `NEXT_PUBLIC_SUPABASE_URL`
- Value: `https://your-project-id.supabase.co` (your actual URL)
- Environment: **All** (Production, Preview, Development)

**Variable 2:**
- Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Value: `your-anon-key-here` (your actual key from Supabase)
- Environment: **All** (Production, Preview, Development)

Click **Add** after each variable.

### Step 8.5: Deploy

Click the blue **Deploy** button.

**Expected Process**:
1. Vercel clones your repo
2. Installs dependencies
3. Runs `npm run build`
4. Deploys to edge servers

This typically takes 1-2 minutes.

### Step 8.6: Get Your Live URL

Once complete, you'll see:
- ✅ "Congratulations!" message
- **Deployment URL**: `https://studysprout-launchpage.vercel.app` (or similar)
- You can also set a custom domain later

---

## 9. Post-Deployment Verification

### Step 9.1: Test the Live Site

1. Click your deployment URL
2. Fill out the waitlist form
3. Click "Join Beta Waitlist"
4. Verify you see the success state

### Step 9.2: Check Database

1. Go back to Supabase
2. Open the `waitlist` table
3. You should see new entries from the live site

### Step 9.3: Test Referral Link

1. Copy your referral code from the live site
2. Open: `https://your-domain.vercel.app?ref=YOURCODE`
3. Sign up with another email
4. Verify referral count increments

### Step 9.4: View Deployment Logs (If Issues)

If something doesn't work:

1. Go to Vercel dashboard → Your project
2. Click **Deployments** tab
3. Click the deployment status
4. View **Build Logs** and **Function Logs**

### Step 9.5: Monitor Analytics (Optional)

1. In Vercel dashboard, go to **Analytics** tab
2. You can see page views, visitors, and performance metrics

---

## 10. Custom Domain Setup

This section walks you through configuring your own domain (e.g., `waitlist.studysprout.com`) for your Vercel deployment.

### Step 10.1: Choose Your Domain Approach

You have three options for obtaining a domain:

**Option A: Use an Existing Domain** (you already own)
- You've purchased `studysprout.com` from Namecheap, GoDaddy, etc.
- You want to use a subdomain like `waitlist.studysprout.com`

**Option B: Buy a New Domain**
- Purchase from a registrar (Namecheap, GoDaddy, Google Domains, etc.)
- Cost: $10-15/year for most .com domains

**Option C: Use Vercel Subdomain** (free, no purchase needed)
- Get `waitlist.vercel.app` automatically
- Can use `.vercel.app` as your main URL
- No DNS configuration required

### Step 10.2: Add Domain to Vercel

#### For Existing Domains

1. Go to your project in Vercel dashboard
2. Click **Settings** (gear icon) → **Domains**
3. Click the **Add** button
4. Enter your domain:
   - For root domain: `studysprout.com`
   - For subdomain: `waitlist.studysprout.com`
5. Click **Add**

#### For New Domains (not yet purchased)

If you haven't purchased yet:

1. Buy your domain from any registrar
2. Come back to Vercel and add it (step above)
3. Continue to Step 10.3

### Step 10.3: Configure DNS Records

After adding the domain, Vercel will show you required DNS records. You'll see a screen with one of two states:

#### State A: Domain is Not Configured (Most Common)

You'll see red warnings that DNS records need updating. Vercel provides specific records to add.

**Record Types Vercel May Request:**

**For Root Domain** (e.g., `studysprout.com`):

| Type | Name/Host | Value/Answer | TTL |
|-------|-------------|----------------|------|
| A | @ | 76.76.21.21 | 300 (or leave default) |
| CNAME | www | cname.vercel-dns.com | 300 |

**For Subdomain** (e.g., `waitlist.studysprout.com`):

| Type | Name/Host | Value/Answer | TTL |
|-------|-------------|----------------|------|
| CNAME | waitlist | cname.vercel-dns.com | 300 |

**Note**: The exact IP address and CNAME value will differ. **Use exactly what Vercel shows you!**

#### State B: Domain is Already Configured

If you see a green checkmark, Vercel auto-detected your DNS records. You can skip to Step 10.5.

### Step 10.4: Update DNS at Your Registrar

You need to add the DNS records at your domain registrar (where you bought the domain).

#### Example: Namecheap

1. Log in to Namecheap
2. Go to **Domain List** → click **Manage** next to your domain
3. Go to **Advanced DNS** tab
4. Click **Add New Record**
5. Create records matching what Vercel provided:
   - Type: `A` or `CNAME`
   - Host: `@` or `waitlist`
   - Value: The IP or CNAME from Vercel
6. Click **Save All Changes**

#### Example: GoDaddy

1. Log in to GoDaddy
2. Go to **My Products** → **DNS**
3. Click **Add** next to your domain
4. Create record:
   - Type: Select from dropdown (`A` or `CNAME`)
   - Name: `@` for root, `waitlist` for subdomain
   - Value: Paste from Vercel
   - TTL: Leave default (typically 600)
5. Click **Save**

#### Example: Google Domains

1. Go to **Google Domains** → your domain
2. Click **DNS** tab
3. Click **Add custom resource record**
4. Fill in:
   - Name: `@` or `waitlist`
   - Type: `A` or `CNAME`
   - IPv4 address / CNAME: Paste from Vercel
5. Click **Add**

### Step 10.5: Wait for DNS Propagation

DNS changes typically take:

| Timeframe | What Happens |
|------------|---------------|
| 0-5 minutes | Vercel may detect changes |
| 5-30 minutes | Some DNS servers update |
| 30-60 minutes | Most DNS servers updated |
| 1-48 hours | Full worldwide propagation |

**During this time:**
- Vercel will show "DNS propagating" status
- The domain may not work for some users
- Your old URL (`.vercel.app`) still works

**Best Practice:**
- Make DNS changes during off-peak hours (late night)
- Don't make multiple changes at once
- Wait at least 1 hour before troubleshooting

### Step 10.6: Verify Domain is Working

#### Check Vercel Dashboard

1. Go to **Settings** → **Domains**
2. Your domain should show:
   - Green ✅ checkmark
   - Status: "Valid Configuration"
   - "DNS configured correctly"

#### Test in Browser

1. Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
2. Visit your domain: `https://waitlist.studysprout.com`
3. You should see your waitlist page
4. Test the waitlist form to confirm it works

#### Test SSL Certificate

1. Click the lock icon next to URL in browser
2. Should show "Connection is secure"
3. Certificate should be for your domain
4. Vercel provides automatic SSL for free!

### Step 10.7: Set Primary Domain

After your custom domain is verified:

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Find your new custom domain
3. Click the three dots (⋮) → **Set as Primary**
4. Confirm

**What This Does:**
- `studysprout-launchpage.vercel.app` automatically redirects to `waitlist.studysprout.com`
- All links point to your custom domain
- Better branding for your project

**You Can Still Keep Both:**
- Old `.vercel.app` URL redirects to new domain
- Great for testing and fallback

### Step 10.8: Update Environment Variables (If Needed)

If your app uses environment variables with domain names (e.g., callback URLs):

1. In Vercel, go to **Settings** → **Environment Variables**
2. Check for variables like:
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_DOMAIN`
3. Update them to your new domain: `https://waitlist.studysprout.com`
4. Redeploy: Click **Deployments** → **Redeploy** for latest deployment

**For This Project:**
You're using `window.location.origin` in `WaitlistForm.tsx`, which auto-uses whatever domain the site is loaded from. No changes needed!

### Step 10.9: Optional Domain Configurations

#### Redirect www to Non-www (or vice versa)

If you want `www.studysprout.com` to redirect to `studysprout.com`:

1. Go to Vercel **Settings** → **Domains**
2. Add both domains:
   - `studysprout.com`
   - `www.studysprout.com`
3. Set one as **Primary** (e.g., `studysprout.com`)
4. Vercel auto-creates the redirect

#### Configure Subdomains for Other Projects

If you own `studysprout.com` and want multiple subdomains:

| Subdomain | Purpose | Vercel Project |
|------------|-----------|----------------|
| `waitlist.studysprout.com` | Waitlist landing page | This project |
| `app.studysprout.com` | Main application | Create separate project |
| `blog.studysprout.com` | Blog | Create separate project |
| `docs.studysprout.com` | Documentation | Create separate project |

Each subdomain can point to a different Vercel project with its own repo.

### Step 10.10: Remove Old Vercel Domain (Optional)

If you no longer want the `.vercel.app` URL:

1. Go to **Settings** → **Domains**
2. Find `studysprout-launchpage.vercel.app`
3. Click ⋮ → **Remove Domain**
4. Confirm removal

**Warning**: Once removed, the `.vercel.app` URL is gone and can't be recovered!

---

## Troubleshooting - Custom Domain Issues

### Issue: Domain Shows "Invalid Configuration"

**Symptom**: Vercel shows warning that DNS records are incorrect

**Solutions**:
1. Double-check DNS records match Vercel instructions exactly
2. Verify you didn't accidentally add spaces in values
3. Wait at least 30 minutes for propagation
4. Some registrators use different terminology:
   - "Host" or "Name" for the domain part
   - "Value", "Points to", or "Answer" for the target
5. Use DNS lookup tools like:
   - `dig waitlist.studysprout.com`
   - `nslookup waitlist.studysprout.com`
   - Compare results to what Vercel expects

### Issue: Domain Works on One Device, Not Another

**Symptom**: Site loads on your phone but not your laptop, or vice versa

**Solutions**:
1. Clear DNS cache on devices:
   - **Mac**: `sudo dscacheutil -flushcache`
   - **Windows**: `ipconfig /flushdns`
   - **Linux**: `sudo systemctl restart nscd`
   - **Browser**: Clear cache, open in incognito mode
2. Wait - some ISPs cache DNS longer than others (up to 48 hours)

### Issue: SSL Certificate Not Working

**Symptom**: Browser shows "Not secure" warning for your domain

**Solutions**:
1. Wait 30-60 minutes after DNS propagates
2. Vercel automatically provisions Let's Encrypt SSL certificates
3. Check Vercel dashboard for certificate status
4. Ensure DNS records are correct (SSL requires proper DNS)
5. If still broken, click **"Renew Certificate"** in Vercel domain settings

### Issue: Domain Redirects to Old Vercel URL

**Symptom**: `waitlist.studysprout.com` redirects back to `.vercel.app`

**Solutions**:
1. Check if you set `.vercel.app` as **Primary** domain
2. Switch primary to your custom domain in Vercel settings
3. Check if your registrar has forwarding rules configured
4. Verify no conflicting `.htaccess` or rewrite rules

### Issue: 404 Page on Custom Domain

**Symptom**: Custom domain shows Vercel's default 404 page

**Solutions**:
1. Verify project deployment succeeded (no build errors)
2. Check that domain points to the **correct project**
3. In Vercel dashboard, confirm domain is attached to this project
4. Check `next.config.mjs` for any path rewrites that might interfere
5. Try the `.vercel.app` URL - if it works there, it's a DNS issue

---

## Security & Maintenance for Custom Domains

### Monitor SSL Expiration

Vercel auto-renews SSL certificates, but verify:

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Check that SSL status shows "Valid Certificate"
3. Certificates auto-renew 30 days before expiration
4. If certificate shows "Expiring Soon", contact Vercel support

### Set Up Domain Expiration Alerts

Vercel doesn't alert when your domain registration expires. Add reminders:

1. Check when you purchased your domain (expiration date)
2. Set calendar reminders:
   - 30 days before expiration
   - 7 days before expiration
   - 1 day before expiration
3. Enable auto-renewal at your registrar if available
4. Update payment method if expiring

### Monitor DNS Health

Use tools like:
- **UptimeRobot**: Free uptime monitoring
- **Pingdom**: More detailed, paid tier
- **DNSChecker**: Verify DNS records globally

Configure alerts to notify you if your domain goes offline.

---

## DNS Configuration Quick Reference

| Registrar | How to Find DNS Settings |
|------------|-------------------------|
| Namecheap | Domain → Manage → Advanced DNS |
| GoDaddy | My Products → DNS Management |
| Google Domains | Domain → DNS |
| Cloudflare | DNS tab |
| Hover | DNS → DNS Records |
| Network Solutions | My Domain → Manage DNS |
| Bluehost | Domains → DNS |

---

## Cost Comparison: Hosting Options

| Option | Annual Cost | Pros | Cons |
|---------|--------------|-------|-------|
| Vercel `.vercel.app` | **FREE** | Easy, no config | Generic URL |
| Custom Domain (bought elsewhere) | **$10-15/year** | Full control, branding | DNS setup required |
| Custom Domain (bought via Vercel) | **$15-20/year** | Integrated setup | Slightly more expensive |
| Vercel Pro (additional features) | **$20/month** | Advanced analytics, more bandwidth | Not needed for simple landing page |

**For This Waitlist Page**: Free Vercel tier + custom domain from Namecheap (~$12/year) is recommended.

---

## Domain Setup Checklist

Before moving on, verify:

- [ ] Domain added in Vercel dashboard
- [ ] DNS records configured at registrar
- [ ] Vercel shows green checkmark ("Valid Configuration")
- [ ] SSL certificate is valid
- [ ] Domain loads correctly in browser
- [ ] Primary domain set to custom URL
- [ ] Waitlist form works on custom domain
- [ ] Referral links work with custom domain
- [ ] Old `.vercel.app` URL still works (optional)
- [ ] Domain expiration date noted

---

## Troubleshooting

### Issue: Build Fails on Vercel

**Symptom**: Build error during deployment

**Solutions**:
1. Check Build Logs for specific error
2. Verify `package.json` has correct scripts
3. Ensure no `NODE_ENV` conflicts
4. Make sure environment variables are set correctly

### Issue: Supabase Connection Error

**Symptom**: "Supabase client not configured" error

**Solutions**:
1. Verify environment variables in Vercel (case-sensitive!)
2. Check that values don't have extra spaces or quotes
3. Make sure you used the **anon public key**, not the service_role key
4. Test in local dev first to confirm credentials work

### Issue: Waitlist Form Doesn't Submit

**Symptom**: Form submits but nothing happens or shows error

**Solutions**:
1. Open browser DevTools → Console (F12)
2. Look for network errors (Network tab)
3. Check Supabase Table Editor to see if table exists
4. Verify RLS policies are correctly set (re-run schema.sql if needed)

### Issue: Referral Count Not Incrementing

**Symptom**: New signup doesn't increment referrer's count

**Solutions**:
1. Verify `increment_ref_count` function exists in Supabase
2. Check that RPC is called in `/api/waitlist/route.ts`
3. Ensure no self-referral is happening
4. Check browser console for RPC errors

### Issue: Database Already Has Data

**Symptom**: Local development has old test data

**Solution**: Clear the `waitlist` table in Supabase Table Editor (select all → Delete) for testing.

---

## Optional Enhancements

### Add Custom Domain

For detailed instructions on setting up your own domain (e.g., `waitlist.studysprout.com`), see **[Section 10: Custom Domain Setup](#10-custom-domain-setup)** above.

Quick summary:
1. In Vercel project → **Settings** → **Domains**
2. Click **Add** and enter your domain
3. Update DNS records at your domain registrar
4. Wait for SSL certificate (typically 1-2 hours)
5. Verify domain is working and set as primary

### Enable Preview Deployments

Vercel already creates preview URLs for each branch. To enable:
- Push to a new branch: `git checkout -b feature/new-ui`
- Vercel auto-deploys to a preview URL
- Great for testing before merging to main

### Set Up Error Tracking

Consider adding:
- **Sentry** for error tracking
- **Vercel Analytics** (included with Pro, some features on free)

---

## Security Checklist

- ✅ `.env.local` is in `.gitignore` (never commit secrets!)
- ✅ Using **anon public key**, not service_role key (service_role = full admin access)
- ✅ Row Level Security (RLS) enabled on Supabase
- ✅ Policies allow necessary operations but prevent abuse
- ✅ Honeypot field protects against spam bots
- ✅ Input validation on both frontend and backend

---

## Maintenance

### Regular Tasks

1. **Monitor Supabase usage**: Check dashboard for free plan limits
2. **Review waitlist growth**: Export data occasionally for marketing outreach
3. **Update Vercel dependencies**: Vercel shows security alerts for outdated packages
4. **Back up database**: Supabase has daily backups, but export regularly too

### Updating the Site

1. Make changes locally
2. Test: `npm run dev`
3. Commit: `git add . && git commit -m "Update X"`
4. Push: `git push`
5. Vercel auto-deploys within minutes!

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Project README**: Check the `README.md` in your project root

---

## Success!

You now have a fully deployed waitlist landing page with:

- ✅ Beautiful forest-themed design
- ✅ Functional waitlist with validation
- ✅ Referral system with tier rewards
- ✅ Shareable links for social media
- ✅ Progress tracking toward rewards
- ✅ Deployed to Vercel (free tier)
- ✅ Backed by Supabase (free plan)

Start promoting your waitlist and building your early user community!
