import type { LeitnerBox, BoxId } from '@/types/leitner'
import { cn } from '@/lib/utils'
import { Clock, ArrowRight, CheckCircle2 } from 'lucide-react'

// ─── Per-box visual theme ──────────────────────────────────────────────────────

const BOX_THEME = {
  1: {
    accent:      'bg-rose-500',
    accentLeft:  'bg-rose-500',
    softBg:      'bg-rose-500/10 dark:bg-rose-500/15',
    text:        'text-rose-600 dark:text-rose-400',
    badge:       'bg-rose-500/15 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400',
    bar:         'bg-rose-500',
    button:      'bg-rose-500 hover:bg-rose-600 active:scale-[0.97] text-white shadow-sm shadow-rose-500/30',
    borderColor: 'border-rose-200 dark:border-rose-500/20',
    name:        'Daily',
    description: 'Review every day',
  },
  2: {
    accent:      'bg-amber-500',
    accentLeft:  'bg-amber-500',
    softBg:      'bg-amber-500/10 dark:bg-amber-500/15',
    text:        'text-amber-600 dark:text-amber-400',
    badge:       'bg-amber-500/15 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
    bar:         'bg-amber-500',
    button:      'bg-amber-500 hover:bg-amber-600 active:scale-[0.97] text-white shadow-sm shadow-amber-500/30',
    borderColor: 'border-amber-200 dark:border-amber-500/20',
    name:        'Every 2 Days',
    description: 'Recall building',
  },
  3: {
    accent:      'bg-sky-500',
    accentLeft:  'bg-sky-500',
    softBg:      'bg-sky-500/10 dark:bg-sky-500/15',
    text:        'text-sky-600 dark:text-sky-400',
    badge:       'bg-sky-500/15 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400',
    bar:         'bg-sky-500',
    button:      'bg-sky-500 hover:bg-sky-600 active:scale-[0.97] text-white shadow-sm shadow-sky-500/30',
    borderColor: 'border-sky-200 dark:border-sky-500/20',
    name:        'Every 4 Days',
    description: 'Short-term memory',
  },
  4: {
    accent:      'bg-violet-500',
    accentLeft:  'bg-violet-500',
    softBg:      'bg-violet-500/10 dark:bg-violet-500/15',
    text:        'text-violet-600 dark:text-violet-400',
    badge:       'bg-violet-500/15 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400',
    bar:         'bg-violet-500',
    button:      'bg-violet-500 hover:bg-violet-600 active:scale-[0.97] text-white shadow-sm shadow-violet-500/30',
    borderColor: 'border-violet-200 dark:border-violet-500/20',
    name:        'Weekly',
    description: 'Long-term recall',
  },
  5: {
    accent:      'bg-primary',
    accentLeft:  'bg-primary',
    softBg:      'bg-primary/10 dark:bg-primary/15',
    text:        'text-primary',
    badge:       'bg-primary/15 text-primary dark:bg-primary/20',
    bar:         'bg-primary',
    button:      'bg-primary hover:bg-primary/90 active:scale-[0.97] text-primary-foreground shadow-sm shadow-primary/30',
    borderColor: 'border-primary/20 dark:border-primary/20',
    name:        'Mastered',
    description: 'Every 2 weeks',
  },
} satisfies Record<BoxId, {
  accent: string; accentLeft: string; softBg: string; text: string
  badge: string; bar: string; button: string; borderColor: string
  name: string; description: string
}>

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
  const theme = BOX_THEME[box.id]
  const fillPercent = totalCards > 0 ? (box.totalCards / totalCards) * 100 : 0
  const nextLabel = getNextReviewLabel(box)
  const hasDue = box.dueCount > 0

  return (
    <div
      className={cn(
        'relative flex overflow-hidden rounded-2xl bg-card border shadow-sm',
        theme.borderColor,
        hasDue && 'shadow-md',
        // Mobile: horizontal row  |  Desktop: vertical column
        'flex-row md:flex-col',
        'transition-all duration-200',
      )}
    >
      {/* ── Accent: left strip on mobile, top strip on desktop ── */}
      <div
        className={cn(
          theme.accent,
          // Mobile: narrow vertical bar on left
          'w-1 flex-shrink-0 md:w-full md:h-1',
          'md:self-auto self-stretch',
        )}
      />

      {/* ── Card body ─────────────────────────────────────────── */}
      <div
        className={cn(
          'flex flex-1 min-w-0',
          // Mobile: row layout — left info | right action
          'flex-row md:flex-col',
          'p-3 md:p-4',
          'gap-3',
        )}
      >

        {/* ── LEFT / TOP section: identity + count ──────────────── */}
        <div className="flex flex-col justify-center gap-1.5 min-w-0 flex-1 md:flex-none">
          {/* Box badge */}
          <div className={cn('flex items-center gap-1.5 w-fit px-2 py-0.5 rounded-full', theme.softBg)}>
            <span className={cn('text-[10px] font-extrabold uppercase tracking-widest leading-none', theme.text)}>
              Box {box.id}
            </span>
          </div>

          {/* Count + name */}
          <div>
            <p className="text-2xl md:text-3xl font-extrabold text-foreground leading-none">
              {box.totalCards}
            </p>
            <p className="text-xs font-bold text-muted-foreground mt-0.5">
              {theme.name}
            </p>
          </div>

          {/* Progress bar — shown inline on mobile */}
          <div className="md:hidden">
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all duration-500', theme.bar)}
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
            // Mobile: right column, vertically centered
            'justify-center items-end md:items-stretch',
            // Desktop: below the left section
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
                theme.badge,
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

          {/* Progress bar — desktop only (shown in left section on mobile) */}
          <div className="hidden md:block">
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all duration-500', theme.bar)}
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
              // Mobile: compact pill
              'px-3 py-1.5 rounded-xl',
              // Desktop: full width
              'md:w-full md:py-2',
              'text-xs font-extrabold whitespace-nowrap',
              'transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              hasDue
                ? theme.button
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
