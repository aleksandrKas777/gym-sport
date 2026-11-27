export type MuscleGroup =
  | 'Грудь'
  | 'Спина'
  | 'Ноги'
  | 'Плечи'
  | 'Руки'
  | 'Пресс'

export type Trend = 'up' | 'down' | 'flat'

export type Exercise = {
  id: string
  name: string
  muscle: MuscleGroup
  equipment: string
  defaultWeight: number
  defaultReps: number
  isRecord?: boolean
  delta?: number
  recent?: boolean
}

export type WorkoutSet = {
  id: string
  weight: number
  reps: number
  done: boolean
  previous?: string
}

export type WorkoutExercise = {
  id: string
  exerciseId: string
  name: string
  muscle: MuscleGroup
  equipment: string
  sets: WorkoutSet[]
}

export type WorkoutSession = {
  id: string
  title: string
  date: string
  duration: string
  volume: number
  exercises: WorkoutExercise[]
}

export type PeriodStat = {
  id: string
  label: string
  value: string
  unit?: string
  delta?: string
  trend: Trend
}

export type ChartPoint = {
  label: string
  value: number
}

export type MuscleSlice = {
  label: string
  value: number
  color: string
}

export type Period = 'week' | 'month' | 'year'
