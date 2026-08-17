import { useState, useMemo } from 'react'
import type { WordsData, CategoryId } from '@/types/words'
import { useWordsStore } from '@/stores/use-words-store'

export interface UseWordsResult {
  data: WordsData | null
  isLoading: boolean
  error: string | null
  
  // Filtering state
  searchQuery: string
  setSearchQuery: (q: string) => void
  selectedCategory: CategoryId | null
  setSelectedCategory: (c: CategoryId | null) => void
  
  // Computed
  filteredWords: WordsData['words']
}

export function useWords(): UseWordsResult {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null)
  
  // In a real app, this would be a react-query hook
  const data = useWordsStore((s) => s.data)
  const isLoading = false
  const error = null

  const filteredWords = useMemo(() => {
    if (!data) return []
    
    return data.words.filter(word => {
      // 1. Category filter
      if (selectedCategory && word.categoryId !== selectedCategory) {
        return false
      }
      
      // 2. Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        return word.prompt.toLowerCase().includes(q) || word.answer.toLowerCase().includes(q)
      }
      
      return true
    })
  }, [data, selectedCategory, searchQuery])

  return {
    data,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredWords
  }
}
