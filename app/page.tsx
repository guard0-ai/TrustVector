'use client';

import { useState, useMemo } from 'react';
import { getAllEntities, sortEntities, type SortOption } from '@/lib/data';
import { EntityCard } from '@/components/entity-card';
import { calculateOverallScore } from '@/framework/schema/types';
import { Search } from 'lucide-react';

export default function HomePage() {
  const allEntities = getAllEntities();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('overall-score-desc');
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Get unique providers
  const providers = useMemo(() => {
    const uniqueProviders = new Set(allEntities.map((e) => e.provider));
    return ['all', ...Array.from(uniqueProviders).sort()];
  }, [allEntities]);

  // Filter and sort entities
  const filteredEntities = useMemo(() => {
    let results = allEntities;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (entity) =>
          entity.name.toLowerCase().includes(query) ||
          entity.provider.toLowerCase().includes(query) ||
          entity.description.toLowerCase().includes(query) ||
          entity.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (selectedProvider !== 'all') {
      results = results.filter((entity) => entity.provider === selectedProvider);
    }

    if (selectedType !== 'all') {
      results = results.filter((entity) => entity.type === selectedType);
    }

    return sortEntities(results, sortBy);
  }, [allEntities, searchQuery, selectedProvider, selectedType, sortBy]);

  // Calculate stats
  const stats = useMemo(() => {
    const scores = allEntities.map((e) => calculateOverallScore(e));
    const avgScore = scores.reduce((sum, s) => sum + s, 0) / scores.length;
    const modelCount = allEntities.filter((e) => e.type === 'model').length;
    const agentCount = allEntities.filter((e) => e.type === 'agent').length;
    const mcpCount = allEntities.filter((e) => e.type === 'mcp').length;

    return {
      total: allEntities.length,
      avgScore: Math.round(avgScore),
      models: modelCount,
      agents: agentCount,
      mcps: mcpCount,
    };
  }, [allEntities]);

  const typeFilters = [
    { value: 'all', label: 'ALL SYSTEMS', count: stats.total },
    { value: 'model', label: 'MODELS', count: stats.models },
    { value: 'agent', label: 'AGENTS', count: stats.agents },
    { value: 'mcp', label: 'MCPs', count: stats.mcps },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b-4 border-double border-foreground">
        <div className="container mx-auto px-4 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400 border-2 border-foreground text-foreground text-sm font-bold mb-8" style={{ boxShadow: '3px 3px 0 0 black' }}>
              🏆 {stats.total} AI SYSTEMS EVALUATED
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black mb-6 tracking-tighter leading-none">
              THE AI TRUST
              <br />
              <span className="text-primary">DIRECTORY</span>
            </h1>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl text-muted-foreground mb-4">
              Independent, evidence-based trust evaluations
              <br />
              <span className="font-bold">for <span className="text-primary font-black">100+</span> AI models, agents, and tools.</span>
            </p>

            {/* Playful quote */}
            <p className="quote-playful mb-10">
              One team&apos;s untested AI is another team&apos;s security incident.
            </p>

            {/* Tilted Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
              {/* Arrow annotation pointing to button */}
              <div className="relative">
                <span className="absolute -top-6 -left-4 text-xs font-medium italic text-primary" style={{ fontFamily: 'Courier New, monospace' }}>
                  CLICK HERE →
                </span>
                <a href="#browse" className="btn-tilted btn-tilted-orange">
                  BROWSE SYSTEMS
                </a>
              </div>

              <a href="/methodology" className="btn-tilted btn-tilted-blue">
                METHODOLOGY
                <span className="ml-1">📋</span>
              </a>

              <div className="relative">
                <a href="/contribute" className="btn-tilted btn-tilted-yellow">
                  ADD EVALUATION
                  <span className="ml-1">+</span>
                </a>
                <span className="absolute -bottom-5 -right-2 text-xs font-medium italic text-muted-foreground" style={{ fontFamily: 'Courier New, monospace' }}>
                  ← contribute!
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar - Fancy double border */}
      <section className="stats-bar-fancy">
        <div className="text-center">
          <div className="text-4xl sm:text-5xl font-black text-foreground">{stats.total}</div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">AI SYSTEMS</div>
        </div>
        <div className="text-center">
          <div className="text-4xl sm:text-5xl font-black text-primary">{stats.avgScore}</div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">AVG SCORE</div>
        </div>
        <div className="text-center">
          <div className="text-4xl sm:text-5xl font-black text-foreground">{stats.total}</div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">IDEAS TO STEAL</div>
        </div>
      </section>

      {/* Main Content */}
      <section id="browse" className="container mx-auto px-4 py-12">
        {/* Search Bar with shadow */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="SEARCH THE DIRECTORY..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-fancy pl-12"
              style={{ fontFamily: 'inherit' }}
            />
          </div>
        </div>

        {/* Type Filters - Pill style with checkbox */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {typeFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedType(filter.value)}
              className={`filter-pill ${selectedType === filter.value ? 'active' : ''}`}
            >
              <span className={`filter-pill-checkbox ${selectedType === filter.value ? 'checked' : ''}`} />
              <span>{filter.label}</span>
              <span className="text-xs opacity-70">{filter.count}</span>
            </button>
          ))}
        </div>

        {/* Filters Row */}
        <div className="max-w-6xl mx-auto mb-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-2 border-foreground bg-muted/30" style={{ boxShadow: '4px 4px 0 0 black' }}>
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">⚙️ FILTER BY:</span>
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="px-4 py-2 bg-background border-2 border-foreground text-sm font-medium focus:outline-none cursor-pointer"
              >
                {providers.map((provider) => (
                  <option key={provider} value={provider}>
                    {provider === 'all' ? 'ALL PROVIDERS' : provider.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm">
                Showing <span className="font-black text-primary">{filteredEntities.length}</span> results
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 bg-background border-2 border-foreground text-sm font-medium focus:outline-none cursor-pointer"
              >
                <option value="overall-score-desc">HIGHEST SCORE</option>
                <option value="overall-score-asc">LOWEST SCORE</option>
                <option value="name-asc">NAME (A-Z)</option>
                <option value="name-desc">NAME (Z-A)</option>
                <option value="date-desc">RECENTLY UPDATED</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {filteredEntities.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-2xl font-black text-foreground mb-2">NO RESULTS FOUND</div>
            <div className="text-muted-foreground">Try adjusting your search or filters</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredEntities.map((entity) => (
              <EntityCard key={entity.id} entity={entity} />
            ))}
          </div>
        )}

        {/* Add System CTA - Yellow box style */}
        <div className="max-w-xl mx-auto mt-16 text-center">
          <div className="relative inline-block">
            <a href="/contribute" className="cta-box-yellow">
              ✨ ADD AN EVALUATION
            </a>
            <span className="absolute -bottom-6 right-0 text-xs font-medium italic text-muted-foreground" style={{ fontFamily: 'Courier New, monospace' }}>
              (or feature request)
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
