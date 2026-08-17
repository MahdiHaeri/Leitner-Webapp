import type { BoxId } from './leitner'

export type CategoryId = string

export interface Category {
  id: CategoryId
  name: string
  icon: string // Emoji or icon name
  description: string
  color: string // Tailwind color name for styling
}

export interface WordExample {
  /** Example sentence in the language being learned. */
  sentence: string
  /** Translation of the example sentence. */
  translation: string
}

export interface WordItem {
  id: string
  prompt: string
  answer: string
  categoryId: CategoryId
  boxId: BoxId
  nextReviewAt?: string
  // ── Rich metadata — only present on AI-generated cards ──────────────────
  /** IPA pronunciation of `answer`, e.g. "/pɛʁ/". */
  pronunciation?: string
  /** e.g. "noun", "verb", "adjective". */
  partOfSpeech?: string
  /** Short definition/explanation of `answer`. */
  meaning?: string
  /** Exactly 3 example sentences, generated alongside the card. */
  examples?: WordExample[]
  /** Language of `answer`, e.g. "French". */
  language?: string
}

export interface WordsData {
  categories: Category[]
  words: WordItem[]
}
