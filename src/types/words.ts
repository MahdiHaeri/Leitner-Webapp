import type { BoxId } from './leitner'

export type CategoryId = string

export interface Category {
  id: CategoryId
  name: string
  icon: string // Emoji or icon name
  description: string
  color: string // Tailwind color name for styling
}

export interface WordItem {
  id: string
  prompt: string
  answer: string
  categoryId: CategoryId
  boxId: BoxId
  nextReviewAt?: string
}

export interface WordsData {
  categories: Category[]
  words: WordItem[]
}
