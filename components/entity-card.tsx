'use client';

import { memo } from 'react';

import { getScoreColor, getScoreTheme } from '@/framework/schema/types';
import type { EntitySummary } from '@/lib/summary-types';
import { truncate } from '@/lib/utils';

interface EntityCardProps {
  entity: EntitySummary;
}

// Get score label and color class
// Generate metric segments (like Loot Drop's REBUILD/SCALE/MARKET)
function MetricSegments({ score }: { score: number }) {
  const max = 5;
  const filled = Math.round((score / 100) * max);
  // Semantic traffic-light color from the shared score ramp
  const fill = getScoreColor(score);

  return (
    <div className="metric-segments">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`metric-segment ${i < filled ? 'filled' : ''}`}
          style={i < filled ? { backgroundColor: fill } : undefined}
        />
      ))}
    </div>
  );
}

function EntityCardInner({ entity }: EntityCardProps) {
  const overallScore = entity.overall_score;
  const scoreInfo = getScoreTheme(overallScore);
  const { dimensions } = entity;

  return (
    <a
      href={`/${entity.type}s/${entity.id}`}
      className="group block"
      aria-label={`${entity.name} by ${entity.provider} - Trust Score: ${overallScore} out of 100. Click to view full assessment.`}
    >
      {/* Card with offset shadow */}
      <div className="card-shadow p-5 h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-foreground truncate group-hover:text-primary transition-colors tracking-tight">
                {entity.name}
              </h3>
              <span className="text-sm text-muted-foreground shrink-0">
                {entity.release_year ?? ''}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {truncate(entity.description, 140)}
        </p>

        {/* Score Badge & Type Tag */}
        <div className="flex items-center gap-2 mb-4">
          {/* Burned-style badge for score */}
          <span className={`badge-burned ${scoreInfo.bg} ${scoreInfo.text}`}>
            {overallScore} {scoreInfo.label.toUpperCase()}
          </span>
          <span className="category-tag">
            <span className="category-tag-check" />
            {entity.type}
          </span>
        </div>

        {/* Hover hint */}
        <div className="hover-hint mb-3">
          HOVER FOR DETAILS
        </div>

        {/* Metric bars */}
        <div className="border-t border-border pt-4 grid grid-cols-3 gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1">
              <span className="text-muted-foreground">⚡</span> PERF
            </div>
            <MetricSegments score={dimensions.performance_reliability ?? 0} />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1">
              <span className="text-muted-foreground">🛡</span> SECURE
            </div>
            <MetricSegments score={dimensions.security ?? 0} />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1">
              <span className="text-muted-foreground">🔒</span> PRIVACY
            </div>
            <MetricSegments score={dimensions.privacy_compliance ?? 0} />
          </div>
        </div>

        {/* Provider */}
        <div className="mt-4 pt-3 border-t border-border text-xs text-muted-foreground uppercase tracking-wide">
          {entity.provider}
        </div>
      </div>
    </a>
  );
}

// Summaries are stable module constants, so pointer equality skips re-renders on filter/search
export const EntityCard = memo(EntityCardInner);
