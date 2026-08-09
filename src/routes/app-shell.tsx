import { Outlet } from '@tanstack/react-router'
import { Zap } from 'lucide-react'

import { SideNav } from '@/components/nav/side-nav'
import { BottomNav } from '@/components/nav/bottom-nav'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { ThemeToggle } from '@/components/theme/theme-toggle'

export function AppShell() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        {/* ── Desktop sidebar (md+) ───────────────────────────── */}
        <SideNav />

        {/* ── Mobile top bar (< md) ───────────────────────────── */}
        <header
          className="
            md:hidden
            sticky top-0 z-40
            h-14 px-4
            flex items-center justify-between
            bg-background/90 backdrop-blur-sm
            border-b border-border
          "
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-sm shadow-primary/40">
              <Zap className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-extrabold text-base text-foreground tracking-tight">
              Leitner
            </span>
          </div>

          {/* Theme toggle */}
          <ThemeToggle />
        </header>

        {/* ── Page content ────────────────────────────────────── */}
        {/*   ml offsets match the sidebar widths                 */}
        {/*   pb-[4.5rem] on mobile = room for the bottom nav     */}
        <main
          className="
            pb-[4.5rem]
            md:pb-0
            md:ml-20
            lg:ml-60
            min-h-screen
          "
        >
          {/* Inner scroll region with comfortable max-width */}
          <div className="mx-auto max-w-2xl px-4 py-6 md:px-6 md:py-8">
            <Outlet />
          </div>
        </main>

        {/* ── Mobile bottom nav (< md) ────────────────────────── */}
        <BottomNav />
      </div>
    </ThemeProvider>
  )
}
