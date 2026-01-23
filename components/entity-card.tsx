'use client';

import { TrustVectorEntity, calculateOverallScore } from '@/framework/schema/types';
import { truncate } from '@/lib/utils';

interface EntityCardProps {
  entity: TrustVectorEntity;
}

// Get score label and color class
function getScoreInfo(score: number): { label: string; bgClass: string; textClass: string } {
  if (score >= 90) return { label: 'Exceptional', bgClass: 'bg-emerald-500', textClass: 'text-white' };
  if (score >= 75) return { label: 'Strong', bgClass: 'bg-sky-500', textClass: 'text-white' };
  if (score >= 60) return { label: 'Adequate', bgClass: 'bg-amber-400', textClass: 'text-black' };
  if (score >= 40) return { label: 'Concerning', bgClass: 'bg-orange-500', textClass: 'text-white' };
  return { label: 'Poor', bgClass: 'bg-red-500', textClass: 'text-white' };
}

// Generate metric segments (like Loot Drop's REBUILD/SCALE/MARKET)
function MetricSegments({ score, color = 'default' }: { score: number; color?: 'default' | 'orange' | 'blue' | 'green' }) {
  const max = 5;
  const filled = Math.round((score / 100) * max);
  const colorClass = color === 'orange' ? 'filled-orange' : color === 'blue' ? 'filled-blue' : color === 'green' ? 'filled-green' : 'filled';

  return (
    <div className="metric-segments">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`metric-segment ${i < filled ? colorClass : ''}`}
        />
      ))}
    </div>
  );
}

export function EntityCard({ entity }: EntityCardProps) {
  const overallScore = calculateOverallScore(entity);
  const scoreInfo = getScoreInfo(overallScore);
  const { trust_vector } = entity;

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
              <h3 className="text-lg font-black text-foreground truncate group-hover:text-primary transition-colors uppercase tracking-tight">
                {entity.name}
              </h3>
              <span className="text-sm text-muted-foreground shrink-0">
                {(entity.metadata as any)?.release_date ? new Date((entity.metadata as any).release_date).getFullYear() : ''}
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
          <span className="badge-burned">
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

        {/* Metric bars - like Loot Drop */}
        <div className="border-t-2 border-foreground/10 pt-4 grid grid-cols-3 gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1">
              <span className="text-primary">⚡</span> PERF
            </div>
            <MetricSegments score={trust_vector.performance_reliability.overall_score} color="orange" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1">
              <span className="text-sky-500">🛡</span> SECURE
            </div>
            <MetricSegments score={trust_vector.security.overall_score} color="blue" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1">
              <span className="text-emerald-500">🔒</span> PRIVACY
            </div>
            <MetricSegments score={trust_vector.privacy_compliance.overall_score} color="green" />
          </div>
        </div>

        {/* Provider */}
        <div className="mt-4 pt-3 border-t border-dashed border-foreground/20 text-xs text-muted-foreground uppercase tracking-wide">
          {entity.provider}
        </div>
      </div>
    </a>
  );
}
