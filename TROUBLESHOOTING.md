# Troubleshooting Guide

## Waitlist Form Not Working? Follow These Steps

### Step 1: Check Vercel Function Logs (Most Important!)

1. Go to https://vercel.com/dashboard
2. Click on your `launchPage` project
3. Click the latest deployment (green checkmark or blue dot)
4. Scroll down to **"Functions"** section
5. Look for any errors in red

**Common errors you'll see here:**

| Error | Cause | Solution |
|--------|--------|----------|
| `relation "waitlist" does not exist` | Database table not created | Run the SQL schema in Supabase (see Step 3 below) |
| `new row violates check constraint` | Invalid priority value | Ensure priority is one of: winter, economy, gifting, stats, themes |
| `duplicate key value violates unique constraint` | Email already exists | Form should handle this automatically - check API logic |
| `insufficient privilege` | RLS policy blocking | Ensure "Allow public inserts" and "Allow public reads" policies exist |

---

### Step 2: Check Browser Console

1. Open your deployed site
2. Right-click → **Inspect** (or press F12)
3. Click **"Console"** tab
4. Try submitting the waitlist form
5. Look for red error messages

**Common console errors:**

| Error | Meaning | Solution |
|--------|---------|----------|
| `400 Bad Request` | API received invalid data | Check form validation logic |
| `500 Internal Server Error` | API crashed | Check Vercel function logs for details |
| `Network error` | API not responding | Check Vercel deployment status |

---

### Step 3: Set Up Supabase Database (Most Common Issue!)

**This is the #1 reason waitlist doesn't work.**

#### 3.1 Check if Table Exists

1. Go to your Supabase project: https://zhvvofnmsxdistxqjthb.supabase.co
2. Click **"SQL Editor"** on left sidebar (puzzle piece icon)
3. Run this query:

```sql
SELECT EXISTS (
   SELECT FROM information_schema.tables
   WHERE table_schema = 'public'
   AND table_name = 'waitlist'
);
```

**If result is `false`** → You need to create the table (continue to 3.2)
**If result is `true`** → Table exists, skip to Step 4

#### 3.2 Create the Database Schema

If table doesn't exist, run this **entire SQL script** in Supabase SQL Editor:

```sql
-- ========================================
-- StudySprout Database Schema
-- Run this entire script in Supabase SQL Editor
-- ========================================

-- Enable uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    platforms JSONB NOT NULL DEFAULT '{"android": false, "ios": false, "web": false}',
    priority TEXT NOT NULL CHECK (priority IN ('winter', 'economy', 'gifting', 'stats', 'themes')),
    ref_code TEXT UNIQUE NOT NULL,
    referred_by TEXT NULL,
    ref_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_ref_code ON waitlist(ref_code);
CREATE INDEX IF NOT EXISTS idx_waitlist_referred_by ON waitlist(referred_by);

-- Create function to atomically increment ref_count
CREATE OR REPLACE FUNCTION increment_ref_count(ref_code_input TEXT)
RETURNS void AS $$
BEGIN
    UPDATE waitlist
    SET ref_count = ref_count + 1
    WHERE ref_code = ref_code_input;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous access
-- Allow anyone to insert (for waitlist signup)
CREATE POLICY IF NOT EXISTS "Allow public inserts" ON waitlist
    FOR INSERT WITH CHECK (true);

-- Allow anyone to select (needed for checking existing email/ref_code)
CREATE POLICY IF NOT EXISTS "Allow public reads" ON waitlist
    FOR SELECT USING (true);

-- Allow updates to ref_count through our increment function
CREATE POLICY IF NOT EXISTS "Allow ref count updates via function" ON waitlist
    FOR UPDATE USING (true)
    WITH CHECK (ref_count = ref_count OR ref_count = ref_count + 1);

-- Verify table was created
SELECT 'Database setup complete!' AS status;
```

**Click the "Run" button (▶️)**

---

### Step 4: Verify Table Created

1. In Supabase SQL Editor, run:

```sql
SELECT * FROM waitlist LIMIT 5;
```

**Expected result:** Empty table (no rows yet)

2. In Supabase, go to **Database** → **Tables**
3. You should see **"waitlist"** table in the list
4. Click on **"waitlist"** table
5. Click **"Policies"** tab
6. You should see 3 policies:
   - "Allow public inserts"
   - "Allow public reads"
   - "Allow ref count updates via function"

---

### Step 5: Verify Environment Variables in Vercel

1. Go to Vercel Dashboard → **Settings** → **Environment Variables**
2. Verify both variables are set:

