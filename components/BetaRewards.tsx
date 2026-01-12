'use client';

import { motion } from 'framer-motion';
import { ScrollReveal } from './ui/scroll-reveal';

export function BetaRewards() {
  const rewards = [
    {
      icon: '🌱',
      title: 'Early Access',
      description: 'Be the first to try new features before anyone else',
    },
    {
      icon: '🎮',
      title: 'Beta Badge',
      description: 'Exclusive profile badge showing your early support',
    },
    {
      icon: '💬',
      title: 'Direct Input',
      description: 'Shape the product by sharing feedback directly with the team',
    },
    {
      icon: '🏆',
      title: 'Founding Member',
      description: 'Recognition as a founding member when we launch',
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-forest-900/50">
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
              Beta Member Benefits
            </motion.h2>
            <motion.p
              className="text-lg text-forest-200 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join the beta and help shape StudySprout while enjoying exclusive perks
            </motion.p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rewards.map((reward, index) => (
            <ScrollReveal key={reward.title} delay={index * 0.1} direction="up">
              <motion.div
                className="bg-forest-800/50 rounded-2xl p-6 border border-forest-700/50 hover:border-sprout/30 h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="text-4xl mb-4"
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.2,
                  }}
                >
                  {reward.icon}
                </motion.div>
                <motion.h3
                  className="text-lg font-semibold text-white mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  {reward.title}
                </motion.h3>
                <motion.p
                  className="text-sm text-forest-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  {reward.description}
                </motion.p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
