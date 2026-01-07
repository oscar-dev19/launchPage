import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StudySprout - Grow Your Focus Garden',
  description: 'Transform your study sessions into a thriving digital garden. Join the beta waitlist for early access.',
  keywords: ['study', 'focus', 'productivity', 'garden', 'beta', 'waitlist'],
  openGraph: {
    title: 'StudySprout - Grow Your Focus Garden',
    description: 'Transform your study sessions into a thriving digital garden.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
