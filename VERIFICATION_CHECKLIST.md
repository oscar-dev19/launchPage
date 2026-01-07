# Waitlist Verification Checklist

## How to Confirm Waitlist is Working

Follow these steps to verify your waitlist form is fully functional.

---

## Step 1: Test the Form on Deployed Site

### What to Do:
1. Open your Vercel deployed site (click "Visit" in Vercel dashboard)
2. Fill out the form:
   - Email: `test-verification@example.com`
   - Select one platform (e.g., Web)
   - Select a priority (e.g., Economy)
3. Click "Join Beta Waitlist"

### Expected Results:
✅ Success message appears
✅ Referral code is displayed (8 characters, uppercase)
✅ Referral link is shown (e.g., `https://your-site.vercel.app?ref=ABC12345`)
✅ Share buttons are visible (X, Email, SMS)
✅ Progress bar shows "0 / 10 referrals"

### If You See Errors:
❌ **"Failed to join waitlist"** → Check Vercel function logs
❌ **"Network error"** → Check browser console for errors
❌ **Form doesn't submit** → Check browser console for JavaScript errors

---

## Step 2: Check Browser Console

### What to Do:
1. Keep your deployed site open
2. Right-click anywhere → "Inspect" (or press F12)
3. Click "Console" tab
4. Submit the waitlist form again
5. Look for any red error messages

### What You Should See:
✅ No red errors (only green/white messages)
✅ Maybe some warnings (yellow) - these are usually OK

### Common Errors and What They Mean:
| Error | Meaning | Solution |
|--------|---------|----------|
| `Failed to fetch` | API not responding | Check Vercel logs |
| `500 Internal Server Error` | Server crash | Check Vercel function logs |
| `400 Bad Request` | Invalid data | Form validation error |
| `relation "waitlist" does not exist` | Table not created | Run SQL schema again |

---

## Step 3: Check Vercel Function Logs

### What to Do:
1. Go to Vercel Dashboard → `launchPage` project
2. Click latest deployment (green checkmark or blue dot)
3. Scroll down to "Functions" section
4. Look for any errors in red

### What You Should See:
✅ No red errors
✅ Function execution time under 1000ms
✅ Status code 200 or 201

### Common Log Errors:
| Error | Cause | Solution |
|--------|--------|----------|
| `relation "waitlist" does not exist` | Table not created | Run SQL schema in Supabase |
| `insert or update on table "waitlist" violates` | Data validation error | Check form data matches schema |
| `permission denied for table "waitlist"` | RLS policy blocking | Check RLS policies exist |

---

## Step 4: Verify Data in Supabase

### What to Do:
1. Go to Supabase: https://zhvvofnmsxdistxqjthb.supabase.co
2. Click "SQL Editor" on left sidebar
3. Run this query:

```sql
SELECT email, ref_code, ref_count, platforms, created_at
FROM waitlist
ORDER BY created_at DESC
LIMIT 5;
```

### Expected Results:
✅ You should see your test signup in the table
✅ Fields populated correctly:
  - `email`: Your test email
  - `ref_code`: 8-character code (e.g., "ABC12345")
  - `ref_count`: 0
  - `platforms`: JSONB object (e.g., `{"web": true, "ios": false, "android": false}`)
  - `created_at`: Current timestamp

### If Table is Empty:
❌ Form submission failed
- Check browser console for errors
- Check Vercel function logs
- Verify environment variables in Vercel

---

## Step 5: Test Referral Link (Optional but Recommended)

### What to Do:
1. Copy your referral link from success message
2. Open it in a new tab or incognito window
3. Sign up with a different email address

### Expected Results:
✅ New signup shows `referred_by` = your referral code
✅ Your `ref_count` increments to 1
✅ New user gets their own referral code

### If Referral Doesn't Work:
❌ Check that `referred_by` field is populated correctly
❌ Verify `increment_ref_count` function exists in Supabase
❌ Check RLS policies allow updates

---

## Success Criteria

Your waitlist is **fully working** when ALL of these are true:

- ✅ Form submits successfully on deployed site
- ✅ Success message appears with referral code
- ✅ Referral link is displayed and can be copied
- ✅ No red errors in browser console
- ✅ No errors in Vercel function logs
- ✅ Data appears in Supabase `waitlist` table
- ✅ All fields are populated correctly (email, ref_code, platforms, etc.)
- ✅ Referral link can be shared
- ✅ Multiple signups can be made

---

## Troubleshooting Quick Reference

| Issue | Check |
|-------|--------|
| Form doesn't submit | Browser console errors? |
| "Failed to join waitlist" | Vercel function logs? |
| No data in Supabase | Table exists? RLS policies? |
| Referrals not counting | `increment_ref_count` function? |
| 500 error | Supabase connection? Env vars? |

---

## Verification Script (Advanced)

You can also test the API directly from browser console:

1. Open your deployed site
2. Press F12 → Console tab
3. Paste and run:

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
  if (data.ok) {
    console.log('✅ SUCCESS!');
    console.log('Referral Code:', data.ref_code);
    console.log('Referral Count:', data.ref_count);
    alert('✅ Waitlist is working!\n\nReferral code: ' + data.ref_code);
  } else {
    console.error('❌ ERROR:', data.error);
    alert('❌ Error: ' + data.error);
  }
})
.catch(err => {
  console.error('❌ NETWORK ERROR:', err);
  alert('❌ Network error: ' + err.message);
});
```

### Expected Output:
✅ Alert: "✅ Waitlist is working! Referral code: ABC12345"
✅ Console shows: `{ ok: true, ref_code: "ABC12345", ref_count: 0 }`

---

## Still Not Working?

If you've gone through all steps and it's still not working:

1. **Collect this information:**
   - Browser console errors (copy-paste them)
   - Vercel function logs (screenshot or text)
   - Supabase table status (empty or has data?)
   - Exact error message from form

2. **Share this information** and we can diagnose the exact issue.

---

## You're Done When:

✅ Form submits successfully
✅ Success message appears
✅ Referral code is displayed
✅ Data appears in Supabase table
✅ No errors in console or logs
✅ Referral link works

**Your waitlist is ready to collect beta signups! 🚀**
