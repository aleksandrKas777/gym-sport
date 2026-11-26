# GYM

Прототип приложения для тренажёрного зала: активная тренировка с подходами,
библиотека упражнений и статистика прогресса. Сделан как дизайн-система:
тёмная тема, лаймовый акцент `#D7FF3E`, мобильный интерфейс.

## Стек

- **React 19 + TypeScript** (только `type`, без `interface`)
- **TanStack Router** — файловые маршруты в `src/routes`, code splitting
- **Tailwind CSS v4** — токены темы в `src/app/styles/global.css`
- **shadcn/ui на Base UI** (`@base-ui/react`) — Button, Card, Badge, Input, Label,
  Checkbox, Switch, Progress, Tabs, Sheet, Sonner
- **lucide-react** — иконки

## Запуск

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm routes     # перегенерировать routeTree.gen.ts
pnpm build      # генерация маршрутов + tsc + vite build
pnpm lint
```

## Структура

```
src/
  app/
    router.tsx              # createRouter + routeTree
    styles/global.css       # Tailwind, токены темы, утилиты
  routes/                   # файловые маршруты
    __root.tsx              # каркас: телефон, навигация, Outlet
    index.tsx               # redirect → /workout
    workout/index.tsx
    exercises/index.tsx
    stats/index.tsx
    design/index.tsx        # витрина UI-кита
  pages/                    # компоненты экранов
    workout/ui/workout-page.tsx
    exercises/ui/exercises-page.tsx
    stats/ui/stats-page.tsx
    design/ui/design-page.tsx
  widgets/
    app-shell/ui/app-shell.tsx   # desktop-панель, mobile-навигация, phone frame
    bottom-nav/ui/bottom-nav.tsx
  shared/
    ui/<component>/index.ts      # каждый компонент в своей папке
    lib/                          # cn, format, overlay-container
    data/mock.ts                  # демо-данные
    types/index.ts                # модели данных
```

## Экраны

| Путь          | Экран                                                    |
| ------------- | -------------------------------------------------------- |
| `/workout`    | активная тренировка: подходы, таймер отдыха, завершение  |
| `/exercises`  | библиотека: поиск, фильтры, карточка упражнения          |
| `/stats`      | метрики, тоннаж, прогресс, группы мышц, регулярность     |
| `/design`     | UI-кит: токены, компоненты, состояния, графики           |

Десктоп показывает интерфейс в рамке телефона `390 × 844`, на мобильных
устройствах приложение раскрывается на весь экран.

Данные пока демонстрационные, без бэкенда и сохранения.
