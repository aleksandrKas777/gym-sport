import { Minus, TrendingDown, TrendingUp } from 'lucide-react'
import type { Trend } from '@/types'
import { cn } from '@/lib/utils'

export type StatTileProps = {
  label: string
  value: string
  unit?: string
  delta?: string
  trend?: Trend
  hint?: string
  className?: string
}

export const StatTile = ({
  label,
  value,
  unit,
  delta,
  trend = 'flat',
  hint,
  className,
}: StatTileProps) => {
  const TrendIcon =
    trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus

  return (
    <div
      className={cn(
        'flex min-w-0 flex-col gap-1 rounded-[14px] border border-border bg-card px-3 pt-2.75 pb-2.5',
        className,
      )}
    >
      <span className="truncate text-[9.5px] font-semibold tracking-[0.08em] text-subtle uppercase">
        {label}
      </span>
      <div className="flex min-w-0 items-baseline gap-0.75">
        <strong className="tabular truncate text-[21px] leading-none font-bold tracking-[-0.02em]">
          {value}
        </strong>
        {unit ? (
          <span className="text-[10px] font-medium text-subtle">{unit}</span>
        ) : null}
      </div>
      {delta ? (
        <span
          className={cn(
            'tabular inline-flex items-center gap-0.75 text-[10.5px] font-semibold',
            trend === 'up' && 'text-success',
            trend === 'down' && 'text-danger',
            trend === 'flat' && 'text-subtle',
          )}
        >
          <TrendIcon size={11} strokeWidth={2.5} />
          {delta}
        </span>
      ) : hint ? (
        <span className="text-[10.5px] text-subtle">{hint}</span>
      ) : null}
    </div>
  )
};
