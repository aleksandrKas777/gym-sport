import { Check } from 'lucide-react'
import type { WorkoutSet } from '@/shared/types'
import { formatWeight } from '@/shared/lib/format'
import { NumberStepper } from '@/shared/ui/number-stepper'
import { cn } from '@/shared/lib/utils'

export type SetRowProps = {
  index: number
  set: WorkoutSet
  onToggle: () => void
  onChange: (patch: Partial<Pick<WorkoutSet, 'weight' | 'reps'>>) => void
}

export function SetRow({ index, set, onToggle, onChange }: SetRowProps) {
  return (
    <div className="grid grid-cols-[18px_minmax(0,1fr)_minmax(0,1fr)_40px] items-center gap-2">
      <span
        className={cn(
          'tabular text-center text-[11.5px] font-semibold text-subtle',
          set.done && 'text-primary',
        )}
      >
        {index}
      </span>
      <NumberStepper
        value={set.weight}
        step={2.5}
        max={500}
        size="sm"
        format={formatWeight}
        label={`вес, подход ${index}`}
        className={set.done ? 'opacity-55' : undefined}
        onChange={(weight) => onChange({ weight })}
      />
      <NumberStepper
        value={set.reps}
        step={1}
        max={100}
        size="sm"
        label={`повторы, подход ${index}`}
        className={set.done ? 'opacity-55' : undefined}
        onChange={(reps) => onChange({ reps })}
      />
      <button
        type="button"
        aria-pressed={set.done}
        aria-label={
          set.done
            ? 'Отметить подход невыполненным'
            : 'Отметить подход выполненным'
        }
        onClick={onToggle}
        className={cn(
          'grid h-[38px] w-10 place-items-center rounded-[10px] border transition-all active:scale-95',
          set.done
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-border bg-secondary text-transparent hover:border-primary/35 hover:text-primary/35',
        )}
      >
        <Check size={17} strokeWidth={3} />
      </button>
    </div>
  )
}
