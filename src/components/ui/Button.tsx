import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
type NativeButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never }

const base =
  'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-btn font-display font-semibold uppercase tracking-wider ' +
  'transition duration-200 ease-out motion-reduce:transition-none ' +
  'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent ' +
  'disabled:pointer-events-none disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-ink hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-glow ' +
    'active:translate-y-0 active:bg-accent-press active:shadow-none motion-reduce:hover:translate-y-0',
  secondary:
    'border border-line-strong bg-fg/5 text-fg backdrop-blur-sm hover:-translate-y-0.5 hover:border-fg/60 hover:bg-fg/10 ' +
    'active:translate-y-0 active:bg-fg/15 motion-reduce:hover:translate-y-0',
  ghost: 'text-fg hover:text-accent active:text-accent-press',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[0.95rem]',
  lg: 'h-14 px-8 text-base',
}

/** Renders an <a> when `href` is given, otherwise a <button>. */
export function Button(props: LinkProps | NativeButtonProps) {
  const { variant = 'primary', size = 'md', className, ...rest } = props
  const classes = cn(base, variants[variant], variant !== 'ghost' && sizes[size], className)

  if (typeof rest.href === 'string') {
    return <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} />
  }
  return (
    <button type="button" className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} />
  )
}
