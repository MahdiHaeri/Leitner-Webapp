import type { PracticeSession } from '@/types/practice'
import { MOCK_PRACTICE_SESSION } from '@/data/mock-practice'

// ─── Return type ──────────────────────────────────────────────────────────────

export interface UsePracticeResult {
  data: PracticeSession | null
  isLoading: boolean
  error: string | null
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Data hook for practice session words.
 *
 * ─── Swapping to a real backend ──────────────────────────────────────────────
 * Replace the body below with:
 *
 *   const query = useQuery<PracticeSession>({
 *     queryKey: ['practice', boxId],
 *     queryFn: () => fetch(`/api/practice/${boxId}`).then(r => {
 *       if (!r.ok) throw new Error('Failed to load session')
 *       return r.json()
 *     }),
 *   })
 *   return {
 *     data: query.data ?? null,
 *     isLoading: query.isLoading,
 *     error: query.error?.message ?? null,
 *   }
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function usePractice(_boxId?: number): UsePracticeResult {
  return {
    data: MOCK_PRACTICE_SESSION,
    isLoading: false,
    error: null,
  }
}
