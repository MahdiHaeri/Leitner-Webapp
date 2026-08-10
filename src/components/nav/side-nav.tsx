import { Link, useRouterState } from '@tanstack/react-router'
import { Zap, User } from 'lucide-react'

import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/lib/design-tokens'
import { ThemeToggle } from '@/components/theme/theme-toggle'

export function SideNav() {
  const { location } = useRouterState()

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col',
        'fixed left-0 top-0 z-50 h-screen',
        'w-20 lg:w-60',
        'bg-card border-r border-border',
        'py-6 px-3',
        'transition-all duration-300',
      )}
    >
      {/* ── Logo ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-2 mb-8 overflow-hidden">
        <div
          className={cn(
            'flex items-center justify-center flex-shrink-0',
            'w-11 h-11 rounded-2xl bg-primary shadow-md shadow-primary/40',
          )}
        >
          <Zap className="w-6 h-6 text-primary-foreground" strokeWidth={2.5} />
        </div>
        <div className="hidden lg:block overflow-hidden">
          <p className="font-extrabold text-lg leading-tight text-foreground tracking-tight">
            Leitner
          </p>
          <p className="text-xs text-muted-foreground font-semibold">
            Flashcards
          </p>
        </div>
      </div>

      {/* ── Nav items ─────────────────────────────────────────── */}
      <nav className="flex-1 flex flex-col gap-1">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to
          return (
            <Link
              key={to}
              to={to}
              id={`nav-${label.toLowerCase()}`}
              className={cn(
                'group flex items-center gap-3 px-3 py-3 rounded-2xl',
                'font-bold text-sm transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/30'
                  : 'text-muted-foreground hover:bg-primary/15 hover:text-foreground',
              )}
            >
              <Icon
                className={cn(
                  'w-6 h-6 flex-shrink-0 transition-transform duration-200',
                  'group-hover:scale-110',
                  isActive && 'scale-110',
                )}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="hidden lg:block">{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* ── Divider ───────────────────────────────────────────── */}
      <div className="border-t border-border my-3" />

      {/* ── Theme toggle — styled identically to nav items ─────── */}
      <ThemeToggle variant="row" />

      {/* ── User avatar stub ──────────────────────────────────── */}
      <div
        className={cn(
          'flex items-center gap-3 px-3 py-2 rounded-2xl cursor-pointer',
          'text-muted-foreground hover:bg-primary/15 hover:text-foreground',
          'transition-all duration-200',
        )}
      >
        <div
          className={cn(
            'flex items-center justify-center flex-shrink-0',
            'w-9 h-9 rounded-full bg-accent/20 border-2 border-accent',
          )}
        >
          <User className="w-4 h-4 text-accent" strokeWidth={2.5} />
        </div>
        <div className="hidden lg:block">
          <p className="text-sm font-bold text-foreground leading-tight">You</p>
          <p className="text-xs text-muted-foreground">Free plan</p>
        </div>
      </div>
    </aside>
  )
}
