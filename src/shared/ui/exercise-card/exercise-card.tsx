import { Check, Ellipsis, Plus, Timer } from 'lucide-react'
import type { WorkoutExercise } from '@/shared/types'
import { formatClock } from '@/shared/lib/format'
import { IconButton } from '@/shared/ui/icon-button'
import { Card } from '@/shared/ui/card'
import { Progress } from '@/shared/ui/progress'
import { SetRow } from '@/shared/ui/set-row'
import { cn } from '@/shared/lib/utils'

export type ExerciseCardProps = {
  exercise: WorkoutExercise
  index: number
  rest?: { left: number; total: number } | null
  onToggleSet: (setId: string) => void
  onChangeSet: (
    setId: string,
    patch: Partial<{ weight: number; reps: number }>,
  ) => void
  onAddSet: () => void
  onAddRest?: () => void
  className?: string
}

export const ExerciseCard = ({
  exercise,
  index,
  rest,
  onToggleSet,
  onChangeSet,
  onAddSet,
  onAddRest,
  className,
}: ExerciseCardProps) => {
  const completed =
    exercise.sets.length > 0 && exercise.sets.every((set) => set.done)
  const doneCount = exercise.sets.filter((set) => set.done).length

  return (
    <Card className={cn('gap-2.5', className)}>
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            'grid size-7 shrink-0 place-items-center rounded-[9px] border border-border bg-secondary font-mono text-[10.5px] font-semibold text-subtle',
            completed && 'border-primary bg-primary text-primary-foreground',
          )}
        >
          {completed ? (
            <Check size={13} strokeWidth={3} />
          ) : (
            String(index).padStart(2, '0')
          )}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[14.5px] font-semibold">
            {exercise.name}
          </h3>
          <p className="truncate text-[11px] text-subtle">
            {exercise.muscle} · {exercise.equipment} · {doneCount}/
            {exercise.sets.length}
          </p>
        </div>
        <IconButton
          label="Действия с упражнением"
          variant="ghost"
          size="icon-sm"
        >
          <Ellipsis size={18} />
        </IconButton>
      </div>

      {rest ? (
        <div className="rounded-[10px] border border-primary/35 bg-[linear-gradient(120deg,rgba(215,255,62,0.10),rgba(215,255,62,0.02))] px-3 pt-2.5 pb-3">
          <div className="mb-2 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1.25 text-[10.5px] font-semibold tracking-[0.06em] text-muted-foreground uppercase">
              <Timer size={13} />
              Отдых
            </span>
            <strong className="tabular ml-auto text-sm font-bold tracking-[0.02em] text-primary">
              {formatClock(rest.left)}
            </strong>
            <button
              type="button"
              onClick={onAddRest}
              className="h-5.5 rounded-md bg-primary/12 px-1.75 text-[10.5px] font-semibold text-primary transition-colors hover:bg-primary/20"
            >
              +30 с
            </button>
          </div>
          <Progress value={(rest.left / rest.total) * 100} />
        </div>
      ) : null}

      <div className="grid grid-cols-[18px_minmax(0,1fr)_minmax(0,1fr)_40px] gap-2 py-0.5 text-[9px] font-semibold tracking-[0.08em] text-subtle uppercase">
        <span className="text-center">#</span>
        <span className="text-center">Вес, кг</span>
        <span className="text-center">Повторы</span>
        <span />
      </div>

      <div className="flex flex-col gap-1.5">
        {exercise.sets.map((set, setIndex) => (
          <SetRow
            key={set.id}
            index={setIndex + 1}
            set={set}
            onToggle={() => onToggleSet(set.id)}
            onChange={(patch) => onChangeSet(set.id, patch)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onAddSet}
        className="mt-0.5 flex h-9 w-full items-center justify-center gap-1.5 rounded-[10px] border border-dashed border-input text-[12.5px] font-medium text-muted-foreground transition-colors hover:border-primary/35 hover:bg-primary/4 hover:text-primary"
      >
        <Plus size={14} strokeWidth={2.5} />
        Добавить подход
      </button>
    </Card>
  )
};
