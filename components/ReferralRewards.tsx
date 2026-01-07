'use client';

import { REFERRAL_TIERS } from '@/types';

export function ReferralRewards() {
  return (
    <section id="rewards" className="py-20 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Referral Rewards
          </h2>
          <p className="text-lg text-forest-200 max-w-2xl mx-auto">
            Share StudySprout with friends and unlock exclusive rewards
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REFERRAL_TIERS.map((tier, index) => (
            <div
              key={tier.target}
              className={`relative bg-forest-800/50 rounded-2xl p-6 border transition-all duration-300 animate-slide-up ${
                index === 0
                  ? 'border-sprout/50 bg-sprout/10'
                  : 'border-forest-700/50 hover:border-forest-600'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {index === 0 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-sprout text-forest-900 text-xs font-semibold rounded-full">
                  Starter
                </div>
              )}
              {index === REFERRAL_TIERS.length - 1 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-400 text-forest-900 text-xs font-semibold rounded-full">
                  Ultimate
                </div>
              )}

              <div className="text-center mb-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                  index === 0
                    ? 'bg-sprout/20 text-sprout'
                    : 'bg-forest-700/50 text-forest-200'
                }`}>
                  <span className="text-xl font-bold">{tier.target}</span>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {tier.title}
                </h3>
              </div>

              <div className="border-t border-forest-700/50 pt-4">
                <p className="text-sm text-forest-100 text-center">
                  {tier.reward}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-forest-800/30 rounded-2xl p-8 text-center border border-forest-700/50">
          <p className="text-forest-200">
            <span className="text-white font-semibold">10 referrals</span> unlocks the ultimate reward —{' '}
            <span className="text-sprout">lifetime premium features</span>!
          </p>
        </div>
      </div>
    </section>
  );
}
