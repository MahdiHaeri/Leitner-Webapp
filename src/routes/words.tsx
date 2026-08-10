import { Search, LibraryBig } from 'lucide-react'
import { useWords } from '@/hooks/use-words'
import { CategoryCard } from '@/components/words/category-card'
import { WordListItem } from '@/components/words/word-list-item'
import { cn } from '@/lib/utils'

export function WordsPage() {
  const {
    data,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredWords
  } = useWords()

  if (isLoading) {
    return <div className="p-6 text-muted-foreground font-bold animate-pulse">Loading words...</div>
  }

  if (error || !data) {
    return (
      <div className="p-6 rounded-2xl border border-destructive/30 bg-destructive/10 text-center">
        <p className="font-extrabold text-destructive text-sm">
          {error ?? 'Could not load your words.'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8 flex flex-col h-full max-h-[calc(100vh-8rem)]">
      
      {/* ── Header & Categories ─────────────────────────────────────── */}
      <div className="flex-shrink-0 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-center">
            <LibraryBig className="w-5 h-5 text-foreground" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-foreground">My Words</h1>
            <p className="text-xs text-muted-foreground font-semibold">
              {data.words.length} words total
            </p>
          </div>
        </div>

        {/* Category Cards (Horizontal Scroll) */}
        <div className="-mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex gap-4 w-max">
            {/* "All" Card */}
            <CategoryCard
              category={{
                id: 'all',
                name: 'All Words',
                icon: '📚',
                description: 'Everything',
                color: 'bg-primary'
              }}
              wordCount={data.words.length}
              masteredCount={data.words.filter(w => w.boxId === 5).length}
              isSelected={selectedCategory === null}
              onClick={() => setSelectedCategory(null)}
            />
            
            {/* Actual Categories */}
            {data.categories.map((cat) => {
              const catWords = data.words.filter(w => w.categoryId === cat.id)
              const mastered = catWords.filter(w => w.boxId === 5).length
              return (
                <CategoryCard
                  key={cat.id}
                  category={cat}
                  wordCount={catWords.length}
                  masteredCount={mastered}
                  isSelected={selectedCategory === cat.id}
                  onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                />
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Search & Word List ──────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-0 bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
        
        {/* Search Bar */}
        <div className="flex-shrink-0 p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={2.5} />
            <input
              type="text"
              placeholder="Search in English or French..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                'w-full bg-muted border-transparent rounded-xl py-2.5 pl-10 pr-4',
                'text-sm font-bold text-foreground placeholder:text-muted-foreground/60',
                'transition-all duration-200',
                'focus:bg-card focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none'
              )}
            />
          </div>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto p-2">
          {filteredWords.length > 0 ? (
            <div className="space-y-1">
              {filteredWords.map((word) => {
                const category = data.categories.find(c => c.id === word.categoryId)!
                return (
                  <WordListItem
                    key={word.id}
                    word={word}
                    category={category}
                  />
                )
              })}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center">
              <p className="font-extrabold text-foreground text-sm mb-1">No words found</p>
              <p className="text-xs font-semibold text-muted-foreground">
                Try a different search term or category.
              </p>
            </div>
          )}
        </div>
      </div>
      
    </div>
  )
}
