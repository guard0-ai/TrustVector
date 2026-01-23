import { Shield, CheckCircle, FileText, Users, TrendingUp, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b-4 border-double border-foreground">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white border-2 border-foreground text-sm font-bold mb-6"
              style={{ boxShadow: '3px 3px 0 0 black' }}
            >
              <BookOpen className="w-4 h-4" />
              EVIDENCE-BASED EVALUATION
            </div>

            <h1 className="text-5xl sm:text-6xl font-black mb-4 tracking-tighter">
              OUR
              <br />
              <span className="text-primary">METHODOLOGY</span>
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
          <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Core Principles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: CheckCircle, title: 'Evidence-Based', desc: 'Every score requires documented evidence from official sources, research papers, or verified testing results.', color: 'bg-emerald-50 border-emerald-400' },
              { icon: FileText, title: 'Transparent', desc: 'All evaluation criteria, methodologies, and confidence levels are publicly documented and verifiable.', color: 'bg-sky-50 border-sky-400' },
              { icon: Users, title: 'Community-Driven', desc: 'Open-source evaluations reviewed by the community. Anyone can contribute improvements or new evaluations.', color: 'bg-amber-50 border-amber-400' },
              { icon: TrendingUp, title: 'Continuously Updated', desc: 'Evaluations are regularly updated as new versions, features, and research become available.', color: 'bg-pink-50 border-pink-400' },
            ].map((item) => (
              <div
                key={item.title}
                className={`${item.color} border-l-4 p-6`}
              >
                <item.icon className="w-8 h-8 mb-4 text-foreground" />
                <h3 className="text-xl font-black uppercase mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Dimensions */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Five Trust Dimensions</h2>

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
                className="group border-2 border-foreground bg-white"
                style={{ boxShadow: '4px 4px 0 0 black' }}
              >
                <summary className="cursor-pointer list-none p-6 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{dim.icon}</span>
                      <div>
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Dimension {dim.num}</span>
                        <h3 className="text-xl font-black uppercase">{dim.name}</h3>
                      </div>
                    </div>
                    <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                  </div>
                </summary>
                <div className="px-6 pb-6 border-t-2 border-foreground/10 pt-4">
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
          <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Scoring System</h2>

          <div
            className="bg-white border-2 border-foreground p-8"
            style={{ boxShadow: '4px 4px 0 0 black' }}
          >
            <h3 className="text-xl font-black uppercase mb-6">Score Ranges (0-100)</h3>

            <div className="space-y-4">
              {[
                { range: '90-100', label: 'Exceptional', color: 'bg-emerald-500' },
                { range: '75-89', label: 'Strong', color: 'bg-sky-500' },
                { range: '60-74', label: 'Adequate', color: 'bg-amber-400' },
                { range: '40-59', label: 'Concerning', color: 'bg-orange-500' },
                { range: '0-39', label: 'Poor', color: 'bg-red-500' },
              ].map((score) => (
                <div key={score.range} className="flex items-center gap-4">
                  <div className="w-24 text-right font-black">{score.range}</div>
                  <div className={`flex-1 h-4 ${score.color}`}></div>
                  <div className="w-28 text-muted-foreground uppercase text-sm">{score.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t-2 border-dashed border-foreground/20">
              <h4 className="font-black uppercase mb-4">Confidence Levels</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">HIGH</span>
                  <span className="text-muted-foreground">Multiple authoritative sources, recent data, official documentation</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-800 font-bold border border-amber-300">MEDIUM</span>
                  <span className="text-muted-foreground">Some authoritative sources, community feedback, partial documentation</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 font-bold border border-red-300">LOW</span>
                  <span className="text-muted-foreground">Limited sources, older data, or inferred from general practices</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black uppercase mb-2">Want to Contribute?</h3>
              <p className="text-muted-foreground">Help improve AI transparency by contributing evaluations.</p>
            </div>
            <Link
              href="/contribute"
              className="btn-tilted btn-tilted-yellow shrink-0"
            >
              CONTRIBUTE NOW →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
