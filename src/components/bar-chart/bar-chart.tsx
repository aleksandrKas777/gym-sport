import type { CSSProperties } from 'react'
import type { ChartPoint } from '@/types'
import { cn } from '@/lib/utils'

export type BarChartProps = {
  data: ChartPoint[]
  height?: number
  format?: (value: number) => string
  highlight?: number
  className?: string
}

export const BarChart = ({
  data,
  height = 150,
  format,
  highlight,
  className,
}: BarChartProps) => {
  const max = Math.max(...data.map((point) => point.value), 0.0001)
  const activeIndex = highlight ?? data.length - 1
  const dense = data.length > 8

  return (
    <div
      className={cn('flex w-full items-end gap-1.5 pt-5', className)}
      style={{ height }}
    >
      {data.map((point, index) => {
        const heightPercent =
          point.value === 0 ? 0 : Math.max(5, (point.value / max) * 100)
        const active = index === activeIndex && point.value > 0
        return (
          <div
            key={`${point.label}-${index}`}
            className={cn(
              'flex h-full min-w-0 flex-1 flex-col gap-1.75',
              dense && 'gap-1',
            )}
          >
            <div className="relative flex min-h-0 flex-1 items-end justify-center">
              {active ? (
                <span
                  className="tabular absolute left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-[-0.01em] whitespace-nowrap text-primary"
                  style={
                    {
                      bottom: `calc(${heightPercent}% + 5px)`,
                    } as CSSProperties
                  }
                >
                  {format ? format(point.value) : point.value}
                </span>
              ) : null}
              <div
                title={format ? format(point.value) : String(point.value)}
                className={cn(
                  'w-full max-w-[26px] rounded-t-[6px] rounded-b-[3px] bg-surface-3 transition-[height] duration-300',
                  active &&
                    'bg-linear-to-b from-primary to-[#b4dd2c] shadow-[0_0_16px_rgba(215,255,62,0.22)]',
                  point.value === 0 && 'max-w-3.5 bg-white/7',
                )}
                style={
                  {
                    height: `${heightPercent}%`,
                    minHeight: 3,
                  } as CSSProperties
                }
              />
            </div>
            <span
              className={cn(
                'truncate text-center text-[9.5px] font-medium text-subtle',
                dense && 'text-[8.5px] tracking-[-0.02em]',
              )}
            >
              {point.label}
            </span>
          </div>
        )
      })}
    </div>
  )
};
