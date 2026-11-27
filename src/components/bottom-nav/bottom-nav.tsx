import { Link, useRouterState } from '@tanstack/react-router'
import { ChartColumn, Dumbbell, Library } from 'lucide-react'

const TABS = [
  { to: '/workout', label: 'Тренировка', icon: Dumbbell },
  { to: '/exercises', label: 'Библиотека', icon: Library },
  { to: '/stats', label: 'Статистика', icon: ChartColumn },
]

const normalize = (pathname: string) => {
  return pathname.replace(/\/$/, '') || '/'
};

export const BottomNav = () => {
  const pathname = useRouterState({
    select: (state) => normalize(state.location.pathname),
  })

  return (
    <nav
      aria-label="Основная навигация"
      className="grid shrink-0 grid-cols-3 border-t border-border bg-background/92 px-3 pt-1.75 pb-5 backdrop-blur-xl"
    >
      {TABS.map((tab) => {
        const active = pathname === tab.to
        const Icon = tab.icon
        return (
          <Link
            key={tab.to}
            to={tab.to}
            className="flex flex-col items-center gap-0.75 py-0.5 text-subtle transition-colors hover:text-muted-foreground"
          >
            <span
              className={
                active
                  ? 'grid h-7 w-11.5 place-items-center rounded-[9px] bg-primary/12 text-primary'
                  : 'grid h-7 w-11.5 place-items-center rounded-[9px]'
              }
            >
              <Icon size={20} />
            </span>
            <span
              className={
                active
                  ? 'text-[10px] font-semibold text-foreground'
                  : 'text-[10px] font-semibold'
              }
            >
              {tab.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
};
