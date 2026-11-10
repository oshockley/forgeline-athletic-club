import { ArrowRight, Bike, Dumbbell, HandFist, PersonStanding, UserCheck, Zap, type LucideIcon } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { classes, type ClassType, type Intensity } from '../data/classes'
import { cn } from '../lib/cn'

const icons: Record<ClassType, LucideIcon> = {
  'Strength Training': Dumbbell,
  HIIT: Zap,
  'Yoga & Mobility': PersonStanding,
  Boxing: HandFist,
  'Personal Training': UserCheck,
  Spin: Bike,
}

function IntensityMeter({ level, label }: { level: Intensity; label: string }) {
  return (
    <p className="flex items-center gap-3 text-sm">
      <span aria-hidden="true" className="flex items-end gap-1">
        {(['h-2.5', 'h-3.5', 'h-4.5'] as const).map((height, i) => (
          <span
            key={height}
            className={cn('w-1.5 rounded-full', height, i < level ? 'bg-accent' : 'bg-line-strong')}
          />
        ))}
      </span>
      <span className="text-muted">
        Intensity: <span className="font-medium text-fg">{label}</span>
      </span>
    </p>
  )
}

interface ClassesProps {
  onSeeTimes: (type: ClassType) => void
}

export function Classes({ onSeeTimes }: ClassesProps) {
  return (
    <section id="classes" aria-labelledby="classes-title" className="py-section lg:py-section-lg">
      <Container>
        <SectionHeading
          id="classes-title"
          eyebrow="Classes & coaching"
          title="Six ways to get stronger"
          description="Every session is coached, capped at 16 people and programmed in weekly cycles, so you always know why you're doing what you're doing."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {classes.map((item, i) => {
            const Icon = icons[item.type]
            return (
              <li key={item.type}>
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <Card as="article" interactive className="group flex h-full flex-col p-7 sm:p-8">
                    <span className="inline-flex size-14 items-center justify-center rounded-btn bg-accent/10 text-accent ring-1 ring-accent/25 transition-colors group-hover:bg-accent group-hover:text-ink">
                      <Icon aria-hidden="true" className="size-7" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-6 font-display text-2xl font-semibold uppercase tracking-wide">{item.type}</h3>
                    <p className="mt-3 grow leading-relaxed text-muted">{item.description}</p>
                    <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                      <IntensityMeter level={item.intensity} label={item.intensityLabel} />
                      <button
                        type="button"
                        onClick={() => onSeeTimes(item.type)}
                        className="inline-flex items-center gap-1.5 rounded-btn text-sm font-semibold text-fg transition-colors hover:text-accent"
                      >
                        See times
                        <span className="sr-only"> for {item.type}</span>
                        <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </Card>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
