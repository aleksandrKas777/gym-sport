import { Search, X } from 'lucide-react'
import { IconButton } from '@/components/icon-button'
import { Input } from '@/components/input'
import { cn } from '@/lib/utils'

export type SearchFieldProps = {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  className?: string
}

export const SearchField = ({
  value,
  onValueChange,
  placeholder = 'Поиск упражнения',
  className,
}: SearchFieldProps) => {
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
        <IconButton
          label="Очистить поиск"
          variant="ghost"
          size="icon-xs"
          onClick={() => onValueChange('')}
          className="absolute top-1/2 right-2.5 size-5 -translate-y-1/2 rounded-full bg-white/8 text-muted-foreground hover:bg-white/14 hover:text-foreground"
        >
          <X size={14} />
        </IconButton>
      ) : null}
    </div>
  )
};
