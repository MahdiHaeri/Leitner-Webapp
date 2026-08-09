import type { LeitnerStats } from '@/types/leitner'

/**
 * Mock data — matches the exact shape the API will return.
 * Delete this file and update use-leitner.ts when the backend is ready.
 *
 * Box intervals: 1 → 2 → 4 → 7 → 14 days
 */
export const MOCK_LEITNER_STATS: LeitnerStats = {
  streak: 7,
  reviewsCompletedToday: 5,
  boxes: [
    {
      id: 1,
      totalCards: 47,
      dueCount: 12,
      intervalDays: 1,
      nextReviewAt: new Date().toISOString(), // always today
    },
    {
      id: 2,
      totalCards: 38,
      dueCount: 8,
      intervalDays: 2,
      nextReviewAt: new Date().toISOString(), // also due today
    },
    {
      id: 3,
      totalCards: 29,
      dueCount: 3,
      intervalDays: 4,
      nextReviewAt: new Date().toISOString(),
    },
    {
      id: 4,
      totalCards: 22,
      dueCount: 0,
      intervalDays: 7,
      nextReviewAt: new Date(Date.now() + 3 * 86_400_000).toISOString(),
    },
    {
      id: 5,
      totalCards: 64,
      dueCount: 0,
      intervalDays: 14,
      nextReviewAt: new Date(Date.now() + 9 * 86_400_000).toISOString(),
    },
  ],
}
