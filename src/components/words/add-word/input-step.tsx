import { useState, type FormEvent } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const SUGGESTIONS = ['père', 'très', 'maison']

interface InputStepProps {
  initialValue?: string
  onSubmit: (word: string) => void
}

export function InputStep({ initialValue = '', onSubmit }: InputStepProps) {
  const [value, setValue] = useState(initialValue)
  const canSubmit = value.trim().length > 0

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    onSubmit(value.trim())
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center mb-4">
          <Sparkles className="w-6 h-6 text-primary" strokeWidth={2.5} />
        </div>
        <h1 className="text-xl font-extrabold text-foreground">Add a new word</h1>
        <p className="text-sm font-semibold text-muted-foreground mt-1.5 max-w-xs">
          Type a word in French — we&apos;ll write the meaning, pronunciation, and example sentences for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          id="add-word-input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. père"
          autoFocus
          autoComplete="off"
          className={cn(
            'w-full bg-card border-2 border-border rounded-2xl px-5 py-4',
            'text-lg font-extrabold text-foreground placeholder:text-muted-foreground/50 placeholder:font-bold',
            'text-center transition-all duration-200',
            'focus:border-primary focus:ring-4 focus:ring-primary/15 focus:outline-none',
          )}
        />

        <button
          id="add-word-generate"
          type="submit"
          disabled={!canSubmit}
          className={cn(
            'w-full flex items-center justify-center gap-2 rounded-2xl py-3.5',
            'font-extrabold text-sm transition-all duration-200 active:scale-[0.98]',
            'bg-primary text-primary-foreground shadow-sm shadow-primary/30 hover:opacity-90',
            'disabled:opacity-40 disabled:pointer-events-none',
          )}
        >
          Generate flashcard
          <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </form>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Try:</span>
        {SUGGESTIONS.map((word) => (
          <button
            key={word}
            type="button"
            onClick={() => {
              setValue(word)
              onSubmit(word)
            }}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-extrabold',
              'bg-muted text-foreground hover:bg-primary/15 hover:text-primary',
              'transition-colors duration-200',
            )}
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  )
}