**Variable 1:**
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://zhvvofnmsxdistxqjthb.supabase.co
Environment: Production ✓
Automatically expose to Browser: ✓
```

**Variable 2:**
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: sb_publishable_AbAlZ12FkknqA3GcrOE3Ew_rDSpv6U3
Environment: Production ✓
Automatically expose to Browser: ✓
```

**⚠️ Important:** Make sure you're using the **anon public key**, not the service_role key!

---

### Step 6: Test API Directly

Open your deployed site and run this in the **Browser Console** (F12 → Console):

```javascript
fetch('/api/waitlist', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test-' + Date.now() + '@example.com',
    platforms: { web: true, android: false, ios: false },
    priority: 'economy'
  })
})
.then(r => r.json())
.then(data => {
  console.log('✅ Success:', data);
  if (data.ok) {
    console.log('Referral code:', data.ref_code);
  } else {
    console.error('❌ Error:', data.error);
  }
})
.catch(err => console.error('❌ Network error:', err));
```

**Expected result:**
```javascript
✅ Success: {
  ok: true,
  ref_code: "ABC12345",
  ref_count: 0
}
```

---

### Step 7: Test the Waitlist Form

1. Go to your deployed site
2. Enter a valid email address
3. Select at least one platform (Web, iOS, or Android)
4. Select a priority (any option)
5. Click **"Join Beta Waitlist"**

**Expected behavior:**
- ✅ Form submits successfully
- ✅ Success message appears with referral code
- ✅ Referral link is shown
- ✅ Share buttons work

---

### Step 8: Check Data in Supabase

After a successful signup:

1. Go to Supabase → **Database** → **Tables** → **waitlist**
2. You should see a new row with:
   - Your email
   - Your referral code (8 characters, uppercase)
   - Selected platforms
   - ref_count = 0
   - created_at timestamp

---

## Common Issues & Solutions

### Issue: "Failed to join waitlist" error

**Cause:** Database insertion failed

**Solutions:**
1. Check if `waitlist` table exists (Step 3.1)
2. Run the full SQL schema (Step 3.2)
3. Verify RLS policies exist (Step 4)
4. Check Vercel function logs for specific error

---

### Issue: "Something went wrong" generic error

**Cause:** API error or network issue

**Solutions:**
1. Check Vercel function logs for error details
2. Check browser console for red errors
3. Verify environment variables in Vercel (Step 5)
4. Test API directly (Step 6)

---

### Issue: Form doesn't submit, no error shown

**Cause:** Client-side validation or JavaScript error

**Solutions:**
1. Open browser console (F12)
2. Look for JavaScript errors in red
3. Check if any browser extensions are blocking requests
4. Try in incognito/private mode

---

### Issue: Already existing email shows error

**Cause:** Email already in database, but not handled gracefully

**Solution:** The API should return existing user's referral code. Check if this is working by testing with same email twice.

---

### Issue: Referrals not counting

**Cause:** `increment_ref_count` function not working

**Solutions:**
1. Check if the function exists in Supabase:
   ```sql
   SELECT routine_name FROM information_schema.routines
   WHERE routine_name = 'increment_ref_count';
   ```
2. If not found, recreate it (Step 3.2)
3. Verify RLS policy allows function execution

---

### Issue: Supabase connection refused

**Cause:** Supabase URL or key is wrong

**Solutions:**
1. Verify `NEXT_PUBLIC_SUPABASE_URL` matches your Supabase project URL exactly
2. Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is the "anon public" key, not "service_role"
3. Make sure environment variables are set to "Production"

---

## Quick Diagnostic Checklist

Before reaching out for help, verify:

- [ ] Supabase `waitlist` table exists
- [ ] RLS policies are enabled (Allow public inserts, Allow public reads)
- [ ] Environment variables are set in Vercel (Production)
- [ ] Using anon public key, not service_role key
- [ ] No red errors in browser console
- [ ] No errors in Vercel function logs
- [ ] API test in browser console succeeds (Step 6)
- [ ] Data appears in Supabase table after signup

---

## Still Stuck?

If you've gone through all these steps and it's still not working:

1. **Collect this information:**
   - What errors are in Vercel function logs?
   - What errors are in browser console?
   - Does the API test (Step 6) succeed or fail?
   - Does the `waitlist` table exist in Supabase?
   - What environment variables are set in Vercel?

2. **Share this information** with error details and we can diagnose the exact issue!

---

## Success Indicators

You'll know it's working when:

✅ Database table `waitlist` exists in Supabase
✅ RLS policies allow public inserts and reads
✅ Vercel function logs show no errors
✅ Browser console shows no errors
✅ API test returns `{ ok: true, ref_code: "...", ref_count: 0 }`
✅ Waitlist form submits successfully
✅ Success message appears with referral code
✅ Data appears in Supabase `waitlist` table
✅ Referral link works and can be shared
