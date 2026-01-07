import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { BetaRewards } from '@/components/BetaRewards';
import { ReferralRewards } from '@/components/ReferralRewards';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <HowItWorks />
      <BetaRewards />
      <ReferralRewards />
      <FAQ />
      <Footer />
    </main>
  );
}
