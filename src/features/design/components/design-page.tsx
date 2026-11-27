import { useState } from 'react'
import type { ReactNode } from 'react'
import {
  Check,
  Dumbbell,
  Flame,
  LoaderCircle,
  Moon,
  Plus,
  Timer,
  Trash,
} from 'lucide-react'
import { toast } from 'sonner'
import {
  ACTIVE_WORKOUT,
  BENCH_PROGRESS,
  EXERCISES,
  HEATMAP,
  MUSCLE_SPLIT,
  PERIOD_STATS,
} from '@/lib/mock'
import { formatClock, formatWeight } from '@/lib/format'
import type {
  MuscleGroup,
  Period,
  WorkoutExercise,
  WorkoutSet,
} from '@/types'
import {
  Badge,
  BarChart,
  BottomSheet,
  Button,
  Card,
  Checkbox,
  Chip,
  Donut,
  EmptyState,
  ExerciseCard,
  ExerciseRow,
  Heatmap,
  IconButton,
  Input,
  Label,
  LineChart,
  NumberStepper,
  PageHeader,
  Progress,
  ProgressRing,
  SearchField,
  SegmentedControl,
  SetRow,
  StatTile,
  Switch,
} from '@/components'

const COLORS = [
  { name: 'background', value: '#0B0C0E' },
  { name: 'card', value: '#14161A' },
  { name: 'secondary', value: '#1B1E24' },
  { name: 'border', value: '#262A31' },
  { name: 'foreground', value: '#F5F7FA' },
  { name: 'muted', value: '#9AA1AC' },
  { name: 'primary', value: '#D7FF3E' },
  { name: 'success', value: '#4ADE80' },
  { name: 'warning', value: '#FBBF24' },
  { name: 'danger', value: '#FF5A5F' },
  { name: 'info', value: '#60A5FA' },
  { name: 'violet', value: '#A78BFA' },
]

const TYPE_ROWS = [
  {
    sample: 'Тренировка',
    spec: 'display · 27 / 700',
    className: 'text-[27px] leading-[1.1] font-bold tracking-[-0.03em]',
  },
  {
    sample: 'Верх тела',
    spec: 'h1 · 22 / 700',
    className: 'text-[22px] leading-tight font-bold tracking-[-0.02em]',
  },
  {
    sample: 'Жим лёжа',
    spec: 'h2 · 16 / 600',
    className: 'text-base font-semibold',
  },
  {
    sample: 'Добавь подход и отметь выполнение',
    spec: 'body · 14 / 400',
    className: 'text-sm text-muted-foreground',
  },
  {
    sample: 'Прошлый раз: 80 кг × 8',
    spec: 'caption · 11 / 400',
    className: 'text-[11px] text-subtle',
  },
  {
    sample: 'Среда, 26 ноября',
    spec: 'overline · 10 / 600',
    className:
      'text-[10px] font-semibold tracking-[0.16em] text-subtle uppercase',
  },
]

const RADII = [
  { label: '6', value: 6 },
  { label: '10', value: 10 },
  { label: '14', value: 14 },
  { label: '18', value: 18 },
  { label: '24', value: 24 },
  { label: 'pill', value: 999 },
]

const PERIOD_OPTIONS: { value: Period; label: string }[] = [
  { value: 'week', label: 'Неделя' },
  { value: 'month', label: 'Месяц' },
  { value: 'year', label: 'Год' },
]

