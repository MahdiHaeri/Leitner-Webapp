import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'

import { AppShell } from '@/routes/app-shell'
import { DashboardPage } from '@/routes/dashboard'
import { ProfilePage } from '@/routes/profile'
import { SettingsPage } from '@/routes/settings'
import { PracticePage } from '@/routes/practice'
import { WordsPage } from '@/routes/words'

const rootRoute = createRootRoute({
  component: AppShell,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardPage,
})

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: ProfilePage,
})

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingsPage,
})

const practiceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/practice/$boxId',
  component: PracticePage,
})

const wordsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/words',
  component: WordsPage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  wordsRoute,
  profileRoute,
  settingsRoute,
  practiceRoute,
])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
