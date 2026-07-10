'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';

interface AnnouncementBannerProps {
  /** Bump the id to re-show the banner after a new announcement */
  id: string;
  tag?: string;
  message: string;
  href: string;
  linkText?: string;
}

export function AnnouncementBanner({
  id,
  tag = 'NEW',
  message,
  href,
  linkText = 'Read the evaluation',
}: AnnouncementBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  const storageKey = `tv-banner-dismissed:${id}`;

  useEffect(() => {
    if (window.sessionStorage.getItem(storageKey)) setDismissed(true);
  }, [storageKey]);

  if (dismissed) return null;

  return (
    <div className="relative z-50 border-b border-guard0-dark/30 bg-guard0-900 text-guard0-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 py-2 pr-8 text-sm">
          <span className="hidden sm:inline-flex px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest bg-guard0 text-guard0-900 rounded">
            {tag}
          </span>
          <p className="truncate">{message}</p>
          <Link
            href={href}
            className="inline-flex items-center gap-1 font-semibold text-guard0-light hover:text-white whitespace-nowrap transition-colors"
          >
            {linkText}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
      <button
        aria-label="Dismiss announcement"
        onClick={() => {
          window.sessionStorage.setItem(storageKey, '1');
          setDismissed(true);
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-guard0-100/70 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
