import { cn } from '../../lib/cn'

/** Flame over an anvil line: the Forgeline mark. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn('shrink-0', className)}>
      <path
        fill="var(--color-accent)"
        d="M16.4 2.5c.6 4.3 5.9 6.6 5.9 12.3a6.3 6.3 0 0 1-12.6 0c0-2.9 1.5-4.8 3-6.1.3 2.1 1.4 3.5 2.8 4-.9-3.6-.6-7.1.9-10.2Z"
      />
      <path fill="var(--color-ink)" d="M16 13.2c1.6 1.6 2.6 2.9 2.6 4.6a2.6 2.6 0 0 1-5.2 0c0-1.7 1-3 2.6-4.6Z" />
      <path fill="currentColor" d="M4 23.5h24l-3 3.5H7l-3-3.5Z" />
    </svg>
  )
}

interface LogoProps {
  className?: string
  size?: 'md' | 'lg'
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const large = size === 'lg'
  return (
    <span className={cn('inline-flex items-center gap-2.5 text-fg', className)}>
      <LogoMark className={large ? 'size-11' : 'size-8'} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display font-bold uppercase tracking-wide',
            large ? 'text-3xl' : 'text-[1.4rem]',
          )}
        >
          Forgeline
        </span>
        <span
          className={cn(
            'font-display font-medium uppercase text-muted',
            large ? 'mt-1 text-xs tracking-[0.42em]' : 'mt-0.5 text-[0.6rem] tracking-[0.36em]',
          )}
        >
          Athletic Club
        </span>
      </span>
    </span>
  )
}
