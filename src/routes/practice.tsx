import { useState, useCallback } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  X,
  Mic,
  RotateCcw,
  Eye,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Volume2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePractice } from '@/hooks/use-practice'
import type { PracticeAttemptState } from '@/types/practice'

// ─── Constants ────────────────────────────────────────────────────────────────

const STATE_CONFIG = {
  idle: {
    micBg: 'bg-accent',
    micShadow: 'shadow-accent/30',
    micIcon: 'text-white',
    footer: null,
  },
  listening: {
    micBg: 'bg-accent animate-pulse',
    micShadow: 'shadow-accent/50',
    micIcon: 'text-white',
    footer: null,
  },
  processing: {
    micBg: 'bg-muted',
    micShadow: '',
    micIcon: 'text-muted-foreground',
    footer: null,
  },
  correct: {
    micBg: 'bg-primary',
    micShadow: 'shadow-primary/30',
    micIcon: 'text-primary-foreground',
    footer: 'bg-primary/10 border-primary/20',
  },
  incorrect: {
    micBg: 'bg-destructive',
    micShadow: 'shadow-destructive/30',
    micIcon: 'text-white',
    footer: 'bg-destructive/10 border-destructive/20',
  },
  skipped: {
    micBg: 'bg-muted',
    micShadow: '',
    micIcon: 'text-muted-foreground',
    footer: 'bg-accent/10 border-accent/20',
  },
} as const

// ─── Component ────────────────────────────────────────────────────────────────

