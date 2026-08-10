/**
 * ─── Design Tokens ────────────────────────────────────────────────────────────
 *
 * Single source of truth for all semantic style mappings in the app.
 *
 * Rules:
 *  1. Every color used in the app MUST reference a CSS variable via Tailwind
 *     (`bg-box-1`, `text-stat-info`, `bg-primary`) — never raw hex or `bg-rose-500`.
 *  2. When you need to change a color, change the CSS variable in index.css.
 *     When you need to change a class bundle (e.g. button style), change it here.
 *  3. Components import from this file — they NEVER define their own color mappings.
 *
 * ⚠️  IMPORTANT: Tailwind JIT scans source files for complete class strings.
 *     All classes below MUST be written as full, static strings — never
 *     dynamically constructed via template literals (e.g. `bg-${color}`).
 *
 * ───────────────────────────────────────────────────────────────────────────────
 */

import { LayoutDashboard, User, Settings, LibraryBig } from 'lucide-react'
import type { BoxId } from '@/types/leitner'

// ─── Navigation Items ─────────────────────────────────────────────────────────
// Shared by SideNav and BottomNav — change once, reflected everywhere.

export const NAV_ITEMS = [
  { to: '/' as const, icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/words' as const, icon: LibraryBig, label: 'Words' },
  { to: '/profile' as const, icon: User, label: 'Profile' },
  { to: '/settings' as const, icon: Settings, label: 'Settings' },
] as const

// ─── Box Configuration ────────────────────────────────────────────────────────

export interface BoxStyle {
  /** Accent strip / solid background */
  accent: string
  /** Soft tinted background (10-15% opacity) */
  softBg: string
  /** Text color */
  text: string
  /** Badge: soft bg + text */
  badge: string
  /** Progress bar fill */
  bar: string
  /** CTA button: bg + hover + active + text + shadow */
  button: string
  /** Card border color */
  border: string
  /** Human-readable name */
  name: string
  /** Short description */
  description: string
}

/**
 * Each box's style is defined with full static class strings so Tailwind JIT
 * can detect them at build time. All color classes reference CSS variables
 * (box-1…box-5) defined in index.css — change the color once there, it
 * updates everywhere.
 */
export const BOX_CONFIG: Record<BoxId, BoxStyle> = {
  1: {
    accent:      'bg-box-1',
    softBg:      'bg-box-1/10',
    text:        'text-box-1',
    badge:       'bg-box-1/15 text-box-1',
    bar:         'bg-box-1',
    button:      'bg-box-1 hover:opacity-90 active:scale-[0.97] text-white shadow-sm shadow-box-1/30',
    border:      'border-box-1/20',
    name:        'Daily',
    description: 'Review every day',
  },
  2: {
    accent:      'bg-box-2',
    softBg:      'bg-box-2/10',
    text:        'text-box-2',
    badge:       'bg-box-2/15 text-box-2',
    bar:         'bg-box-2',
    button:      'bg-box-2 hover:opacity-90 active:scale-[0.97] text-white shadow-sm shadow-box-2/30',
    border:      'border-box-2/20',
    name:        'Every 2 Days',
    description: 'Recall building',
  },
  3: {
    accent:      'bg-box-3',
    softBg:      'bg-box-3/10',
    text:        'text-box-3',
    badge:       'bg-box-3/15 text-box-3',
    bar:         'bg-box-3',
    button:      'bg-box-3 hover:opacity-90 active:scale-[0.97] text-white shadow-sm shadow-box-3/30',
    border:      'border-box-3/20',
    name:        'Every 4 Days',
    description: 'Short-term memory',
  },
  4: {
    accent:      'bg-box-4',
    softBg:      'bg-box-4/10',
    text:        'text-box-4',
    badge:       'bg-box-4/15 text-box-4',
    bar:         'bg-box-4',
    button:      'bg-box-4 hover:opacity-90 active:scale-[0.97] text-white shadow-sm shadow-box-4/30',
    border:      'border-box-4/20',
    name:        'Weekly',
    description: 'Long-term recall',
  },
  5: {
    accent:      'bg-box-5',
    softBg:      'bg-box-5/10',
    text:        'text-box-5',
    badge:       'bg-box-5/15 text-box-5',
    bar:         'bg-box-5',
    button:      'bg-box-5 hover:opacity-90 active:scale-[0.97] text-primary-foreground shadow-sm shadow-box-5/30',
    border:      'border-box-5/20',
    name:        'Mastered',
    description: 'Every 2 weeks',
  },
}

// ─── Stat Card Variants ───────────────────────────────────────────────────────

export interface StatStyle {
  iconClass: string
  bgClass: string
}

export const STAT_VARIANTS = {
  info:    { iconClass: 'text-stat-info',    bgClass: 'bg-stat-info/10' },
  danger:  { iconClass: 'text-stat-danger',  bgClass: 'bg-stat-danger/10' },
  warning: { iconClass: 'text-stat-warning', bgClass: 'bg-stat-warning/10' },
  success: { iconClass: 'text-stat-success', bgClass: 'bg-stat-success/10' },
} as const satisfies Record<string, StatStyle>
