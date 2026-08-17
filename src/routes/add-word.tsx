import { useCallback } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAddWord } from '@/hooks/use-add-word'
import { InputStep } from '@/components/words/add-word/input-step'
import { GeneratingStep } from '@/components/words/add-word/generating-step'
import { ReviewStep } from '@/components/words/add-word/review-step'
import { SuccessStep } from '@/components/words/add-word/success-step'
import { ErrorStep } from '@/components/words/add-word/error-step'

const STEP_ORDER = ['input', 'review', 'success'] as const

export function AddWordPage() {
  const navigate = useNavigate()

  const {
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
  } = useAddWord()

  const goToWords = useCallback(() => {
    navigate({ to: '/words' })
  }, [navigate])

  const currentStepIndex =
    phase === 'success'
      ? 2
      : phase === 'review' || phase === 'saving' || phase === 'generating'
        ? 1
        : 0

  return (
    <div className="fixed inset-0 z-[60] bg-background flex flex-col">
      {/* ── Top bar: close + step dots ──────────────────────────── */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2 flex-shrink-0">
        <button
          id="add-word-close"
          onClick={goToWords}
          aria-label="Close"
          className={cn(
            'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0',
            'text-muted-foreground hover:text-foreground hover:bg-muted',
            'transition-all duration-200',
          )}
        >
          <X className="w-5 h-5" strokeWidth={2.5} />
        </button>

        <div className="flex-1 flex items-center justify-center gap-1.5">
          {STEP_ORDER.map((step, i) => (
            <span
              key={step}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === currentStepIndex ? 'w-6 bg-primary' : 'w-1.5 bg-muted',
              )}
            />
          ))}
        </div>

        <div className="w-9 h-9 flex-shrink-0" aria-hidden />
      </div>

      {/* ── Step content ─────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 pb-8 pt-4">
        {phase === 'input' && <InputStep onSubmit={generate} />}

        {phase === 'generating' && <GeneratingStep word={card?.input ?? pendingInput} />}

        {(phase === 'review' || phase === 'saving') && card && (
          <ReviewStep
            card={card}
            isSaving={phase === 'saving'}
            onUpdateField={updateCardField}
            onConfirm={confirmSave}
            onRegenerate={regenerate}
            onTryAnother={reset}
          />
        )}

        {phase === 'error' && (
          <ErrorStep message={errorMessage ?? 'Please try again.'} onRetry={regenerate} onTryAnother={reset} />
        )}

        {phase === 'success' && savedWord && (
          <SuccessStep word={savedWord} onAddAnother={reset} onViewWords={goToWords} />
        )}
      </div>
    </div>
  )
}
