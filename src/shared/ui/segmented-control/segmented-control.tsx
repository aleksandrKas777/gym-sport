import type { CSSProperties } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { cn } from '@/shared/lib/utils'

export type SegmentOption<T extends string> = {
  value: T
  label: string
}

export type SegmentedControlProps<T extends string> = {
  options: SegmentOption<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
}

export const SegmentedControl = <T extends string,>({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps<T>) => {
  return (
    <Tabs
      value={value}
      onValueChange={(next) => onChange(next as T)}
      className={cn('w-full', className)}
    >
      <TabsList
        className="grid h-auto w-full rounded-full border border-border bg-white/4 p-[3px]"
        style={
          {
            gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`,
          } as CSSProperties
        }
      >
        {options.map((option) => (
          <TabsTrigger
            key={option.value}
            value={option.value}
            className="tabular h-8 flex-1 rounded-full px-2 text-[12.5px] font-semibold text-muted-foreground hover:text-foreground data-active:bg-primary data-active:text-primary-foreground data-active:shadow-[0_2px_10px_rgba(215,255,62,0.2)]"
          >
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
};
