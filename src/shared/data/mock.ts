import type {
  ChartPoint,
  Exercise,
  MuscleGroup,
  MuscleSlice,
  Period,
  PeriodStat,
  WorkoutExercise,
  WorkoutSession,
} from '../types'

export const MUSCLE_GROUPS: MuscleGroup[] = [
  'Грудь',
  'Спина',
  'Ноги',
  'Плечи',
  'Руки',
  'Пресс',
]

export const EXERCISES: Exercise[] = [
  {
    id: 'bench',
    name: 'Жим лёжа',
    muscle: 'Грудь',
    equipment: 'Штанга',
    defaultWeight: 82.5,
    defaultReps: 8,
    isRecord: true,
    delta: 5,
    recent: true,
  },
  {
    id: 'incline-db',
    name: 'Жим гантелей на наклонной',
    muscle: 'Грудь',
    equipment: 'Гантели',
    defaultWeight: 30,
    defaultReps: 10,
    delta: 2.5,
    recent: true,
  },
  {
    id: 'fly',
    name: 'Разводка гантелей',
    muscle: 'Грудь',
    equipment: 'Гантели',
    defaultWeight: 12,
    defaultReps: 12,
  },
  {
    id: 'pullup',
    name: 'Подтягивания',
    muscle: 'Спина',
    equipment: 'Свой вес',
    defaultWeight: 0,
    defaultReps: 10,
    isRecord: true,
    recent: true,
  },
  {
    id: 'row',
    name: 'Тяга штанги в наклоне',
    muscle: 'Спина',
    equipment: 'Штанга',
    defaultWeight: 60,
    defaultReps: 10,
    delta: 5,
  },
  {
    id: 'latpull',
    name: 'Тяга верхнего блока',
    muscle: 'Спина',
    equipment: 'Блок',
    defaultWeight: 55,
    defaultReps: 12,
    recent: true,
  },
  {
    id: 'squat',
    name: 'Приседания со штангой',
    muscle: 'Ноги',
    equipment: 'Штанга',
    defaultWeight: 100,
    defaultReps: 6,
    isRecord: true,
    delta: 10,
  },
  {
    id: 'legpress',
    name: 'Жим ногами',
    muscle: 'Ноги',
    equipment: 'Тренажёр',
    defaultWeight: 160,
    defaultReps: 12,
  },
  {
    id: 'rdl',
    name: 'Румынская тяга',
    muscle: 'Ноги',
    equipment: 'Штанга',
    defaultWeight: 90,
    defaultReps: 8,
  },
  {
    id: 'ohp',
    name: 'Жим стоя',
    muscle: 'Плечи',
    equipment: 'Штанга',
    defaultWeight: 40,
    defaultReps: 8,
    delta: 2.5,
  },
  {
    id: 'lateral',
    name: 'Махи гантелями в стороны',
    muscle: 'Плечи',
    equipment: 'Гантели',
    defaultWeight: 8,
    defaultReps: 15,
    recent: true,
  },
  {
    id: 'curl',
    name: 'Подъём на бицепс',
    muscle: 'Руки',
    equipment: 'Гантели',
    defaultWeight: 14,
    defaultReps: 12,
    delta: 2,
  },
  {
    id: 'tricep',
    name: 'Французский жим',
    muscle: 'Руки',
    equipment: 'Гантели',
    defaultWeight: 22,
    defaultReps: 12,
  },
  {
    id: 'plank',
    name: 'Планка',
    muscle: 'Пресс',
    equipment: 'Свой вес',
    defaultWeight: 0,
    defaultReps: 60,
  },
  {
    id: 'crunch',
    name: 'Скручивания на пресс',
    muscle: 'Пресс',
    equipment: 'Свой вес',
    defaultWeight: 0,
    defaultReps: 20,
  },
]

export const ACTIVE_WORKOUT: WorkoutSession = {
  id: 'session-active',
  title: 'Push · Верх тела',
  date: 'Среда, 26 ноября',
  duration: '48:12',
  volume: 3240,
  exercises: [
    {
      id: 'we-bench',
      exerciseId: 'bench',
      name: 'Жим лёжа',
      muscle: 'Грудь',
      equipment: 'Штанга',
      sets: [
        { id: 's1', weight: 80, reps: 8, done: true, previous: '80 × 8' },
        { id: 's2', weight: 82.5, reps: 8, done: true, previous: '80 × 8' },
        { id: 's3', weight: 85, reps: 6, done: true, previous: '82,5 × 7' },
      ],
    },
    {
      id: 'we-incline',
      exerciseId: 'incline-db',
      name: 'Жим гантелей на наклонной',
      muscle: 'Грудь',
      equipment: 'Гантели',
      sets: [
        { id: 's4', weight: 30, reps: 10, done: true, previous: '28 × 10' },
        { id: 's5', weight: 32.5, reps: 10, done: true, previous: '30 × 10' },
        { id: 's6', weight: 35, reps: 8, done: false, previous: '32,5 × 9' },
      ],
    },
    {
      id: 'we-fly',
      exerciseId: 'fly',
      name: 'Разводка гантелей',
      muscle: 'Грудь',
      equipment: 'Гантели',
      sets: [
        { id: 's7', weight: 12, reps: 15, done: false, previous: '12 × 15' },
        { id: 's8', weight: 12, reps: 15, done: false, previous: '12 × 14' },
      ],
    },
  ],
}

