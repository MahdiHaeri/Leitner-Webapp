import { User, Star, BookOpen, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

const ACHIEVEMENTS = [
  { icon: Star, label: '7-Day Streak', earned: true },
  { icon: BookOpen, label: '100 Cards Reviewed', earned: true },
  { icon: Calendar, label: '30-Day Member', earned: false },
]

export function ProfilePage() {
  return (
    <div className="space-y-6">
      {/* ── Profile header ─────────────────────────────────────── */}
      <div className="bg-card rounded-3xl p-6 border border-border shadow-sm text-center">
        <div
          className={cn(
            'mx-auto w-20 h-20 rounded-full flex items-center justify-center',
            'bg-accent/20 border-4 border-accent mb-4',
          )}
        >
          <User className="w-9 h-9 text-accent" strokeWidth={2} />
        </div>
        <h1 className="text-xl font-extrabold text-foreground">Your Name</h1>
        <p className="text-sm text-muted-foreground font-semibold mt-0.5">
          Joined August 2026
        </p>

        {/* Stats row */}
        <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-5">
          {[
            { label: 'Streak', value: '7 🔥' },
            { label: 'Cards', value: '142' },
            { label: 'Decks', value: '3' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xl font-extrabold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground font-bold">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Achievements ───────────────────────────────────────── */}
      <div>
        <h2 className="text-base font-extrabold text-foreground mb-3 px-1">
          Achievements
        </h2>
        <div className="space-y-3">
          {ACHIEVEMENTS.map(({ icon: Icon, label, earned }) => (
            <div
              key={label}
              className={cn(
                'flex items-center gap-4 p-4 rounded-2xl border shadow-sm',
                earned
                  ? 'bg-card border-border'
                  : 'bg-muted/40 border-border/50 opacity-60',
              )}
            >
              <div
                className={cn(
                  'w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0',
                  earned ? 'bg-primary shadow-sm shadow-primary/30' : 'bg-muted',
                )}
              >
                <Icon
                  className={cn(
                    'w-5 h-5',
                    earned ? 'text-primary-foreground' : 'text-muted-foreground',
                  )}
                  strokeWidth={2.5}
                />
              </div>
              <div>
                <p className="font-extrabold text-sm text-foreground">{label}</p>
                <p className="text-[10px] font-bold text-muted-foreground">
                  {earned ? 'Earned ✓' : 'Not yet unlocked'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
