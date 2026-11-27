---
description: Создать новую фичу по стандарту Bulletproof React (Zustand + Zod)
---
Создай новую бизнес-фичу `$ARGUMENTS` в директории `src/features/$ARGUMENTS`.

1. Загрузи навык `bulletproof-react`.
2. Создай папку `src/features/$ARGUMENTS` и только нужные для задачи подпапки (`components`, `schemas`, `stores`, `api`, `hooks`).
3. Если нужен клиентский стейт — создай стор на Zustand с атомарными селекторами; если нужна валидация — добавь Zod-схему с `z.infer`.
4. Создай `src/features/$ARGUMENTS/index.ts` с экспортом публичного API.
5. Запусти `npm run typecheck` и `npm run lint`.
