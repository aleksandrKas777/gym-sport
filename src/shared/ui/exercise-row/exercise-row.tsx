import { Check, ChevronRight, Dumbbell } from 'lucide-react'
import type { Exercise } from '@/shared/types'
import { Badge } from '@/shared/ui/badge'
import { cn } from '@/shared/lib/utils'

export type ExerciseRowProps = {
  exercise: Exercise
  added?: boolean
  onClick?: () => void
  className?: string
}

export function ExerciseRow({
  exercise,
  added = false,
  onClick,
  className,
}: ExerciseRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 px-3.5 py-3 text-left transition-colors hover:bg-white/[0.035] active:bg-white/6',
        className,
      )}
    >
      <span className="grid size-9.5 shrink-0 place-items-center rounded-[11px] border border-border bg-secondary text-muted-foreground">
        <Dumbbell size={17} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="flex min-w-0 items-center gap-1.5">
          <span className="truncate text-[13.5px] font-semibold">
            {exercise.name}
          </span>
          {exercise.isRecord ? <Badge variant="accent">Рекорд</Badge> : null}
        </span>
        <span className="truncate text-[11px] text-subtle">
          {exercise.muscle} · {exercise.equipment}
        </span>
      </span>
      {added ? (
        <span className="grid size-6.5 shrink-0 place-items-center rounded-full bg-primary/12 text-primary">
          <Check size={15} strokeWidth={3} />
        </span>
      ) : exercise.delta ? (
        <Badge variant="success">
          +{String(exercise.delta).replace('.', ',')} кг
        </Badge>
      ) : (
        <ChevronRight size={16} className="shrink-0 text-subtle" />
      )}
    </button>
  )
}
