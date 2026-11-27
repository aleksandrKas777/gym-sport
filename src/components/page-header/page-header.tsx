import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type PageHeaderProps = {
  eyebrow: string
  title: string
  action?: ReactNode
  children?: ReactNode
  className?: string
}

export const PageHeader = ({
  eyebrow,
  title,
  action,
  children,
  className,
}: PageHeaderProps) => {
  return (
    <header
      className={cn(
        'flex shrink-0 flex-col gap-3 px-4 pt-1.5 pb-2.5',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-0.5 text-[22px] leading-tight font-bold tracking-[-0.02em]">
            {title}
          </h1>
        </div>
        {action}
      </div>
      {children}
    </header>
  )
};
