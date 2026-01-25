import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compare AI Agent Security Scores | Guard0 TrustVector',
  description:
    'Guard0 TrustVector: Compare agentic AI security evaluations side-by-side. Evaluate AI agents, models, and MCPs across security, privacy, and trust dimensions for informed AI-SPM decisions.',
  keywords: [
    'compare AI security',
    'AI agent comparison',
    'agentic AI security comparison',
    'AI-SPM comparison',
    'MCP security comparison',
    'LLM security comparison',
    'Guard0 compare',
    'TrustVector comparison',
  ],
  openGraph: {
    title: 'Compare AI Agent Security Scores | Guard0 TrustVector',
    description:
      'Compare AI security evaluations side-by-side. Guard0 TrustVector for informed AI-SPM and agent security decisions.',
    type: 'website',
    siteName: 'TrustVector by Guard0',
    url: 'https://trustvector.guard0.ai/compare',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare AI Security Scores | Guard0',
    description: 'Side-by-side AI agent security comparison. Make informed AI-SPM decisions with Guard0 TrustVector.',
    creator: '@Guard0Security',
  },
  alternates: {
    canonical: '/compare',
  },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
