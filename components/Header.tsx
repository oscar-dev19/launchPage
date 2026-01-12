'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';

interface HeaderProps {
  onCtaClick?: () => void;
}

export function Header({ onCtaClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(scrollY, [0, 50], ['rgba(31, 50, 44, 0.95)', 'rgba(31, 50, 44, 1)']);
  const boxShadow = useTransform(scrollY, [0, 50], ['0 1px 3px rgba(0, 0, 0, 0.1)', '0 4px 6px -1px rgba(0, 0, 0, 0.1)']);

  const navLinks = [
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#rewards', label: 'Rewards' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <motion.header
      style={{ backgroundColor, boxShadow }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-forest-700/50 transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="w-8 h-8 rounded-full bg-gradient-to-br from-sprout-light to-sprout flex items-center justify-center"
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(154, 219, 176, 0)',
                  '0 0 0 10px rgba(154, 219, 176, 0)',
                  '0 0 0 0 rgba(154, 219, 176, 0)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <span className="text-forest-900 font-bold text-sm">S</span>
            </motion.div>
            <span className="text-xl font-semibold text-white">StudySprout</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-forest-200 hover:text-white transition-colors relative"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sprout"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
            <motion.button
              onClick={onCtaClick}
              className="px-5 py-2 bg-sprout hover:bg-sprout-light text-forest-900 font-semibold rounded-full transition-all"
              whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(154, 219, 176, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              Join Beta Waitlist
            </motion.button>
          </div>

          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:text-sprout-light transition-colors"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              <motion.svg
                key={isMenuOpen ? 'close' : 'open'}
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? (
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                ) : (
                  <>
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.2, delay: 0 }}
                    />
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 12h16"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.2, delay: 0.05 }}
                    />
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 18h16"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    />
                  </>
                )}
              </motion.svg>
            </AnimatePresence>
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden py-4 border-t border-forest-700/50"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="text-forest-200 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.button
                  onClick={() => {
                    onCtaClick?.();
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-5 py-3 bg-sprout hover:bg-sprout-light text-forest-900 font-semibold rounded-full"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Join Beta Waitlist
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
