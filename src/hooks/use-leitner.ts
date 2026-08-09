import type { LeitnerStats } from '@/types/leitner'
import { MOCK_LEITNER_STATS } from '@/data/mock-leitner'

// ─── Return type ──────────────────────────────────────────────────────────────

export interface UseLeitnerResult {
  data: LeitnerStats | null
  isLoading: boolean
  error: string | null
  /** Call to manually refresh data (no-op in mock mode). */
  refetch: () => void
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Data hook for Leitner box statistics.
 *
 * ─── Swapping to a real backend ──────────────────────────────────────────────
 * 1. Install @tanstack/react-query
 * 2. Wrap <App> in <QueryClientProvider>
 * 3. Replace the body below with:
 *
 *   const query = useQuery<LeitnerStats>({
 *     queryKey: ['leitner', 'stats'],
 *     queryFn: () => fetch('/api/leitner/stats').then(r => {
 *       if (!r.ok) throw new Error('Failed to load stats')
 *       return r.json()
 *     }),
 *   })
 *   return {
 *     data: query.data ?? null,
 *     isLoading: query.isLoading,
 *     error: query.error?.message ?? null,
 *     refetch: query.refetch,
 *   }
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function useLeitner(): UseLeitnerResult {
  return {
    data: MOCK_LEITNER_STATS,
    isLoading: false,
    error: null,
    refetch: () => {},
  }
}
