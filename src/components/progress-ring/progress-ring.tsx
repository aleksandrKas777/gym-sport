import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type ProgressRingProps = {
  value: number
  size?: number
  stroke?: number
  tone?: 'primary' | 'success' | 'info' | 'warning' | 'danger'
  children?: ReactNode
  className?: string
}

const clamp = (value: number) => Math.min(100, Math.max(0, value))

const TONE_CLASSES = {
  primary: 'text-primary',
  success: 'text-success',
  info: 'text-info',
  warning: 'text-warning',
  danger: 'text-danger',
}

export const ProgressRing = ({
  value,
  size = 96,
  stroke = 8,
  tone = 'primary',
  children,
  className,
}: ProgressRingProps) => {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - clamp(value) / 100)

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(clamp(value))}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        'relative inline-grid shrink-0 place-items-center',
        TONE_CLASSES[tone],
        className,
      )}
      style={{ width: size, height: size } as CSSProperties}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="transition-[stroke-dashoffset] duration-400"
        />
      </svg>
      {children ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 text-center">
          {children}
        </div>
      ) : null}
    </div>
  )
};
