import { getEntityById, getRelatedEntities, getEntitiesByType } from '@/lib/data';
import { calculateOverallScore } from '@/framework/schema/types';
import { ScoreBadge, ScoreBar } from '@/components/score-badge';
import { TrustVectorChart } from '@/components/trust-vector-chart';
import { formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { ExportPDFButton } from '@/components/export-pdf-button';
import { ChevronRight, ExternalLink, CheckCircle, AlertTriangle, Info, Star } from 'lucide-react';
import Link from 'next/link';

export function generateStaticParams() {
  const agents = getEntitiesByType('agent');
  return agents.map((agent) => ({ id: agent.id }));
}

function getScoreClasses(score: number): { bg: string; text: string; label: string } {
  if (score >= 90) return { bg: 'bg-emerald-500', text: 'text-white', label: 'Exceptional' };
  if (score >= 75) return { bg: 'bg-sky-500', text: 'text-white', label: 'Strong' };
  if (score >= 60) return { bg: 'bg-amber-400', text: 'text-black', label: 'Adequate' };
  if (score >= 40) return { bg: 'bg-orange-500', text: 'text-white', label: 'Concerning' };
  return { bg: 'bg-red-500', text: 'text-white', label: 'Poor' };
}

export default function AgentDetailPage({ params }: { params: { id: string } }) {
  const entity = getEntityById(params.id);

  if (!entity || entity.type !== 'agent') {
    notFound();
  }

  const overallScore = calculateOverallScore(entity);
  const scoreInfo = getScoreClasses(overallScore);
  const relatedEntities = getRelatedEntities(entity);
  const { trust_vector } = entity;

  const dimensions = [
    { key: 'performance_reliability', name: 'Performance & Reliability', icon: '🚀', data: trust_vector.performance_reliability },
    { key: 'security', name: 'Security', icon: '🛡️', data: trust_vector.security },
    { key: 'privacy_compliance', name: 'Privacy & Compliance', icon: '🔒', data: trust_vector.privacy_compliance },
    { key: 'trust_transparency', name: 'Trust & Transparency', icon: '👁️', data: trust_vector.trust_transparency },
    { key: 'operational_excellence', name: 'Operational Excellence', icon: '⚙️', data: trust_vector.operational_excellence },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b-2 border-foreground">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-wide">
            <Link href="/" className="hover:text-foreground transition-colors font-bold">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/?type=agent" className="hover:text-foreground transition-colors font-bold">Agents</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-black">{entity.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="border-b-4 border-double border-foreground" id="report-content">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase">{entity.name}</h1>
                  <span className="text-muted-foreground text-lg font-bold">v{entity.version}</span>
                </div>
                <p className="text-xl text-muted-foreground mb-4 uppercase tracking-wide">{entity.provider}</p>
                <div className="flex flex-wrap gap-2">
                  <span
                    className="inline-flex items-center px-3 py-1 border-2 border-foreground text-xs font-black uppercase bg-foreground text-background"
                    style={{ boxShadow: '2px 2px 0 0 hsl(var(--primary))' }}
                  >
                    Agent
                  </span>
                  {entity.tags?.slice(0, 4).map((tag) => (
                    <span key={tag} className="inline-flex items-center px-3 py-1 bg-muted border-2 border-foreground/20 text-xs font-bold uppercase">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <div
                  className={`px-6 py-4 ${scoreInfo.bg} ${scoreInfo.text} border-2 border-foreground`}
                  style={{ boxShadow: '4px 4px 0 0 black' }}
                >
                  <div className="text-4xl font-black">{overallScore}</div>
                  <div className="text-sm font-bold uppercase">{scoreInfo.label}</div>
                </div>
                <ExportPDFButton entity={entity} />
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-6">
              <div className="flex items-center gap-2 text-amber-700 font-black text-sm uppercase tracking-wide mb-2">
                <Star className="w-4 h-4" />About This Agent
              </div>
              <p className="text-foreground leading-relaxed">{entity.description}</p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div>
                <span className="text-muted-foreground uppercase">Last Evaluated:</span>{' '}
                <span className="font-black">{formatDate(entity.last_evaluated)}</span>
              </div>
              {entity.website && (
                <a href={entity.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline font-black uppercase">
                  Official Website<ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div
                className="border-2 border-foreground bg-white p-6 mb-8"
                style={{ boxShadow: '4px 4px 0 0 black' }}
              >
                <h2 className="text-2xl font-black uppercase tracking-tight mb-6">Trust Vector Analysis</h2>
                <TrustVectorChart entity={entity} height={400} />
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-6">Dimension Breakdown</h2>
                {dimensions.map((dimension) => (
                  <details
                    key={dimension.key}
                    className="group border-2 border-foreground bg-white overflow-hidden"
                    style={{ boxShadow: '4px 4px 0 0 black' }}
                  >
                    <summary className="cursor-pointer list-none">
                      <div className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{dimension.icon}</span>
                          <span className="font-black uppercase">{dimension.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <ScoreBadge score={dimension.data.overall_score} size="md" />
                          <span className="text-xl group-open:rotate-45 transition-transform font-bold">+</span>
                        </div>
                      </div>
                    </summary>
                    <div className="p-4 pt-0 space-y-4 border-t-2 border-foreground/10">
                      {dimension.data.notes && <p className="text-sm text-muted-foreground">{dimension.data.notes}</p>}
                      {Object.entries(dimension.data.criteria).map(([key, criterion]) => (
                        <div key={key} className="p-4 bg-muted/30 border-2 border-foreground/10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-black uppercase text-sm">{key.replace(/_/g, ' ')}</span>
                            {criterion.score !== undefined && <ScoreBadge score={criterion.score} size="sm" />}
                          </div>
                          {criterion.score !== undefined && <ScoreBar score={criterion.score} showValue={false} className="mb-3" />}
                          <p className="text-sm text-muted-foreground mb-2">{criterion.methodology}</p>
                          <div className="space-y-2 mt-3 pt-3 border-t-2 border-dashed border-foreground/10">
                            <div className="text-xs font-black uppercase tracking-wide text-muted-foreground">Evidence</div>
                            {criterion.evidence.map((ev, idx) => (
                              <div key={idx} className="text-sm">
                                <a href={ev.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">{ev.source}</a>
                                <span className="text-muted-foreground"> — {ev.value}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center gap-3 mt-3 text-xs">
                            <span className={`px-2 py-1 font-bold uppercase border ${
                              criterion.confidence === 'high' ? 'bg-emerald-100 text-emerald-700 border-emerald-300' :
                              criterion.confidence === 'medium' ? 'bg-amber-100 text-amber-700 border-amber-300' :
                              'bg-red-100 text-red-700 border-red-300'
                            }`}>{criterion.confidence}</span>
                            <span className="text-muted-foreground">Verified: {criterion.last_verified}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div
                className="bg-emerald-50 border-2 border-foreground p-5"
                style={{ boxShadow: '4px 4px 0 0 hsl(142 76% 36%)' }}
              >
                <div className="flex items-center gap-2 text-emerald-700 font-black text-sm uppercase tracking-wide mb-3">
                  <CheckCircle className="w-4 h-4" />Strengths
                </div>
                <ul className="space-y-2">
                  {entity.strengths.map((strength, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <span className="text-emerald-500 font-bold mt-0.5">+</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="bg-pink-50 border-2 border-foreground p-5"
                style={{ boxShadow: '4px 4px 0 0 hsl(350 89% 60%)' }}
              >
                <div className="flex items-center gap-2 text-pink-700 font-black text-sm uppercase tracking-wide mb-3">
                  <AlertTriangle className="w-4 h-4" />Limitations
                </div>
                <ul className="space-y-2">
                  {entity.limitations.map((limitation, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <span className="text-pink-500 font-bold mt-0.5">!</span>
                      <span>{limitation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {entity.metadata && (
                <div
                  className="bg-sky-50 border-2 border-foreground p-5"
                  style={{ boxShadow: '4px 4px 0 0 hsl(199 89% 48%)' }}
                >
                  <div className="flex items-center gap-2 text-sky-700 font-black text-sm uppercase tracking-wide mb-3">
                    <Info className="w-4 h-4" />Metadata
                  </div>
                  <div className="space-y-2 text-sm">
                    {Object.entries(entity.metadata).map(([key, value]) => {
                      if (typeof value === 'object' && value !== null) {
                        return (
                          <div key={key}>
                            <div className="font-black uppercase text-xs mb-1">{key.replace(/_/g, ' ')}</div>
                            <div className="pl-3 space-y-1 text-muted-foreground">
                              {Object.entries(value).map(([subKey, subValue]) => (
                                <div key={subKey}><span className="capitalize">{subKey.replace(/_/g, ' ')}:</span> {String(subValue)}</div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div key={key}>
                          <span className="font-bold uppercase text-xs">{key.replace(/_/g, ' ')}:</span>{' '}
                          <span className="text-muted-foreground">{String(value)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {entity.use_case_ratings && Object.keys(entity.use_case_ratings).length > 0 && (
            <div
              className="border-2 border-foreground bg-white p-6 mb-8"
              style={{ boxShadow: '4px 4px 0 0 black' }}
            >
              <h2 className="text-2xl font-black uppercase tracking-tight mb-6">Use Case Ratings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(entity.use_case_ratings).map(([key, rating]) => (
                  <div key={key} className="p-4 bg-muted/30 border-2 border-foreground/10 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-black uppercase text-sm">{key.replace(/-/g, ' ')}</h3>
                      <ScoreBadge score={rating.overall} size="sm" />
                    </div>
                    <p className="text-sm text-muted-foreground">{rating.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {relatedEntities.length > 0 && (
            <div
              className="border-2 border-foreground bg-white p-6"
              style={{ boxShadow: '4px 4px 0 0 black' }}
            >
              <h2 className="text-2xl font-black uppercase tracking-tight mb-6">Similar Agents</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedEntities.map((related) => (
                  <Link
                    key={related.id}
                    href={`/agents/${related.id}`}
                    className="p-4 border-2 border-foreground hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all group bg-white"
                    style={{ boxShadow: '3px 3px 0 0 black' }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-black uppercase group-hover:text-primary transition-colors">{related.name}</h3>
                      <ScoreBadge score={calculateOverallScore(related)} size="sm" />
                    </div>
                    <p className="text-sm text-muted-foreground uppercase">{related.provider}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