export function PracticePage() {
  const navigate = useNavigate()
  const { data: session, isLoading, error } = usePractice()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [attemptState, setAttemptState] = useState<PracticeAttemptState>('idle')
  const [correctCount, setCorrectCount] = useState(0)

  // ── Navigation ────────────────────────────────────────────────────────────
  const goBack = useCallback(() => {
    navigate({ to: '/' })
  }, [navigate])

  const goNext = useCallback(() => {
    if (!session) return
    if (currentIndex < session.words.length - 1) {
      setCurrentIndex((i) => i + 1)
      setAttemptState('idle')
    } else {
      // TODO: navigate to a session-complete screen
      goBack()
    }
  }, [session, currentIndex, goBack])

  // ── Mock actions (UI only — no real mic/processing) ───────────────────────
  const handleMicPress = useCallback(() => {
    if (attemptState === 'idle') {
      setAttemptState('listening')
      // Simulate: stop listening after 2s, then show random result
      setTimeout(() => {
        setAttemptState('processing')
        setTimeout(() => {
          const isCorrect = Math.random() > 0.4
          setAttemptState(isCorrect ? 'correct' : 'incorrect')
          if (isCorrect) setCorrectCount((c) => c + 1)
        }, 600)
      }, 2000)
    } else if (attemptState === 'listening') {
      // User tapped mic again to stop early
      setAttemptState('processing')
      setTimeout(() => {
        const isCorrect = Math.random() > 0.4
        setAttemptState(isCorrect ? 'correct' : 'incorrect')
        if (isCorrect) setCorrectCount((c) => c + 1)
      }, 600)
    }
  }, [attemptState])

  const handleRetry = useCallback(() => {
    setAttemptState('idle')
  }, [])

  const handleShowAnswer = useCallback(() => {
    setAttemptState('skipped')
  }, [])

  const handlePlayAudio = useCallback(() => {
    // TODO: play TTS for the answer word
    console.info('Play audio for answer')
  }, [])

  // ── Loading / error ───────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  if (error || !session || session.words.length === 0) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <p className="text-destructive font-extrabold">{error ?? 'No words to practice.'}</p>
          <button onClick={goBack} className="text-sm font-bold text-accent underline">
            Go back
          </button>
        </div>
      </div>
    )
  }

  // ── Derived values ────────────────────────────────────────────────────────
  const word = session.words[currentIndex]
  const progress = ((currentIndex + (attemptState === 'correct' ? 1 : 0)) / session.words.length) * 100
  const stateConfig = STATE_CONFIG[attemptState]
  const showResult = attemptState === 'correct' || attemptState === 'incorrect' || attemptState === 'skipped'
  const canUseMic = attemptState === 'idle' || attemptState === 'listening'

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">

      {/* ── Top bar: close + progress ──────────────────────────── */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2 flex-shrink-0">
        <button
          id="practice-close"
          onClick={goBack}
          className={cn(
            'w-9 h-9 rounded-xl flex items-center justify-center',
            'text-muted-foreground hover:text-foreground hover:bg-muted',
            'transition-all duration-200',
          )}
          aria-label="Close practice"
        >
          <X className="w-5 h-5" strokeWidth={2.5} />
        </button>

        {/* Progress bar */}
        <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Counter */}
        <span className="text-xs font-extrabold text-muted-foreground whitespace-nowrap min-w-[3rem] text-right">
          {currentIndex + 1}/{session.words.length}
        </span>
      </div>

      {/* ── Main content ───────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-4 overflow-y-auto">

        {/* Instruction */}
        <h1 className="text-xl md:text-2xl font-extrabold text-foreground mb-6 text-center">
          Say the word in {session.targetLang}
        </h1>

        {/* ── Word card with stacked effect ─────────────────────── */}
        <div className="relative w-full max-w-sm mb-8">
          {/* Stack cards behind (purely decorative) */}
          <div className="absolute inset-x-3 -top-2 h-4 rounded-2xl bg-card border border-border opacity-40" />
          <div className="absolute inset-x-1.5 -top-1 h-4 rounded-2xl bg-card border border-border opacity-70" />

          {/* Main card */}
          <div
            className={cn(
              'relative z-10 w-full rounded-2xl bg-card border-2 border-border',
              'shadow-lg flex flex-col items-center justify-center',
              'min-h-[12rem] md:min-h-[14rem] p-8',
              'transition-all duration-300',
              attemptState === 'correct' && 'border-primary/50 shadow-primary/20',
              attemptState === 'incorrect' && 'border-destructive/50 shadow-destructive/20',
              attemptState === 'skipped' && 'border-accent/50 shadow-accent/20',
            )}
          >
            {/* Prompt word */}
            <p className="text-3xl md:text-4xl font-extrabold text-foreground text-center">
              {word.prompt}
            </p>

            {/* Show answer when revealed */}
            {showResult && (
              <div className="mt-4 flex flex-col items-center gap-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-2">
                  <p className="text-lg font-extrabold text-accent">
                    {word.answer}
                  </p>
                  <button
                    onClick={handlePlayAudio}
                    className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-colors"
                    aria-label="Play pronunciation"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-accent" strokeWidth={2.5} />
                  </button>
                </div>
                {word.phonetic && (
                  <p className="text-sm font-semibold text-muted-foreground">{word.phonetic}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Mic + controls ────────────────────────────────────── */}
        <div className="flex items-center gap-4">
          {/* Microphone button */}
          <button
            id="practice-mic"
            onClick={handleMicPress}
            disabled={!canUseMic && attemptState !== 'processing'}
            className={cn(
              'relative flex items-center justify-center',
              'w-[4.5rem] h-[4.5rem] rounded-2xl',
              'transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              stateConfig.micBg,
              stateConfig.micShadow && `shadow-lg ${stateConfig.micShadow}`,
              !canUseMic && attemptState !== 'processing' && 'opacity-50 cursor-not-allowed',
              canUseMic && 'active:scale-95',
            )}
            aria-label={attemptState === 'listening' ? 'Stop recording' : 'Start recording'}
          >
            {/* Pulse ring when listening */}
            {attemptState === 'listening' && (
              <span className="absolute inset-0 rounded-2xl border-2 border-accent animate-ping opacity-30" />
            )}

            {attemptState === 'processing' ? (
              <div className="w-5 h-5 rounded-full border-2 border-foreground border-t-transparent animate-spin" />
            ) : (
              <Mic className={cn('w-7 h-7', stateConfig.micIcon)} strokeWidth={2} />
            )}
          </button>

          {/* Retry button */}
          {(attemptState === 'incorrect' || attemptState === 'skipped') && (
            <button
              id="practice-retry"
              onClick={handleRetry}
              className={cn(
                'w-14 h-14 rounded-2xl bg-card border-2 border-border',
                'flex items-center justify-center shadow-sm',
                'text-accent hover:bg-accent/10',
                'transition-all duration-200 active:scale-95',
              )}
              aria-label="Try again"
            >
              <RotateCcw className="w-6 h-6" strokeWidth={2} />
            </button>
          )}

          {/* Next button (after result) */}
          {showResult && (
            <button
              id="practice-next"
              onClick={goNext}
              className={cn(
                'w-14 h-14 rounded-2xl',
                'flex items-center justify-center shadow-sm',
                'transition-all duration-200 active:scale-95',
                attemptState === 'correct'
                  ? 'bg-primary text-primary-foreground shadow-primary/30'
                  : 'bg-card border-2 border-border text-foreground hover:bg-muted',
              )}
              aria-label="Next word"
            >
              <ArrowRight className="w-6 h-6" strokeWidth={2} />
            </button>
          )}
        </div>

        {/* ── "Can't speak now" / "Show answer" ─────────────────── */}
        {!showResult && (
          <div className="mt-6 flex flex-col items-center gap-2">
            <button
              id="practice-show-answer"
              onClick={handleShowAnswer}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-xl',
                'text-xs font-extrabold uppercase tracking-widest',
                'text-muted-foreground hover:text-foreground hover:bg-muted',
                'transition-all duration-200',
              )}
            >
              <Eye className="w-3.5 h-3.5" />
              Show answer
            </button>
            <button
              className={cn(
                'text-[11px] font-bold uppercase tracking-widest',
                'text-muted-foreground/60 hover:text-muted-foreground',
                'transition-colors duration-200',
              )}
            >
              Can&apos;t speak now
            </button>
          </div>
        )}
      </div>

      {/* ── Result footer ──────────────────────────────────────── */}
      {showResult && (
        <div
          className={cn(
            'flex-shrink-0 border-t px-6 py-4',
            'flex items-center gap-3',
            'animate-in slide-in-from-bottom-4 duration-300',
            stateConfig.footer,
          )}
        >
          {attemptState === 'correct' && (
            <>
              <CheckCircle2 className="w-8 h-8 text-primary flex-shrink-0" strokeWidth={2.5} />
              <div>
                <p className="font-extrabold text-primary text-sm">Great job!</p>
                <p className="text-xs font-semibold text-muted-foreground">
                  This card moves to the next box
                </p>
              </div>
            </>
          )}
          {attemptState === 'incorrect' && (
            <>
              <XCircle className="w-8 h-8 text-destructive flex-shrink-0" strokeWidth={2.5} />
              <div>
                <p className="font-extrabold text-destructive text-sm">Not quite</p>
                <p className="text-xs font-semibold text-muted-foreground">
                  The answer is <span className="font-extrabold text-foreground">{word.answer}</span>
                </p>
              </div>
            </>
          )}
          {attemptState === 'skipped' && (
            <>
              <Eye className="w-8 h-8 text-accent flex-shrink-0" strokeWidth={2.5} />
              <div>
                <p className="font-extrabold text-accent text-sm">Answer revealed</p>
                <p className="text-xs font-semibold text-muted-foreground">
                  This card stays in the current box for more practice
                </p>
              </div>
            </>
          )}

          {/* Score counter on the right */}
          <div className="ml-auto text-right">
            <p className="text-lg font-extrabold text-foreground leading-none">
              {correctCount}/{currentIndex + 1}
            </p>
            <p className="text-[10px] font-bold text-muted-foreground">correct</p>
          </div>
        </div>
      )}
    </div>
  )
}