export const PERIOD_STATS: Record<
  Period,
  { tiles: PeriodStat[]; bars: ChartPoint[]; barTitle: string }
> = {
  week: {
    barTitle: 'Тоннаж по дням',
    tiles: [
      { id: 't', label: 'Тренировок', value: '4', delta: '+1', trend: 'up' },
      { id: 'v', label: 'Тоннаж', value: '24,8', unit: 'т', delta: '+12%', trend: 'up' },
      { id: 'd', label: 'Время', value: '6:20', unit: 'ч', delta: '+8%', trend: 'up' },
    ],
    bars: [
      { label: 'Пн', value: 0 },
      { label: 'Вт', value: 6.2 },
      { label: 'Ср', value: 7.1 },
      { label: 'Чт', value: 0 },
      { label: 'Пт', value: 8.4 },
      { label: 'Сб', value: 3.1 },
      { label: 'Вс', value: 0 },
    ],
  },
  month: {
    barTitle: 'Тоннаж по неделям',
    tiles: [
      { id: 't', label: 'Тренировок', value: '16', delta: '+3', trend: 'up' },
      { id: 'v', label: 'Тоннаж', value: '98,4', unit: 'т', delta: '+7%', trend: 'up' },
      { id: 'd', label: 'Время', value: '24:10', unit: 'ч', delta: '+5%', trend: 'up' },
    ],
    bars: [
      { label: '1 нед', value: 18.2 },
      { label: '2 нед', value: 24.8 },
      { label: '3 нед', value: 21.4 },
      { label: '4 нед', value: 34 },
    ],
  },
  year: {
    barTitle: 'Тоннаж по месяцам',
    tiles: [
      { id: 't', label: 'Тренировок', value: '178', delta: '+24', trend: 'up' },
      { id: 'v', label: 'Тоннаж', value: '1 240', unit: 'т', delta: '+18%', trend: 'up' },
      { id: 'd', label: 'Время', value: '268', unit: 'ч', delta: '+11%', trend: 'up' },
    ],
    bars: [
      { label: 'Янв', value: 78 },
      { label: 'Фев', value: 92 },
      { label: 'Мар', value: 104 },
      { label: 'Апр', value: 96 },
      { label: 'Май', value: 110 },
      { label: 'Июн', value: 102 },
      { label: 'Июл', value: 118 },
      { label: 'Авг', value: 124 },
      { label: 'Сен', value: 112 },
      { label: 'Окт', value: 96 },
      { label: 'Ноя', value: 88 },
      { label: 'Дек', value: 101 },
    ],
  },
}

export const BENCH_PROGRESS: ChartPoint[] = [
  { label: '4 окт', value: 72.5 },
  { label: '11 окт', value: 75 },
  { label: '18 окт', value: 75 },
  { label: '25 окт', value: 77.5 },
  { label: '1 ноя', value: 80 },
  { label: '8 ноя', value: 80 },
  { label: '15 ноя', value: 82.5 },
  { label: '22 ноя', value: 85 },
]

export const MUSCLE_SPLIT: MuscleSlice[] = [
  { label: 'Грудь', value: 32, color: '#d7ff3e' },
  { label: 'Спина', value: 26, color: '#60a5fa' },
  { label: 'Ноги', value: 22, color: '#a78bfa' },
  { label: 'Плечи', value: 12, color: '#fbbf24' },
  { label: 'Руки', value: 8, color: '#ff5a5f' },
]

/** 12 недель × 7 дней, 0–3 = интенсивность */
export const HEATMAP: number[][] = [
  [0, 2, 0, 3, 0, 1, 0],
  [1, 0, 2, 0, 0, 3, 0],
  [0, 3, 0, 2, 0, 1, 0],
  [2, 0, 1, 0, 3, 0, 0],
  [0, 2, 0, 3, 0, 2, 0],
  [0, 1, 0, 2, 0, 3, 0],
  [3, 0, 2, 0, 1, 0, 0],
  [0, 2, 0, 1, 0, 3, 0],
  [1, 0, 3, 0, 2, 0, 0],
  [0, 3, 0, 2, 0, 1, 0],
  [2, 0, 1, 0, 3, 0, 0],
  [0, 2, 0, 3, 0, 2, 0],
]

export const EXERCISE_HISTORY = [
  { date: '22 ноя', value: '85 кг × 6', tone: 'accent' as const },
  { date: '15 ноя', value: '82,5 кг × 8', tone: 'neutral' as const },
  { date: '8 ноя', value: '80 кг × 8', tone: 'neutral' as const },
]

export const toWorkoutExercise = (exercise: Exercise): WorkoutExercise => {
  return {
    id: `we-${exercise.id}-${Date.now()}`,
    exerciseId: exercise.id,
    name: exercise.name,
    muscle: exercise.muscle,
    equipment: exercise.equipment,
    sets: [
      {
        id: `set-${exercise.id}-${Date.now()}-1`,
        weight: exercise.defaultWeight,
        reps: exercise.defaultReps,
        done: false,
      },
      {
        id: `set-${exercise.id}-${Date.now()}-2`,
        weight: exercise.defaultWeight,
        reps: exercise.defaultReps,
        done: false,
      },
      {
        id: `set-${exercise.id}-${Date.now()}-3`,
        weight: exercise.defaultWeight,
        reps: exercise.defaultReps,
        done: false,
      },
    ],
  }
};
