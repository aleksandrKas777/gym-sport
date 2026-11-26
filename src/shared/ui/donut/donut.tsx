import type { CSSProperties } from 'react'
import type { MuscleSlice } from '@/shared/types'
import { cn } from '@/shared/lib/utils'

export type DonutProps = {
  segments: MuscleSlice[]
  size?: number
  thickness?: number
  centerValue?: string
  centerLabel?: string
  className?: string
}

export const Donut = ({
  segments,
  size = 116,
  thickness = 14,
  centerValue,
  centerLabel,
  className,
}: DonutProps) => {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0) || 1
  const radius = (size - thickness) / 2
  const circumference = 2 * Math.PI * radius
  const gap = segments.length > 1 ? 2.5 : 0

  const arcs = segments
    .reduce<{
      items: Array<MuscleSlice & { visible: number; dashOffset: number }>
      offset: number
    }>(
      (accumulator, segment) => {
        const length = (segment.value / total) * circumference
        const visible = Math.max(length - gap, 0.5)
        return {
          items: [
            ...accumulator.items,
            { ...segment, visible, dashOffset: -accumulator.offset },
          ],
          offset: accumulator.offset + length,
        }
      },
      { items: [], offset: 0 },
    )
    .items

  return (
    <div
      className={cn('relative grid shrink-0 place-items-center', className)}
      style={{ width: size, height: size } as CSSProperties}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={thickness}
        />
        {arcs.map((segment) => (
          <circle
            key={segment.label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={segment.color}
            strokeWidth={thickness}
            strokeDasharray={`${segment.visible} ${circumference - segment.visible}`}
            strokeDashoffset={segment.dashOffset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        ))}
      </svg>
      {centerValue ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.25">
          <strong className="tabular text-xl font-bold tracking-[-0.02em]">
            {centerValue}
          </strong>
          {centerLabel ? (
            <span className="text-[9.5px] tracking-[0.08em] text-subtle uppercase">
              {centerLabel}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  )
};
