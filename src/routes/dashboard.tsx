import { LayoutDashboard, Flame, BookOpen, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

const STAT_CARDS = [
  {
    icon: Flame,
    label: 'Day Streak',
    value: '7',
    color: 'bg-orange-100 text-orange-500',
  },
  {
    icon: BookOpen,
    label: 'Cards Today',
    value: '24',
    color: 'bg-primary/20 text-primary-foreground',
  },
  {
    icon: Trophy,
    label: 'Mastered',
    value: '142',
    color: 'bg-accent/20 text-accent',
  },
]

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* ── Welcome banner ─────────────────────────────────────── */}
      <div
        className={cn(
          'rounded-3xl p-6 bg-primary',
          'shadow-lg shadow-primary/30',
        )}
      >
        <div className="flex items-center gap-3 mb-1">
          <LayoutDashboard className="w-5 h-5 text-primary-foreground/70" />
          <p className="text-xs font-extrabold uppercase tracking-widest text-primary-foreground/70">
            Dashboard
          </p>
        </div>
        <h1 className="text-2xl font-extrabold text-primary-foreground leading-tight">
          Ready to learn today? 🎯
        </h1>
        <p className="mt-1 text-sm font-semibold text-primary-foreground/80">
          You have <span className="text-primary-foreground font-extrabold">24 cards</span> due for review.
        </p>
      </div>

      {/* ── Stat cards ─────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3">
        {STAT_CARDS.map(({ icon: Icon, label, value, color }) => (
          <div
            key={label}
            className="bg-card rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm border border-border"
          >
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', color)}>
              <Icon className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <p className="text-xl font-extrabold text-foreground">{value}</p>
            <p className="text-[10px] font-bold text-muted-foreground text-center leading-tight">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* ── Decks section ──────────────────────────────────────── */}
      <div>
        <h2 className="text-base font-extrabold text-foreground mb-3 px-1">
          Your Decks
        </h2>
        <div className="space-y-3">
          {[
            { name: 'Spanish Vocabulary', cards: 340, due: 18, progress: 68 },
            { name: 'German Grammar', cards: 120, due: 6, progress: 42 },
            { name: 'Japanese Kanji', cards: 560, due: 0, progress: 21 },
          ].map((deck) => (
            <div
              key={deck.name}
              className="bg-card rounded-2xl p-4 border border-border shadow-sm flex items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-extrabold text-sm text-foreground truncate">
                    {deck.name}
                  </p>
                  {deck.due > 0 && (
                    <span className="ml-2 flex-shrink-0 bg-primary text-primary-foreground text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      {deck.due} due
                    </span>
                  )}
                </div>
                {/* Progress bar */}
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${deck.progress}%` }}
                  />
                </div>
                <p className="mt-1 text-[10px] font-bold text-muted-foreground">
                  {deck.cards} cards · {deck.progress}% mastered
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
