import { useId } from 'react'
import type { ChartPoint } from '@/shared/types'
import { cn } from '@/shared/lib/utils'

export type LineChartProps = {
  data: ChartPoint[]
  height?: number
  format?: (value: number) => string
  className?: string
}

const WIDTH = 320

function smoothPath(points: Array<[number, number]>): string {
  if (points.length === 0) return ''
  let path = `M ${points[0][0]} ${points[0][1]}`
  for (let index = 0; index < points.length - 1; index += 1) {
    const [x1, y1] = points[index]
    const [x2, y2] = points[index + 1]
    const midX = (x1 + x2) / 2
    path += ` C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`
  }
  return path
}

export function LineChart({
  data,
  height = 140,
  format,
  className,
}: LineChartProps) {
  const rawId = useId()
  const gradientId = `line-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`

  if (data.length < 2) return null

  const pad = { top: 18, right: 12, bottom: 16, left: 12 }
  const innerWidth = WIDTH - pad.left - pad.right
  const innerHeight = height - pad.top - pad.bottom
  const values = data.map((point) => point.value)
  const rawMin = Math.min(...values)
  const rawMax = Math.max(...values)
  const span = rawMax - rawMin || 1
  const min = rawMin - span * 0.25
  const max = rawMax + span * 0.2

  const points = data.map((point, index) => {
    const x = pad.left + (index * innerWidth) / (data.length - 1)
    const y = pad.top + (1 - (point.value - min) / (max - min)) * innerHeight
    return [x, y] as [number, number]
  })

  const line = smoothPath(points)
  const first = points[0]
  const last = points[points.length - 1]
  const bottom = height - pad.bottom
  const area = `${line} L ${last[0]} ${bottom} L ${first[0]} ${bottom} Z`
  const lastLabel = format
    ? format(data[data.length - 1].value)
    : String(data[data.length - 1].value)

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <svg viewBox={`0 0 ${WIDTH} ${height}`} className="block h-auto w-full">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(215,255,62,0.26)" />
            <stop offset="100%" stopColor="rgba(215,255,62,0)" />
          </linearGradient>
        </defs>

        {[0, 0.5, 1].map((ratio) => (
          <line
            key={ratio}
            x1={pad.left}
            x2={WIDTH - pad.right}
            y1={pad.top + innerHeight * ratio}
            y2={pad.top + innerHeight * ratio}
            className="stroke-white/6 [stroke-dasharray:3_4] [stroke-width:1]"
          />
        ))}

        <path d={area} fill={`url(#${gradientId})`} />
        <path
          d={line}
          className="fill-none stroke-primary stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
        />

        <circle
          cx={first[0]}
          cy={first[1]}
          r={2.5}
          className="fill-card stroke-white/35 [stroke-width:1.5]"
        />
        <circle
          cx={last[0]}
          cy={last[1]}
          r={4.5}
          className="fill-primary stroke-card [stroke-width:3]"
        />
        <text
          x={last[0] - 2}
          y={last[1] - 11}
          textAnchor="end"
          className="tabular fill-primary text-[10.5px] font-bold"
        >
          {lastLabel}
        </text>
      </svg>
      <div className="flex justify-between px-0.5 text-[9.5px] text-subtle">
        <span>{data[0].label}</span>
        <span>{data[Math.floor(data.length / 2)].label}</span>
        <span>{data[data.length - 1].label}</span>
      </div>
    </div>
  )
}
