'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from './ui/scroll-reveal';

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
    <section id="faq" className="py-20 sm:py-32 bg-forest-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal delay={0} direction="up">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              className="text-lg text-forest-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Everything you need to know about StudySprout
            </motion.p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 0.05} direction="up">
              <motion.div
                className="bg-forest-800/50 rounded-xl border border-forest-700/50 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
              >
                <motion.button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-forest-700/30 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <motion.span
                    className="font-medium text-white"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {faq.question}
                  </motion.span>
                  <motion.svg
                    className={`w-5 h-5 text-forest-300 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </motion.button>
                <AnimatePresence mode="wait">
                  {openIndex === index && (
                    <motion.div
                      className="px-6 pb-4 text-forest-200"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        {faq.answer}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
