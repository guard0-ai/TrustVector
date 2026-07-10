/**
 * TrustVector Logo Component
 *
 * Guard0 family lockup: the Guard0 dog mark + "TrustVector" wordmark
 * with a "by Guard0" attribution, in the guard0.ai design language.
 */

import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon' | 'wordmark';
}

function DogMark({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/guard0-dog.png"
      alt=""
      width={412}
      height={281}
      unoptimized
      className={`w-auto ${className}`}
      priority
    />
  );
}

export function Logo({ className = '', size = 'md', variant = 'full' }: LogoProps) {
  const sizes = {
    sm: { mark: 'h-6', text: 'text-base', by: 'text-[9px]' },
    md: { mark: 'h-8', text: 'text-xl', by: 'text-[10px]' },
    lg: { mark: 'h-12', text: 'text-3xl', by: 'text-xs' },
  };

  const s = sizes[size];

  if (variant === 'icon') {
    return (
      <div className={`relative ${className}`} role="img" aria-label="TrustVector by Guard0">
        <DogMark className={s.mark} />
      </div>
    );
  }

  if (variant === 'wordmark') {
    return (
      <div className={`flex flex-col ${className}`} role="img" aria-label="TrustVector by Guard0">
        <span className={`${s.text} font-display font-bold tracking-tight leading-none`}>
          <span className="text-foreground">Trust</span>
          <span className="text-primary">Vector</span>
        </span>
        <span className={`${s.by} font-mono uppercase tracking-[0.16em] text-muted-foreground mt-1`}>
          by Guard0
        </span>
      </div>
    );
  }

  // Full lockup: dog mark + stacked wordmark with attribution below
  return (
    <div className={`flex items-center gap-2.5 ${className}`} role="img" aria-label="TrustVector by Guard0">
      <DogMark className={s.mark} />
      <span className="flex flex-col justify-center">
        <span className={`${s.text} font-display font-bold tracking-tight leading-none`}>
          <span className="text-foreground">Trust</span>
          <span className="text-primary">Vector</span>
        </span>
        <span className={`${s.by} font-mono uppercase tracking-[0.16em] text-muted-foreground mt-1 whitespace-nowrap`}>
          by Guard0
        </span>
      </span>
    </div>
  );
}
