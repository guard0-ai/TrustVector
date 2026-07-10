#!/usr/bin/env tsx

/**
 * Generates lib/data-index.ts AND lib/data-summaries.ts from the JSON files
 * in data/{models,agents,mcps}.
 *
 * - lib/data-index.ts statically imports every entity JSON. It is consumed
 *   ONLY by server-side code (detail pages, sitemap) via lib/data.ts, so the
 *   full ~4MB dataset never reaches the client bundle.
 * - lib/data-summaries.ts embeds a small literal array of EntitySummary
 *   objects (~5% of the data) for the client-side list/compare views via
 *   lib/client-data.ts.
 *
 * Draft gate: files whose name starts with '_' or whose content has a
 * top-level `"draft": true` are skipped from BOTH outputs.
 *
 * This script runs via `predev`/`prebuild`, so adding an evaluation file is
 * all that's needed to publish it.
 */

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import type { EntitySummary } from '../lib/summary-types';

const CATEGORIES = ['models', 'agents', 'mcps'] as const;

const DIMENSIONS = [
  'performance_reliability',
  'security',
  'privacy_compliance',
  'trust_transparency',
  'operational_excellence',
] as const;

function identFor(category: string, file: string): string {
  const base = file.replace(/\.json$/, '');
  const camel = base.replace(/[^a-zA-Z0-9]+(.)/g, (_, c: string) => c.toUpperCase());
  const safe = /^[a-zA-Z_]/.test(camel) ? camel : `_${camel}`;
  return `${category}_${safe}`;
}

/** Parse metadata.release_date to a UTC year, tolerating bad/missing input. */
function releaseYearOf(entity: any): number | null {
  const releaseDate = entity?.metadata?.release_date;
  if (typeof releaseDate !== 'string' || releaseDate.length === 0) return null;
  // Date-only strings ("YYYY-MM-DD") are parsed as UTC per the ECMAScript spec.
  const parsed = new Date(releaseDate);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.getUTCFullYear();
}

function dimensionScoreOf(entity: any, dimension: string): number | null {
  const score = entity?.trust_vector?.[dimension]?.overall_score;
  return typeof score === 'number' ? score : null;
}

function summarize(entity: any): EntitySummary {
  const dimensions = {
    performance_reliability: dimensionScoreOf(entity, 'performance_reliability'),
    security: dimensionScoreOf(entity, 'security'),
    privacy_compliance: dimensionScoreOf(entity, 'privacy_compliance'),
    trust_transparency: dimensionScoreOf(entity, 'trust_transparency'),
    operational_excellence: dimensionScoreOf(entity, 'operational_excellence'),
  };

  // Rounded mean of the present dimension scores — mirrors
  // framework/schema/types.ts calculateOverallScore (which averages
  // Object.values(trust_vector)).
  const present = DIMENSIONS.map((d) => dimensions[d]).filter(
    (s): s is number => s !== null
  );
  const overall_score =
    present.length > 0
      ? Math.round(present.reduce((sum, s) => sum + s, 0) / present.length)
      : 0;

  return {
    id: entity.id,
    type: entity.type,
    name: entity.name,
    provider: entity.provider,
    description: entity.description,
    tags: Array.isArray(entity.tags) ? entity.tags : [],
    last_evaluated: entity.last_evaluated,
    release_year: releaseYearOf(entity),
    overall_score,
    dimensions,
    strengths_count: Array.isArray(entity.strengths) ? entity.strengths.length : 0,
    limitations_count: Array.isArray(entity.limitations) ? entity.limitations.length : 0,
  };
}

const imports: string[] = [];
const arrays: Record<string, string[]> = {};
const seen = new Map<string, string>();
const summaries: EntitySummary[] = [];
let total = 0;
let skippedDrafts = 0;

for (const category of CATEGORIES) {
  const dir = join(process.cwd(), 'data', category);
  const files = readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .sort();
  arrays[category] = [];
  for (const file of files) {
    // Draft gate #1: underscore-prefixed filenames are drafts.
    if (file.startsWith('_')) {
      console.log(`Skipping draft (underscore-prefixed): ${category}/${file}`);
      skippedDrafts++;
      continue;
    }

    let entity: any;
    try {
      entity = JSON.parse(readFileSync(join(dir, file), 'utf8'));
    } catch (err) {
      console.error(`Failed to parse ${category}/${file}: ${err}`);
      process.exit(1);
    }

    // Draft gate #2: top-level `"draft": true` marks the file as a draft.
    if (entity?.draft === true) {
      console.log(`Skipping draft ("draft": true): ${category}/${file}`);
      skippedDrafts++;
      continue;
    }

    const ident = identFor(category, file);
    const prev = seen.get(ident);
    if (prev) {
      console.error(
        `Identifier collision: ${category}/${file} and ${prev} both map to '${ident}'. Rename one file.`
      );
      process.exit(1);
    }
    seen.set(ident, `${category}/${file}`);
    imports.push(`import ${ident} from '@/data/${category}/${file}';`);
    arrays[category].push(ident);
    summaries.push(summarize(entity));
    total++;
  }
}

const indexOut = `/**
 * AUTO-GENERATED by scripts/generate-data-index.ts — do not edit by hand.
 * Regenerate with: npm run generate:data-index
 *
 * SERVER-SIDE ONLY: bundles the full evaluation dataset. Import via
 * lib/data.ts from server components only — never from 'use client' code.
 * Client list/compare views use lib/data-summaries.ts instead.
 *
 * ${total} entities: ${arrays.models.length} models, ${arrays.agents.length} agents, ${arrays.mcps.length} MCP servers.
 */

import type { TrustVectorEntity } from '@/framework/schema/types';

${imports.join('\n')}

export const ALL_ENTITIES: TrustVectorEntity[] = [
${CATEGORIES.map(
  (c) => `  // ${c} (${arrays[c].length})\n${arrays[c].map((i) => `  ${i},`).join('\n')}`
).join('\n')}
] as TrustVectorEntity[];
`;

const summariesOut = `/**
 * AUTO-GENERATED by scripts/generate-data-index.ts — do not edit by hand.
 * Regenerate with: npm run generate:data-index
 *
 * Lightweight summaries (~5% of the full dataset) embedded as a literal so
 * client bundles carry only these small objects — no full evaluation JSON.
 * Consumed by lib/client-data.ts.
 *
 * ${total} entities: ${arrays.models.length} models, ${arrays.agents.length} agents, ${arrays.mcps.length} MCP servers.
 */

import type { EntitySummary } from '@/lib/summary-types';

export const ALL_SUMMARIES: EntitySummary[] = ${JSON.stringify(summaries, null, 2)};
`;

writeFileSync(join(process.cwd(), 'lib', 'data-index.ts'), indexOut);
writeFileSync(join(process.cwd(), 'lib', 'data-summaries.ts'), summariesOut);
console.log(
  `Generated lib/data-index.ts + lib/data-summaries.ts: ${total} entities ` +
    `(${arrays.models.length} models, ${arrays.agents.length} agents, ${arrays.mcps.length} MCPs)` +
    (skippedDrafts > 0 ? `, ${skippedDrafts} draft(s) skipped` : '')
);
