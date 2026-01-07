# How to Look Up Emails in Waitlist

## Method 1: Using Supabase SQL Editor (Recommended)

### Step 1: Open Supabase SQL Editor

1. Go to your Supabase project: https://zhvvofnmsxdistxqjthb.supabase.co
2. Click **"SQL Editor"** on left sidebar (puzzle piece icon)

---

### Query 1: View All Emails and Referral Codes

```sql
SELECT
    email,
    ref_code,
    ref_count,
    platforms,
    priority,
    referred_by,
    created_at
FROM waitlist
ORDER BY created_at DESC;
```

**What this shows:**
- All waitlist signups
- Email addresses
- Their referral codes
- How many people they've referred
- Selected platforms
- Priority selection
- Who referred them (if any)
- When they signed up

---

### Query 2: View Only Emails (Simple List)

```sql
SELECT email
FROM waitlist
ORDER BY created_at DESC;
```

**What this shows:**
- Just a clean list of all email addresses
- Ordered by most recent first

---

### Query 3: View Top Referrers

```sql
SELECT
    email,
    ref_code,
    ref_count,
    created_at
FROM waitlist
ORDER BY ref_count DESC
LIMIT 10;
```

**What this shows:**
- Top 10 users with most referrals
- Great for identifying your power users

---

### Query 4: View Total Signups

```sql
SELECT COUNT(*) AS total_signups
FROM waitlist;
```

**What this shows:**
- Total number of people on your waitlist

---

### Query 5: View Signups by Platform

```sql
SELECT
    jsonb_array_elements(platforms)->>'0' AS platform,
    COUNT(*) AS count
FROM (
    SELECT platforms
    FROM waitlist
) AS exploded
WHERE platform IS NOT NULL
GROUP BY platform
ORDER BY count DESC;
```

**What this shows:**
- How many people want each platform (Web, iOS, Android)

---

### Query 6: View Signups by Priority

```sql
SELECT
    priority,
    COUNT(*) AS count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM waitlist), 1) AS percentage
FROM waitlist
GROUP BY priority
ORDER BY count DESC;
```

**What this shows:**
- How many people selected each priority
- Percentage breakdown (e.g., "Economy: 45%, Winter: 30%")

---

### Query 7: Search for Specific Email

```sql
SELECT *
FROM waitlist
WHERE email = 'user@example.com';
```

**Replace `user@example.com` with the email you're looking for.**

**What this shows:**
- Full details for a specific user
- When they signed up
- Their referral code and stats

---

### Query 8: View Referrals by Date

```sql
SELECT
    DATE(created_at) AS signup_date,
    COUNT(*) AS daily_signups
FROM waitlist
GROUP BY signup_date
ORDER BY signup_date DESC
LIMIT 30;
```

**What this shows:**
- Signups per day for the last 30 days
- Great for tracking growth trends

---

### Query 9: Export All Data (for Excel/Google Sheets)

```sql
SELECT
    email,
    ref_code,
    ref_count,
    platforms->>'web' AS web,
    platforms->>'ios' AS ios,
    platforms->>'android' AS android,
    priority,
    referred_by,
    created_at::text AS created_at
FROM waitlist
ORDER BY created_at DESC;
```

**What this shows:**
- Clean export-ready data
- Platforms as separate columns (not JSON)
- Timestamp as text (easier for spreadsheets)
- Copy and paste directly into Excel/Sheets

---

## Method 2: Using Supabase Table Editor (GUI)

### Step 1: Open Table Editor

1. Go to your Supabase project: https://zhvvofnmsxdistxqjthb.supabase.co
2. Click **"Database"** on left sidebar (database icon)
3. Click **"waitlist"** table

### Step 2: View Data

- You'll see all waitlist entries in a spreadsheet-like view
- Click column headers to sort
- Use the search bar to filter
- Click the eye icon to view individual rows

### Features:
- **Sort**: Click any column header to sort by that field
- **Filter**: Use search bar to find specific emails
- **Edit**: Click any cell to edit (not recommended for production data)
- **Delete**: Select rows and click delete (be careful!)

---

## Method 3: Using the API Endpoint

You can also use the `/api/referral` endpoint to look up referral stats:

### Look Up a Referral Code

Open in browser:
```
https://your-site.vercel.app/api/referral?code=ABC12345
```

**Response:**
```json
{
  "ok": true,
  "ref_code": "ABC12345",
  "ref_count": 3
}
```

**What this shows:**
- How many referrals a specific code has
- Great for your referral tracking dashboard

---

## Advanced Queries

### View People Who Signed Up Today

```sql
SELECT
    email,
    ref_code,
    ref_count,
    created_at
FROM waitlist
WHERE DATE(created_at) = CURRENT_DATE
ORDER BY created_at DESC;
```

---

### View People Referred by a Specific Code

```sql
SELECT
    email,
    ref_code,
    created_at
FROM waitlist
WHERE referred_by = 'ABC12345'
ORDER BY created_at DESC;
```

**Replace `ABC12345` with the referral code you want to check.**

---

### View Users with No Referrals

```sql
SELECT
    email,
    ref_code,
    ref_count,
    created_at
FROM waitlist
WHERE ref_count = 0
ORDER BY created_at DESC;
```

**Great for identifying users who might need engagement.**

---

### View Users With Most Referrals (Power Users)

```sql
SELECT
    email,
    ref_code,
    ref_count,
    created_at,
    CASE
        WHEN ref_count >= 10 THEN 'Master Gardener'
        WHEN ref_count >= 5 THEN 'Thriving Grove'
        WHEN ref_count >= 3 THEN 'Growing Garden'
        WHEN ref_count >= 1 THEN 'Early Sprout'
        ELSE 'Seedling'
    END AS tier
FROM waitlist
WHERE ref_count > 0
ORDER BY ref_count DESC
LIMIT 20;
```

**Shows your top 20 referrers with their tier status.**

---

## Export Data for Email Marketing

### Get All Emails (Clean List)

```sql
SELECT email
FROM waitlist
ORDER BY created_at DESC;
```

**Copy results** and paste into your email marketing tool (Mailchimp, ConvertKit, etc.)

### Get Emails with Priority Info

```sql
SELECT
    email,
    priority,
    created_at
FROM waitlist
ORDER BY created_at DESC;
```

**Useful** for sending targeted emails based on priority interests.

---

## Tips

### Best Practices:
1. **Always use SQL Editor** for complex queries
2. **Use Table Editor** for quick viewing and simple edits
3. **Export regularly** to backup your data
4. **Monitor growth** with the daily signups query
5. **Identify power users** with referral count queries

### Privacy Note:
- These emails are sensitive data
- Only access from secure devices
- Don't share publicly
- Follow GDPR/privacy laws in your region

---

## Quick Reference Card

**Open Supabase SQL Editor:**
👉 https://zhvvofnmsxdistxqjthb.supabase.co

**Most Common Queries:**

| What You Want | Query |
|-------------|--------|
| View all signups | `SELECT * FROM waitlist ORDER BY created_at DESC;` |
| View just emails | `SELECT email FROM waitlist ORDER BY created_at DESC;` |
| View top referrers | `SELECT * FROM waitlist ORDER BY ref_count DESC LIMIT 10;` |
| View total count | `SELECT COUNT(*) FROM waitlist;` |
| Find specific email | `SELECT * FROM waitlist WHERE email = 'user@example.com';` |
| Today's signups | `SELECT * FROM waitlist WHERE DATE(created_at) = CURRENT_DATE;` |

---

**You're all set to view and manage your waitlist!** 📊
