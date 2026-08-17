import { PartyPopper, Plus, LibraryBig } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { WordItem } from '@/types/words'

interface SuccessStepProps {
  word: WordItem
  onAddAnother: () => void
  onViewWords: () => void
}

export function SuccessStep({ word, onAddAnother, onViewWords }: SuccessStepProps) {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center text-center py-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mb-5">
        <PartyPopper className="w-7 h-7 text-primary" strokeWidth={2.5} />
      </div>

      <h1 className="text-xl font-extrabold text-foreground">Added to your flashcards!</h1>
      <p className="text-sm font-semibold text-muted-foreground mt-1.5">
        <span className="font-extrabold text-foreground">{word.answer}</span> is now in Box 1, ready to review.
      </p>

      <div className="w-full flex flex-col gap-2.5 mt-8">
        <button
          type="button"
          onClick={onAddAnother}
          className={cn(
            'w-full flex items-center justify-center gap-2 rounded-2xl py-3.5',
            'font-extrabold text-sm transition-all duration-200 active:scale-[0.98]',
            'bg-primary text-primary-foreground shadow-sm shadow-primary/30 hover:opacity-90',
          )}
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          Add another word
        </button>
        <button
          type="button"
          onClick={onViewWords}
          className={cn(
            'w-full flex items-center justify-center gap-2 rounded-2xl py-3.5',
            'font-extrabold text-sm transition-all duration-200 active:scale-[0.98]',
            'bg-muted text-foreground hover:bg-muted/70',
          )}
        >
          <LibraryBig className="w-4 h-4" strokeWidth={2.5} />
          View My Words
        </button>
      </div>
    </div>
  )
}
