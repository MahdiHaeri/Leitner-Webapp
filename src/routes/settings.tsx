import { Bell, Globe, ChevronRight, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme/theme-toggle'

const SETTING_GROUPS = [
  {
    title: 'Preferences',
    items: [
      { icon: Bell, label: 'Notifications', description: 'Daily reminders', value: 'On' },
      { icon: Globe, label: 'Language', description: 'App interface', value: 'English' },
    ],
  },
]

export function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-center">
          <Settings className="w-5 h-5 text-foreground" strokeWidth={2} />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-foreground">Settings</h1>
          <p className="text-xs text-muted-foreground font-semibold">
            Customise your experience
          </p>
        </div>
      </div>

      {/* ── Appearance (Theme) ─────────────────────────────────── */}
      {/* Shown on mobile; on desktop the sidebar already has this */}
      <div className="md:hidden">
        <h2 className="text-xs font-extrabold text-muted-foreground uppercase tracking-widest mb-2 px-1">
          Appearance
        </h2>
        <div className="bg-card rounded-2xl border border-border shadow-sm p-4 flex items-center justify-between">
          <div>
            <p className="font-extrabold text-sm text-foreground">Theme</p>
            <p className="text-[11px] font-semibold text-muted-foreground">
              Light, dark, or follow system
            </p>
          </div>
          <ThemeToggle variant="full" />
        </div>
      </div>

      {/* ── General settings ───────────────────────────────────── */}
      {SETTING_GROUPS.map((group) => (
        <div key={group.title}>
          <h2 className="text-xs font-extrabold text-muted-foreground uppercase tracking-widest mb-2 px-1">
            {group.title}
          </h2>
          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden divide-y divide-border">
            {group.items.map(({ icon: Icon, label, description, value }, idx) => (
              <button
                key={label}
                id={`setting-${label.toLowerCase().replace(/\s+/g, '-')}`}
                className={cn(
                  'w-full flex items-center gap-4 px-4 py-4',
                  'text-left transition-colors duration-150',
                  'hover:bg-primary/10 active:bg-primary/20',
                  idx === 0 && 'rounded-t-2xl',
                  idx === group.items.length - 1 && 'rounded-b-2xl',
                )}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-foreground" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-sm text-foreground">{label}</p>
                  <p className="text-[11px] font-semibold text-muted-foreground">
                    {description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-xs font-bold">{value}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* ── Account / danger zone ──────────────────────────────── */}
      <div>
        <h2 className="text-xs font-extrabold text-muted-foreground uppercase tracking-widest mb-2 px-1">
          Account
        </h2>
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <button
            id="setting-sign-out"
            className={cn(
              'w-full flex items-center gap-4 px-4 py-4 text-left',
              'transition-colors duration-150 hover:bg-destructive/10',
            )}
          >
            <p className="font-extrabold text-sm text-destructive">Sign out</p>
          </button>
        </div>
      </div>
    </div>
  )
}
