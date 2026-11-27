import { createFileRoute } from '@tanstack/react-router'
import { ExercisesPage } from '@/features/exercises'

export const Route = createFileRoute('/exercises/')({
  component: ExercisesPage,
})
