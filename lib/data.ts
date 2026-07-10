/**
 * Data loading utilities for TrustVector
 *
 * SERVER-SIDE ONLY — do NOT import from 'use client' components. This module
 * pulls in lib/data-index.ts, which bundles the FULL evaluation dataset
 * (~4.4MB of JSON); importing it client-side ships all of it to the browser.
 * Client list/compare views must use lib/client-data.ts (EntitySummary)
 * instead. (We'd use `import 'server-only'` here, but that package is not a
 * dependency of this project.)
 *
 * Entity JSON is bundled via lib/data-index.ts, which is auto-generated from
 * the data/ directory by scripts/generate-data-index.ts (runs on predev/prebuild).
 */

import type { TrustVectorEntity } from '@/framework/schema/types';
import { calculateOverallScore } from '@/framework/schema/types';
import { ALL_ENTITIES } from './data-index';

// Overall scores are constants for static data — compute once, not per sort comparison.
const OVERALL_SCORE_CACHE = new Map<string, number>();
function cachedOverallScore(entity: TrustVectorEntity): number {
  let s = OVERALL_SCORE_CACHE.get(entity.id);
  if (s === undefined) {
    s = calculateOverallScore(entity);
    OVERALL_SCORE_CACHE.set(entity.id, s);
  }
  return s;
}


/**
 * Get all entities
 */
export function getAllEntities(): TrustVectorEntity[] {
  return ALL_ENTITIES;
}

/**
 * Get entity by ID
 */
export function getEntityById(id: string): TrustVectorEntity | null {
  return ALL_ENTITIES.find((entity) => entity.id === id) || null;
}

/**
 * Get entities by type
 */
export function getEntitiesByType(type: 'model' | 'mcp' | 'agent'): TrustVectorEntity[] {
  return ALL_ENTITIES.filter((entity) => entity.type === type);
}

/**
 * Get entities by provider
 */
export function getEntitiesByProvider(provider: string): TrustVectorEntity[] {
  return ALL_ENTITIES.filter((entity) => entity.provider === provider);
}

/**
 * Search entities by query
 */
export function searchEntities(query: string): TrustVectorEntity[] {
  const lowerQuery = query.toLowerCase();
  return ALL_ENTITIES.filter((entity) => {
    return (
      entity.name.toLowerCase().includes(lowerQuery) ||
      entity.provider.toLowerCase().includes(lowerQuery) ||
      entity.description.toLowerCase().includes(lowerQuery) ||
      entity.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  });
}

/**
 * Filter entities by criteria
 */
export interface EntityFilters {
  type?: 'model' | 'mcp' | 'agent';
  provider?: string;
  minOverallScore?: number;
  minDimensionScores?: {
    performance_reliability?: number;
    security?: number;
    privacy_compliance?: number;
    trust_transparency?: number;
    operational_excellence?: number;
  };
  tags?: string[];
}

export function filterEntities(filters: EntityFilters): TrustVectorEntity[] {
  let results = ALL_ENTITIES;

  if (filters.type) {
    results = results.filter((entity) => entity.type === filters.type);
  }

  if (filters.provider) {
    results = results.filter((entity) => entity.provider === filters.provider);
  }

  if (filters.minOverallScore !== undefined) {
    results = results.filter((entity) => {
      const overallScore = cachedOverallScore(entity);
      return overallScore >= filters.minOverallScore!;
    });
  }

  if (filters.minDimensionScores) {
    results = results.filter((entity) => {
      for (const [dimension, minScore] of Object.entries(filters.minDimensionScores!)) {
        const dimensionScore = entity.trust_vector[dimension as keyof typeof entity.trust_vector].overall_score;
        if (dimensionScore < minScore) {
          return false;
        }
      }
      return true;
    });
  }

  if (filters.tags && filters.tags.length > 0) {
    results = results.filter((entity) => {
      return filters.tags!.some((tag) => entity.tags?.includes(tag));
    });
  }

  return results;
}

/**
 * Get all unique providers
 */
export function getAllProviders(): string[] {
  const providers = new Set(ALL_ENTITIES.map((entity) => entity.provider));
  return Array.from(providers).sort();
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  ALL_ENTITIES.forEach((entity) => {
    entity.tags?.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Get related entities
 */
export function getRelatedEntities(entity: TrustVectorEntity): TrustVectorEntity[] {
  if (!entity.related_entities) return [];

  return entity.related_entities
    .map((id) => getEntityById(id))
    .filter((e): e is TrustVectorEntity => e !== null);
}

/**
 * Sort entities
 */
export type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'overall-score-desc'
  | 'overall-score-asc'
  | 'date-desc'
  | 'date-asc';

export function sortEntities(
  entities: TrustVectorEntity[],
  sortBy: SortOption
): TrustVectorEntity[] {
  const sorted = [...entities];

  switch (sortBy) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'overall-score-desc':
      return sorted.sort((a, b) => cachedOverallScore(b) - cachedOverallScore(a));
    case 'overall-score-asc':
      return sorted.sort((a, b) => cachedOverallScore(a) - cachedOverallScore(b));
    case 'date-desc':
      return sorted.sort((a, b) => b.last_evaluated.localeCompare(a.last_evaluated));
    case 'date-asc':
      return sorted.sort((a, b) => a.last_evaluated.localeCompare(b.last_evaluated));
    default:
      return sorted;
  }
}

/**
 * Get statistics
 */
export function getStatistics() {
  const entities = getAllEntities();

  return {
    total: entities.length,
    byType: {
      models: entities.filter((e) => e.type === 'model').length,
      mcps: entities.filter((e) => e.type === 'mcp').length,
      agents: entities.filter((e) => e.type === 'agent').length,
    },
    averageOverallScore:
      entities.reduce((sum, entity) => sum + cachedOverallScore(entity), 0) / entities.length,
    providers: getAllProviders().length,
  };
}
