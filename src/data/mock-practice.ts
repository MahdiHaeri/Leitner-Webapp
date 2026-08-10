import type { PracticeSession } from '@/types/practice'

/**
 * Mock practice session — matches the exact shape the API will return.
 * Delete this file and update use-practice.ts when the backend is ready.
 */
export const MOCK_PRACTICE_SESSION: PracticeSession = {
  boxId: 1,
  sourceLang: 'English',
  targetLang: 'French',
  words: [
    { id: 'w1', prompt: 'tea',       answer: 'thé',       phonetic: '/te/',       boxId: 1 },
    { id: 'w2', prompt: 'water',     answer: 'eau',       phonetic: '/o/',        boxId: 1 },
    { id: 'w3', prompt: 'bread',     answer: 'pain',      phonetic: '/pɛ̃/',      boxId: 1 },
    { id: 'w4', prompt: 'milk',      answer: 'lait',      phonetic: '/lɛ/',       boxId: 1 },
    { id: 'w5', prompt: 'apple',     answer: 'pomme',     phonetic: '/pɔm/',      boxId: 1 },
    { id: 'w6', prompt: 'house',     answer: 'maison',    phonetic: '/mɛzɔ̃/',    boxId: 1 },
    { id: 'w7', prompt: 'cat',       answer: 'chat',      phonetic: '/ʃa/',       boxId: 1 },
    { id: 'w8', prompt: 'dog',       answer: 'chien',     phonetic: '/ʃjɛ̃/',     boxId: 1 },
  ],
}
