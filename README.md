# Правила проекта (Bulletproof React + Zustand + Zod + TanStack Router)

## Стек и команды проверки
- **Стек**: React, TypeScript, TanStack Router, Zustand, Zod.
- **Проверка**: Перед завершением любой задачи **обязательно** запусти `npm run typecheck` и `npm run lint`.

## Базовые стандарты
1. **Архитектура**: Проект следует Bulletproof React. Перед созданием файлов или рефакторингом загрузи навык `bulletproof-react`.
2. **Типизация и валидация**: Запрещены `any` и `@ts-ignore`. Все внешние данные и search-параметры роутера валидируются через **Zod** (`z.infer<typeof Schema>` вместо ручного дублирования типов).
3. **Документация**: При работе с TanStack Router, Zustand или Zod проверяй актуальные API через инструмент `context7`.
