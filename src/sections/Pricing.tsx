import { AnimatePresence, m } from 'framer-motion'
import { Check } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { FilterChip } from '../components/ui/FilterChip'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ANNUAL_MONTHS_CHARGED, plans, type BillingCycle, type Plan } from '../data/pricing'
import { cn } from '../lib/cn'
import { formatPrice } from '../lib/format'

function PlanCard({ plan, billing }: { plan: Plan; billing: BillingCycle }) {
  const annual = billing === 'annual'
  const price = annual ? plan.monthly * ANNUAL_MONTHS_CHARGED : plan.monthly
  const perMonth = Math.round(((plan.monthly * ANNUAL_MONTHS_CHARGED) / 12) * 100) / 100
  const titleId = `plan-${plan.id}`

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        'relative flex h-full flex-col rounded-card border p-7 transition duration-300 sm:p-9',
        'hover:-translate-y-1 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        plan.popular
          ? 'border-accent bg-surface-2 shadow-glow'
          : 'border-line bg-surface hover:border-line-strong',
      )}
    >
      {plan.popular && (
        <p className="absolute -top-3.5 left-7 rounded-full bg-accent px-3 py-1 font-display text-xs font-semibold uppercase tracking-wider text-ink sm:left-9">
          Most Popular
        </p>
      )}
      <h3 id={titleId} className="font-display text-2xl font-semibold uppercase tracking-wide">
        {plan.name}
      </h3>
      <p className="mt-2 text-muted">{plan.summary}</p>

      <div className="mt-7 flex h-16 items-end gap-2">
        <AnimatePresence mode="wait" initial={false}>
          <m.p
            key={price}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="font-display text-6xl font-bold leading-none tabular-nums"
          >
            {formatPrice(price)}
          </m.p>
        </AnimatePresence>
        <p className="pb-1.5 text-muted">/{annual ? 'year' : 'month'}</p>
      </div>
      <p className="mt-2 h-5 text-sm text-muted">
        {annual ? (
          <>
            {formatPrice(perMonth)}/mo · <span className="text-accent">Save {formatPrice(plan.monthly * 2)}</span>
          </>
        ) : (
          'Billed monthly, cancel anytime'
        )}
      </p>

      <ul className="mt-8 grow space-y-3.5 border-t border-line pt-8">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={2.5} />
            <span className="text-fg/90">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        href="#signup"
        variant={plan.popular ? 'primary' : 'secondary'}
        className="mt-9 w-full"
        aria-label={plan.popular ? `Start free trial on the ${plan.name} plan` : `Join the ${plan.name} plan`}
      >
        {plan.popular ? 'Start Free Trial' : `Join ${plan.name}`}
      </Button>
    </article>
  )
}

export function Pricing() {
  const [billing, setBilling] = useState<BillingCycle>('monthly')

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="relative isolate overflow-hidden border-y border-line bg-surface/40 py-section lg:py-section-lg"
    >
      <div aria-hidden="true" className="glow-accent absolute -top-40 left-1/2 -z-10 size-176 -translate-x-1/2" />
      <Container>
        <SectionHeading
          id="pricing-title"
          eyebrow="Membership"
          title="Simple pricing. No contracts."
          description="Every plan starts with a free 7-day trial. Pause or cancel from the app whenever you need to."
          align="center"
        />

        <div className="mt-10 flex flex-col items-center gap-3">
          <div
            role="group"
            aria-label="Billing period"
            className="inline-flex gap-1 rounded-full border border-line bg-ink p-1"
          >
            <FilterChip pressed={billing === 'monthly'} onClick={() => setBilling('monthly')} className="border-0 px-6">
              Monthly
            </FilterChip>
            <FilterChip pressed={billing === 'annual'} onClick={() => setBilling('annual')} className="border-0 px-6">
              Annual
            </FilterChip>
          </div>
          <p className="text-sm text-muted">
            Pay annually and get <span className="font-semibold text-accent">2 months free</span>
          </p>
          <p aria-live="polite" className="sr-only">
            Showing {billing} prices
          </p>
        </div>

        <ul className="mt-14 grid items-stretch gap-6 lg:mt-20 lg:grid-cols-3 lg:gap-6">
          {plans.map((plan, i) => (
            <li key={plan.id}>
              <Reveal delay={i * 0.08} className="h-full">
                <PlanCard plan={plan} billing={billing} />
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-center text-sm text-muted">
          Prices in USD, plus tax. Student, first-responder and military discounts available at the front desk.
        </p>
      </Container>
    </section>
  )
}
