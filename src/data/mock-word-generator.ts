import type { GeneratedWordCard } from '@/types/add-word'

/**
 * Stands in for the real "enrich this word" API.
 *
 * ─── Swapping to a real backend ────────────────────────────────────────────
 * Replace the body of `generateWordCard` with a fetch to your endpoint:
 *
 *   const res = await fetch('/api/words/generate', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ word: rawInput }),
 *   })
 *   if (!res.ok) throw new Error('Could not generate a flashcard for this word.')
 *   return res.json()
 * ────────────────────────────────────────────────────────────────────────────
 */

type CuratedEntry = Omit<GeneratedWordCard, 'input' | 'isPreview'>

// Keyed by normalized (lowercase, accent-stripped) input.
const CURATED: Record<string, CuratedEntry> = {
  pere: {
    term: 'père',
    translation: 'father',
    partOfSpeech: 'noun (masc.)',
    pronunciation: '/pɛʁ/',
    meaning: 'A male parent; dad.',
    language: 'French',
    suggestedCategoryId: 'c3',
    examples: [
      { sentence: 'Mon père travaille dans un bureau.', translation: 'My father works in an office.' },
      { sentence: "C'est le père de mon meilleur ami.", translation: "He is my best friend's father." },
      { sentence: 'Le père et le fils se promènent dans le parc.', translation: 'The father and son are walking in the park.' },
    ],
  },
  tres: {
    term: 'très',
    translation: 'very',
    partOfSpeech: 'adverb',
    pronunciation: '/tʁɛ/',
    meaning: 'Used to intensify an adjective or another adverb.',
    language: 'French',
    suggestedCategoryId: 'c3',
    examples: [
      { sentence: 'Ce livre est très intéressant.', translation: 'This book is very interesting.' },
      { sentence: 'Elle parle très bien anglais.', translation: 'She speaks English very well.' },
      { sentence: "J'ai très faim ce matin.", translation: "I'm very hungry this morning." },
    ],
  },
  maison: {
    term: 'maison',
    translation: 'house',
    partOfSpeech: 'noun (fem.)',
    pronunciation: '/mɛ.zɔ̃/',
    meaning: 'A building where people live.',
    language: 'French',
    suggestedCategoryId: 'c1',
    examples: [
      { sentence: 'Notre maison est près du parc.', translation: 'Our house is near the park.' },
      { sentence: 'Elle a acheté une nouvelle maison.', translation: 'She bought a new house.' },
      { sentence: 'Je reste à la maison ce soir.', translation: "I'm staying home tonight." },
    ],
  },
}

const PARTS_OF_SPEECH = ['noun', 'verb', 'adjective', 'adverb']

function normalize(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

/** Deterministic pseudo-random pick so the same input always looks the same. */
function pick<T>(items: T[], seed: string): T {
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  return items[hash % items.length]
}

function genericCard(rawInput: string): CuratedEntry {
  const term = rawInput.trim()
  const partOfSpeech = pick(PARTS_OF_SPEECH, normalize(term))

  return {
    term,
    translation: term,
    partOfSpeech,
    pronunciation: `/${normalize(term)}/`,
    meaning: `Preview only — connect the real API to get an accurate definition for "${term}".`,
    language: 'French',
    suggestedCategoryId: 'c3',
    examples: [
      { sentence: `Peux-tu utiliser « ${term} » dans une phrase ?`, translation: `Can you use "${term}" in a sentence?` },
      { sentence: `J'apprends le mot « ${term} » aujourd'hui.`, translation: `I'm learning the word "${term}" today.` },
      { sentence: `« ${term} » est un nouveau mot pour moi.`, translation: `"${term}" is a new word for me.` },
    ],
  }
}

function randomDelay(min: number, max: number): Promise<void> {
  const ms = min + Math.random() * (max - min)
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Generates (mock) flashcard data for a word. Curated entries ("père",
 * "très", "maison") return hand-written data; anything else falls back to a
 * clearly-labeled preview so the flow never dead-ends in the demo.
 *
 * Type "error" as the word to preview the failure state.
 */
export async function generateWordCard(rawInput: string): Promise<GeneratedWordCard> {
  const key = normalize(rawInput)

  await randomDelay(1100, 1800)

  if (key === 'error') {
    throw new Error(`Couldn't generate a flashcard for "${rawInput}". Please try again.`)
  }

  const curated = CURATED[key]
  if (curated) {
    return { input: rawInput, ...curated }
  }

  return { input: rawInput, ...genericCard(rawInput), isPreview: true }
}
