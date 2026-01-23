/**
 * TrustVector Logo Component
 *
 * Clean, bold design inspired by Loot Drop:
 * - Heavy black typography
 * - Offset shadows
 * - Playful but professional
 */

import { Shield } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon' | 'wordmark';
}

export function Logo({ className = '', size = 'md', variant = 'full' }: LogoProps) {
  const sizes = {
    sm: { icon: 'w-8 h-8', text: 'text-lg', shield: 'w-4 h-4' },
    md: { icon: 'w-10 h-10', text: 'text-xl', shield: 'w-5 h-5' },
    lg: { icon: 'w-14 h-14', text: 'text-3xl', shield: 'w-7 h-7' },
  };

  const s = sizes[size];

  if (variant === 'icon') {
    return (
      <div
        className={`relative ${className}`}
        role="img"
        aria-label="TrustVector logo"
      >
        <div
          className={`${s.icon} flex items-center justify-center bg-foreground text-background border-2 border-foreground font-black`}
          style={{ boxShadow: '3px 3px 0 0 hsl(var(--primary))' }}
        >
          <Shield className={s.shield} />
        </div>
      </div>
    );
  }

  if (variant === 'wordmark') {
    return (
      <div className={`flex items-center ${className}`} role="img" aria-label="TrustVector">
        <span className={`${s.text} font-black tracking-tight uppercase`}>
          <span className="text-foreground">TRUST</span>
          <span className="text-primary">VECTOR</span>
        </span>
      </div>
    );
  }

  // Full logo with icon + wordmark
  return (
    <div className={`flex items-center gap-2 ${className}`} role="img" aria-label="TrustVector">
      <div
        className={`${s.icon} flex items-center justify-center bg-foreground text-background border-2 border-foreground`}
        style={{ boxShadow: '3px 3px 0 0 hsl(var(--primary))' }}
      >
        <Shield className={s.shield} />
      </div>
      <span className={`${s.text} font-black tracking-tight uppercase`}>
        <span className="text-foreground">TRUST</span>
        <span className="text-primary">VECTOR</span>
      </span>
    </div>
  );
}

/**
 * Hero Logo - Big bold logo for homepage hero
 */
export function HeroLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`} role="img" aria-label="TrustVector - AI Trust Directory">
      {/* Shield icon with shadow */}
      <div
        className="w-20 h-20 flex items-center justify-center bg-foreground text-background border-4 border-foreground mb-6"
        style={{ boxShadow: '6px 6px 0 0 hsl(var(--primary))' }}
      >
        <Shield className="w-10 h-10" />
      </div>

      {/* Main text */}
      <div className="text-center">
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-none">
          TRUST<span className="text-primary">VECTOR</span>
        </h1>
        <div className="mt-4 text-lg sm:text-xl text-muted-foreground uppercase tracking-widest">
          AI Trust Directory
        </div>
      </div>
    </div>
  );
}

/**
 * Badge Logo - Small badge style for headers
 */
export function BadgeLogo({ className = '' }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background border-2 border-foreground font-bold ${className}`}
      style={{ boxShadow: '3px 3px 0 0 hsl(var(--primary))' }}
      role="img"
      aria-label="TrustVector"
    >
      <Shield className="w-4 h-4" />
      <span className="text-sm uppercase tracking-wide">TrustVector</span>
    </div>
  );
}

/**
 * Tilted Logo - Playful tilted version
 */
export function TiltedLogo({ className = '' }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-5 py-3 bg-primary text-white border-2 border-foreground font-bold ${className}`}
      style={{
        boxShadow: '4px 4px 0 0 black',
        transform: 'rotate(-2deg)'
      }}
      role="img"
      aria-label="TrustVector"
    >
      <Shield className="w-5 h-5" />
      <span className="text-lg uppercase tracking-wide font-black">TrustVector</span>
    </div>
  );
}
