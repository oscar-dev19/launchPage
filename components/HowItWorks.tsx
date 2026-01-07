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
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-forest-200 max-w-2xl mx-auto">
            Transform your study habits into a beautiful, growing garden
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-forest-800/50 rounded-2xl p-8 border border-forest-700/50 hover:border-sprout/50 transition-all duration-300 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-sprout/20 rounded-xl flex items-center justify-center text-sprout">
                    {step.icon}
                  </div>
                  <span className="text-4xl font-bold text-forest-700/50">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-forest-200">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
