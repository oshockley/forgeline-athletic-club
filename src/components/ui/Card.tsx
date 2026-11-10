import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'li' | 'figure'
  /** Adds the hover lift used on browsable cards. */
  interactive?: boolean
}

export function Card({ as: Tag = 'div', interactive = false, className, ...rest }: CardProps) {
  return (
    <Tag
      className={cn(
        'rounded-card border border-line bg-surface',
        interactive &&
          'transition duration-300 ease-out hover:-translate-y-1 hover:border-line-strong hover:shadow-lift ' +
            'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        className,
      )}
      {...rest}
    />
  )
}
