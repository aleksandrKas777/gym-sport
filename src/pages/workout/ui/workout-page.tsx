import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Check, CheckCheck, Ellipsis, Plus, Timer, Weight } from 'lucide-react'
import { toast } from 'sonner'
import {
  ACTIVE_WORKOUT,
  EXERCISES,
  MUSCLE_GROUPS,
  toWorkoutExercise,
} from '@/shared/data/mock'
import { formatNumber } from '@/shared/lib/format'
import type {
  Exercise,
  MuscleGroup,
  WorkoutExercise,
  WorkoutSet,
} from '@/shared/types'
import {
  BottomSheet,
  Button,
  Card,
  Chip,
  EmptyState,
  ExerciseCard,
  ExerciseRow,
  PageHeader,
  SearchField,
} from '@/shared/ui'

type RestState = {
  exerciseId: string
  left: number
  total: number
}

function StatPill({
  icon,
  value,
  label,
}: {
  icon: ReactNode
  value: string
  label: string
}) {
  return (
    <div className="flex min-w-0 items-center gap-1.75 rounded-[11px] border border-border bg-card/85 px-2.25 py-1.75">
      <span className="grid shrink-0 place-items-center text-primary">
        {icon}
      </span>
      <span className="flex min-w-0 flex-col">
        <strong className="tabular truncate text-[12.5px] leading-tight font-bold">
          {value}
        </strong>
        <span className="text-[8.5px] font-medium tracking-[0.06em] text-subtle uppercase">
          {label}
        </span>
      </span>
    </div>
  )
}

