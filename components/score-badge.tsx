import { interpretScore, getScoreColor } from '@/framework/schema/types';
import { cn } from '@/lib/utils';

interface ScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

// Get clean color classes for the new design
function getScoreClasses(score: number): { bg: string; text: string } {
  if (score >= 90) return { bg: 'bg-emerald-500', text: 'text-white' };
  if (score >= 75) return { bg: 'bg-sky-500', text: 'text-white' };
  if (score >= 60) return { bg: 'bg-amber-400', text: 'text-black' };
  if (score >= 40) return { bg: 'bg-orange-500', text: 'text-white' };
  return { bg: 'bg-red-500', text: 'text-white' };
}

export function ScoreBadge({ score, size = 'md', showLabel = false, className }: ScoreBadgeProps) {
  const interpretation = interpretScore(score);
  const { bg, text } = getScoreClasses(score);

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  };

  const labels = {
    exceptional: 'Exceptional',
    strong: 'Strong',
    adequate: 'Adequate',
    concerning: 'Concerning',
    poor: 'Poor',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded font-bold',
        bg,
        text,
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label={`Score: ${score} out of 100, rated as ${labels[interpretation]}`}
    >
      <span aria-hidden="true">{score}</span>
      {showLabel && (
        <>
          <span className="mx-1.5" aria-hidden="true"></span>
          <span aria-hidden="true">{labels[interpretation]}</span>
        </>
      )}
    </div>
  );
}

interface ScoreBarProps {
  score: number;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function ScoreBar({ score, label, showValue = true, className }: ScoreBarProps) {
  const { bg } = getScoreClasses(score);

  return (
    <div
      className={cn('space-y-1.5', className)}
      role="meter"
      aria-label={label ? `${label}: ${score} out of 100` : `Score: ${score} out of 100`}
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {label && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{label}</span>
          {showValue && (
            <span className="font-bold text-foreground">
              {score}
            </span>
          )}
        </div>
      )}
      <div className="h-2 bg-muted rounded-full overflow-hidden" aria-hidden="true">
        <div
          className={cn('h-full rounded-full transition-all duration-500', bg)}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

// New component: Metric bar like Loot Drop
interface MetricBarProps {
  score: number;
  max?: number;
  label?: string;
  className?: string;
}

export function MetricBar({ score, max = 5, label, className }: MetricBarProps) {
  const filled = Math.round((score / 100) * max);

  return (
    <div className={cn('', className)}>
      {label && (
        <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{label}</div>
      )}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className={`w-4 h-3 rounded-sm transition-colors ${
              i < filled ? 'bg-foreground' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
