'use client';

/**
 * Registry Field — the registry, visualized.
 *
 * One dot per evaluated system, colored by its actual trust tier, sorted
 * highest-first so the field reads as a gradient of trust. Hover names the
 * system; click opens its evaluation. The hero stops being decoration and
 * becomes the dataset.
 */

import { useMemo, useState } from 'react';
import { getScoreColor } from '@/framework/schema/types';
import type { EntitySummary } from '@/lib/summary-types';

export function RegistryField({ summaries }: { summaries: EntitySummary[] }) {
  const [active, setActive] = useState<EntitySummary | null>(null);

  const sorted = useMemo(
    () => [...summaries].sort((a, b) => b.overall_score - a.overall_score),
    [summaries]
  );

  return (
    <div className="registry-field-wrap" aria-label={`${summaries.length} evaluated systems, one dot each, colored by trust tier`}>
      <div className="registry-field" role="list">
        {sorted.map((s, i) => (
          <a
            key={s.id}
            role="listitem"
            href={`/${s.type}s/${s.id}`}
            className="registry-dot"
            style={{
              backgroundColor: getScoreColor(s.overall_score),
              animationDelay: `${(i % 28) * 18 + Math.floor(i / 28) * 26}ms`,
            }}
            aria-label={`${s.name} — ${s.overall_score}/100`}
            onMouseEnter={() => setActive(s)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(s)}
            onBlur={() => setActive(null)}
          />
        ))}
      </div>
      <div className="registry-field-caption font-mono" aria-live="polite">
        {active ? (
          <>
            <span className="text-foreground font-semibold">{active.name}</span>
            <span className="text-muted-foreground"> · {active.provider} · </span>
            <span style={{ color: getScoreColor(active.overall_score) }} className="font-semibold">
              {active.overall_score}/100
            </span>
          </>
        ) : (
          <span className="text-muted-foreground">
            {summaries.length} systems · one dot each · colored by trust tier · hover to identify
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Status Ticker — a security-feed strip of real lifecycle events derived
 * from the registry: retirements, deprecations, and trust-floor scores.
 */
export function StatusTicker({ summaries }: { summaries: EntitySummary[] }) {
  const items = useMemo(() => {
    const events: { text: string; tone: 'critical' | 'warn' | 'info'; href: string }[] = [];
    for (const s of summaries) {
      const d = s.description;
      const href = `/${s.type}s/${s.id}`;
      if (/^(RETIRED|SHUT DOWN)\b/i.test(d) || s.tags.includes('retired')) {
        events.push({ text: `${s.name} — retired`, tone: 'critical', href });
      } else if (/^DEPRECATED/i.test(d) || s.tags.includes('deprecated')) {
        events.push({ text: `${s.name} — deprecated`, tone: 'warn', href });
      } else if (/^SUPERSEDED/i.test(d) || s.tags.includes('superseded')) {
        events.push({ text: `${s.name} — superseded`, tone: 'info', href });
      } else if (s.dimensions.security != null && s.dimensions.security < 50) {
        events.push({ text: `${s.name} — security ${s.dimensions.security}/100`, tone: 'critical', href });
      } else if (s.dimensions.privacy_compliance != null && s.dimensions.privacy_compliance < 50) {
        events.push({ text: `${s.name} — privacy ${s.dimensions.privacy_compliance}/100`, tone: 'critical', href });
      }
    }
    // Highest-signal first: critical, then warn, then info; cap for one clean loop
    const rank = { critical: 0, warn: 1, info: 2 } as const;
    return events.sort((a, b) => rank[a.tone] - rank[b.tone]).slice(0, 24);
  }, [summaries]);

  if (items.length === 0) return null;

  const strip = (dup: boolean) => (
    <div className="ticker-strip" aria-hidden={dup}>
      {items.map((it, i) => (
        <a key={`${dup ? 'b' : 'a'}-${i}`} href={it.href} className="ticker-item font-mono" tabIndex={dup ? -1 : 0}>
          <span className={`ticker-dot ticker-${it.tone}`} aria-hidden="true" />
          {it.text}
        </a>
      ))}
    </div>
  );

  return (
    <div className="ticker" role="region" aria-label="Registry status feed: recent lifecycle and trust events">
      <span className="ticker-label font-mono">Registry feed</span>
      <div className="ticker-window">
        <div className="ticker-track">
          {strip(false)}
          {strip(true)}
        </div>
      </div>
    </div>
  );
}
