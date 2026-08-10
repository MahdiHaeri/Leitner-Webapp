import { cn } from '@/lib/utils'
import { BOX_CONFIG } from '@/lib/design-tokens'
import type { WordItem, Category } from '@/types/words'

interface WordListItemProps {
  word: WordItem
  category: Category
}

export function WordListItem({ word, category }: WordListItemProps) {
  const boxStyle = BOX_CONFIG[word.boxId]

  return (
    <div className="flex items-center gap-4 py-3 px-4 rounded-xl hover:bg-muted/50 transition-colors duration-200">
      
      {/* Target Word & Category */}
      <div className="flex-1 min-w-0">
        <p className="font-extrabold text-foreground text-base truncate">
          {word.answer}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-xs text-muted-foreground font-semibold truncate">
            {word.prompt}
          </span>
          <span className="text-muted-foreground/30 text-[10px]">•</span>
          <span className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground px-1.5 py-0.5 rounded-md bg-muted">
            {category.icon} {category.name}
          </span>
        </div>
      </div>

      {/* Leitner Box Indicator */}
      <div 
        className={cn(
          'flex flex-col items-center justify-center flex-shrink-0 w-12 h-12 rounded-xl border',
          boxStyle.softBg,
          boxStyle.border
        )}
        title={`Box ${word.boxId}: ${boxStyle.name}`}
      >
        <span className={cn('text-[10px] font-extrabold uppercase tracking-tighter', boxStyle.text)}>
          Box
        </span>
        <span className={cn('text-sm font-extrabold leading-none mt-0.5', boxStyle.text)}>
          {word.boxId}
        </span>
      </div>
    </div>
  )
}
