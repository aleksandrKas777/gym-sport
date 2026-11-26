import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cn } from "@/shared/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive data-[size=default]:h-[27px] data-[size=default]:w-[46px] data-[size=sm]:h-[20px] data-[size=sm]:w-[34px] data-checked:bg-primary data-unchecked:bg-surface-3 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-foreground ring-0 transition-transform group-data-[size=default]/switch:size-[21px] group-data-[size=sm]/switch:size-[16px] group-data-[size=default]/switch:data-checked:translate-x-[21px] group-data-[size=default]/switch:data-unchecked:translate-x-[2px] group-data-[size=sm]/switch:data-checked:translate-x-[15px] group-data-[size=sm]/switch:data-unchecked:translate-x-[2px] data-checked:bg-primary-foreground"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
