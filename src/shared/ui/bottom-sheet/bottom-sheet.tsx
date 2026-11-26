import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui/sheet'
import { cn } from '@/shared/lib/utils'

export type BottomSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  className?: string
}

export function BottomSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
}: BottomSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className={cn('gap-0', className)}
      >
        <SheetHeader className="mb-3 flex-row items-center justify-between gap-3">
          <div className="min-w-0">
            <SheetTitle>{title}</SheetTitle>
            {description ? (
              <SheetDescription className="mt-0.5 text-[11px]">
                {description}
              </SheetDescription>
            ) : (
              <SheetDescription className="sr-only">{title}</SheetDescription>
            )}
          </div>
          <SheetClose
            render={
              <Button variant="ghost" size="icon-sm" aria-label="Закрыть" />
            }
          >
            <X />
          </SheetClose>
        </SheetHeader>

        <div className="scroll-y -mx-1 flex min-h-0 flex-1 flex-col gap-3 px-1 [&>*]:shrink-0">
          {children}
        </div>

        {footer ? <div className="shrink-0 pt-3">{footer}</div> : null}
      </SheetContent>
    </Sheet>
  )
}
