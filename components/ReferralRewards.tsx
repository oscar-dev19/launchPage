'use client';

import { motion } from 'framer-motion';
import { ScrollReveal } from './ui/scroll-reveal';
import { REFERRAL_TIERS } from '@/types';

export function ReferralRewards() {
  return (
    <section id="rewards" className="py-20 sm:py-32 bg-forest-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal delay={0} direction="up">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Referral Rewards
            </motion.h2>
            <motion.p
              className="text-lg text-forest-200 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Share StudySprout with friends and unlock exclusive rewards
            </motion.p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REFERRAL_TIERS.map((tier, index) => (
            <ScrollReveal key={tier.target} delay={index * 0.1} direction="up">
              <motion.div
                className={`relative h-full ${
                  index === 0
                    ? 'border-sprout/50 bg-sprout/10'
                    : 'border-forest-700/50 hover:border-forest-600'
                } bg-forest-800/50 rounded-2xl p-6 border transition-all duration-300`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  boxShadow: index === 0
                    ? '0 10px 40px -10px rgba(154, 219, 176, 0.3)'
                    : '0 10px 40px -10px rgba(63, 109, 68, 0.2)',
                }}
                transition={{ duration: 0.3 }}
              >
                {index === 0 && (
                  <motion.div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-sprout text-forest-900 text-xs font-semibold rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    Starter
                  </motion.div>
                )}
                {index === REFERRAL_TIERS.length - 1 && (
                  <motion.div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-400 text-forest-900 text-xs font-semibold rounded-full"
                    animate={{
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(251, 191, 36, 0.7)',
                        '0 0 0 10px rgba(251, 191, 36, 0)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    Ultimate
                  </motion.div>
                )}

                <motion.div
                  className="text-center mb-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  <motion.div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                      index === 0
                        ? 'bg-sprout/20 text-sprout'
                        : 'bg-forest-700/50 text-forest-200'
                    }`}
                    whileHover={{
                      rotate: [0, -5, 5, -5, 0],
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.span
                      className="text-xl font-bold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    >
                      {tier.target}
                    </motion.span>
                  </motion.div>
                  <motion.h3
                    className="text-lg font-semibold text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  >
                    {tier.title}
                  </motion.h3>
                </motion.div>

                <motion.div
                  className="border-t border-forest-700/50 pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <motion.p
                    className="text-sm text-forest-100 text-center"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  >
                    {tier.reward}
                  </motion.p>
                </motion.div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.5} direction="up">
          <motion.div
            className="mt-12 bg-forest-800/30 rounded-2xl p-8 text-center border border-forest-700/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.p
              className="text-forest-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <span className="text-white font-semibold">10 referrals</span> unlocks the ultimate reward —{' '}
              <motion.span
                className="text-sprout"
                animate={{
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                lifetime premium features
              </motion.span>
              !
            </motion.p>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
