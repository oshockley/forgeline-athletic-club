import { CircleAlert, ChevronDown } from 'lucide-react'
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

const controlClass =
  'h-12 w-full rounded-btn border bg-ink px-4 text-base text-fg transition-colors placeholder:text-muted ' +
  'focus:outline-none focus-visible:outline-none focus:ring-3 focus:ring-accent/30'

interface FieldShellProps {
  id: string
  label: string
  error?: string
  children: ReactNode
}

function FieldShell({ id, label, error, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-fg">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-sm text-danger">
          <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

const stateClass = (error?: string) =>
  error ? 'border-danger focus:border-danger' : 'border-line-strong hover:border-muted focus:border-accent'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  error?: string
}

export function TextField({ id, label, error, className, ...rest }: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(controlClass, stateClass(error), className)}
        {...rest}
      />
    </FieldShell>
  )
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  label: string
  error?: string
  placeholder: string
  options: readonly string[]
}

export function SelectField({ id, label, error, placeholder, options, className, ...rest }: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            controlClass,
            stateClass(error),
            'appearance-none pr-11',
            !rest.value && 'text-muted',
            className,
          )}
          {...rest}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="text-fg">
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted"
        />
      </div>
    </FieldShell>
  )
}
