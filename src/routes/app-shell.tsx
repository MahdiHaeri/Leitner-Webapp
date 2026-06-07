import { Link, Outlet } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { useUiStore } from '@/stores/use-ui-store'

export function AppShell() {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen)
  const toggleSidebar = useUiStore((state) => state.toggleSidebar)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/70 bg-background/80 backdrop-blur">
        <div className="container flex items-center justify-between gap-4 py-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              leitner-webapp
            </p>
            <h1 className="text-xl font-semibold tracking-tight">
              Frontend foundation
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={toggleSidebar}>
              {sidebarOpen ? 'Hide' : 'Show'} sidebar
            </Button>
            <Button asChild>
              <Link to="/">Home</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container grid gap-6 py-8 lg:grid-cols-[240px_1fr]">
        <aside
          className={[
            'rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground transition-all',
            sidebarOpen ? 'block' : 'hidden lg:block',
          ].join(' ')}
        >
          <p className="mb-2 font-medium text-foreground">Included stack</p>
          <ul className="space-y-2">
            <li>React + TypeScript</li>
            <li>Vite + pnpm</li>
            <li>Tailwind + shadcn-ready setup</li>
            <li>TanStack Router</li>
            <li>Zustand</li>
          </ul>
        </aside>

        <section className="min-w-0">
          <Outlet />
        </section>
      </main>
    </div>
  )
}

export function HomePage() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <p className="text-sm font-medium text-muted-foreground">Ready for work</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">
          Your app scaffold is set up.
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          This starter gives you a typed routing entry point, a shared Zustand
          store, and a shadcn-compatible component layer on top of Tailwind.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          ['Routing', 'TanStack Router is wired with a root shell and home route.'],
          ['UI', 'The Button component is ready for shadcn-style composition.'],
          ['State', 'Zustand is available for shared client-side UI state.'],
          ['Styling', 'Tailwind is configured with shadcn-friendly CSS variables.'],
        ].map(([title, body]) => (
          <article key={title} className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-medium">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{body}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
