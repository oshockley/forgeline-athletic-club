import { Card } from '../components/ui/Card'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { trainers } from '../data/trainers'

export function Trainers() {
  return (
    <section id="trainers" aria-labelledby="trainers-title" className="py-section lg:py-section-lg">
      <Container>
        <SectionHeading
          id="trainers-title"
          eyebrow="The coaching team"
          title="Coaches who know your name"
          description="Certified, experienced and on the floor every day, not just behind a clipboard."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {trainers.map((trainer, i) => (
            <li key={trainer.name}>
              <Reveal delay={i * 0.08} className="h-full">
                <Card as="article" interactive className="group flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-4/5 overflow-hidden bg-surface-2">
                    <img
                      src={trainer.photo.src}
                      srcSet={trainer.photo.srcSet}
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw"
                      width={480}
                      height={600}
                      alt={trainer.photo.alt}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover grayscale-35 transition duration-500 group-hover:scale-105 group-hover:grayscale-0 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-surface" />
                  </div>
                  <div className="flex grow flex-col p-6 pt-2">
                    <p className="font-display text-sm font-medium uppercase tracking-eyebrow text-accent">
                      {trainer.specialty}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold uppercase tracking-wide">{trainer.name}</h3>
                    <p className="mt-3 grow leading-relaxed text-muted">{trainer.bio}</p>
                    <p className="mt-5 border-t border-line pt-4 text-sm text-muted">{trainer.certifications}</p>
                  </div>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
