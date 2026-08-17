import type { CategoryId, WordExample } from './words'

export type AddWordPhase = 'input' | 'generating' | 'review' | 'saving' | 'success' | 'error'

/**
 * Shape returned by the word-generation API (mocked for now).
 * Kept separate from `WordItem` — this is "proposed" data the user can
 * still edit/reject before it becomes a saved flashcard.
 */
export interface GeneratedWordCard {
  /** Raw text the user typed in. */
  input: string
  /** Normalized/corrected form in the language being learned, e.g. "père". */
  term: string
  /** Short gloss/translation, e.g. "father". */
  translation: string
  /** e.g. "noun", "verb", "adjective", "adverb". */
  partOfSpeech: string
  /** IPA pronunciation, e.g. "/pɛʁ/". */
  pronunciation: string
  /** One-line definition/explanation. */
  meaning: string
  /** Exactly 3 example sentences. */
  examples: WordExample[]
  /** Best-guess category for this word. */
  suggestedCategoryId: CategoryId
  /** Language of `term`, e.g. "French". */
  language: string
  /** True when this came from the generic fallback, not curated demo data. */
  isPreview?: boolean
}
