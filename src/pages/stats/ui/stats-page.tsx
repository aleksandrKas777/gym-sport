import { useMemo, useState } from 'react'
import { CalendarDays } from 'lucide-react'
import {
  BENCH_PROGRESS,
  HEATMAP,
  MUSCLE_SPLIT,
  PERIOD_STATS,
} from '@/shared/data/mock'
import type { Period } from '@/shared/types'
import {
  Badge,
  BarChart,
  Card,
  Donut,
  Heatmap,
  IconButton,
  LineChart,
  PageHeader,
  SectionHead,
  SegmentedControl,
  StatTile,
} from '@/shared/ui'

const PERIOD_OPTIONS: { value: Period; label: string }[] = [
  { value: 'week', label: 'Неделя' },
  { value: 'month', label: 'Месяц' },
  { value: 'year', label: 'Год' },
]

export const StatsPage = () => {
  const [period, setPeriod] = useState<Period>('week')
  const data = PERIOD_STATS[period]
  const dense = data.bars.length > 8

  const maxIndex = useMemo(() => {
    let best = 0
    data.bars.forEach((point, index) => {
      if (point.value > data.bars[best].value) best = index
    })
    return best
  }, [data.bars])

  const volumeTile = data.tiles[1]

  return (
    <div className="screen-glow flex h-full min-h-0 flex-col">
      <PageHeader
        eyebrow="Статистика"
        title="Прогресс"
        action={
          <IconButton
            label="Выбрать дату"
            variant="secondary"
            size="icon"
          >
            <CalendarDays size={18} />
          </IconButton>
        }
      >
        <SegmentedControl
          options={PERIOD_OPTIONS}
          value={period}
          onChange={setPeriod}
        />
      </PageHeader>

      <div className="scroll-y min-h-0 flex-1">
        <div className="flex flex-col gap-2.5 px-4 pt-1 pb-6">
          <div className="grid grid-cols-3 gap-1.75">
            {data.tiles.map((tile) => (
              <StatTile
                key={tile.id}
                label={tile.label}
                value={tile.value}
                unit={tile.unit}
                delta={tile.delta}
                trend={tile.trend}
              />
            ))}
          </div>

          <Card className="gap-3">
            <SectionHead
              title={data.barTitle}
              subtitle="Общий объём, тонны"
              action={
                <Badge variant="accent">
                  {volumeTile.value} {volumeTile.unit}
                </Badge>
              }
            />
            <BarChart
              data={data.bars}
              height={148}
              highlight={maxIndex}
              format={(value) =>
                dense
                  ? `${Math.round(value)} т`
                  : `${value.toFixed(1).replace('.', ',')} т`
              }
            />
            <p className="-mt-0.5 text-center text-[10px] text-subtle">
              {dense
                ? 'Сумма за каждый месяц'
                : 'Сумма за каждый день с тренировкой'}
            </p>
          </Card>

          <Card className="gap-3">
            <SectionHead
              title="Жим лёжа"
              subtitle="Рабочий вес, кг"
              action={<Badge variant="success">+15 кг</Badge>}
            />
            <LineChart
              data={BENCH_PROGRESS}
              height={140}
              format={(value) => `${String(value).replace('.', ',')} кг`}
            />
            <div className="grid grid-cols-2 gap-2.5 border-t border-border pt-2.75">
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-semibold tracking-[0.07em] text-subtle uppercase">
                  Лучший подход
                </span>
                <span className="tabular text-[12.5px] font-semibold">
                  85 кг × 6
                </span>
              </div>
              <div className="flex flex-col gap-0.5 border-l border-border pl-3">
                <span className="text-[9px] font-semibold tracking-[0.07em] text-subtle uppercase">
                  Расчётный 1ПМ
                </span>
                <span className="tabular text-[12.5px] font-semibold">
                  102 кг
                </span>
              </div>
            </div>
          </Card>

          <Card className="gap-3">
            <SectionHead
              title="Группы мышц"
              subtitle="Распределение объёма"
              action={<Badge>4 недели</Badge>}
            />
            <div className="flex items-center gap-4.5 pl-0.5">
              <Donut
                segments={MUSCLE_SPLIT}
                size={116}
                thickness={14}
                centerValue={`${MUSCLE_SPLIT[0].value}%`}
                centerLabel="грудь"
              />
              <div className="flex min-w-0 flex-1 flex-col gap-1.75">
                {MUSCLE_SPLIT.map((slice) => (
                  <div
                    key={slice.label}
                    className="flex items-center gap-2 text-[11.5px]"
                  >
                    <span
                      className="size-2 shrink-0 rounded-[3px]"
                      style={{ background: slice.color }}
                    />
                    <span className="text-muted-foreground">
                      {slice.label}
                    </span>
                    <span className="tabular ml-auto font-semibold">
                      {slice.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="gap-3">
            <SectionHead
              title="Регулярность"
              subtitle="Тренировки за 12 недель"
              action={<Badge variant="warning">Серия 5</Badge>}
            />
            <Heatmap weeks={HEATMAP} />
          </Card>
        </div>
      </div>
    </div>
  )
};
