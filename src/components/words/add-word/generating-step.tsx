import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

interface GeneratingStepProps {
  word: string
}

const MESSAGE_COUNT = 4

function buildMessages(word: string): string[] {
  return [
    `Looking up "${word}"…`,
    'Writing example sentences…',
    'Checking pronunciation…',
    'Almost there…',
  ]
}

export function GeneratingStep({ word }: GeneratingStepProps) {
  const [messageIndex, setMessageIndex] = useState(0)
  const messages = buildMessages(word)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => Math.min(i + 1, MESSAGE_COUNT - 1))
    }, 750)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center text-center py-8">
      {/* Shimmering flashcard skeleton */}
      <div className="w-full rounded-3xl bg-card border-2 border-border shadow-sm p-6 mb-6 overflow-hidden relative">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-1/2 bg-muted rounded-lg mx-auto" />
          <div className="h-3 w-1/3 bg-muted rounded-lg mx-auto" />
          <div className="h-px w-full bg-border my-2" />
          <div className="space-y-2">
            <div className="h-3 w-full bg-muted rounded-lg" />
            <div className="h-3 w-5/6 bg-muted rounded-lg" />
            <div className="h-3 w-4/6 bg-muted rounded-lg" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-primary">
        <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
        <p key={messageIndex} className="text-sm font-extrabold animate-in fade-in duration-300">
          {messages[messageIndex]}
        </p>
      </div>
    </div>
  )
}
