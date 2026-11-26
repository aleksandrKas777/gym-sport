import { Minus, Plus } from 'lucide-react'
import { IconButton } from '@/shared/ui/icon-button'
import { cn } from '@/shared/lib/utils'

export type NumberStepperProps = {
  value: number
  onChange: (value: number) => void
  step?: number
  min?: number
  max?: number
  unit?: string
  size?: 'sm' | 'md'
  format?: (value: number) => string
  label?: string
  className?: string
}

const round = (value: number): number => {
  return Math.round(value * 100) / 100
};

export const NumberStepper = ({
  value,
  onChange,
  step = 1,
  min = 0,
  max = 999,
  unit,
  size = 'md',
  format,
  label,
  className,
}: NumberStepperProps) => {
  const commit = (next: number) => {
    const clamped = Math.min(max, Math.max(min, round(next)))
    if (clamped !== value) onChange(clamped)
  }

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        'grid h-10 items-center overflow-hidden rounded-[10px] border border-border bg-secondary',
        size === 'sm'
          ? 'h-[38px] grid-cols-[23px_minmax(0,1fr)_23px]'
          : 'grid-cols-[26px_minmax(0,1fr)_26px]',
        className,
      )}
    >
      <IconButton
        type="button"
        label={`Уменьшить${label ? `: ${label}` : ''}`}
        variant="ghost"
        size="icon-xs"
        disabled={value <= min}
        onClick={() => commit(value - step)}
        className="h-full w-full rounded-none text-subtle hover:bg-white/6 hover:text-foreground"
      >
        <Minus strokeWidth={2.5} />
      </IconButton>
      <span className="tabular flex items-baseline justify-center gap-0.5 overflow-hidden text-[13.5px] font-semibold whitespace-nowrap">
        {format ? format(value) : value}
        {unit ? (
          <span className="text-[9.5px] font-medium text-subtle">{unit}</span>
        ) : null}
      </span>
      <IconButton
        type="button"
        label={`Увеличить${label ? `: ${label}` : ''}`}
        variant="ghost"
        size="icon-xs"
        disabled={value >= max}
        onClick={() => commit(value + step)}
        className="h-full w-full rounded-none text-subtle hover:bg-white/6 hover:text-foreground"
      >
        <Plus strokeWidth={2.5} />
      </IconButton>
    </div>
  )
};
