import { useMemo, useState } from 'react'
import { Dumbbell, Plus, Trophy } from 'lucide-react'
import {
  EXERCISE_HISTORY,
  EXERCISES,
  MUSCLE_GROUPS,
} from '@/shared/data/mock'
import { formatWeight } from '@/shared/lib/format'
import type { Exercise, MuscleGroup } from '@/shared/types'
import {
  Badge,
  BottomSheet,
  Button,
  Card,
  Chip,
  EmptyState,
  ExerciseRow,
  PageHeader,
  SearchField,
  SectionHead,
} from '@/shared/ui'

export function ExercisesPage() {
  const [query, setQuery] = useState('')
  const [muscle, setMuscle] = useState<MuscleGroup | 'Все'>('Все')
  const [selected, setSelected] = useState<Exercise | null>(null)

  const recent = useMemo(
    () => EXERCISES.filter((exercise) => exercise.recent),
    [],
  )

  const filtered = useMemo(() => {
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

  const showRecent = muscle === 'Все' && !query.trim()

  return (
    <div className="screen-glow flex h-full min-h-0 flex-col">
      <PageHeader
        eyebrow="Библиотека"
        title="Упражнения"
        action={
          <Button
            variant="secondary"
            size="icon"
            aria-label="Создать упражнение"
          >
            <Plus size={19} />
          </Button>
        }
      >
        <SearchField value={query} onValueChange={setQuery} />
        <div className="no-scrollbar -mx-4 flex shrink-0 gap-1.5 overflow-x-auto px-4 pb-0.5">
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
      </PageHeader>

      <div className="scroll-y min-h-0 flex-1">
        <div className="flex flex-col gap-4 px-4 pt-1.5 pb-6">
          {showRecent ? (
            <section className="flex flex-col gap-2">
              <SectionHead
                title="Недавние"
                subtitle={`${recent.length} упражнений`}
              />
              <Card className="gap-0 overflow-hidden p-0">
                <div className="divide-y divide-border">
                  {recent.map((exercise) => (
                    <ExerciseRow
                      key={exercise.id}
                      exercise={exercise}
                      onClick={() => setSelected(exercise)}
                    />
                  ))}
                </div>
              </Card>
            </section>
          ) : null}

          <section className="flex flex-col gap-2">
            <SectionHead
              title={muscle === 'Все' ? 'Все упражнения' : muscle}
              subtitle={`${filtered.length} из ${EXERCISES.length}`}
            />
            {filtered.length > 0 ? (
              <Card className="gap-0 overflow-hidden p-0">
                <div className="divide-y divide-border">
                  {filtered.map((exercise) => (
                    <ExerciseRow
                      key={exercise.id}
                      exercise={exercise}
                      onClick={() => setSelected(exercise)}
                    />
                  ))}
                </div>
              </Card>
            ) : (
              <EmptyState
                icon={<Dumbbell size={20} />}
                title="Упражнений не найдено"
                description="Измени запрос или создай новое упражнение в библиотеке."
                action={
                  <Button
                    size="sm"
                    variant="secondary"
                    className="gap-1.5"
                  >
                    <Plus size={14} />
                    Создать упражнение
                  </Button>
                }
              />
            )}
          </section>
        </div>
      </div>

      <BottomSheet
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null)
        }}
        title="Упражнение"
      >
        {selected ? (
          <>
            <div className="flex items-center gap-3">
              <span className="grid size-11.5 shrink-0 place-items-center rounded-[13px] border border-primary/35 bg-primary/12 text-primary">
                <Dumbbell size={22} />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-base font-semibold">
                  {selected.name}
                </h3>
                <p className="mt-0.5 text-[11.5px] text-subtle">
                  {selected.muscle} · {selected.equipment}
                </p>
              </div>
              {selected.isRecord ? (
                <Badge variant="accent" className="gap-1">
                  <Trophy size={11} />
                  Рекорд
                </Badge>
              ) : null}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-0.75 rounded-[14px] border border-border bg-secondary px-3 py-2.75">
                <span className="text-[9px] font-semibold tracking-[0.07em] text-subtle uppercase">
                  Рабочий вес
                </span>
                <span className="tabular text-sm font-semibold">
                  {selected.defaultWeight > 0
                    ? `${formatWeight(selected.defaultWeight)} кг`
                    : 'Свой вес'}
                </span>
              </div>
              <div className="flex flex-col gap-0.75 rounded-[14px] border border-border bg-secondary px-3 py-2.75">
                <span className="text-[9px] font-semibold tracking-[0.07em] text-subtle uppercase">
                  Повторений
                </span>
                <span className="tabular text-sm font-semibold">
                  × {selected.defaultReps}
                </span>
              </div>
            </div>

            <Card className="gap-0 overflow-hidden p-0">
              <div className="px-3.5 pt-3 pb-2.5">
                <SectionHead
                  title="Последние результаты"
                  subtitle="Из истории тренировок"
                />
              </div>
              <div className="divide-y divide-border">
                {EXERCISE_HISTORY.map((entry) => (
                  <div
                    key={entry.date}
                    className="flex items-center gap-2.5 px-3.5 py-2.5"
                  >
                    <span className="tabular w-12 shrink-0 text-[11px] text-subtle">
                      {entry.date}
                    </span>
                    <span className="tabular flex-1 text-[12.5px] font-semibold">
                      {entry.value}
                    </span>
                    {entry.tone === 'accent' ? (
                      <Badge variant="accent">Лучший</Badge>
                    ) : null}
                  </div>
                ))}
              </div>
            </Card>

            <Button
              className="w-full"
              onClick={() => {
                setSelected(null)
              }}
            >
              <Plus size={16} />
              Добавить в тренировку
            </Button>
          </>
        ) : null}
      </BottomSheet>
    </div>
  )
}
