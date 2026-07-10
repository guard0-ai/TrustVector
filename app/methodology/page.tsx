import { SCORE_THEMES } from '@/framework/schema/types';
import { Shield, CheckCircle, FileText, Users, TrendingUp, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Agent Security Evaluation Methodology | Guard0 TrustVector',
  description:
    'Guard0 TrustVector methodology: Evidence-based framework for evaluating agentic AI security, AI agent identity, MCP security, and autonomous AI systems. Learn how we assess AI-SPM and agent security posture.',
  keywords: [
    'agentic AI security methodology',
    'AI agent security evaluation',
    'AI-SPM methodology',
    'agent security posture assessment',
    'AI trust evaluation framework',
    'MCP security methodology',
    'Guard0 methodology',
    'TrustVector framework',
  ],
  openGraph: {
    title: 'AI Agent Security Evaluation Methodology | Guard0 TrustVector',
    description:
      'Evidence-based framework for evaluating agentic AI security. Guard0 TrustVector methodology for AI-SPM and agent security posture management.',
    type: 'article',
    siteName: 'TrustVector by Guard0',
    url: 'https://trustvector.guard0.ai/methodology',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guard0 TrustVector Methodology',
    description: 'How Guard0 evaluates agentic AI security: Evidence-based AI-SPM framework.',
    creator: '@Guard0Security',
  },
  alternates: {
    canonical: '/methodology',
  },
};

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded text-sm font-semibold uppercase tracking-wide mb-6">
              <BookOpen className="w-4 h-4" />
              EVIDENCE-BASED EVALUATION
            </div>

            <h1 className="font-display text-5xl sm:text-6xl font-extrabold mb-4 tracking-[-0.045em] leading-[1.02]">
              Our
              <br />
              <span className="text-primary">methodology</span>
            </h1>

            <p className="text-xl text-muted-foreground">
              TrustVector evaluates AI systems through a rigorous, transparent,
              <br />
              and evidence-based framework.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Core Principles */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-8">Core Principles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: CheckCircle, title: 'Evidence-Based', desc: 'Every score requires documented evidence from official sources, research papers, or verified testing results.', color: 'bg-emerald-50 border-emerald-400' },
              { icon: FileText, title: 'Transparent', desc: 'All evaluation criteria, methodologies, and confidence levels are publicly documented and verifiable.', color: 'bg-sky-50 border-sky-400' },
              { icon: Users, title: 'Community-Driven', desc: 'Open-source evaluations reviewed by the community. Anyone can contribute improvements or new evaluations.', color: 'bg-amber-50 border-amber-400' },
              { icon: TrendingUp, title: 'Continuously Updated', desc: 'Evaluations are regularly updated as new versions, features, and research become available.', color: 'bg-violet-50 border-violet-400' },
            ].map((item) => (
              <div
                key={item.title}
                className={`${item.color} border-l-2 p-6 rounded-r-lg`}
              >
                <item.icon className="w-8 h-8 mb-4 text-foreground" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Dimensions */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-8">Five Trust Dimensions</h2>

          <div className="space-y-4">
            {[
              { num: 1, icon: '🚀', name: 'Performance & Reliability', desc: 'Measures task accuracy, output consistency, latency, uptime, and overall system reliability.', criteria: ['Task completion accuracy (benchmarks like HumanEval, MMLU, SWE-bench)', 'Output consistency and determinism', 'Response latency (p50, p95)', 'Uptime SLA and availability', 'Context window and multimodal support'] },
              { num: 2, icon: '🛡️', name: 'Security', desc: 'Evaluates resistance to attacks, data protection, and security posture of the AI system.', criteria: ['Jailbreak resistance and prompt injection defense', 'Data leakage prevention', 'Adversarial robustness', 'Content filtering and safety guardrails', 'Access controls and authentication'] },
              { num: 3, icon: '🔒', name: 'Privacy & Compliance', desc: 'Assesses data handling practices, regulatory compliance, and privacy protections.', criteria: ['Data retention policies and user control', 'GDPR, HIPAA, and SOC 2 compliance', 'Data sovereignty and geographic controls', 'Encryption at rest and in transit', 'Training data usage policies'] },
              { num: 4, icon: '👁️', name: 'Trust & Transparency', desc: 'Evaluates documentation quality, model transparency, and organizational trustworthiness.', criteria: ['Model documentation completeness', 'Training data transparency', 'Safety testing and bias evaluation disclosure', 'Decision explainability', 'Version management and changelogs'] },
              { num: 5, icon: '⚙️', name: 'Operational Excellence', desc: 'Measures ease of use, deployment flexibility, cost efficiency, and operational maturity.', criteria: ['Deployment flexibility (API, self-hosted, cloud platforms)', 'API reliability and rate limits', 'Cost efficiency and pricing model', 'Monitoring and observability tools', 'Documentation and support quality'] },
            ].map((dim) => (
              <details
                key={dim.num}
                className="group border border-border bg-card rounded-lg shadow-card"
              >
                <summary className="cursor-pointer list-none p-6 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{dim.icon}</span>
                      <div>
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Dimension {dim.num}</span>
                        <h3 className="text-xl font-bold">{dim.name}</h3>
                      </div>
                    </div>
                    <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                  </div>
                </summary>
                <div className="px-6 pb-6 border-t border-border pt-4">
                  <p className="text-muted-foreground mb-4">{dim.desc}</p>
                  <div className="bg-muted/30 p-4">
                    <div className="text-sm font-bold uppercase tracking-wide mb-2">Key Criteria:</div>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {dim.criteria.map((c, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Scoring System */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-8">Scoring System</h2>

          <div
            className="bg-card border border-border rounded-lg shadow-card p-8"
          >
            <h3 className="text-xl font-bold mb-6">Score Ranges (0-100)</h3>

            <div className="space-y-4">
              {[
                { range: '90-100', label: SCORE_THEMES.exceptional.label, color: SCORE_THEMES.exceptional.bg },
                { range: '75-89', label: SCORE_THEMES.strong.label, color: SCORE_THEMES.strong.bg },
                { range: '60-74', label: SCORE_THEMES.adequate.label, color: SCORE_THEMES.adequate.bg },
                { range: '40-59', label: SCORE_THEMES.concerning.label, color: SCORE_THEMES.concerning.bg },
                { range: '0-39', label: SCORE_THEMES.poor.label, color: SCORE_THEMES.poor.bg },
              ].map((score) => (
                <div key={score.range} className="flex items-center gap-4">
                  <div className="w-24 text-right font-bold">{score.range}</div>
                  <div className={`flex-1 h-4 ${score.color}`}></div>
                  <div className="w-28 text-muted-foreground uppercase text-sm">{score.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <h4 className="font-bold uppercase mb-4">Confidence Levels</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-800 font-bold border border-emerald-300 rounded">HIGH</span>
                  <span className="text-muted-foreground">Multiple authoritative sources, recent data, official documentation</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-800 font-bold border border-amber-300 rounded">MEDIUM</span>
                  <span className="text-muted-foreground">Some authoritative sources, community feedback, partial documentation</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 font-bold border border-red-300 rounded">LOW</span>
                  <span className="text-muted-foreground">Limited sources, older data, or inferred from general practices</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-primary/5 border-l-2 border-primary p-8 rounded-r-lg flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Want to Contribute?</h3>
              <p className="text-muted-foreground">Help improve AI transparency by contributing evaluations.</p>
            </div>
            <Link
              href="/contribute"
              className="btn-cta btn-cta-primary shrink-0"
            >
              CONTRIBUTE NOW →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
