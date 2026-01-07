export interface WaitlistEntry {
  id: string;
  email: string;
  platforms: {
    android: boolean;
    ios: boolean;
    web: boolean;
  };
  priority: PriorityOption;
  ref_code: string;
  referred_by: string | null;
  ref_count: number;
  created_at: string;
}

export type PriorityOption = 'winter' | 'economy' | 'gifting' | 'stats' | 'themes';

export interface WaitlistFormData {
  email: string;
  platforms: {
    android: boolean;
    ios: boolean;
    web: boolean;
  };
  priority: PriorityOption;
  referred_by?: string;
  company?: string; // honeypot field
}

export interface WaitlistResponse {
  ok: boolean;
  ref_code?: string;
  ref_count?: number;
  tiers?: {
    unlocked: number[];
    next: number | null;
    nextTarget: number;
  };
  error?: string;
}

export interface ReferralResponse {
  ok: boolean;
  ref_code?: string;
  ref_count?: number;
  tiers?: {
    unlocked: number[];
    next: number | null;
    nextTarget: number;
  };
  error?: string;
}

export const PRIORITY_OPTIONS: { value: PriorityOption; label: string }[] = [
  { value: 'winter', label: 'Winter Events' },
  { value: 'economy', label: 'Economy & Trading' },
  { value: 'gifting', label: 'Gifting System' },
  { value: 'stats', label: 'Advanced Stats' },
  { value: 'themes', label: 'Custom Themes' },
];

export const REFERRAL_TIERS = [
  { target: 1, title: 'Early Sprout', reward: '7-day +10% fruit yield (beta-only boost)' },
  { target: 3, title: 'Growing Garden', reward: 'Priority support + exclusive beta badge' },
  { target: 5, title: 'Thriving Grove', reward: 'Exclusive winter cosmetic bundle' },
  { target: 10, title: 'Master Gardener', reward: 'Beta access + lifetime premium features' },
] as const;

export function getTierProgress(refCount: number) {
  const unlocked = REFERRAL_TIERS.filter(t => refCount >= t.target).map(t => t.target);
  const next = REFERRAL_TIERS.find(t => t.target > refCount);
  return {
    unlocked,
    next: next?.target ?? null,
    nextTarget: next?.target ?? 0,
  };
}
