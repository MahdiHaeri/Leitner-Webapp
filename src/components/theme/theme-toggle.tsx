import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme, type Theme } from '@/stores/use-theme-store'
import { cn } from '@/lib/utils'

// ─── Metadata ─────────────────────────────────────────────────────────────────

const CYCLE: Theme[] = ['light', 'dark', 'system']

const META: Record<Theme, { icon: React.ElementType; label: string; next: string }> = {
  light:  { icon: Sun,     label: 'Light',  next: 'Switch to Dark'   },
  dark:   { icon: Moon,    label: 'Dark',   next: 'Switch to System' },
  system: { icon: Monitor, label: 'System', next: 'Switch to Light'  },
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface ThemeToggleProps {
  /**
   * icon   — compact icon-only button, cycles on click  (mobile topbar)
   * row    — nav-item-style row: icon + label            (sidebar)
   * full   — 3-option segmented control                  (settings page)
   */
  variant?: 'icon' | 'row' | 'full'
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ThemeToggle({ variant = 'icon', className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const { icon: Icon, label, next } = META[theme]

  function handleCycle() {
    const next = CYCLE[(CYCLE.indexOf(theme) + 1) % CYCLE.length]
    setTheme(next)
  }

  // ── Row: identical visual language to nav items ────────────────────────────
  if (variant === 'row') {
    return (
      <button
        id="theme-toggle-row"
        onClick={handleCycle}
        aria-label={next}
        title={next}
        className={cn(
          'group w-full flex items-center gap-3 px-3 py-3 rounded-2xl',
          'font-bold text-sm transition-all duration-200',
          'text-muted-foreground hover:bg-primary/15 hover:text-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className,
        )}
      >
        {/* Animated icon — key forces remount → plays pop animation */}
        <Icon
          key={theme}
          className="animate-theme-icon w-6 h-6 flex-shrink-0"
          strokeWidth={2}
        />
        <span className="hidden lg:block">{label}</span>
      </button>
    )
  }

  // ── Full: 3-option segmented pill (settings page) ─────────────────────────
  if (variant === 'full') {
    return (
      <div
        role="group"
        aria-label="Theme selector"
        className={cn(
          'inline-flex items-center gap-1 p-1 rounded-2xl',
          'bg-muted border border-border',
          className,
        )}
      >
        {CYCLE.map((t) => {
          const ItemIcon = META[t].icon
          const isActive = theme === t
          return (
            <button
              key={t}
              id={`theme-${t}`}
              onClick={() => setTheme(t)}
              aria-pressed={isActive}
              aria-label={`${META[t].label} theme`}
              title={`${META[t].label} theme`}
              className={cn(
                'flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl',
                'text-xs font-extrabold transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                isActive
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <ItemIcon
                key={isActive ? 'active' : 'idle'}
                className={cn(
                  'w-3.5 h-3.5 flex-shrink-0',
                  isActive && 'animate-theme-icon',
                )}
                strokeWidth={2.5}
              />
              <span>{META[t].label}</span>
            </button>
          )
        })}
      </div>
    )
  }

  // ── Icon: compact cycling button (mobile topbar) ───────────────────────────
  return (
    <button
      id="theme-toggle"
      onClick={handleCycle}
      aria-label={next}
      title={next}
      className={cn(
        'group relative flex items-center justify-center',
        'w-9 h-9 rounded-xl',
        'bg-muted hover:bg-primary/20',
        'text-muted-foreground hover:text-foreground',
        'transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className,
      )}
    >
      <Icon
        key={theme}
        className="animate-theme-icon w-4 h-4"
        strokeWidth={2}
      />
    </button>
  )
}
