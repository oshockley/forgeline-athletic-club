import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

interface FilterChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pressed: boolean
}

/** Toggle button used for filters and segmented controls. */
export function FilterChip({ pressed, className, ...rest }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-full border px-4 text-sm font-medium transition-colors duration-200',
        pressed
          ? 'border-accent bg-accent text-ink'
          : 'border-line bg-surface text-muted hover:border-line-strong hover:text-fg active:bg-surface-2',
        className,
      )}
      {...rest}
    />
  )
}
