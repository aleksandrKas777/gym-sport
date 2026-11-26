import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'

export type ChipProps = ComponentProps<'button'> & {
  selected?: boolean
  icon?: ReactNode
}

export const Chip = ({
  selected = false,
  icon,
  className,
  children,
  type = 'button',
  ...props
}: ChipProps) => {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        'inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-medium whitespace-nowrap transition-colors',
        selected
          ? 'border-primary bg-primary font-semibold text-primary-foreground'
          : 'border-border bg-secondary text-muted-foreground hover:border-input hover:text-foreground',
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
};
