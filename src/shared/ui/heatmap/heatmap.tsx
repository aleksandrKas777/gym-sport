import { cn } from '@/shared/lib/utils'

export type HeatmapProps = {
  weeks: number[][]
  className?: string
}

const LEVELS = [
  'bg-white/5',
  'bg-primary/22',
  'bg-primary/50',
  'bg-primary',
] as const

export function Heatmap({ weeks, className }: HeatmapProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-2.5',
        className,
      )}
    >
      <div className="grid grid-flow-col grid-rows-[repeat(7,18px)] auto-cols-[18px] gap-1">
        {weeks.map((week, weekIndex) =>
          week.map((level, dayIndex) => (
            <span
              key={`${weekIndex}-${dayIndex}`}
              title={`${level} тренировок`}
              className={cn(
                'block size-4.5 rounded-[5px]',
                LEVELS[Math.min(3, Math.max(0, level))],
              )}
            />
          )),
        )}
      </div>
      <div className="flex items-center gap-1 text-[9.5px] text-subtle">
        <span className="mr-0.75">Меньше</span>
        {LEVELS.map((level) => (
          <span key={level} className={cn('block size-2.75 rounded-[3px]', level)} />
        ))}
        <span className="ml-0.75">Больше</span>
      </div>
    </div>
  )
}
