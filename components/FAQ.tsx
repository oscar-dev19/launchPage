'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'When will be beta launch?',
    answer: 'We\'re targeting Q2 2026 for beta launch. Join the waitlist to get early access and be the first to know when we open the gates.',
  },
  {
    question: 'Is StudySprout free to use?',
    answer: 'Yes! The core features of StudySprout are completely free. We also offer premium features for users who want enhanced customization and advanced analytics.',
  },
  {
    question: 'How does the referral system work?',
    answer: 'When you join the waitlist, you get a unique referral link. Share it with friends — when they join using your link, it counts toward your referral total. Unlock rewards at 1, 3, 5, and 10 referrals.',
  },
  {
    question: 'What platforms will StudySprout support?',
    answer: 'StudySprout will launch on iOS, Android, and Web. All your data syncs across devices so you can study anywhere, anytime.',
  },
  {
    question: 'How do I get the +10% fruit yield bonus?',
    answer: 'Refer just one friend to unlock the 7-day +10% fruit yield boost. This bonus applies during the beta period and gives your plants an extra growth kick!',
  },
  {
    question: 'Can I change my platform or priority selection later?',
    answer: 'Absolutely! Your preferences help us prioritize development, but you\'ll be able to update them in your account settings once the beta launches.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-forest-200">
            Everything you need to know about StudySprout
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-forest-800/50 rounded-xl border border-forest-700/50 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-forest-700/30 transition-colors"
              >
                <span className="font-medium text-white">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-forest-300 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-forest-200 animate-slide-up">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
