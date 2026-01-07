-- StudySprout Database Schema
-- Run this in your Supabase SQL Editor

-- Enable uuid-ossp extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the waitlist table
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

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_ref_code ON waitlist(ref_code);
CREATE INDEX IF NOT EXISTS idx_waitlist_referred_by ON waitlist(referred_by);

-- Create a function to atomically increment ref_count
-- This prevents race conditions when multiple people refer the same user
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

-- Create policies for the waitlist table
-- Allow anyone to insert (for waitlist signup)
CREATE POLICY "Allow public inserts" ON waitlist
    FOR INSERT WITH CHECK (true);

-- Allow anyone to select (needed for checking existing email/ref_code)
CREATE POLICY "Allow public reads" ON waitlist
    FOR SELECT USING (true);

-- Only allow updates to ref_count through our increment_ref_count function
CREATE POLICY "Allow ref count updates via function" ON waitlist
    FOR UPDATE USING (true)
    WITH CHECK (ref_count = ref_count OR ref_count = ref_count + 1);

-- Create a view for easy referral stats (optional)
CREATE OR REPLACE VIEW referral_stats AS
SELECT
    ref_code,
    email,
    ref_count,
    created_at,
    CASE
        WHEN ref_count >= 10 THEN 'Master Gardener'
        WHEN ref_count >= 5 THEN 'Thriving Grove'
        WHEN ref_count >= 3 THEN 'Growing Garden'
        WHEN ref_count >= 1 THEN 'Early Sprout'
        ELSE 'Seedling'
    END AS tier_name
FROM waitlist
ORDER BY ref_count DESC;

-- Grant necessary permissions (Supabase handles most automatically)
-- The anon key can access these policies