const KitSection = ({
  index,
  title,
  hint,
  children,
}: {
  index: string
  title: string
  hint?: string
  children: ReactNode
}) => {
  return (
    <section className="flex flex-col gap-2.5 border-t border-border pt-5 first:border-t-0 first:pt-0">
      <div className="flex items-start gap-2.5">
        <span className="pt-0.5 font-mono text-[9.5px] font-semibold text-primary">
          {index}
        </span>
        <div>
          <h2 className="text-[15px] leading-tight font-bold tracking-[-0.01em]">
            {title}
          </h2>
          {hint ? (
            <p className="mt-0.5 text-[10.5px] text-subtle">{hint}</p>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col gap-2.5">{children}</div>
    </section>
  )
};

export const DesignPage = () => {
  const [chip, setChip] = useState<MuscleGroup | 'Все'>('Грудь')
  const [search, setSearch] = useState('')
  const [title, setTitle] = useState('Push · Верх тела')
  const [weight, setWeight] = useState(82.5)
  const [reps, setReps] = useState(8)
  const [checked, setChecked] = useState(true)
  const [sound, setSound] = useState(true)
  const [period, setPeriod] = useState<Period>('month')
  const [demoSet, setDemoSet] = useState<WorkoutSet>({
    id: 'kit-set',
    weight: 85,
    reps: 6,
    done: true,
  })
  const [exercise, setExercise] = useState<WorkoutExercise>(
    ACTIVE_WORKOUT.exercises[2],
  )
  const [sheetOpen, setSheetOpen] = useState(false)
  const [restDuration, setRestDuration] = useState(90)

  return (
    <div className="screen-glow flex h-full min-h-0 flex-col">
      <PageHeader eyebrow="Дизайн-система" title="GYM · UI-кит">
        <p className="max-w-80 text-[11.5px] leading-relaxed text-subtle">
          Токены, компоненты и все состояния. Tailwind CSS v4, shadcn/ui на Base
          UI, мобильный первый.
        </p>
      </PageHeader>

      <div className="scroll-y min-h-0 flex-1">
        <div className="flex flex-col gap-5.5 px-4 pt-1 pb-10">
          <KitSection index="01" title="Цвета" hint="Палитра темы и семантика">
            <div className="grid grid-cols-3 gap-x-2.25 gap-y-2.5">
              {COLORS.map((color) => (
                <div key={color.name} className="flex min-w-0 flex-col gap-0.75">
                  <span
                    className="mb-0.5 block h-10 rounded-[10px] border border-white/8"
                    style={{ background: color.value }}
                  />
                  <span className="truncate text-[10.5px] font-medium text-muted-foreground">
                    {color.name}
                  </span>
                  <span className="font-mono text-[9px] text-subtle">
                    {color.value}
                  </span>
                </div>
              ))}
            </div>
          </KitSection>

          <KitSection
            index="02"
            title="Типографика"
            hint="Системный шрифт, tabular-nums для цифр"
          >
            <Card className="gap-0 divide-y divide-border overflow-hidden p-0">
              {TYPE_ROWS.map((row) => (
                <div
                  key={row.spec}
                  className="flex flex-col gap-0.75 px-3.5 py-3"
                >
                  <span className={row.className}>{row.sample}</span>
                  <span className="font-mono text-[9px] text-subtle">
                    {row.spec}
                  </span>
                </div>
              ))}
            </Card>
          </KitSection>

          <KitSection
            index="03"
            title="Радиусы и отступы"
            hint="4 · 8 · 12 · 16 · 24 · 32 · 40"
          >
            <Card className="flex flex-wrap gap-3.5 p-3.5">
              {RADII.map((radius) => (
                <div
                  key={radius.label}
                  className="flex flex-col items-center gap-1.25"
                >
                  <span
                    className="block size-8 border border-input bg-secondary"
                    style={{ borderRadius: radius.value }}
                  />
                  <span className="font-mono text-[8.5px] text-subtle">
                    {radius.label}
                  </span>
                </div>
              ))}
            </Card>
          </KitSection>

          <KitSection
            index="04"
            title="Кнопки"
            hint="Варианты, размеры и состояния"
          >
            <div className="grid grid-cols-2 gap-2">
              <Button>
                <Dumbbell size={16} />
                Начать
              </Button>
              <Button variant="secondary">
                <Plus size={16} />
                Подход
              </Button>
              <Button variant="ghost">Отменить</Button>
              <Button variant="destructive">
                <Trash size={15} />
                Удалить
              </Button>
            </div>
            <Button disabled className="w-full">
              <LoaderCircle className="animate-spin" />
              Сохраняем…
            </Button>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm">Small</Button>
              <Button size="default">Medium</Button>
              <Button size="lg">Large</Button>
              <Button disabled>Disabled</Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <IconButton label="Добавить" variant="secondary" size="icon">
                <Plus size={18} />
              </IconButton>
              <IconButton label="Таймер" variant="ghost" size="icon">
                <Timer size={18} />
              </IconButton>
              <IconButton
                label="Начать тренировку"
                variant="default"
                size="icon"
              >
                <Dumbbell size={18} />
              </IconButton>
              <IconButton label="Тема" variant="secondary" size="icon-lg">
                <Moon size={18} />
              </IconButton>
            </div>
          </KitSection>

          <KitSection
            index="05"
            title="Чипы и бейджи"
            hint="Фильтры групп мышц и статусы"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Chip
                selected={chip === 'Грудь'}
                onClick={() => setChip('Грудь')}
              >
                <Dumbbell size={12} />
                Грудь
              </Chip>
              <Chip
                selected={chip === 'Спина'}
                onClick={() => setChip('Спина')}
              >
                Спина
              </Chip>
              <Chip
                selected={chip === 'Ноги'}
                onClick={() => setChip('Ноги')}
              >
                Ноги
              </Chip>
              <Chip icon={<Plus size={12} />} onClick={() => setChip('Все')}>
                Добавить
              </Chip>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge>3 подхода</Badge>
              <Badge variant="accent">Рекорд</Badge>
              <Badge variant="success">+5 кг</Badge>
              <Badge variant="warning">Отдых</Badge>
              <Badge variant="danger">Пропуск</Badge>
              <Badge variant="info">Новое</Badge>
              <Badge variant="outline">Черновик</Badge>
            </div>
          </KitSection>

          <KitSection
            index="06"
            title="Поля ввода"
            hint="Текст, поиск, степперы, переключатели"
          >
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="kit-title"
                className="text-[10.5px] font-semibold tracking-[0.08em] text-subtle uppercase"
              >
                Название тренировки
              </Label>
              <div className="relative">
                <Dumbbell
                  size={16}
                  className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-subtle"
                />
                <Input
                  id="kit-title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="pl-10"
                />
              </div>
              <span className="text-[11.5px] text-subtle">
                Видно только тебе
              </span>
            </div>

            <SearchField
              value={search}
              onValueChange={setSearch}
              placeholder="Найти упражнение"
            />

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1.5">
                <span className="text-[9.5px] font-semibold tracking-[0.08em] text-subtle uppercase">
                  Вес, кг
                </span>
                <NumberStepper
                  value={weight}
                  onChange={setWeight}
                  step={2.5}
                  max={300}
                  format={formatWeight}
                  unit="кг"
                  label="вес"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[9.5px] font-semibold tracking-[0.08em] text-subtle uppercase">
                  Повторы
                </span>
                <NumberStepper
                  value={reps}
                  onChange={setReps}
                  min={1}
                  max={50}
                  unit="раз"
                  label="повторы"
                />
              </div>
            </div>

            <Card className="gap-3.5">
              <div className="flex items-start gap-2.5">
                <Checkbox
                  id="kit-warmup"
                  checked={checked}
                  onCheckedChange={(next) => setChecked(Boolean(next))}
                />
                <div className="flex flex-col gap-0.5">
                  <Label
                    htmlFor="kit-warmup"
                    className="text-[13.5px] font-medium"
                  >
                    Записывать разминку
                  </Label>
                  <span className="text-[11.5px] text-subtle">
                    Дополнительные лёгкие подходы
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <Label
                    htmlFor="kit-sound"
                    className="text-[13.5px] font-medium"
                  >
                    Звук таймера
                  </Label>
                  <span className="text-[11.5px] text-subtle">
                    Сигнал в конце отдыха
                  </span>
                </div>
                <Switch
                  id="kit-sound"
                  checked={sound}
                  onCheckedChange={(next) => setSound(Boolean(next))}
                />
              </div>
            </Card>

            <SegmentedControl
              options={PERIOD_OPTIONS}
              value={period}
              onChange={setPeriod}
            />
          </KitSection>

          <KitSection
            index="07"
            title="Данные"
            hint="Метрики, прогресс и истории"
          >
            <div className="grid grid-cols-3 gap-1.75">
              <StatTile label="Тренировок" value="16" delta="+3" trend="up" />
              <StatTile
                label="Тоннаж"
                value="98,4"
                unit="т"
                delta="+7%"
                trend="up"
              />
              <StatTile
                label="Время"
                value="24:10"
                unit="ч"
                delta="+5%"
                trend="up"
              />
            </div>

            <Card className="gap-1.75">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[9.5px] font-semibold tracking-[0.08em] text-subtle uppercase">
                  План недели
                </span>
                <span className="tabular text-[11px] font-semibold text-muted-foreground">
                  62%
                </span>
              </div>
              <Progress value={62} />
            </Card>

            <Card className="flex-row items-center gap-3.5">
              <ProgressRing value={66} size={92} stroke={9}>
                <strong className="tabular text-[17px] font-bold tracking-[-0.02em]">
                  4/6
                </strong>
                <span className="text-[9px] font-medium tracking-[0.08em] text-subtle uppercase">
                  нед.
                </span>
              </ProgressRing>
              <div className="flex min-w-0 flex-col gap-1">
                <p className="text-[12.5px] font-semibold">Серия 5 недель</p>
                <p className="text-[10.5px] leading-relaxed text-subtle">
                  Ещё две тренировки до цели. Лучший месяц — август, 124 т.
                </p>
              </div>
            </Card>

            <Card className="gap-0 p-2.5">
              <SetRow
                index={3}
                set={demoSet}
                onToggle={() =>
                  setDemoSet((current) => ({
                    ...current,
                    done: !current.done,
                  }))
                }
                onChange={(patch) =>
                  setDemoSet((current) => ({ ...current, ...patch }))
                }
              />
            </Card>

            <Card className="gap-0 divide-y divide-border overflow-hidden p-0">
              <ExerciseRow exercise={EXERCISES[0]} onClick={() => undefined} />
              <ExerciseRow exercise={EXERCISES[12]} onClick={() => undefined} />
            </Card>

            <EmptyState
              icon={<Flame size={20} />}
              title="Пока нет тренировок"
              description="Начни первую тренировку — статистика появится автоматически."
              action={
                <Button size="sm">
                  <Plus size={14} />
                  Создать тренировку
                </Button>
              }
            />

            <ExerciseCard
              exercise={exercise}
              index={3}
              onToggleSet={(setId) =>
                setExercise((current) => ({
                  ...current,
                  sets: current.sets.map((set) =>
                    set.id === setId ? { ...set, done: !set.done } : set,
                  ),
                }))
              }
              onChangeSet={(setId, patch) =>
                setExercise((current) => ({
                  ...current,
                  sets: current.sets.map((set) =>
                    set.id === setId ? { ...set, ...patch } : set,
                  ),
                }))
              }
              onAddSet={() =>
                setExercise((current) => ({
                  ...current,
                  sets: [
                    ...current.sets,
                    {
                      id: `kit-${current.sets.length}-${Date.now()}`,
                      weight:
                        current.sets[current.sets.length - 1]?.weight ?? 12,
                      reps: 15,
                      done: false,
                    },
                  ],
                }))
              }
            />
          </KitSection>

          <KitSection index="08" title="Графики" hint="SVG без зависимостей">
            <Card className="gap-2.5">
              <p className="text-xs font-semibold text-muted-foreground">
                Тоннаж по неделям
              </p>
              <BarChart
                data={PERIOD_STATS.month.bars}
                height={132}
                highlight={3}
                format={(value) =>
                  `${value.toFixed(1).replace('.', ',')} т`
                }
              />
            </Card>
            <Card className="gap-2.5">
              <p className="text-xs font-semibold text-muted-foreground">
                Жим лёжа · рабочий вес
              </p>
              <LineChart
                data={BENCH_PROGRESS}
                height={132}
                format={(value) => `${String(value).replace('.', ',')} кг`}
              />
            </Card>
            <Card className="gap-2.5">
              <p className="text-xs font-semibold text-muted-foreground">
                Группы мышц
              </p>
              <div className="flex items-center gap-4">
                <Donut
                  segments={MUSCLE_SPLIT}
                  size={110}
                  centerValue="32%"
                  centerLabel="грудь"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-1.75">
                  {MUSCLE_SPLIT.map((slice) => (
                    <div
                      key={slice.label}
                      className="flex items-center gap-2 text-[11.5px] text-muted-foreground"
                    >
                      <span
                        className="size-2 shrink-0 rounded-[3px]"
                        style={{ background: slice.color }}
                      />
                      <span>{slice.label}</span>
                      <strong className="tabular ml-auto font-semibold text-foreground">
                        {slice.value}%
                      </strong>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            <Card className="gap-2.5">
              <p className="text-xs font-semibold text-muted-foreground">
                Регулярность
              </p>
              <Heatmap weeks={HEATMAP} />
            </Card>
          </KitSection>

          <KitSection
            index="09"
            title="Оверлеи"
            hint="Bottom sheet и Sonner-уведомления"
          >
            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" onClick={() => setSheetOpen(true)}>
                Открыть sheet
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  toast.success('Тренировка сохранена', {
                    description: '12 подходов · 3 240 кг',
                  })
                }
              >
                Показать тост
              </Button>
            </div>
            <Button
              variant="ghost"
              onClick={() =>
                toast.error('Нет соединения', {
                  description: 'Изменения сохранены локально',
                })
              }
            >
              Ошибка сети
            </Button>
          </KitSection>
        </div>
      </div>

      <BottomSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title="Таймер отдыха"
      >
        <div className="flex flex-col items-center gap-2 py-1.5">
          <ProgressRing value={65} size={124} stroke={10}>
            <strong className="tabular text-xl font-bold tracking-[-0.01em]">
              {formatClock(restDuration)}
            </strong>
            <span className="text-[9px] font-medium tracking-[0.08em] text-subtle uppercase">
              отдых
            </span>
          </ProgressRing>
          <p className="text-center text-[11px] leading-relaxed text-subtle">
            Следующий подход: жим лёжа, 85 кг × 6
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[9.5px] font-semibold tracking-[0.08em] text-subtle uppercase">
            Длительность, сек
          </span>
          <NumberStepper
            value={restDuration}
            onChange={setRestDuration}
            step={15}
            min={15}
            max={300}
            unit="сек"
            label="длительность отдыха"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-[13.5px] font-medium">Автостарт</span>
            <span className="text-[11.5px] text-subtle">
              Начинать отдых при отметке подхода
            </span>
          </div>
          <Switch
            checked={sound}
            onCheckedChange={(next) => setSound(Boolean(next))}
          />
        </div>

        <Button className="w-full" onClick={() => setSheetOpen(false)}>
          <Check size={16} strokeWidth={3} />
          Продолжить тренировку
        </Button>
      </BottomSheet>
    </div>
  )
};
