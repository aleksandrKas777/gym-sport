import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'

export type EmptyStateProps = {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export const EmptyState = ({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-2 rounded-xl border border-dashed border-input bg-white/[0.015] px-5 py-6 text-center',
        className,
      )}
    >
      {icon ? (
        <div className="mb-0.5 grid size-11 place-items-center rounded-full border border-border bg-secondary text-subtle">
          {icon}
        </div>
      ) : null}
      <p className="text-[13.5px] font-semibold">{title}</p>
      {description ? (
        <p className="max-w-60 text-[11.5px] leading-relaxed text-subtle">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-1.5">{action}</div> : null}
    </div>
  )
};
