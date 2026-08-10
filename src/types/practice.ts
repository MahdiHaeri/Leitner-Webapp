/**
 * ─── Practice Session Types ───────────────────────────────────────────────────
 *
 * Types for the word practice / review flow.
 * Keep in sync with backend API response shape.
 * When connecting to the backend, only the hook needs to change.
 */

import type { BoxId } from './leitner'

/** A single word card in a practice session. */
export interface PracticeWord {
  id: string
  /** The word shown to the user (in the language they know). */
  prompt: string
  /** The correct answer (in the language they're learning). */
  answer: string
  /** Optional phonetic transcription of the answer. */
  phonetic?: string
  /** Which box this word currently sits in. */
  boxId: BoxId
}

/** The state of a single practice attempt. */
export type PracticeAttemptState =
  | 'idle'        // Waiting for user to start speaking
  | 'listening'   // Microphone is active
  | 'processing'  // Evaluating the answer
  | 'correct'     // User answered correctly
  | 'incorrect'   // User answered incorrectly
  | 'skipped'     // User chose "show answer"

/** A full practice session. */
export interface PracticeSession {
  /** Which box the session is reviewing. */
  boxId: BoxId
  /** Source language (the language the user knows). */
  sourceLang: string
  /** Target language (the language the user is learning). */
  targetLang: string
  /** Ordered list of words to practice. */
  words: PracticeWord[]
}
