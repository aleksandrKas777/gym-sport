import { createFileRoute } from '@tanstack/react-router'
import { WorkoutPage } from '@/features/workout'

export const Route = createFileRoute('/workout/')({
  component: WorkoutPage,
})
