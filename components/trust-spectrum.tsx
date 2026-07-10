/**
 * Trust Spectrum — TrustVector's visual signature.
 *
 * A five-band spectral strip, one band per trust dimension, each colored by
 * that dimension's score tier. Reads like a color-coded file-folder edge:
 * a glanceable fingerprint of an entity's trust shape.
 */

import { getScoreColor } from '@/framework/schema/types';
import type { EntitySummary } from '@/lib/summary-types';

const DIMENSIONS: { key: keyof EntitySummary['dimensions']; label: string }[] = [
  { key: 'performance_reliability', label: 'Performance' },
  { key: 'security', label: 'Security' },
  { key: 'privacy_compliance', label: 'Privacy' },
  { key: 'trust_transparency', label: 'Transparency' },
  { key: 'operational_excellence', label: 'Operations' },
];

export function TrustSpectrum({
  dimensions,
  className = '',
}: {
  dimensions: EntitySummary['dimensions'];
  className?: string;
}) {
  const title = DIMENSIONS.map(
    (d) => `${d.label} ${dimensions[d.key] ?? '—'}`
  ).join(' · ');

  return (
    <div
      className={`trust-spectrum ${className}`}
      role="img"
      aria-label={`Trust spectrum: ${title}`}
      title={title}
    >
      {DIMENSIONS.map((d) => {
        const score = dimensions[d.key];
        return (
          <span
            key={d.key}
            className="trust-spectrum-band"
            style={{
              backgroundColor: score != null ? getScoreColor(score) : 'transparent',
              opacity: score != null ? undefined : 0.2,
            }}
          />
        );
      })}
    </div>
  );
}