export function WorkoutPage() {
  const [exercises, setExercises] = useState<WorkoutExercise[]>(
    ACTIVE_WORKOUT.exercises,
  )
  const [rest, setRest] = useState<RestState | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [muscle, setMuscle] = useState<MuscleGroup | 'Все'>('Все')

  const restId = rest?.exerciseId

  useEffect(() => {
    if (!restId) return
    const interval = window.setInterval(() => {
      setRest((current) => {
        if (!current || current.left <= 1) return null
        return { ...current, left: current.left - 1 }
      })
    }, 1000)
    return () => window.clearInterval(interval)
  }, [restId])

  const doneSets = exercises.reduce(
    (sum, exercise) =>
      sum + exercise.sets.filter((set) => set.done).length,
    0,
  )
  const totalSets = exercises.reduce(
    (sum, exercise) => sum + exercise.sets.length,
    0,
  )
  const volume = exercises.reduce(
    (sum, exercise) =>
      sum +
      exercise.sets
        .filter((set) => set.done)
        .reduce((setSum, set) => setSum + set.weight * set.reps, 0),
    0,
  )

  const filteredExercises = useMemo(() => {
    const search = query.trim().toLowerCase()
    return EXERCISES.filter((exercise) => {
      const matchesMuscle = muscle === 'Все' || exercise.muscle === muscle
      const matchesQuery =
        !search ||
        exercise.name.toLowerCase().includes(search) ||
        exercise.equipment.toLowerCase().includes(search)
      return matchesMuscle && matchesQuery
    })
  }, [query, muscle])

  const addedIds = useMemo(
    () => new Set(exercises.map((exercise) => exercise.exerciseId)),
    [exercises],
  )

  const toggleSet = (exerciseId: string, setId: string) => {
    const target = exercises
      .find((exercise) => exercise.id === exerciseId)
      ?.sets.find((set) => set.id === setId)

    setExercises((current) =>
      current.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.map((set) =>
                set.id === setId ? { ...set, done: !set.done } : set,
              ),
            }
          : exercise,
      ),
    )

    if (target && !target.done) {
      setRest({ exerciseId, left: 90, total: 90 })
    } else if (rest?.exerciseId === exerciseId) {
      setRest(null)
    }
  }

  const changeSet = (
    exerciseId: string,
    setId: string,
    patch: Partial<Pick<WorkoutSet, 'weight' | 'reps'>>,
  ) => {
    setExercises((current) =>
      current.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.map((set) =>
                set.id === setId ? { ...set, ...patch } : set,
              ),
            }
          : exercise,
      ),
    )
  }

  const addSet = (exerciseId: string) => {
    setExercises((current) =>
      current.map((exercise) => {
        if (exercise.id !== exerciseId) return exercise
        const last = exercise.sets[exercise.sets.length - 1]
        const nextIndex = exercise.sets.length + 1
        return {
          ...exercise,
          sets: [
            ...exercise.sets,
            {
              id: `${exercise.id}-set-${nextIndex}-${Date.now()}`,
              weight: last?.weight ?? 0,
              reps: last?.reps ?? 10,
              done: false,
            },
          ],
        }
      }),
    )
  }

  const addRest = (exerciseId: string) => {
    setRest((current) =>
      current && current.exerciseId === exerciseId
        ? { ...current, left: current.left + 30, total: current.total + 30 }
        : current,
    )
  }

  const addExercise = (exercise: Exercise) => {
    if (addedIds.has(exercise.id)) return
    setExercises((current) => [...current, toWorkoutExercise(exercise)])
    setSheetOpen(false)
    setQuery('')
    setMuscle('Все')
    toast.success('Упражнение добавлено', {
      description: exercise.name,
    })
  }

  const closeSheet = () => {
    setSheetOpen(false)
    setQuery('')
    setMuscle('Все')
  }

  return (
    <div className="screen-glow flex h-full min-h-0 flex-col">
      <PageHeader
        eyebrow={ACTIVE_WORKOUT.date}
        title={ACTIVE_WORKOUT.title}
        action={
          <Button
            variant="secondary"
            size="icon"
            aria-label="Настройки тренировки"
          >
            <Ellipsis size={18} />
          </Button>
        }
      >
        <div className="grid grid-cols-3 gap-1.75">
          <StatPill
            icon={<Timer size={14} />}
            value={ACTIVE_WORKOUT.duration}
            label="время"
          />
          <StatPill
            icon={<Weight size={14} />}
            value={`${formatNumber(volume)} кг`}
            label="тоннаж"
          />
          <StatPill
            icon={<CheckCheck size={14} />}
            value={`${doneSets} / ${totalSets}`}
            label="подходы"
          />
        </div>
      </PageHeader>

      <div className="scroll-y min-h-0 flex-1">
        <div className="flex flex-col gap-2.5 px-4 pt-0.5 pb-6">
          <div className="flex items-baseline justify-between gap-2 px-0.5 pb-0.5">
            <span className="eyebrow">Упражнения</span>
            <span className="text-[10.5px] text-subtle">
              {exercises.length} в тренировке
            </span>
          </div>

          {exercises.map((exercise, index) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              index={index + 1}
              rest={rest?.exerciseId === exercise.id ? rest : null}
              onToggleSet={(setId) => toggleSet(exercise.id, setId)}
              onChangeSet={(setId, patch) =>
                changeSet(exercise.id, setId, patch)
              }
              onAddSet={() => addSet(exercise.id)}
              onAddRest={() => addRest(exercise.id)}
            />
          ))}

          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => setSheetOpen(true)}
          >
            <Plus size={17} strokeWidth={2.5} />
            Добавить упражнение
          </Button>

          <div className="mt-1 flex flex-col gap-1.75">
            <Button
              size="lg"
              className="w-full"
              onClick={() =>
                toast.success('Тренировка сохранена', {
                  description: `${formatNumber(volume)} кг · ${doneSets} подходов`,
                })
              }
            >
              <Check size={18} strokeWidth={3} />
              Завершить тренировку
            </Button>
            <p className="text-center text-[10.5px] text-subtle">
              Результат сохранится в историю и статистику
            </p>
          </div>
        </div>
      </div>

      <BottomSheet
        open={sheetOpen}
        onOpenChange={(open) => (open ? setSheetOpen(true) : closeSheet())}
        title="Добавить упражнение"
      >
        <SearchField
          value={query}
          onValueChange={setQuery}
          placeholder="Жим, тяга, присед…"
        />

        <div className="no-scrollbar -mx-4 flex shrink-0 gap-1.5 overflow-x-auto px-4">
          <Chip selected={muscle === 'Все'} onClick={() => setMuscle('Все')}>
            Все
          </Chip>
          {MUSCLE_GROUPS.map((group) => (
            <Chip
              key={group}
              selected={muscle === group}
              onClick={() => setMuscle(group)}
            >
              {group}
            </Chip>
          ))}
        </div>

        {filteredExercises.length > 0 ? (
          <Card className="gap-0 overflow-hidden p-0">
            <div className="divide-y divide-border">
              {filteredExercises.map((exercise) => (
                <ExerciseRow
                  key={exercise.id}
                  exercise={exercise}
                  added={addedIds.has(exercise.id)}
                  onClick={() => addExercise(exercise)}
                />
              ))}
            </div>
          </Card>
        ) : (
          <EmptyState
            title="Ничего не найдено"
            description="Попробуй другое название или сбрось фильтр по группе мышц."
          />
        )}
      </BottomSheet>
    </div>
  )
}
