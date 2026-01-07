'use client';

import { WaitlistForm } from './WaitlistForm';

interface HeroProps {
  onFormSubmit?: () => void;
}

export function Hero({ onFormSubmit }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sprout/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-forest-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-forest-800/50 rounded-full mb-6">
              <span className="w-2 h-2 bg-sprout rounded-full animate-pulse" />
              <span className="text-sm text-white">Beta Access Coming Soon</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Grow Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sprout-light to-sprout">
                Focus Garden
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-forest-900 mb-8 max-w-xl mx-auto lg:mx-0">
              StudySprout transforms your study sessions into a thriving digital garden.
              Plant seeds of concentration and harvest the fruits of knowledge.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#waitlist"
                className="px-8 py-4 bg-sprout hover:bg-sprout-light text-forest-900 font-semibold rounded-full transition-all hover:scale-105 shadow-lg shadow-sprout/25"
              >
                Join Beta Waitlist
              </a>
              <a
                href="#how-it-works"
                className="px-8 py-4 bg-forest-800 hover:bg-forest-700 text-white font-semibold rounded-full transition-all border border-forest-600"
              >
                Learn More
              </a>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-forest-700 border-2 border-forest-900 flex items-center justify-center text-xs text-forest-100"
                >
                  {i}K
                </div>
                ))}
              </div>
              <p className="text-forest-700 text-sm">
                <span className="font-semibold text-forest-900">2,400+</span> already waiting
              </p>
            </div>
          </div>

          {/* Waitlist Card */}
          <div className="animate-slide-up" id="waitlist">
            <WaitlistForm onSubmit={onFormSubmit} />
          </div>
        </div>
      </div>
    </section>
  );
}
