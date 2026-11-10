import { Quote } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { StarRating } from '../components/ui/StarRating'
import { testimonials } from '../data/testimonials'

export function Testimonials() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="border-y border-line bg-surface/40 py-section lg:py-section-lg"
    >
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="reviews-title" eyebrow="Member stories" title="Real people. Real numbers." />
          <p className="flex items-center gap-3 text-muted">
            <span className="font-display text-4xl font-bold text-fg">4.9</span>
            <span className="leading-tight">
              Average rating from
              <br />
              640+ Google reviews
            </span>
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16 lg:gap-6">
          {testimonials.map((t, i) => (
            <li key={t.name}>
              <Reveal delay={i * 0.08} className="h-full">
                <Card as="figure" interactive className="flex h-full flex-col p-7 sm:p-8">
                  <div className="flex items-center justify-between">
                    <StarRating rating={t.rating} />
                    <Quote aria-hidden="true" className="size-8 text-accent/40" />
                  </div>
                  <blockquote className="mt-6 grow text-pretty text-lg leading-relaxed text-fg/90">
                    <p>“{t.quote}”</p>
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                    <img
                      src={t.avatar}
                      alt={`Portrait of ${t.name}`}
                      width={56}
                      height={56}
                      loading="lazy"
                      decoding="async"
                      className="size-14 rounded-full object-cover ring-2 ring-line"
                    />
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-muted">{t.detail}</p>
                    </div>
                  </figcaption>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
