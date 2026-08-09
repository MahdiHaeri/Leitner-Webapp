import { Flame, BookOpen, Trophy, Brain } from 'lucide-react'
import { useLeitner } from '@/hooks/use-leitner'
import { totalCards, totalDue, masteryPercent } from '@/types/leitner'
import { LeitnerBoxCard } from '@/components/leitner/leitner-box-card'
import { cn } from '@/lib/utils'
import type { BoxId } from '@/types/leitner'

// ─── Stat card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ElementType
  label: string
  value: string | number
  iconClass: string
  bgClass: string
}

function StatCard({ icon: Icon, label, value, iconClass, bgClass }: StatCardProps) {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm p-4 flex items-center gap-3">
      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', bgClass)}>
        <Icon className={cn('w-5 h-5', iconClass)} strokeWidth={2.5} />
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
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
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

  // ── Derived stats ──────────────────────────────────────────────────────────
  const total   = totalCards(data)
  const due     = totalDue(data)
  const mastery = masteryPercent(data)

  // ── Review handler (wire to router when the review flow is built) ──────────
  function handleReview(boxId: BoxId) {
    // TODO: navigate to /review/:boxId once the review page exists
    // navigate({ to: '/review/$boxId', params: { boxId: String(boxId) } })
    console.info(`Start review for Box ${boxId}`)
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
            iconClass="text-sky-600 dark:text-sky-400"
            bgClass="bg-sky-500/10 dark:bg-sky-500/15"
          />
          <StatCard
            icon={Brain}
            label="Due Today"
            value={due}
            iconClass={due > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-primary'}
            bgClass={due > 0 ? 'bg-rose-500/10 dark:bg-rose-500/15' : 'bg-primary/10 dark:bg-primary/15'}
          />
          <StatCard
            icon={Flame}
            label="Day Streak"
            value={`${data.streak} 🔥`}
            iconClass="text-orange-600 dark:text-orange-400"
            bgClass="bg-orange-500/10 dark:bg-orange-500/15"
          />
          <StatCard
            icon={Trophy}
            label="Mastery"
            value={`${mastery}%`}
            iconClass="text-violet-600 dark:text-violet-400"
            bgClass="bg-violet-500/10 dark:bg-violet-500/15"
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

        {/* Mobile: 1-col stack (1→2→3→4→5) | Desktop: 5-col grid */}
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
