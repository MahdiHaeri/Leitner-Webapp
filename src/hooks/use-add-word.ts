import { useCallback, useRef, useState } from 'react'
import type { AddWordPhase, GeneratedWordCard } from '@/types/add-word'
import type { WordItem } from '@/types/words'
import { generateWordCard } from '@/data/mock-word-generator'
import { useWordsStore } from '@/stores/use-words-store'

export interface UseAddWordResult {
  phase: AddWordPhase
  card: GeneratedWordCard | null
  savedWord: WordItem | null
  errorMessage: string | null
  /** The word currently being generated — set while `phase === 'generating'`. */
  pendingInput: string

  updateCardField: (field: 'term' | 'translation', value: string) => void
  generate: (rawInput: string) => Promise<void>
  regenerate: () => void
  confirmSave: () => Promise<void>
  reset: () => void
}

export function useAddWord(): UseAddWordResult {
  const [phase, setPhase] = useState<AddWordPhase>('input')
  const [card, setCard] = useState<GeneratedWordCard | null>(null)
  const [savedWord, setSavedWord] = useState<WordItem | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [pendingInput, setPendingInput] = useState('')
  const addWordToStore = useWordsStore((s) => s.addWord)

  // Guards against a stale generate() response clobbering a newer one.
  const requestIdRef = useRef(0)

  const generate = useCallback(async (rawInput: string) => {
    const requestId = ++requestIdRef.current
    setPendingInput(rawInput)
    setPhase('generating')
    setErrorMessage(null)

    try {
      const result = await generateWordCard(rawInput)
      if (requestId !== requestIdRef.current) return
      setCard(result)
      setPhase('review')
    } catch (err) {
      if (requestId !== requestIdRef.current) return
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setPhase('error')
    }
  }, [])

  const regenerate = useCallback(() => {
    if (card) generate(card.input)
  }, [card, generate])

  const updateCardField = useCallback((field: 'term' | 'translation', value: string) => {
    setCard((prev) => (prev ? { ...prev, [field]: value } : prev))
  }, [])

  const confirmSave = useCallback(async () => {
    if (!card) return
    setPhase('saving')

    const word: WordItem = {
      id: `w-${Date.now()}`,
      prompt: card.translation,
      answer: card.term,
      // Auto-categorized — the backend will assign this for real later.
      categoryId: card.suggestedCategoryId,
      boxId: 1,
      pronunciation: card.pronunciation,
      partOfSpeech: card.partOfSpeech,
      meaning: card.meaning,
      examples: card.examples,
      language: card.language,
    }

    // Brief pause so "Adding..." is perceptible rather than an instant flash.
    await new Promise((resolve) => setTimeout(resolve, 450))

    addWordToStore(word)
    setSavedWord(word)
    setPhase('success')
  }, [card, addWordToStore])

  const reset = useCallback(() => {
    requestIdRef.current++
    setPhase('input')
    setCard(null)
    setSavedWord(null)
    setErrorMessage(null)
    setPendingInput('')
  }, [])

  return {
    phase,
    card,
    savedWord,
    errorMessage,
    pendingInput,
    updateCardField,
    generate,
    regenerate,
    confirmSave,
    reset,
  }
}
