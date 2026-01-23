'use client';

import { useState, useMemo } from 'react';
import { getAllEntities } from '@/lib/data';
import { calculateOverallScore, getScoreColor } from '@/framework/schema/types';
import { ScoreBadge } from '@/components/score-badge';
import { GitCompare, X, Plus, Search } from 'lucide-react';
import type { TrustVectorEntity } from '@/framework/schema/types';

export default function ComparePage() {
  const allEntities = getAllEntities();
  const [selectedEntities, setSelectedEntities] = useState<TrustVectorEntity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEntities = useMemo(() => {
    if (!searchQuery) return allEntities;
    const query = searchQuery.toLowerCase();
    return allEntities.filter(
      (entity) =>
        entity.name.toLowerCase().includes(query) ||
        entity.provider.toLowerCase().includes(query) ||
        entity.type.toLowerCase().includes(query)
    );
  }, [allEntities, searchQuery]);

  const addEntity = (entity: TrustVectorEntity) => {
    if (selectedEntities.length < 4 && !selectedEntities.find((e) => e.id === entity.id)) {
      setSelectedEntities([...selectedEntities, entity]);
    }
  };

  const removeEntity = (id: string) => {
    setSelectedEntities(selectedEntities.filter((e) => e.id !== id));
  };

  const dimensions = [
    { key: 'performance_reliability', name: 'Performance & Reliability', icon: '🚀' },
    { key: 'security', name: 'Security', icon: '🛡️' },
    { key: 'privacy_compliance', name: 'Privacy & Compliance', icon: '🔒' },
    { key: 'trust_transparency', name: 'Trust & Transparency', icon: '👁️' },
    { key: 'operational_excellence', name: 'Operational Excellence', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b-4 border-double border-foreground">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 text-white border-2 border-foreground text-sm font-bold mb-6"
              style={{ boxShadow: '3px 3px 0 0 black' }}
            >
              <GitCompare className="w-4 h-4" />
              SIDE-BY-SIDE COMPARISON
            </div>

            <h1 className="text-5xl sm:text-6xl font-black mb-4 tracking-tighter">
              COMPARE
              <br />
              <span className="text-primary">AI SYSTEMS</span>
            </h1>

            <p className="text-xl text-muted-foreground">
              Compare up to <span className="font-black text-foreground">4</span> AI models, agents, or MCPs
              <br />
              across all trust dimensions.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Entity Selection */}
        {selectedEntities.length < 4 && (
          <div className="max-w-4xl mx-auto mb-12">
            <div
              className="bg-white border-2 border-foreground p-6"
              style={{ boxShadow: '4px 4px 0 0 black' }}
            >
              <h2 className="text-xl font-black uppercase tracking-wide mb-4">
                Select Entities to Compare
              </h2>

              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="SEARCH MODELS, AGENTS, OR MCPS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-fancy pl-12 w-full"
                />
              </div>

              <div className="max-h-64 overflow-y-auto space-y-2">
                {filteredEntities.map((entity) => {
                  const isSelected = selectedEntities.find((e) => e.id === entity.id);
                  const overallScore = calculateOverallScore(entity);

                  return (
                    <button
                      key={entity.id}
                      onClick={() => !isSelected && addEntity(entity)}
                      disabled={!!isSelected}
                      className={`w-full flex items-center justify-between p-3 border-2 border-foreground transition-all ${
                        isSelected
                          ? 'bg-muted/50 opacity-50 cursor-not-allowed'
                          : 'hover:bg-muted cursor-pointer hover:translate-x-[-2px] hover:translate-y-[-2px]'
                      }`}
                      style={!isSelected ? { boxShadow: '2px 2px 0 0 black' } : {}}
                    >
                      <div className="flex items-center gap-3 text-left">
                        <div>
                          <div className="font-black uppercase">{entity.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {entity.provider} • {entity.type.toUpperCase()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <ScoreBadge score={overallScore} size="sm" />
                        {!isSelected && <Plus className="w-4 h-4 text-primary" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {selectedEntities.length > 0 && (
          <div className="mb-12">
            <div
              className="bg-white border-2 border-foreground overflow-hidden"
              style={{ boxShadow: '4px 4px 0 0 black' }}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-foreground text-background">
                    <tr>
                      <th className="text-left p-4 font-black uppercase tracking-wide sticky left-0 bg-foreground z-10">
                        Metric
                      </th>
                      {selectedEntities.map((entity) => (
                        <th key={entity.id} className="text-left p-4 min-w-[200px]">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="font-black uppercase">{entity.name}</div>
                              <div className="text-xs font-normal opacity-70">
                                {entity.provider}
                              </div>
                              <div className="mt-1">
                                <span className="inline-flex items-center px-2 py-0.5 text-xs bg-background text-foreground font-bold uppercase">
                                  {entity.type}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => removeEntity(entity.id)}
                              className="text-background/70 hover:text-red-400 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {/* Overall Score */}
                    <tr className="border-t-2 border-foreground bg-amber-50">
                      <td className="p-4 font-black uppercase sticky left-0 bg-amber-50 z-10">
                        Overall Trust Score
                      </td>
                      {selectedEntities.map((entity) => {
                        const score = calculateOverallScore(entity);
                        return (
                          <td key={entity.id} className="p-4">
                            <ScoreBadge score={score} size="lg" showLabel />
                          </td>
                        );
                      })}
                    </tr>

                    {/* Dimension Scores */}
                    {dimensions.map((dimension, idx) => (
                      <tr
                        key={dimension.key}
                        className={`border-t-2 border-foreground/20 ${idx % 2 === 0 ? 'bg-white' : 'bg-muted/30'}`}
                      >
                        <td
                          className="p-4 font-bold sticky left-0 z-10"
                          style={{ backgroundColor: idx % 2 === 0 ? 'white' : 'hsl(var(--muted) / 0.3)' }}
                        >
                          <span className="mr-2">{dimension.icon}</span>
                          {dimension.name}
                        </td>
                        {selectedEntities.map((entity) => {
                          const score =
                            entity.trust_vector[
                              dimension.key as keyof typeof entity.trust_vector
                            ].overall_score;
                          return (
                            <td key={entity.id} className="p-4">
                              <ScoreBadge score={score} size="md" />
                            </td>
                          );
                        })}
                      </tr>
                    ))}

                    {/* Provider */}
                    <tr className="border-t-2 border-foreground/20 bg-white">
                      <td className="p-4 font-bold sticky left-0 bg-white z-10">Provider</td>
                      {selectedEntities.map((entity) => (
                        <td key={entity.id} className="p-4 text-muted-foreground uppercase">
                          {entity.provider}
                        </td>
                      ))}
                    </tr>

                    {/* Strengths / Limitations */}
                    <tr className="border-t-2 border-foreground/20 bg-emerald-50">
                      <td className="p-4 font-bold sticky left-0 bg-emerald-50 z-10">Strengths</td>
                      {selectedEntities.map((entity) => (
                        <td key={entity.id} className="p-4">
                          <span className="font-black text-emerald-600">{entity.strengths.length}</span>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-t-2 border-foreground/20 bg-pink-50">
                      <td className="p-4 font-bold sticky left-0 bg-pink-50 z-10">Limitations</td>
                      {selectedEntities.map((entity) => (
                        <td key={entity.id} className="p-4">
                          <span className="font-black text-pink-600">{entity.limitations.length}</span>
                        </td>
                      ))}
                    </tr>

                    {/* View Details Link */}
                    <tr className="border-t-2 border-foreground bg-white">
                      <td className="p-4 font-bold sticky left-0 bg-white z-10">Details</td>
                      {selectedEntities.map((entity) => (
                        <td key={entity.id} className="p-4">
                          <a
                            href={`/${entity.type}s/${entity.id}`}
                            className="text-primary hover:underline font-bold uppercase text-sm"
                          >
                            VIEW FULL EVALUATION →
                          </a>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {selectedEntities.length === 0 && (
          <div className="max-w-4xl mx-auto text-center py-20">
            <div
              className="inline-flex items-center justify-center w-20 h-20 bg-muted border-2 border-foreground mb-6"
              style={{ boxShadow: '4px 4px 0 0 black' }}
            >
              <GitCompare className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-black uppercase mb-2">No Entities Selected</h3>
            <p className="text-muted-foreground">
              Search and select up to 4 AI systems above to start comparing
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
