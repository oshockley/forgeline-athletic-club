import { AnimatePresence, m } from 'framer-motion'
import { ArrowRight, CircleCheck, CircleAlert, LoaderCircle } from 'lucide-react'
import { useEffect, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { SelectField, TextField } from '../components/ui/FormField'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { site } from '../data/site'
import { unsplash, unsplashSrcSet } from '../lib/images'
import {
  emptySignup,
  goals,
  submitSignup,
  validateField,
  validateSignup,
  type SignupErrors,
  type SignupField,
  type SignupValues,
} from '../lib/signup'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const perks = [
  '7 days of unlimited classes and open gym',
  'A 1:1 intro session with a Forgeline coach',
  'InBody body-composition scan to set your baseline',
  'No credit card, no contract, no sales pitch',
]

const SIGNUP_IMAGE = '1583454110551-21f2fa2afe61'

export function Signup() {
  const [values, setValues] = useState<SignupValues>(emptySignup)
  const [errors, setErrors] = useState<SignupErrors>({})
  const [touched, setTouched] = useState<Partial<Record<SignupField, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const field = e.target.name as SignupField
    const value = e.target.value
    setValues((v) => ({ ...v, [field]: value }))
    // Re-validate live only once a field has been visited, so errors clear as you fix them.
    if (touched[field]) setErrors((errs) => ({ ...errs, [field]: validateField(field, value) }))
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const field = e.target.name as SignupField
    setTouched((t) => ({ ...t, [field]: true }))
    if (e.target.value) setErrors((errs) => ({ ...errs, [field]: validateField(field, e.target.value) }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const nextErrors = validateSignup(values)
    setErrors(nextErrors)
    setTouched({ name: true, email: true, phone: true, goal: true })

    const firstInvalid = (Object.keys(nextErrors) as SignupField[])[0]
    if (firstInvalid) {
      const el = formRef.current?.elements.namedItem(firstInvalid)
      if (el instanceof HTMLElement) el.focus()
      return
    }

    setStatus('submitting')
    try {
      await submitSignup(values)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setValues(emptySignup)
    setErrors({})
    setTouched({})
    setStatus('idle')
  }

  const submitting = status === 'submitting'
  const fieldProps = (field: SignupField) => ({
    name: field,
    value: values[field],
    onChange: handleChange,
    onBlur: handleBlur,
    error: errors[field],
    disabled: submitting,
  })

  return (
    <section id="signup" aria-labelledby="signup-title" className="relative isolate overflow-hidden py-section lg:py-section-lg">
      <div aria-hidden="true" className="glow-accent absolute -right-40 top-10 -z-10 size-160" />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              id="signup-title"
              eyebrow="Free 7-day trial"
              title={
                <>
                  Your first week <span className="text-accent">is on us</span>
                </>
              }
              description="Tell us a little about you and a coach will text within one business day to book your intro session."
            />
            <ul className="mt-8 space-y-4">
              {perks.map((perk) => (
                <li key={perk} className="flex gap-3">
                  <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
                  <span className="text-fg/90">{perk}</span>
                </li>
              ))}
            </ul>
            <div className="relative mt-10 hidden aspect-video overflow-hidden rounded-card border border-line lg:block">
              <img
                src={unsplash(SIGNUP_IMAGE, 640, 360)}
                srcSet={unsplashSrcSet(SIGNUP_IMAGE, 640, 360)}
                sizes="40vw"
                width={640}
                height={360}
                alt="Member re-racking a pair of heavy dumbbells"
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
            </div>
          </div>

          <Reveal>
            <div className="rounded-panel border border-line bg-surface p-6 shadow-lift sm:p-10">
              <AnimatePresence mode="wait" initial={false}>
                {status === 'success' ? (
                  <m.div
                    key="success"
                    role="status"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center py-10 text-center"
                  >
                    <span className="inline-flex size-16 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <CircleCheck aria-hidden="true" className="size-9" />
                    </span>
                    <h3
                      ref={successRef}
                      tabIndex={-1}
                      className="mt-6 font-display text-3xl font-bold uppercase focus:outline-none"
                    >
                      You're in, {values.name.trim().split(/\s+/)[0]}!
                    </h3>
                    <p className="mt-3 max-w-sm text-muted">
                      We've got your details. A coach will text <span className="text-fg">{values.phone.trim()}</span>{' '}
                      within one business day to book your first session.
                    </p>
                    <Button variant="secondary" className="mt-8" onClick={reset}>
                      Sign up someone else
                    </Button>
                  </m.div>
                ) : (
                  <m.form
                    key="form"
                    ref={formRef}
                    noValidate
                    onSubmit={handleSubmit}
                    exit={{ opacity: 0 }}
                    aria-describedby="signup-note"
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="font-display text-2xl font-semibold uppercase tracking-wide">
                        Claim your free week
                      </h3>
                      <p id="signup-note" className="mt-1 text-sm text-muted">
                        All fields are required. Takes about 30 seconds.
                      </p>
                    </div>

                    <TextField id="signup-name" label="Full name" autoComplete="name" placeholder="Jordan Taylor" {...fieldProps('name')} />
                    <TextField
                      id="signup-email"
                      label="Email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      {...fieldProps('email')}
                    />
                    <TextField
                      id="signup-phone"
                      label="Phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="(303) 555-0148"
                      {...fieldProps('phone')}
                    />
                    <SelectField
                      id="signup-goal"
                      label="Main goal"
                      placeholder="Select your main goal"
                      options={goals}
                      {...fieldProps('goal')}
                    />

                    {status === 'error' && (
                      <p role="alert" className="flex items-start gap-2 rounded-btn border border-danger/40 bg-danger/10 p-3 text-sm text-danger">
                        <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                        Something went wrong sending your details. Please try again, or call us at {site.phone}.
                      </p>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={submitting}
                      // Keep focus in the field on mousedown: otherwise its blur validation
                      // inserts an error, shifts the button and the click never lands.
                      // Submit validates every field anyway.
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {submitting ? (
                        <>
                          <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Start Free Trial
                          <ArrowRight aria-hidden="true" className="size-5" />
                        </>
                      )}
                    </Button>
                    <p aria-live="polite" className="sr-only">
                      {submitting ? 'Submitting your details' : ''}
                    </p>
                    <p className="text-center text-xs text-muted">
                      We'll never share your details. Unsubscribe from texts any time by replying STOP.
                    </p>
                  </m.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
