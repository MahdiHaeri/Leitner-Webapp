import { AlertTriangle, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ErrorStepProps {
  message: string
  onRetry: () => void
  onTryAnother: () => void
}

export function ErrorStep({ message, onRetry, onTryAnother }: ErrorStepProps) {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center text-center py-6">
      <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center mb-4">
        <AlertTriangle className="w-6 h-6 text-destructive" strokeWidth={2.5} />
      </div>

      <h1 className="text-lg font-extrabold text-foreground">Couldn&apos;t generate that word</h1>
      <p className="text-sm font-semibold text-muted-foreground mt-1.5 max-w-xs">{message}</p>

      <div className="w-full flex flex-col gap-2.5 mt-8">
        <button
          type="button"
          onClick={onRetry}
          className={cn(
            'w-full flex items-center justify-center gap-2 rounded-2xl py-3.5',
            'font-extrabold text-sm transition-all duration-200 active:scale-[0.98]',
            'bg-primary text-primary-foreground shadow-sm shadow-primary/30 hover:opacity-90',
          )}
        >
          <RotateCcw className="w-4 h-4" strokeWidth={2.5} />
          Try again
        </button>
        <button
          type="button"
          onClick={onTryAnother}
          className="w-full py-3.5 rounded-2xl font-extrabold text-sm text-muted-foreground hover:bg-muted transition-colors"
        >
          Try a different word
        </button>
      </div>
    </div>
  )
}
