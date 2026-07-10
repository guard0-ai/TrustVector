/**
 * Client-side data utilities for TrustVector list/compare views.
 *
 * Works ONLY on lightweight EntitySummary objects from the auto-generated
 * lib/data-summaries.ts (~5% of the full dataset), so 'use client' pages
 * never bundle the full evaluation JSON. Server components that need full
 * entities (detail pages, sitemap) use lib/data.ts instead.
 *
 * Must not import lib/data.ts or lib/data-index.ts — doing so would pull
 * the entire dataset back into the client bundle.
 */

import type { EntitySummary } from './summary-types';
import { ALL_SUMMARIES } from './data-summaries';

/**
 * Get all entity summaries
 */
export function getAllSummaries(): EntitySummary[] {
  return ALL_SUMMARIES;
}

/**
 * Search summaries by query (matches name, provider, description, tags)
 */
export function searchSummaries(query: string): EntitySummary[] {
  const lowerQuery = query.toLowerCase();
  return ALL_SUMMARIES.filter((summary) => {
    return (
      summary.name.toLowerCase().includes(lowerQuery) ||
      summary.provider.toLowerCase().includes(lowerQuery) ||
      summary.description.toLowerCase().includes(lowerQuery) ||
      summary.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  });
}

/**
 * Sort summaries — mirrors lib/data.ts sortEntities option-for-option,
 * using the precomputed summary.overall_score for score sorts.
 */
export type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'overall-score-desc'
  | 'overall-score-asc'
  | 'date-desc'
  | 'date-asc';

export function sortSummaries(
  summaries: EntitySummary[],
  sortBy: SortOption
): EntitySummary[] {
  const sorted = [...summaries];

  switch (sortBy) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'overall-score-desc':
      return sorted.sort((a, b) => b.overall_score - a.overall_score);
    case 'overall-score-asc':
      return sorted.sort((a, b) => a.overall_score - b.overall_score);
    case 'date-desc':
      return sorted.sort((a, b) => b.last_evaluated.localeCompare(a.last_evaluated));
    case 'date-asc':
      return sorted.sort((a, b) => a.last_evaluated.localeCompare(b.last_evaluated));
    default:
      return sorted;
  }
}
