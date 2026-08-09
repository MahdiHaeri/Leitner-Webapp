import { useEffect } from 'react'
import {
  applyTheme,
  resolveTheme,
  useThemeStore,
} from '@/stores/use-theme-store'

interface ThemeProviderProps {
  children: React.ReactNode
}

/**
 * Mount once at the top of the component tree (inside RouterProvider so
 * Outlet exists, but as high as possible).
 *
 * Responsibilities:
 *  1. Apply the persisted theme on first render (before paint)
 *  2. Re-apply whenever the user changes preference
 *  3. When preference is 'system', watch the OS media query and follow it
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useThemeStore((s) => s.theme)
  const setTheme = useThemeStore((s) => s.setTheme)

  useEffect(() => {
    // Sync the resolved theme into the store (hydration from localStorage
    // gives us the raw `theme` but not the computed `resolvedTheme`)
    applyTheme(theme)
    useThemeStore.setState({ resolvedTheme: resolveTheme(theme) })

    if (theme !== 'system') return

    // Follow OS changes while preference is 'system'
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      applyTheme('system')
      useThemeStore.setState({ resolvedTheme: resolveTheme('system') })
    }

    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [theme, setTheme])

  return <>{children}</>
}
