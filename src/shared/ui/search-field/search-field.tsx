import { Search, X } from 'lucide-react'
import { Input } from '@/shared/ui/input'
import { cn } from '@/shared/lib/utils'

export type SearchFieldProps = {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function SearchField({
  value,
  onValueChange,
  placeholder = 'Поиск упражнения',
  className,
}: SearchFieldProps) {
  return (
    <div className={cn('relative', className)}>
      <Search
        size={16}
        className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-subtle"
      />
      <Input
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onValueChange(event.target.value)}
        className="pr-9 pl-10 [&::-webkit-search-cancel-button]:hidden"
      />
      {value ? (
        <button
          type="button"
          aria-label="Очистить поиск"
          onClick={() => onValueChange('')}
          className="absolute top-1/2 right-2.5 grid size-5 -translate-y-1/2 place-items-center rounded-full bg-white/8 text-muted-foreground transition-colors hover:bg-white/14 hover:text-foreground"
        >
          <X size={14} />
        </button>
      ) : null}
    </div>
  )
}
