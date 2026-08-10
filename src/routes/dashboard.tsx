import { Flame, BookOpen, Trophy, Brain } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useLeitner } from '@/hooks/use-leitner'
import { totalCards, totalDue, masteryPercent } from '@/types/leitner'
import { LeitnerBoxCard } from '@/components/leitner/leitner-box-card'
import { STAT_VARIANTS } from '@/lib/design-tokens'
import { cn } from '@/lib/utils'
import type { BoxId } from '@/types/leitner'
import type { StatStyle } from '@/lib/design-tokens'

// ─── Stat card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ElementType
  label: string
  value: string | number
  variant: StatStyle
}

function StatCard({ icon: Icon, label, value, variant }: StatCardProps) {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm p-4 flex items-center gap-3">
      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', variant.bgClass)}>
        <Icon className={cn('w-5 h-5', variant.iconClass)} strokeWidth={2.5} />
      </div>
      <div className="min-w-0">
        <p className="text-xl font-extrabold text-foreground leading-none">{value}</p>
        <p className="text-[11px] font-bold text-muted-foreground mt-0.5 truncate">{label}</p>
      </div>
    </div>
  )
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-xl bg-muted animate-pulse', className)} />
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[72px]" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-52" />
        ))}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function DashboardPage() {
  const { data, isLoading, error } = useLeitner()
  const navigate = useNavigate()

  if (isLoading) return <DashboardSkeleton />

  if (error || !data) {
    return (
      <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-center">
        <p className="font-extrabold text-destructive text-sm">
          {error ?? 'Could not load your data.'}
        </p>
      </div>
    )
  }

  const total   = totalCards(data)
  const due     = totalDue(data)
  const mastery = masteryPercent(data)

  function handleReview(boxId: BoxId) {
    navigate({ to: '/practice/$boxId', params: { boxId: String(boxId) } })
  }

  return (
    <div className="space-y-8">

      {/* ── Overview stats ──────────────────────────────────────── */}
      <section aria-label="Overview statistics">
        <h1 className="sr-only">Dashboard</h1>
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={BookOpen}
            label="Total Words"
            value={total}
            variant={STAT_VARIANTS.info}
          />
          <StatCard
            icon={Brain}
            label="Due Today"
            value={due}
            variant={due > 0 ? STAT_VARIANTS.danger : STAT_VARIANTS.info}
          />
          <StatCard
            icon={Flame}
            label="Day Streak"
            value={`${data.streak} 🔥`}
            variant={STAT_VARIANTS.warning}
          />
          <StatCard
            icon={Trophy}
            label="Mastery"
            value={`${mastery}%`}
            variant={STAT_VARIANTS.success}
          />
        </div>
      </section>

      {/* ── Leitner boxes ───────────────────────────────────────── */}
      <section aria-label="Leitner boxes">
        <div className="flex items-end justify-between mb-3">
          <div>
            <h2 className="text-base font-extrabold text-foreground">Leitner Boxes</h2>
            <p className="text-xs font-semibold text-muted-foreground mt-0.5">
              {due > 0
                ? `${due} cards ready to review across your boxes`
                : 'All caught up — come back later!'}
            </p>
          </div>
          {data.reviewsCompletedToday > 0 && (
            <span className="text-[11px] font-extrabold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              {data.reviewsCompletedToday} done today
            </span>
          )}
        </div>

        {/* Mobile: 1-col stack (1→5) | Desktop: 5-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {data.boxes.map((box) => (
            <LeitnerBoxCard
              key={box.id}
              box={box}
              totalCards={total}
              onReview={handleReview}
            />
          ))}
        </div>

        {/* ── Spaced repetition legend ──────────────────────────── */}
        <div className="mt-4 rounded-2xl border border-border bg-card/60 px-4 py-3 flex flex-wrap gap-x-4 gap-y-1">
          {data.boxes.map((box) => (
            <span key={box.id} className="text-[10px] font-bold text-muted-foreground whitespace-nowrap">
              Box {box.id} · every {box.intervalDays}d
            </span>
          ))}
          <span className="text-[10px] font-bold text-muted-foreground">
            · Leitner spaced repetition
          </span>
        </div>
      </section>

    </div>
  )
}
