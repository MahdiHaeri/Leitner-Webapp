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

const routeTree = rootRoute.addChildren([
  indexRoute,
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
