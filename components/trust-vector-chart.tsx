'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { TrustVectorEntity } from '@/framework/schema/types';

// Clean light theme colors for chart
const CHART_COLORS = {
  grid: '#e5e7eb',           // Light gray grid
  axis: '#1f2937',           // Dark gray for labels
  axisSecondary: '#9ca3af',  // Muted gray for radius
  radar: '#f97316',          // Orange primary color
  radarFill: '#f97316',      // Orange fill
};

interface TrustVectorChartProps {
  entity: TrustVectorEntity;
  height?: number;
}

export function TrustVectorChart({ entity, height = 400 }: TrustVectorChartProps) {
  const { trust_vector } = entity;

  const data = [
    {
      dimension: 'Performance',
      score: trust_vector.performance_reliability.overall_score,
      fullName: 'Performance & Reliability',
    },
    {
      dimension: 'Security',
      score: trust_vector.security.overall_score,
      fullName: 'Security',
    },
    {
      dimension: 'Privacy',
      score: trust_vector.privacy_compliance.overall_score,
      fullName: 'Privacy & Compliance',
    },
    {
      dimension: 'Trust',
      score: trust_vector.trust_transparency.overall_score,
      fullName: 'Trust & Transparency',
    },
    {
      dimension: 'Operations',
      score: trust_vector.operational_excellence.overall_score,
      fullName: 'Operational Excellence',
    },
  ];

  // Generate accessible description for screen readers
  const accessibleDescription = data.map(d => `${d.fullName}: ${d.score} out of 100`).join(', ');

  return (
    <div role="img" aria-label={`Trust vector radar chart for ${entity.name}. ${accessibleDescription}`}>
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data}>
        <PolarGrid stroke={CHART_COLORS.grid} />
        <PolarAngleAxis
          dataKey="dimension"
          tick={{ fill: CHART_COLORS.axis, fontSize: 14, fontWeight: 500 }}
        />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: CHART_COLORS.axisSecondary, fontSize: 12 }} />
        <Radar
          name={entity.name}
          dataKey="score"
          stroke={CHART_COLORS.radar}
          fill={CHART_COLORS.radarFill}
          fillOpacity={0.15}
          strokeWidth={2}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-white border-2 border-foreground rounded-lg shadow-lg p-3">
                  <p className="font-bold mb-1">{data.fullName}</p>
                  <p className="text-sm text-muted-foreground">
                    Score: <span className="font-bold text-primary">{data.score}</span>/100
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
    </div>
  );
}
