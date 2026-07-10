import { GitBranch, FileJson, CheckCircle, AlertTriangle, BookOpen, Code, Users, Database, Bot, Brain } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contribute AI Agent Security Evaluations | Guard0 TrustVector',
  description:
    'Contribute to Guard0 TrustVector: Add agentic AI security evaluations for AI models, agents, and MCPs. Help build the definitive AI-SPM and agent security posture management resource.',
  keywords: [
    'contribute AI security evaluation',
    'agentic AI security community',
    'AI agent security contributions',
    'open source AI security',
    'MCP security evaluation',
    'Guard0 contributors',
    'TrustVector community',
  ],
  openGraph: {
    title: 'Contribute to Guard0 TrustVector',
    description:
      'Join the Guard0 community: Add AI agent security evaluations and help build the definitive AI-SPM resource.',
    type: 'article',
    siteName: 'TrustVector by Guard0',
    url: 'https://trustvector.guard0.ai/contribute',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contribute to Guard0 TrustVector',
    description: 'Help build the definitive agentic AI security resource. Open source AI-SPM contributions welcome.',
    creator: '@Guard0Security',
  },
  alternates: {
    canonical: '/contribute',
  },
};

export default function ContributePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded text-sm font-semibold uppercase tracking-wide mb-6">
              <Users className="w-4 h-4" />
              COMMUNITY-DRIVEN
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold mb-4 tracking-tighter">
              HOW TO
              <br />
              <span className="text-primary">CONTRIBUTE</span>
            </h1>

            <p className="text-xl text-muted-foreground">
              TrustVector is an open-source project that relies on community
              <br />
              contributions to evaluate AI systems.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* What You Can Contribute */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold uppercase tracking-tight mb-8">What You Can Contribute</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: 'AI Models', desc: 'Add evaluations for new LLMs, multimodal models, and specialized AI systems from any provider.', color: 'bg-sky-50 border-sky-400' },
              { icon: Bot, title: 'AI Agents', desc: 'Evaluate agent frameworks like CrewAI, AutoGPT, LangGraph, and enterprise agent platforms.', color: 'bg-emerald-50 border-emerald-400' },
              { icon: Database, title: 'MCP Servers', desc: 'Add trust reports for Model Context Protocol servers that extend AI capabilities.', color: 'bg-purple-50 border-purple-400' },
            ].map((item) => (
              <div
                key={item.title}
                className={`${item.color} border-l-2 p-6 rounded-r-lg`}
              >
                <item.icon className="w-8 h-8 mb-4 text-foreground" />
                <h3 className="text-xl font-bold uppercase mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Start */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold uppercase tracking-tight mb-8">Quick Start Guide</h2>

          <div className="space-y-4">
            {[
              {
                num: 1,
                title: 'Fork the Repository',
                desc: 'Start by forking the TrustVector repository to your GitHub account.',
                code: 'git clone https://github.com/YOUR_USERNAME/trust-vector.git',
              },
              {
                num: 2,
                title: 'Choose What to Evaluate',
                desc: 'Create a new JSON file in the appropriate directory:',
                paths: [
                  { icon: Brain, path: 'data/models/', label: 'For AI models', color: 'text-sky-500' },
                  { icon: Bot, path: 'data/agents/', label: 'For AI agents', color: 'text-emerald-500' },
                  { icon: Database, path: 'data/mcps/', label: 'For MCP servers', color: 'text-purple-500' },
                ],
              },
              {
                num: 3,
                title: 'Follow the Schema',
                desc: 'Use existing files as templates. Every evaluation must include:',
                list: [
                  'Five trust dimensions with scored criteria',
                  'Evidence with sources, URLs, and dates',
                  'Confidence levels (high, medium, low)',
                  'Use case ratings for different scenarios',
                  'Strengths and limitations',
                ],
              },
              {
                num: 4,
                title: 'Submit a Pull Request',
                desc: "Open a PR with a clear description of what you've evaluated and why.",
                code: 'git checkout -b add-evaluation-[name] && git push origin HEAD',
              },
            ].map((step) => (
              <div
                key={step.num}
                className="bg-card border border-border rounded-lg shadow-card p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded-md font-bold flex-shrink-0">
                    {step.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold uppercase mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-3">{step.desc}</p>
                    {step.code && (
                      <code className="block bg-foreground text-background px-4 py-3 text-sm font-mono rounded-md">
                        {step.code}
                      </code>
                    )}
                    {step.paths && (
                      <div className="space-y-2 text-sm font-mono">
                        {step.paths.map((p) => (
                          <div key={p.path} className="bg-muted/40 px-4 py-2 border border-border rounded flex items-center gap-2">
                            <p.icon className={`w-4 h-4 ${p.color}`} />
                            <span className="font-bold">{p.path}</span>
                            <span className="text-muted-foreground">— {p.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {step.list && (
                      <ul className="space-y-1 text-muted-foreground">
                        {step.list.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary font-bold">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Schema */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold uppercase tracking-tight mb-8">Data Schema Overview</h2>

          <div className="bg-card border border-border rounded-lg shadow-card overflow-hidden">
            <div className="bg-foreground text-background px-6 py-4">
              <div className="flex items-center gap-2">
                <FileJson className="w-5 h-5 text-primary" />
                <span className="font-mono text-sm font-bold">example-evaluation.json</span>
              </div>
            </div>
            <pre className="p-6 text-sm overflow-x-auto bg-muted/20">
              <code className="text-foreground">{`{
  "id": "unique-identifier",
  "type": "model" | "agent" | "mcp",
  "name": "Display Name",
  "provider": "Provider Name",
  "version": "1.0.0",
  "last_evaluated": "2025-01-14",
  "description": "Brief description...",
  "trust_vector": {
    "performance_reliability": {
      "overall_score": 85,
      "criteria": {
        "criterion_name": {
          "score": 85,
          "confidence": "high" | "medium" | "low",
          "evidence": [{
            "source": "Source Name",
            "url": "https://...",
            "date": "2025-01-14",
            "value": "Key finding..."
          }]
        }
      }
    },
    "security": { ... },
    "privacy_compliance": { ... },
    "trust_transparency": { ... },
    "operational_excellence": { ... }
  },
  "use_case_ratings": {
    "code-generation": { "overall": 90, "notes": "..." }
  },
  "strengths": ["..."],
  "limitations": ["..."]
}`}</code>
            </pre>
          </div>
        </div>

        {/* Evidence Guidelines */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold uppercase tracking-tight mb-8">Evidence Guidelines</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 border-l-2 border-emerald-400 p-6 rounded-r-lg">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
                <h3 className="text-xl font-bold uppercase">Accepted Sources</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  'Official documentation and technical papers',
                  'Peer-reviewed research and benchmarks',
                  'Security audits and compliance certifications',
                  'Official GitHub repositories',
                  'Reputable security research publications',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 border-l-2 border-amber-400 p-6 rounded-r-lg">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
                <h3 className="text-xl font-bold uppercase">Use With Caution</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  'Marketing materials (may be biased)',
                  'Unverified community reports',
                  'Outdated documentation (>6 months)',
                  'Self-reported benchmarks without validation',
                  'Anonymous or unattributed sources',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">!</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Confidence Levels */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold uppercase tracking-tight mb-8">Confidence Levels</h2>

          <div className="bg-card border border-border rounded-lg shadow-card p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-800 font-bold border border-emerald-300 rounded uppercase text-sm">
                  High
                </span>
                <div>
                  <p className="font-bold uppercase">Multiple authoritative sources</p>
                  <p className="text-muted-foreground text-sm">
                    Official documentation, peer-reviewed research, recent data (within 3 months)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-800 font-bold border border-amber-300 rounded uppercase text-sm">
                  Medium
                </span>
                <div>
                  <p className="font-bold uppercase">Some authoritative sources</p>
                  <p className="text-muted-foreground text-sm">
                    Partial documentation, community feedback, data within 6 months
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 font-bold border border-red-300 rounded uppercase text-sm">
                  Low
                </span>
                <div>
                  <p className="font-bold uppercase">Limited sources available</p>
                  <p className="text-muted-foreground text-sm">
                    Older data, inferred from general practices, or single-source information
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Needed Evaluations */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold uppercase tracking-tight mb-8">Currently Needed</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg shadow-card p-6">
              <h3 className="text-lg font-bold uppercase mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-purple-500" />
                MCP Servers
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  'Supabase MCP Server',
                  'GitLab MCP Server',
                  'Perplexity MCP Server',
                  'Tavily MCP Server',
                  'Exa MCP Server',
                  'Context7 MCP Server',
                  'Google Maps MCP Server',
                  'ClickHouse MCP Server',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg shadow-card p-6">
              <h3 className="text-lg font-bold uppercase mb-4 flex items-center gap-2">
                <Bot className="w-5 h-5 text-emerald-500" />
                AI Agents & Platforms
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  'Kore.ai Enterprise Agents',
                  'Glean AI Platform',
                  'Sierra Customer Service',
                  'Moveworks Enterprise Assistant',
                  'Decagon Support AI',
                  'Aisera Service Automation',
                  'Cognigy Contact Center AI',
                  'Relevance AI Agents',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-primary/5 border-l-2 border-primary p-8 rounded-r-lg flex flex-col items-center text-center">
            <GitBranch className="w-16 h-16 text-foreground mb-4" />
            <h2 className="text-3xl font-bold uppercase mb-4">Ready to Contribute?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Join our community of contributors helping build transparency in AI systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/JBAhire/trust-vector"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta btn-cta-primary"
              >
                <Code className="w-5 h-5" />
                VIEW ON GITHUB →
              </a>
              <Link
                href="/methodology"
                className="btn-cta btn-cta-secondary"
              >
                <BookOpen className="w-5 h-5" />
                READ METHODOLOGY
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
