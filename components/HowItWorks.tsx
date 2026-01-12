'use client';

import { motion } from 'framer-motion';
import { ScrollReveal } from './ui/scroll-reveal';

export function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Plant Your Focus',
      description: 'Start a study session and plant your focus seed. Each minute of concentration helps it grow.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
    },
    {
      number: '2',
      title: 'Nurture Growth',
      description: 'Water your plant with consistent study sessions. Avoid distractions to keep it thriving.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      number: '3',
      title: 'Harvest Rewards',
      description: 'Watch your garden flourish and harvest fruits of knowledge. Unlock cosmetics and features.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-32 bg-forest-900/50">
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
              How It Works
            </motion.h2>
            <motion.p
              className="text-lg text-forest-200 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Transform your study habits into a beautiful, growing garden
            </motion.p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 0.15} direction="up">
              <motion.div
                className="relative group h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-forest-800/50 rounded-2xl p-8 border border-forest-700/50 hover:border-sprout/50 transition-all duration-300 h-full">
                  <div className="flex items-center justify-between mb-6">
                    <motion.div
                      className="w-14 h-14 bg-sprout/20 rounded-xl flex items-center justify-center text-sprout"
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.5 },
                      }}
                    >
                      {step.icon}
                    </motion.div>
                    <motion.span
                      className="text-4xl font-bold text-forest-400/80"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    >
                      {step.number}
                    </motion.span>
                  </div>
                  <motion.h3
                    className="text-xl font-semibold text-white mb-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p
                    className="text-forest-200"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    {step.description}
                  </motion.p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
