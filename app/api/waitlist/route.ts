import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { WaitlistResponse, ReferralResponse } from '@/types';

function generateRefCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

async function checkRefCodeExists(code: string): Promise<boolean> {
  const { data } = await supabase
    .from('waitlist')
    .select('ref_code')
    .eq('ref_code', code)
    .single();
  return !!data;
}

async function generateUniqueRefCode(): Promise<string> {
  let code = generateRefCode();
  let attempts = 0;
  while (await checkRefCodeExists(code) && attempts < 10) {
    code = generateRefCode();
    attempts++;
  }
  if (attempts >= 10) {
    throw new Error('Failed to generate unique referral code');
  }
  return code;
}

export async function POST(request: NextRequest): Promise<NextResponse<WaitlistResponse>> {
  try {
    const body = await request.json();
    const { email, platforms, priority, referred_by, company } = body;

    // Honeypot check
    if (company && company.trim() !== '') {
      return NextResponse.json({ ok: false, error: 'Spam detected' }, { status: 400 });
    }

    // Validation
    if (!email || !email.includes('@')) {
      return NextResponse.json({ ok: false, error: 'Valid email required' }, { status: 400 });
    }

    if (!platforms || (!platforms.android && !platforms.ios && !platforms.web)) {
      return NextResponse.json({ ok: false, error: 'Select at least one platform' }, { status: 400 });
    }

    if (!priority) {
      return NextResponse.json({ ok: false, error: 'Priority selection required' }, { status: 400 });
    }

    // Check if email already exists
    const { data: existingUserResult } = await supabase
      .from('waitlist')
      .select('ref_code, ref_count')
      .eq('email', email)
      .single();

    if (existingUserResult) {
      const existingUser = existingUserResult as { ref_code: string; ref_count: number };
      // Return existing user's info
      const { data: referrerData } = await supabase
        .from('waitlist')
        .select('ref_count')
        .eq('ref_code', existingUser.ref_code)
        .single();

      const referrer = referrerData as { ref_count: number } | null;

      return NextResponse.json({
        ok: true,
        ref_code: existingUser.ref_code,
        ref_count: referrer?.ref_count || 0,
      });
    }

    // Generate unique ref code
    const ref_code = await generateUniqueRefCode();

    // Handle referral
    let referrerRefCode: string | null = null;
    if (referred_by && referred_by.trim() !== '') {
      const { data: referrerResult } = await supabase
        .from('waitlist')
        .select('email, ref_code')
        .eq('ref_code', referred_by.trim().toUpperCase())
        .single();

      const referrer = referrerResult as { email: string; ref_code: string } | null;

      if (referrer && referrer.email !== email) {
        referrerRefCode = referrer.ref_code;
      }
    }

    // Insert new user
    const { error: insertError } = await supabase
      .from('waitlist')
      .insert({
        email,
        platforms,
        priority,
        ref_code,
        referred_by: referrerRefCode,
        ref_count: 0,
      });

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json({ ok: false, error: 'Failed to join waitlist' }, { status: 500 });
    }

    // Atomically increment referrer's ref_count if applicable
    if (referrerRefCode) {
      const { error: updateError } = await supabase.rpc('increment_ref_count', {
        ref_code_input: referrerRefCode,
      });

      if (updateError) {
        console.error('Referral increment error:', updateError);
        // Continue anyway - the user is still added to waitlist
      }
    }

    return NextResponse.json({
      ok: true,
      ref_code,
      ref_count: 0,
    });
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}
