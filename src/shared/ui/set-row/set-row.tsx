import { Check } from 'lucide-react'
import type { WorkoutSet } from '@/shared/types'
import { formatWeight } from '@/shared/lib/format'
import { IconButton } from '@/shared/ui/icon-button'
import { NumberStepper } from '@/shared/ui/number-stepper'
import { cn } from '@/shared/lib/utils'

export type SetRowProps = {
  index: number
  set: WorkoutSet
  onToggle: () => void
  onChange: (patch: Partial<Pick<WorkoutSet, 'weight' | 'reps'>>) => void
}

export const SetRow = ({ index, set, onToggle, onChange }: SetRowProps) => {
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
      <IconButton
        label={
          set.done
            ? 'Отметить подход невыполненным'
            : 'Отметить подход выполненным'
        }
        aria-pressed={set.done}
        variant={set.done ? 'default' : 'secondary'}
        onClick={onToggle}
        className={cn(
          'h-[38px] w-10 rounded-[10px] shadow-none',
          set.done
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-border bg-secondary text-transparent hover:border-primary/35 hover:bg-secondary hover:text-primary/35',
        )}
      >
        <Check size={17} strokeWidth={3} />
      </IconButton>
    </div>
  )
};
