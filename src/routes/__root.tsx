import { createRootRoute } from '@tanstack/react-router'
import { AppShell } from '@/widgets/app-shell'

export const Route = createRootRoute({
  component: AppShell,
})
