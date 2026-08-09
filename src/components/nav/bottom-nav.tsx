import { Link, useRouterState } from '@tanstack/react-router'
import { LayoutDashboard, User, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { to: '/' as const, icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/profile' as const, icon: User, label: 'Profile' },
  { to: '/settings' as const, icon: Settings, label: 'Settings' },
] as const

export function BottomNav() {
  const { location } = useRouterState()

  return (
    <nav
      className={cn(
        'md:hidden fixed bottom-0 left-0 right-0 z-50',
        'h-[4.5rem] bg-card border-t border-border',
        'flex items-stretch',
        'safe-area-inset-bottom',
      )}
    >
      {NAV_ITEMS.map(({ to, icon: Icon, label }) => {
        const isActive = location.pathname === to
        return (
          <Link
            key={to}
            to={to}
            id={`bottom-nav-${label.toLowerCase()}`}
            className={cn(
              'flex-1 flex flex-col items-center justify-center gap-1',
              'text-xs font-bold transition-all duration-200',
              'focus-visible:outline-none',
              isActive ? 'text-primary-foreground' : 'text-muted-foreground',
            )}
          >
            {/* Active pill background */}
            <div className="relative flex flex-col items-center gap-0.5">
              {/* Icon container */}
              <div
                className={cn(
                  'relative flex items-center justify-center',
                  'w-12 h-7 rounded-full transition-all duration-200',
                  isActive ? 'bg-primary' : 'bg-transparent',
                )}
              >
                <Icon
                  className={cn(
                    'w-5 h-5 transition-all duration-200',
                    isActive
                      ? 'text-primary-foreground scale-110'
                      : 'text-muted-foreground',
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>

              {/* Label */}
              <span
                className={cn(
                  'text-[10px] font-extrabold leading-none transition-all duration-200',
                  isActive ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {label}
              </span>
            </div>
          </Link>
        )
      })}
    </nav>
  )
}
