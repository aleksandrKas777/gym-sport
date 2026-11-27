---
name: bulletproof-react
description: Правила архитектуры Bulletproof React для стека TanStack Router + Zustand + Zod. Вызывай при создании фич, роутов, сторов или проверке импортов.
---

# Руководство по Bulletproof React (TanStack Router + Zustand + Zod)

## Структура `src/`
- `src/app/` — провайдеры, инстанс роутера, глобальные стили.
- `src/routes/` — файловый роутинг **TanStack Router** (`__root.tsx`, `index.tsx`, `orders/$orderId.tsx`).
- `src/features/` — изолированные бизнес-фичи (`auth`, `orders`, `profile`).
- `src/components/` — общие UI-компоненты (`Button`, `Modal`, `Input`).
- `src/hooks/` — общие переиспользуемые хуки.
- `src/lib/` — конфигурация библиотек (`axios`/`fetch`, `zod` хелперы).
- `src/stores/` — только глобальный клиентский стейт приложения (например, тема, сайдбар).
- `src/types/` — общие TypeScript-типы.

## Правила работы со стеком

### 1. TanStack Router (`src/routes/`)
- Файлы в `src/routes/` должны быть максимально тонкими: они занимаются только валидацией `validateSearch` / `params`, загрузкой данных и рендером композиции компонентов из `src/features/`.
- Никакой сложной бизнес-логики внутри файлов роутов.
- Для типизации query-параметров (`validateSearch`) всегда используй **Zod-схемы**.

### 2. Zustand (Клиентский стейт)
- Не клади серверные данные или состояние фильтров/пагинации в Zustand (фильтры и пагинация живут в URL через TanStack Router).
- Стор, относящийся к конкретной фиче, храни внутри неё: `src/features/<name>/stores/use<Name>Store.ts`.
- Всегда используй атомарные селекторы (`useStore((s) => s.field)`), чтобы избежать лишних ререндеров.

### 3. Zod (Схемы и типы)
- Схемы валидации форм и ответов API храни в `src/features/<name>/schemas/`.
- Выводи TypeScript-типы из схем через `export type User = z.infer<typeof userSchema>;`, не дублируй интерфейсы вручную.

## Изоляция и Public API
1. **Запрещены кросс-импорты между фичами**: `features/A` не импортирует из `features/B`. Объединяй фичи только на уровне страниц в `src/routes/`.
2. **Public API**: У каждой папки в `src/features/<name>/` обязан быть `index.ts`. Внешние импорты идут только через `@/features/<name>`.
3. **Colocation**: Создавай подпапки внутри фичи (`components/`, `schemas/`, `stores/`, `api/`, `hooks/`) только по мере необходимости.
