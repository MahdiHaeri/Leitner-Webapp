import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ─── Types ────────────────────────────────────────────────────────────────────

export type Theme = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

// ─── Pure utilities (no React, safe to call anywhere) ─────────────────────────

/** Resolve 'system' to the actual OS preference. */
export function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }
  return theme
}

/**
 * Apply a theme to <html>.  Removes both classes first so there's never
 * a flash of both classes simultaneously.
 */
export function applyTheme(theme: Theme): void {
  const resolved = resolveTheme(theme)
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(resolved)
}

// ─── Store ────────────────────────────────────────────────────────────────────

interface ThemeState {
  /** User's chosen preference — may be 'system'. */
  theme: Theme
  /** Derived: the actual class applied ('light' or 'dark'). */
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      resolvedTheme: 'light', // updated on mount by ThemeProvider

      setTheme(theme) {
        applyTheme(theme)
        set({ theme, resolvedTheme: resolveTheme(theme) })
      },
    }),
    {
      name: 'leitner-theme', // localStorage key
      // Only persist the user's choice, not the derived value
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
)

// ─── Convenience hook (re-export for components) ──────────────────────────────

/** Returns the current user preference and the resolved ('light'|'dark') value. */
export function useTheme() {
  const theme = useThemeStore((s) => s.theme)
  const resolvedTheme = useThemeStore((s) => s.resolvedTheme)
  const setTheme = useThemeStore((s) => s.setTheme)
  return { theme, resolvedTheme, setTheme }
}
