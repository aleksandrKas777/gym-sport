import type { ReactNode } from 'react'
import { Button } from '@/shared/ui/button'
import type { ButtonProps } from '@/shared/ui/button'

export type IconButtonSize = 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg'

export type IconButtonProps = Omit<ButtonProps, 'size' | 'aria-label'> & {
  label: string
  size?: IconButtonSize
  children?: ReactNode
}

export const IconButton = ({
  label,
  size = 'icon',
  variant = 'secondary',
  children,
  ...props
}: IconButtonProps) => {
  return (
    <Button
      aria-label={label}
      title={label}
      size={size}
      variant={variant}
      {...props}
    >
      {children}
    </Button>
  )
}
