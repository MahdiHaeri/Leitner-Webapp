import { create } from 'zustand'
import type { WordsData, WordItem } from '@/types/words'
import { MOCK_WORDS_DATA } from '@/data/mock-words'

interface WordsState {
  data: WordsData
  /** Prepends a newly created word so it surfaces at the top of "My Words". */
  addWord: (word: WordItem) => void
}

export const useWordsStore = create<WordsState>((set) => ({
  data: MOCK_WORDS_DATA,
  addWord: (word) =>
    set((state) => ({
      data: { ...state.data, words: [word, ...state.data.words] },
    })),
}))
