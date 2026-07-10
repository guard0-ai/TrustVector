/**
 * Lightweight entity summary shape shared by the auto-generated
 * lib/data-summaries.ts (see scripts/generate-data-index.ts) and its
 * client-side consumers (lib/client-data.ts, list/compare views).
 *
 * Summaries carry only what list and compare views render (~5% of the full
 * evaluation JSON), so client bundles never ship the full dataset. Detail
 * pages are server components and read full entities via lib/data.ts.
 */

export interface EntitySummary {
  id: string;
  type: 'model' | 'mcp' | 'agent';
  name: string;
  provider: string;
  description: string;
  tags: string[];
  last_evaluated: string;
  /** UTC year of metadata.release_date, or null when absent/unparseable. */
  release_year: number | null;
  /** Rounded mean of the 5 trust_vector dimension overall_scores. */
  overall_score: number;
  /** Per-dimension overall scores (null when a dimension is absent). */
  dimensions: {
    performance_reliability: number | null;
    security: number | null;
    privacy_compliance: number | null;
    trust_transparency: number | null;
    operational_excellence: number | null;
  };
  /** Counts only — full strengths/limitations text stays server-side. */
  strengths_count: number;
  limitations_count: number;
}
