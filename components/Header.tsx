'use client';

import { useState } from 'react';

interface HeaderProps {
  onCtaClick?: () => void;
}

export function Header({ onCtaClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-forest-900/95 backdrop-blur-md border-b border-forest-700/50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sprout-light to-sprout flex items-center justify-center">
              <span className="text-forest-900 font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-semibold text-white">StudySprout</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-forest-200 hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#rewards" className="text-forest-200 hover:text-white transition-colors">
              Rewards
            </a>
            <a href="#faq" className="text-forest-200 hover:text-white transition-colors">
              FAQ
            </a>
            <button
              onClick={onCtaClick}
              className="px-5 py-2 bg-sprout hover:bg-sprout-light text-forest-900 font-semibold rounded-full transition-all hover:scale-105"
            >
              Join Beta Waitlist
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:text-sprout-light transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-forest-700/50 animate-slide-up">
              <div className="flex flex-col gap-4">
                <a
                  href="#how-it-works"
                  className="text-forest-200 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How It Works
                </a>
                <a
                  href="#rewards"
                  className="text-forest-200 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Rewards
                </a>
                <a
                  href="#faq"
                  className="text-forest-200 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </a>
              <button
                onClick={() => {
                  onCtaClick?.();
                  setIsMenuOpen(false);
                }}
                className="w-full px-5 py-3 bg-sprout hover:bg-sprout-light text-forest-900 font-semibold rounded-full transition-all"
              >
                Join Beta Waitlist
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
