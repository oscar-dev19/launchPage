'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { WaitlistForm } from './WaitlistForm';

interface HeroProps {
  onFormSubmit?: () => void;
}

export function Hero({ onFormSubmit }: HeroProps) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -50]);
  const y2 = useTransform(scrollY, [0, 500], [0, 50]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-cream-50 via-sage-100 to-cream-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-sprout/20 rounded-full blur-3xl"
          style={{ y: y1 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-forest-500/20 rounded-full blur-3xl"
          style={{ y: y2 }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.25, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-forest-800/80 backdrop-blur-sm rounded-full mb-6 border border-forest-700/50"
            >
              <motion.span
                className="w-2 h-2 bg-sprout rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <span className="text-sm text-white font-medium">Beta Access Coming Soon</span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a2f1e] mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Grow Your Focus Garden
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-[#2d4e34] mb-8 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              StudySprout transforms your study sessions into a thriving digital garden.
              Plant seeds of concentration and harvest the fruits of knowledge.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.a
                href="#waitlist"
                className="px-8 py-4 bg-sprout hover:bg-sprout-light text-forest-900 font-semibold rounded-full transition-all shadow-lg shadow-sprout/25"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Join Beta Waitlist
              </motion.a>
              <motion.a
                href="#how-it-works"
                className="px-8 py-4 bg-forest-800 hover:bg-forest-700 text-white font-semibold rounded-full transition-all border border-forest-600"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.a>
            </motion.div>

            <motion.div
              className="mt-10 flex items-center gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i, index) => (
                  <motion.div
                    key={i}
                    className="w-10 h-10 rounded-full bg-forest-700 border-2 border-forest-900 flex items-center justify-center text-xs text-forest-100"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                  >
                    {i}K
                  </motion.div>
                ))}
              </motion.div>
              <motion.p
                className="text-forest-200 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <span className="font-semibold text-white">2,400+</span> already waiting
              </motion.p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            id="waitlist"
          >
            <WaitlistForm onSubmit={onFormSubmit} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
