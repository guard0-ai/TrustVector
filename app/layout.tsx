import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { Github, BarChart3, BookOpen } from 'lucide-react';
import { Logo } from '@/components/logo';

export const metadata: Metadata = {
  title: 'TrustVector - AI Trust Directory',
  description:
    'Open-source framework for evaluating 106 AI systems (models, MCPs, and agents) across 5 trust dimensions: security, privacy, performance, trust, and operational excellence.',
  keywords: [
    'AI',
    'LLM',
    'security',
    'evaluation',
    'trust',
    'MCP',
    'agents',
    'assurance',
    'open-source',
    'AI models',
    'AI agents',
    'Model Context Protocol',
    'AI transparency',
    'AI safety',
  ],
  authors: [{ name: 'TrustVector Team' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'TrustVector - AI Trust Directory',
    description: 'Evidence-based evaluations of 106 AI systems across 5 trust dimensions',
    type: 'website',
    siteName: 'TrustVector',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrustVector - AI Trust Directory',
    description: 'Evidence-based evaluations of 106 AI systems across 5 trust dimensions',
  },
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
                    Open-source, evidence-based evaluations of AI systems across security, privacy,
                    performance, trust, and operational excellence.
                  </p>
                  {/* Playful annotation */}
                  <p className="text-xs italic text-muted-foreground" style={{ fontFamily: 'Courier New, monospace' }}>
                    &quot;Trust, but verify.&quot; — especially with AI
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
                  © 2025 TrustVector. Powered and supported by{' '}
                  <a href="https://guard0.ai" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">
                    Guard0.ai
                  </a>
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
