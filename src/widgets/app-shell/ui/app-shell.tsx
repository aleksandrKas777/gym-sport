import { useState } from 'react'
import { Link, Outlet, useRouterState } from '@tanstack/react-router'
import { BatteryFull, Signal, Wifi } from 'lucide-react'
import { OverlayContainerContext } from '@/shared/lib/overlay-container'
import { cn } from '@/shared/lib/utils'
import { Toaster } from '@/shared/ui/sonner'
import { BottomNav } from '@/widgets/bottom-nav'

const SCREENS = [
  {
    to: '/design',
    num: '00',
    title: 'UI-кит',
    desc: 'Токены, компоненты, состояния',
  },
  {
    to: '/workout',
    num: '01',
    title: 'Тренировка',
    desc: 'Активная сессия, подходы, отдых',
  },
  {
    to: '/exercises',
    num: '02',
    title: 'Библиотека',
    desc: 'Поиск и фильтры упражнений',
  },
  {
    to: '/stats',
    num: '03',
    title: 'Статистика',
    desc: 'Метрики, графики, регулярность',
  },
]

const META = [
  { label: 'Формат', value: 'Mobile-first · 390×844' },
  { label: 'Роутер', value: 'TanStack Router' },
  { label: 'UI', value: 'shadcn · Base UI' },
  { label: 'Стили', value: 'Tailwind CSS v4' },
]

const normalize = (pathname: string) => {
  return pathname.replace(/\/$/, '') || '/'
};

export const AppShell = () => {
  const [overlayElement, setOverlayElement] = useState<HTMLDivElement | null>(
    null,
  )
  const pathname = useRouterState({
    select: (state) => normalize(state.location.pathname),
  })

  return (
    <div className="app-canvas flex h-svh items-center justify-center gap-[clamp(32px,6vw,88px)] p-10 max-lg:flex-col max-lg:gap-0 max-lg:p-0">
      <aside className="hidden w-[296px] shrink-0 flex-col lg:flex">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid size-11.5 place-items-center rounded-[14px] bg-primary text-xl font-extrabold tracking-[-0.04em] text-primary-foreground shadow-[0_6px_20px_rgba(215,255,62,0.16)]">
            G
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="text-[19px] font-bold tracking-[0.16em]">
              GYM
            </span>
            <span className="text-[9px] font-medium tracking-[0.18em] text-subtle uppercase">
              дизайн-система
            </span>
          </div>
        </div>

        <p className="mb-6.5 text-[12.5px] leading-relaxed text-muted-foreground">
          Прототип приложения для тренажёрного зала: тренировки, подходы и
          статистика. Тёмная тема, лаймовый акцент, мобильный интерфейс.
        </p>

        <p className="mb-2.5 text-[9.5px] font-semibold tracking-[0.18em] text-subtle uppercase">
          Экраны
        </p>
        <nav className="flex flex-col gap-1">
          {SCREENS.map((screen) => {
            const active = pathname === screen.to
            return (
              <Link
                key={screen.to}
                to={screen.to}
                className={cn(
                  'flex items-start gap-3 rounded-[14px] border border-transparent px-3 py-2.75 text-muted-foreground transition-colors hover:border-border hover:bg-white/3 hover:text-foreground',
                  active && 'border-border bg-card text-foreground',
                )}
              >
                <span
                  className={cn(
                    'pt-0.5 font-mono text-[10px] text-subtle',
                    active && 'text-primary',
                  )}
                >
                  {screen.num}
                </span>
                <span className="flex min-w-0 flex-col gap-px">
                  <span className="text-[13.5px] font-semibold">
                    {screen.title}
                  </span>
                  <span className="text-[10.5px] text-subtle">
                    {screen.desc}
                  </span>
                </span>
              </Link>
            )
          })}
        </nav>

        <dl className="mt-6.5 flex flex-col gap-2 border-t border-border pt-4.5">
          {META.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-3 text-[10.5px]"
            >
              <dt className="text-subtle">{item.label}</dt>
              <dd className="text-muted-foreground">{item.value}</dd>
            </div>
          ))}
          <div className="flex items-center justify-between gap-3 text-[10.5px]">
            <dt className="text-subtle">Акцент</dt>
            <dd className="flex items-center gap-1.5 text-muted-foreground">
              <span className="size-2.25 rounded-[3px] bg-primary" />
              #D7FF3E
            </dd>
          </div>
        </dl>

        <div className="mt-5 flex items-center justify-between gap-2 border-t border-border pt-3.5 text-[9.5px]">
          <span className="font-semibold tracking-[0.08em] text-subtle">
            GYM · v0.2
          </span>
          <span className="rounded-full bg-primary/12 px-1.75 py-0.75 text-[9px] font-semibold text-primary">
            демо-данные
          </span>
        </div>
      </aside>

      <nav
        aria-label="Экраны прототипа"
        className="no-scrollbar flex w-full shrink-0 gap-1.5 overflow-x-auto border-b border-border bg-[#0f1114] px-3 py-2.5 lg:hidden"
      >
        {SCREENS.map((screen) => {
          const active = pathname === screen.to
          return (
            <Link
              key={screen.to}
              to={screen.to}
              className={cn(
                'flex h-8 shrink-0 items-center rounded-full border border-border px-3 text-[11px] font-semibold text-muted-foreground',
                active &&
                  'border-primary bg-primary text-primary-foreground',
              )}
            >
              {screen.title}
            </Link>
          )
        })}
      </nav>

      <div className="flex min-h-0 flex-col items-center gap-4 max-lg:w-full max-lg:flex-1 max-lg:gap-0">
        <div className="relative flex w-full flex-col overflow-hidden bg-background max-lg:flex-1 lg:phone-frame lg:h-[min(844px,calc(100svh-96px))] lg:w-[390px] lg:rounded-[44px]">
          <div className="hidden h-11 shrink-0 items-center justify-between px-6.5 text-foreground lg:flex">
            <span className="tabular text-[13px] font-semibold tracking-[0.02em]">
              9:41
            </span>
            <span className="flex items-center gap-1.25">
              <Signal size={14} strokeWidth={2.5} />
              <Wifi size={14} strokeWidth={2.5} />
              <BatteryFull size={17} strokeWidth={2} />
            </span>
          </div>

          <div
            ref={setOverlayElement}
            className="relative flex min-h-0 flex-1 flex-col [transform:translateZ(0)]"
          >
            <OverlayContainerContext.Provider value={overlayElement}>
              <div className="flex min-h-0 flex-1 flex-col">
                <Outlet />
              </div>
              {pathname !== '/design' ? <BottomNav /> : null}
              <Toaster position="top-center" offset={56} />
            </OverlayContainerContext.Provider>
          </div>

          <span className="pointer-events-none absolute bottom-1.75 left-1/2 z-[80] hidden h-1 w-28 -translate-x-1/2 rounded-full bg-white/40 lg:block" />
        </div>

        <p className="text-[10.5px] tracking-[0.02em] text-subtle max-lg:hidden">
          Прототип интерактивный — жми кнопки, чипы и подходы
        </p>
      </div>
    </div>
  )
};
