import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { ReferralResponse } from '@/types';

export async function GET(request: NextRequest): Promise<NextResponse<ReferralResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ ok: false, error: 'Referral code required' }, { status: 400 });
    }

    const { data: referralData, error } = await supabase
      .from('waitlist')
      .select('ref_code, ref_count')
      .eq('ref_code', code.toUpperCase())
      .single();

    if (error || !referralData) {
      return NextResponse.json({ ok: false, error: 'Referral not found' }, { status: 404 });
    }

    const typedData = referralData as { ref_code: string; ref_count: number };

    return NextResponse.json({
      ok: true,
      ref_code: typedData.ref_code,
      ref_count: typedData.ref_count,
    });
  } catch (error) {
    console.error('Referral API error:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}
