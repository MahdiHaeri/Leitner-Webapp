import { useState } from 'react'
import { Check, Loader2, Pencil, RotateCcw, Volume2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BOX_CONFIG } from '@/lib/design-tokens'
import type { GeneratedWordCard } from '@/types/add-word'

interface ReviewStepProps {
  card: GeneratedWordCard
  isSaving: boolean
  onUpdateField: (field: 'term' | 'translation', value: string) => void
  onConfirm: () => void
  onRegenerate: () => void
  onTryAnother: () => void
}

/** Small inline-editable text — click the pencil to correct AI-generated text. */
function EditableText({
  value,
  onChange,
  className,
  inputClassName,
  ariaLabel,
}: {
  value: string
  onChange: (value: string) => void
  className?: string
  inputClassName?: string
  ariaLabel: string
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)

  if (editing) {
    return (
      <div className="flex items-center gap-1.5">
        <input
          autoFocus
          aria-label={ariaLabel}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onChange(draft.trim() || value)
              setEditing(false)
            }
            if (e.key === 'Escape') {
              setDraft(value)
              setEditing(false)
            }
          }}
          className={cn(
            'bg-muted rounded-lg px-2 py-0.5 border-2 border-primary focus:outline-none',
            inputClassName,
          )}
        />
        <button
          type="button"
          aria-label="Save"
          onClick={() => {
            onChange(draft.trim() || value)
            setEditing(false)
          }}
          className="w-6 h-6 rounded-md bg-primary/15 text-primary flex items-center justify-center flex-shrink-0"
        >
          <Check className="w-3.5 h-3.5" strokeWidth={3} />
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => {
        setDraft(value)
        setEditing(true)
      }}
      className={cn('group inline-flex items-center gap-1.5', className)}
    >
      <span>{value}</span>
      <Pencil className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" strokeWidth={2.5} />
    </button>
  )
}

export function ReviewStep({
  card,
  isSaving,
  onUpdateField,
  onConfirm,
  onRegenerate,
  onTryAnother,
}: ReviewStepProps) {
  const box1 = BOX_CONFIG[1]

  return (
    <div className="w-full max-w-md mx-auto pb-4">
      {/* ── Flashcard preview ─────────────────────────────────────── */}
      <div className="rounded-3xl bg-card border-2 border-border shadow-sm p-6 mb-5">
        {card.isPreview && (
          <span className="inline-block mb-3 text-[10px] font-extrabold uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-full">
            Preview data — connect the API for a real definition
          </span>
        )}

        {/* Term + audio */}
        <div className="flex items-center justify-center gap-2">
          <EditableText
            value={card.term}
            onChange={(v) => onUpdateField('term', v)}
            className="text-2xl font-extrabold text-foreground"
            inputClassName="text-2xl font-extrabold text-foreground w-40 text-center"
            ariaLabel="Edit word"
          />
          <button
            type="button"
            disabled
            title="Audio playback coming soon"
            aria-label="Play pronunciation (coming soon)"
            className="w-8 h-8 rounded-full bg-muted text-muted-foreground/60 flex items-center justify-center cursor-not-allowed flex-shrink-0"
          >
            <Volume2 className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Pronunciation + part of speech */}
        <div className="flex items-center justify-center gap-2 mt-1.5">
          <span className="text-sm font-semibold text-muted-foreground italic">{card.pronunciation}</span>
          <span className="text-muted-foreground/30">•</span>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded-full">
            {card.partOfSpeech}
          </span>
        </div>

        {/* Meaning */}
        <div className="mt-4 text-center">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Means</p>
          <EditableText
            value={card.translation}
            onChange={(v) => onUpdateField('translation', v)}
            className="text-base font-extrabold text-primary justify-center"
            inputClassName="text-base font-extrabold text-primary w-40 text-center"
            ariaLabel="Edit meaning"
          />
          <p className="text-sm font-semibold text-muted-foreground mt-1">{card.meaning}</p>
        </div>

        <div className="h-px w-full bg-border my-4" />

        {/* Example sentences */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Example sentences</p>
          {card.examples.map((example, i) => (
            <div key={i} className="flex gap-2.5">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted text-muted-foreground text-[10px] font-extrabold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-foreground">{example.sentence}</p>
                <p className="text-xs font-semibold text-muted-foreground">{example.translation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Box preview note ──────────────────────────────────────── */}
      <div className={cn('flex items-center gap-2.5 rounded-2xl border px-4 py-3 mb-6', box1.softBg, box1.border)}>
        <span className={cn('w-2 h-2 rounded-full flex-shrink-0', box1.accent)} />
        <p className="text-xs font-bold text-muted-foreground">
          New words start in <span className={cn('font-extrabold', box1.text)}>Box 1 · Daily review</span>
        </p>
      </div>

      {/* ── Actions ───────────────────────────────────────────────── */}
      <div className="space-y-3">
        {/* Primary CTA — full width, unambiguous next step */}
        <button
          type="button"
          onClick={onConfirm}
          disabled={isSaving}
          className={cn(
            'w-full flex items-center justify-center gap-2 rounded-2xl py-3.5',
            'font-extrabold text-sm transition-all duration-200 active:scale-[0.98]',
            'bg-primary text-primary-foreground shadow-sm shadow-primary/30 hover:opacity-90',
            'disabled:opacity-60 disabled:pointer-events-none',
          )}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
              Adding…
            </>
          ) : (
            'Add to My Words'
          )}
        </button>

        {/* Secondary actions — equal weight, low visual noise */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={onTryAnother}
            disabled={isSaving}
            className="flex-1 py-2.5 text-xs font-extrabold text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
          >
            New word
          </button>
          <div className="h-3.5 w-px bg-border flex-shrink-0" />
          <button
            type="button"
            onClick={onRegenerate}
            disabled={isSaving}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-extrabold text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
          >
            <RotateCcw className="w-3.5 h-3.5" strokeWidth={2.5} />
            Regenerate
          </button>
        </div>
      </div>
    </div>
  )
}
