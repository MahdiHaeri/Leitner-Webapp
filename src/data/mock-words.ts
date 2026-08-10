import type { WordsData } from '@/types/words'

export const MOCK_WORDS_DATA: WordsData = {
  categories: [
    { id: 'c1', name: 'Animals', icon: '🦁', description: 'Common animals', color: 'bg-amber-500' },
    { id: 'c2', name: 'Food', icon: '🍎', description: 'Fruits, veggies, meals', color: 'bg-rose-500' },
    { id: 'c3', name: 'Basics', icon: '💬', description: 'Greetings, numbers', color: 'bg-sky-500' },
    { id: 'c4', name: 'Work', icon: '💼', description: 'Office and careers', color: 'bg-violet-500' },
  ],
  words: [
    { id: 'w1', prompt: 'dog', answer: 'chien', categoryId: 'c1', boxId: 1 },
    { id: 'w2', prompt: 'cat', answer: 'chat', categoryId: 'c1', boxId: 2 },
    { id: 'w3', prompt: 'bird', answer: 'oiseau', categoryId: 'c1', boxId: 3 },
    { id: 'w4', prompt: 'mouse', answer: 'souris', categoryId: 'c1', boxId: 4 },
    { id: 'w5', prompt: 'horse', answer: 'cheval', categoryId: 'c1', boxId: 5 },
    { id: 'w6', prompt: 'apple', answer: 'pomme', categoryId: 'c2', boxId: 1 },
    { id: 'w7', prompt: 'bread', answer: 'pain', categoryId: 'c2', boxId: 5 },
    { id: 'w8', prompt: 'water', answer: 'eau', categoryId: 'c2', boxId: 2 },
    { id: 'w9', prompt: 'cheese', answer: 'fromage', categoryId: 'c2', boxId: 4 },
    { id: 'w10', prompt: 'meat', answer: 'viande', categoryId: 'c2', boxId: 3 },
    { id: 'w11', prompt: 'hello', answer: 'bonjour', categoryId: 'c3', boxId: 5 },
    { id: 'w12', prompt: 'goodbye', answer: 'au revoir', categoryId: 'c3', boxId: 5 },
    { id: 'w13', prompt: 'please', answer: "s'il vous plaît", categoryId: 'c3', boxId: 2 },
    { id: 'w14', prompt: 'thank you', answer: 'merci', categoryId: 'c3', boxId: 5 },
    { id: 'w15', prompt: 'yes', answer: 'oui', categoryId: 'c3', boxId: 5 },
    { id: 'w16', prompt: 'no', answer: 'non', categoryId: 'c3', boxId: 5 },
    { id: 'w17', prompt: 'job', answer: 'emploi', categoryId: 'c4', boxId: 1 },
    { id: 'w18', prompt: 'office', answer: 'bureau', categoryId: 'c4', boxId: 3 },
    { id: 'w19', prompt: 'meeting', answer: 'réunion', categoryId: 'c4', boxId: 2 },
    { id: 'w20', prompt: 'boss', answer: 'patron', categoryId: 'c4', boxId: 4 },
  ],
}
