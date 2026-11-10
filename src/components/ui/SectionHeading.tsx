import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <div className={cn('max-w-2xl', centered && 'mx-auto text-center', className)}>
      <p
        className={cn(
          'flex items-center gap-3 font-display text-sm font-medium uppercase tracking-eyebrow text-accent',
          centered && 'justify-center',
        )}
      >
        <span aria-hidden="true" className="h-px w-8 bg-accent" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-4 text-balance font-display text-4xl font-bold uppercase leading-[0.95] sm:text-5xl lg:text-6xl"
      >
        {title}
      </h2>
      {description && <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">{description}</p>}
    </div>
  )
}
