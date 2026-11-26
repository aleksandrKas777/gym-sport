import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'

export type SectionHeadProps = {
  title: string
  subtitle?: string
  action?: ReactNode
  className?: string
}

export function SectionHead({
  title,
  subtitle,
  action,
  className,
}: SectionHeadProps) {
  return (
    <div className={cn('flex items-start justify-between gap-3', className)}>
      <div className="min-w-0">
        <h3 className="text-[13.5px] font-semibold">{title}</h3>
        {subtitle ? (
          <p className="mt-0.5 text-[11px] text-subtle">{subtitle}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
