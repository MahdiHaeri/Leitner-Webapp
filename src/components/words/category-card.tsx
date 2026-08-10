import { cn } from '@/lib/utils'
import type { Category } from '@/types/words'

interface CategoryCardProps {
  category: Category
  wordCount: number
  masteredCount: number
  isSelected: boolean
  onClick: () => void
}

export function CategoryCard({
  category,
  wordCount,
  masteredCount,
  isSelected,
  onClick,
}: CategoryCardProps) {
  const fillPercent = wordCount > 0 ? (masteredCount / wordCount) * 100 : 0

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative flex-shrink-0 w-40 text-left overflow-hidden',
        'rounded-2xl border-2 transition-all duration-200 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        isSelected
          ? `bg-card border-primary shadow-sm shadow-primary/20`
          : 'bg-card border-border hover:border-primary/50 shadow-sm hover:shadow-md'
      )}
    >
      {/* Selection indicator strip */}
      <div 
        className={cn(
          'absolute top-0 left-0 right-0 h-1.5 transition-all duration-200',
          isSelected ? 'bg-primary' : category.color
        )}
      />
      
      <div className="p-4 pt-5">
        {/* Icon & Name */}
        <div className="flex flex-col gap-2 mb-3">
          <div className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm',
            'bg-muted group-hover:scale-105 transition-transform duration-200'
          )}>
            {category.icon}
          </div>
          <p className={cn(
            'font-extrabold text-base leading-tight',
            isSelected ? 'text-foreground' : 'text-foreground'
          )}>
            {category.name}
          </p>
        </div>

        {/* Stats */}
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            {wordCount} words
          </p>
          
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-500',
                isSelected ? 'bg-primary' : category.color
              )}
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>
      </div>
    </button>
  )
}
