import type { LeitnerBox, BoxId } from '@/types/leitner'
import { BOX_CONFIG } from '@/lib/design-tokens'
import { cn } from '@/lib/utils'
import { Clock, ArrowRight, CheckCircle2 } from 'lucide-react'

// ─── Next-review label ────────────────────────────────────────────────────────

function getNextReviewLabel(box: LeitnerBox): string {
  if (box.dueCount > 0) return 'Due now'
  if (!box.nextReviewAt) return 'Daily'
  const diff = Math.ceil(
    (new Date(box.nextReviewAt).getTime() - Date.now()) / 86_400_000,
  )
  if (diff <= 0) return 'Due now'
  if (diff === 1) return 'Tomorrow'
  return `In ${diff} days`
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface LeitnerBoxCardProps {
  box: LeitnerBox
  totalCards: number
  onReview: (boxId: BoxId) => void
}

// ─── Component ────────────────────────────────────────────────────────────────

export function LeitnerBoxCard({ box, totalCards, onReview }: LeitnerBoxCardProps) {
  const style = BOX_CONFIG[box.id]
  const fillPercent = totalCards > 0 ? (box.totalCards / totalCards) * 100 : 0
  const nextLabel = getNextReviewLabel(box)
  const hasDue = box.dueCount > 0

  return (
    <div
      className={cn(
        'relative flex overflow-hidden rounded-2xl bg-card border shadow-sm',
        style.border,
        hasDue && 'shadow-md',
        'flex-row md:flex-col',
        'transition-all duration-200',
      )}
    >
      {/* ── Accent: left strip on mobile, top strip on desktop ── */}
      <div
        className={cn(
          style.accent,
          'w-1 flex-shrink-0 md:w-full md:h-1',
          'md:self-auto self-stretch',
        )}
      />

      {/* ── Card body ─────────────────────────────────────────── */}
      <div
        className={cn(
          'flex flex-1 min-w-0',
          'flex-row md:flex-col',
          'p-3 md:p-4',
          'gap-3',
        )}
      >

        {/* ── LEFT / TOP section: identity + count ──────────────── */}
        <div className="flex flex-col justify-center gap-1.5 min-w-0 flex-1 md:flex-none">
          {/* Box badge */}
          <div className={cn('flex items-center gap-1.5 w-fit px-2 py-0.5 rounded-full', style.softBg)}>
            <span className={cn('text-[10px] font-extrabold uppercase tracking-widest leading-none', style.text)}>
              Box {box.id}
            </span>
          </div>

          {/* Count + name */}
          <div>
            <p className="text-2xl md:text-3xl font-extrabold text-foreground leading-none">
              {box.totalCards}
            </p>
            <p className="text-xs font-bold text-muted-foreground mt-0.5">
              {style.name}
            </p>
          </div>

          {/* Progress bar — shown inline on mobile */}
          <div className="md:hidden">
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all duration-500', style.bar)}
                style={{ width: `${fillPercent.toFixed(1)}%` }}
              />
            </div>
            <p className="mt-0.5 text-[10px] font-bold text-muted-foreground">
              {fillPercent.toFixed(0)}% of total
            </p>
          </div>
        </div>

        {/* ── RIGHT / BOTTOM section: status + action ───────────── */}
        <div
          className={cn(
            'flex flex-col gap-2',
            'justify-center items-end md:items-stretch',
            'md:justify-start',
            'flex-shrink-0 md:flex-shrink',
          )}
        >
          {/* Due badge */}
          {hasDue ? (
            <span
              className={cn(
                'text-[10px] font-extrabold px-2 py-1 rounded-full',
                'flex items-center gap-1 w-fit',
                style.badge,
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {box.dueCount} due
            </span>
          ) : (
            <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              All done
            </span>
          )}

          {/* Progress bar — desktop only */}
          <div className="hidden md:block">
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all duration-500', style.bar)}
                style={{ width: `${fillPercent.toFixed(1)}%` }}
              />
            </div>
            <p className="mt-1 text-[10px] font-bold text-muted-foreground">
              {fillPercent.toFixed(0)}% of total
            </p>
          </div>

          {/* Interval */}
          <div className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground">
            <Clock className="w-3 h-3 flex-shrink-0" />
            <span className="whitespace-nowrap">{nextLabel} · {box.intervalDays}d</span>
          </div>

          {/* CTA */}
          <button
            id={`review-box-${box.id}`}
            disabled={!hasDue}
            onClick={() => onReview(box.id)}
            className={cn(
              'flex items-center justify-center gap-1',
              'px-3 py-1.5 rounded-xl',
              'md:w-full md:py-2',
              'text-xs font-extrabold whitespace-nowrap',
              'transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              hasDue
                ? style.button
                : 'bg-muted text-muted-foreground cursor-not-allowed',
            )}
          >
            {hasDue ? (
              <>
                Review
                <ArrowRight className="w-3 h-3" />
              </>
            ) : '—'}
          </button>
        </div>
      </div>
    </div>
  )
}
