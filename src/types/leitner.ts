// ─── Leitner system domain types ────────────────────────────────────────────
// Keep these in sync with the backend API response shape.
// When you add the API, only the hook (use-leitner.ts) needs to change.

export type BoxId = 1 | 2 | 3 | 4 | 5

/** Stats for a single Leitner box. */
export interface LeitnerBox {
  /** Box number — 1 (hardest/most frequent) → 5 (mastered/least frequent). */
  id: BoxId
  /** Total cards currently sitting in this box. */
  totalCards: number
  /** Cards due for review today (≥ 0). */
  dueCount: number
  /** Repetition interval in days (1, 2, 4, 7, 14). */
  intervalDays: number
  /** ISO date string of when the next review batch is due. Null for box 1 (always today). */
  nextReviewAt: string | null
}

/** Top-level stats object returned by the API / mock. */
export interface LeitnerStats {
  /** Current learning streak in days. */
  streak: number
  /** Total reviews completed today across all boxes. */
  reviewsCompletedToday: number
  /** Ordered box data [Box1, Box2, Box3, Box4, Box5]. */
  boxes: [LeitnerBox, LeitnerBox, LeitnerBox, LeitnerBox, LeitnerBox]
}

// ─── Derived helpers (no import needed in components) ────────────────────────

export function totalCards(stats: LeitnerStats): number {
  return stats.boxes.reduce((sum, b) => sum + b.totalCards, 0)
}

export function totalDue(stats: LeitnerStats): number {
  return stats.boxes.reduce((sum, b) => sum + b.dueCount, 0)
}

export function masteryPercent(stats: LeitnerStats): number {
  const total = totalCards(stats)
  if (total === 0) return 0
  return Math.round((stats.boxes[4].totalCards / total) * 100)
}
