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
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Beta Member Benefits
          </h2>
          <p className="text-lg text-forest-200 max-w-2xl mx-auto">
            Join the beta and help shape StudySprout while enjoying exclusive perks
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rewards.map((reward, index) => (
            <div
              key={reward.title}
              className="bg-forest-800/50 rounded-2xl p-6 border border-forest-700/50 hover:border-sprout/30 transition-all duration-300 hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className="text-4xl mb-4">{reward.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {reward.title}
              </h3>
              <p className="text-sm text-forest-200">
                {reward.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
