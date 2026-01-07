'use client';

import { useState, useEffect, useRef } from 'react';
import type { WaitlistFormData, PriorityOption, PRIORITY_OPTIONS } from '@/types';

interface WaitlistFormProps {
  onSubmit?: () => void;
}

export function WaitlistForm({ onSubmit }: WaitlistFormProps) {
  const [formData, setFormData] = useState<WaitlistFormData>({
    email: '',
    platforms: { android: false, ios: false, web: false },
    priority: 'economy',
    referred_by: '',
    company: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ ref_code: string; ref_count: number } | null>(null);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Read referral code from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      setFormData(prev => ({ ...prev, referred_by: ref }));
    }
  }, []);

  const handlePlatformChange = (platform: 'android' | 'ios' | 'web') => {
    setFormData(prev => ({
      ...prev,
      platforms: { ...prev.platforms, [platform]: !prev.platforms[platform] },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          platforms: formData.platforms,
          priority: formData.priority,
          referred_by: formData.referred_by,
          company: formData.company,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      setSuccess({ ref_code: data.ref_code, ref_count: data.ref_count || 0 });
      onSubmit?.();

      // Scroll to show success message
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!success) return;
    const shareUrl = `${window.location.origin}?ref=${success.ref_code}`;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnX = () => {
    if (!success) return;
    const shareUrl = `${window.location.origin}?ref=${success.ref_code}`;
    const text = encodeURIComponent(`Just joined the StudySprout beta waitlist! Grow your focus garden 🌱`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareViaEmail = () => {
    if (!success) return;
    const shareUrl = `${window.location.origin}?ref=${success.ref_code}`;
    const subject = encodeURIComponent('Join StudySprout Beta!');
    const body = encodeURIComponent(`Check out StudySprout - a focus app that grows with your study sessions! 🌱\n\n${shareUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const shareViaSMS = () => {
    if (!success) return;
    const shareUrl = `${window.location.origin}?ref=${success.ref_code}`;
    const text = encodeURIComponent(`Join StudySprout beta! 🌱 ${shareUrl}`);
    window.location.href = `sms:?body=${text}`;
  };

  const getTierProgress = (refCount: number) => {
    const tiers = [1, 3, 5, 10];
    return tiers.map(t => ({
      target: t,
      reached: refCount >= t,
      progress: Math.min((refCount / t) * 100, 100),
    }));
  };

  if (success) {
    const referralUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}?ref=${success.ref_code}`;
    const tierProgress = getTierProgress(success.ref_count);

    return (
      <div ref={containerRef} className="bg-forest-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-forest-600 shadow-xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-sprout/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-sprout" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">You&apos;re on the list!</h3>
          <p className="text-forest-100">Share your link to unlock rewards</p>
        </div>

        {/* Referral Link */}
        <div className="mb-6">
          <label className="block text-sm text-forest-100 mb-2">Your Referral Link</label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={referralUrl}
              className="flex-1 px-4 py-3 bg-forest-900/50 border border-forest-600 rounded-lg text-white text-sm"
            />
            <button
              onClick={copyToClipboard}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                copied
                  ? 'bg-sprout text-forest-900'
                  : 'bg-forest-700 hover:bg-forest-600 text-white'
              }`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            onClick={shareOnX}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1DA1F2]/80 hover:bg-[#1DA1F2]/90 text-white rounded-lg transition-all"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="text-sm font-medium">Share</span>
          </button>
          <button
            onClick={shareViaEmail}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-forest-700/50 hover:bg-forest-600 text-white rounded-lg transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium">Email</span>
          </button>
          <button
            onClick={shareViaSMS}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-forest-700/50 hover:bg-forest-600 text-white rounded-lg transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium">SMS</span>
          </button>
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-forest-100">Referrals</span>
            <span className="text-white font-semibold">{success.ref_count} / 10</span>
          </div>
          <div className="space-y-3">
            {tierProgress.map(({ target, reached, progress }) => (
              <div key={target} className="relative">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={reached ? 'text-sprout' : 'text-forest-200'}>
                    {target} referral{target > 1 ? 's' : ''}
                  </span>
                  {reached && (
                    <span className="text-sprout text-xs">✓ Unlocked!</span>
                  )}
                </div>
                <div className="h-2 bg-forest-900 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      reached ? 'bg-sprout' : 'bg-forest-600'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="bg-forest-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-forest-600 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-6 text-center">Join the Beta Waitlist</h3>

      {error && (
        <div className="mb-4 p-3 bg-red-500/30 border border-red-500/60 rounded-lg text-red-100 text-sm">
          {error}
        </div>
      )}

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm text-forest-100 mb-2">
          Email Address *
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="you@example.com"
          required
          className="w-full px-4 py-3 bg-forest-900/50 border border-forest-600 rounded-lg text-white placeholder-forest-500 focus:outline-none focus:border-sprout transition-colors"
        />
      </div>

      {/* Platforms */}
      <div className="mb-4">
        <label className="block text-sm text-forest-100 mb-2">
          Platforms you&apos;ll use *
        </label>
        <div className="flex gap-3">
          {[
            { 
              key: 'android', 
              label: 'Android', 
              icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.463 11.463 0 0 0-8.94 0L5.65 5.67c-.19-.29-.58-.38-.87-.2-.28.18-.37.54-.22.83L6.4 9.48A10.78 10.78 0 0 0 1 18h22a10.78 10.78 0 0 0-5.4-8.52zM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z"/>
                </svg>
              )
            },
            { 
              key: 'ios', 
              label: 'iOS', 
              icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              )
            },
            { 
              key: 'web', 
              label: 'Web', 
              icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H9v-2h6v2zm-3-5c-2.5 0-4.5-2-4.5-4.5S9.5 4 12 4s4.5 2 4.5 4.5S14.5 13 12 13zM2 6v12h20V6H2z"/>
                </svg>
              )
            },
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => handlePlatformChange(key as 'android' | 'ios' | 'web')}
              className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                formData.platforms[key as 'android' | 'ios' | 'web']
                  ? 'bg-sprout/20 border-sprout text-white'
                  : 'bg-forest-900/50 border-forest-600 text-forest-200 hover:border-forest-500'
              }`}
            >
              <span className="block text-lg mb-1">{icon}</span>
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Priority */}
      <div className="mb-4">
        <label htmlFor="priority" className="block text-sm text-forest-100 mb-2">
          What excites you most? *
        </label>
        <select
          id="priority"
          value={formData.priority}
          onChange={e => setFormData(prev => ({ ...prev, priority: e.target.value as PriorityOption }))}
          className="w-full px-4 py-3 bg-forest-900/50 border border-forest-600 rounded-lg text-white focus:outline-none focus:border-sprout transition-colors"
        >
          <option value="winter">Winter Events</option>
          <option value="economy">Economy & Trading</option>
          <option value="gifting">Gifting System</option>
          <option value="stats">Advanced Stats</option>
          <option value="themes">Custom Themes</option>
        </select>
      </div>

      {/* Honeypot field - hidden */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          name="company"
          value={formData.company}
          onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Hidden referred_by */}
      <input type="hidden" name="referred_by" value={formData.referred_by} />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-sprout hover:bg-sprout-light text-forest-900 font-semibold rounded-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        {isLoading ? 'Joining...' : 'Join Beta Waitlist'}
      </button>

      <p className="text-xs text-forest-300 text-center mt-4">
        By joining, you agree to receive updates about StudySprout.
      </p>
    </form>
  );
}
