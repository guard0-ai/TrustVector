'use client';

import { useState, useMemo } from 'react';
import { getAllSummaries, sortSummaries, type SortOption } from '@/lib/client-data';
import { EntityCard } from '@/components/entity-card';
import { Search } from 'lucide-react';

export default function HomePage() {
  const allEntities = getAllSummaries();
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

    return sortSummaries(results, sortBy);
  }, [allEntities, searchQuery, selectedProvider, selectedType, sortBy]);

  // Calculate stats
  const stats = useMemo(() => {
    const scores = allEntities.map((e) => e.overall_score);
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
      <section className="border-b border-border dot-grid">
        <div className="container mx-auto px-4 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-8">
              {stats.total} AI systems · evidence-linked · independently scored
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 tracking-[-0.045em] leading-[1.02]">
              Trust scores for
              <br />
              <span className="text-primary">the entire AI stack</span>
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Independent, evidence-based trust evaluations for{' '}
              <strong className="text-foreground font-semibold">{stats.total}</strong> AI models,
              agents, and MCP servers. Every score links to a primary source.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
              <a href="#browse" className="btn-cta btn-cta-primary">
                Browse Systems
              </a>
              <a href="/methodology" className="btn-cta btn-cta-secondary">
                Methodology
              </a>
            </div>
            <div>
              <a
                href="/contribute"
                className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-primary transition-colors"
              >
                or contribute an evaluation →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar - Fancy double border */}
      <section className="stats-bar-fancy">
        <div className="text-center">
          <div className="text-4xl sm:text-5xl font-extrabold font-display text-foreground">{stats.total}</div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">AI SYSTEMS</div>
        </div>
        <div className="text-center">
          <div className="text-4xl sm:text-5xl font-extrabold font-display text-primary">{stats.avgScore}</div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">AVG SCORE</div>
        </div>
        <div className="text-center">
          <div className="text-4xl sm:text-5xl font-extrabold font-display text-foreground">5</div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">TRUST DIMENSIONS</div>
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
              className="search-fancy"
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border border-border rounded-lg bg-card shadow-card">
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">⚙️ FILTER BY:</span>
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="px-4 py-2 bg-background border border-border rounded-md text-sm font-medium focus:outline-none cursor-pointer"
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
                Showing <span className="font-bold text-primary">{filteredEntities.length}</span> results
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 bg-background border border-border rounded-md text-sm font-medium focus:outline-none cursor-pointer"
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
            <div className="text-2xl font-bold font-display text-foreground mb-2">NO RESULTS FOUND</div>
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
            <span className="absolute -bottom-6 right-0 text-xs font-medium italic text-muted-foreground font-mono">
              (or feature request)
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
