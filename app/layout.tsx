import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { Github, BarChart3, BookOpen } from 'lucide-react';
import { Logo } from '@/components/logo';

export const metadata: Metadata = {
  title: 'TrustVector by Guard0 - AI Agent Security & Trust Directory',
  description:
    'Guard0 TrustVector: The definitive agentic AI security resource. Evidence-based evaluations of 100+ AI agents, models, and MCPs across security, privacy, and trust dimensions. AI-SPM and agent security posture management.',
  keywords: [
    // Tier 1: Category-Defining Terms
    'agentic AI security',
    'AI agent security',
    'autonomous AI security',
    'AI-SPM',
    'agent security posture',
    'agent security posture management',
    // Tier 2: Enterprise Agent Platforms
    'Copilot Studio security',
    'AgentForce security',
    'ServiceNow AI agent security',
    'Bedrock agents security',
    'Vertex AI agents security',
    'LangChain security',
    'LangGraph security',
    'CrewAI security',
    // Tier 3: Agent Threat Terms
    'agent prompt injection',
    'agent privilege escalation',
    'multi-agent attack',
    'agent memory poisoning',
    'MCP exploitation',
    // Tier 4: Agent Identity & Access
    'AI agent identity',
    'agent identity management',
    'agent authentication',
    'agent authorization',
    // Tier 5: Agent Governance & Compliance
    'AI agent governance',
    'EU AI Act agents',
    'AI agent compliance',
    // Tier 6: Agent Operations
    'AI agent monitoring',
    'agent observability',
    'agent red teaming',
    // Tier 7: MCP Security
    'MCP security',
    'Model Context Protocol security',
    'MCP server security',
    'MCP vulnerabilities',
    // Guard0 & TrustVector Branding
    'Guard0',
    'TrustVector',
    'AI trust evaluation',
    'AI security assessment',
  ],
  authors: [{ name: 'Guard0' }, { name: 'TrustVector Team' }],
  creator: 'Guard0',
  publisher: 'Guard0',
  icons: {
    icon: '/favicon.svg',
  },
  metadataBase: new URL('https://trustvector.guard0.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TrustVector by Guard0 - AI Agent Security & Trust Directory',
    description:
      'Guard0 TrustVector: The definitive agentic AI security resource. Evaluate 100+ AI agents, models, and MCPs for security, privacy, and trust. AI-SPM leader.',
    type: 'website',
    siteName: 'TrustVector by Guard0',
    url: 'https://trustvector.guard0.ai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrustVector by Guard0 - AI Agent Security',
    description:
      'Guard0 TrustVector: Agentic AI security evaluations for 100+ AI systems. The leading AI-SPM and agent security posture management resource.',
    creator: '@Guard0Security',
    site: '@Guard0Security',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification-token-here',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        {/* Rainbow border wrapper */}
        <div className="min-h-screen flex flex-col rainbow-border rounded-lg m-2 sm:m-4 overflow-hidden bg-background">
          {/* Header with thick border */}
          <header className="sticky top-0 z-50 w-full border-b-2 border-foreground bg-background">
            <div className="container mx-auto px-4">
              <nav className="flex h-16 items-center justify-between">
                {/* Logo with shadow */}
                <Link href="/" className="group">
                  <Logo size="md" variant="full" />
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-1 sm:gap-2">
                  <Link
                    href="/"
                    className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Browse</span>
                  </Link>
                  <Link
                    href="/compare"
                    className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="hidden sm:inline">Compare</span>
                  </Link>
                  <Link
                    href="/methodology"
                    className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span className="hidden sm:inline">Docs</span>
                  </Link>

                  {/* GitHub button with shadow */}
                  <a
                    href="https://github.com/JBAhire/trust-vector"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 flex items-center gap-2 px-4 py-2 text-sm font-bold bg-foreground text-background border-2 border-foreground transition-all hover:translate-x-[-2px] hover:translate-y-[-2px]"
                    style={{ boxShadow: '3px 3px 0 0 hsl(var(--primary))' }}
                  >
                    <Github className="w-4 h-4" />
                    <span className="hidden sm:inline">STAR</span>
                  </a>
                </div>
              </nav>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="border-t-2 border-foreground bg-muted/30 mt-auto">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Logo & Description */}
                <div className="md:col-span-2 space-y-4">
                  <Logo size="sm" variant="full" />
                  <p className="text-sm text-muted-foreground max-w-md">
                    Guard0 TrustVector: The definitive agentic AI security resource. Evidence-based evaluations
                    for AI agents, models, and MCPs. AI-SPM and agent security posture management.
                  </p>
                  {/* Playful annotation */}
                  <p className="text-xs italic text-muted-foreground" style={{ fontFamily: 'Courier New, monospace' }}>
                    &quot;Trust, but verify.&quot; — especially with AI agents
                  </p>
                </div>

                {/* Resources */}
                <div>
                  <h4 className="font-black uppercase tracking-wide mb-4">Resources</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/methodology" className="text-muted-foreground hover:text-foreground transition-colors">
                        Methodology
                      </Link>
                    </li>
                    <li>
                      <a
                        href="https://github.com/JBAhire/trust-vector"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        GitHub Repository
                      </a>
                    </li>
                    <li>
                      <Link href="/contribute" className="text-muted-foreground hover:text-foreground transition-colors">
                        Contribute
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Legal */}
                <div>
                  <h4 className="font-black uppercase tracking-wide mb-4">Legal</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a
                        href="https://github.com/JBAhire/trust-vector/blob/main/LICENSE"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        MIT License
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="mt-8 pt-8 border-t-2 border-dashed border-foreground/20 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  © 2025 TrustVector by{' '}
                  <a href="https://guard0.ai" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">
                    Guard0
                  </a>
                  {' '}- The Agentic AI Security Company
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/JBAhire/trust-vector"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
