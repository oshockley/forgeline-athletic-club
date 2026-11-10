import { m } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { site } from '../data/site'
import { unsplash } from '../lib/images'

const HERO_ID = '1517836357463-d25dfeac3438'

// Headline + intro are the LCP candidates: slide them in without hiding them,
// so they paint immediately. Secondary elements also fade.
const slideUp = {
  hidden: { y: 24 },
  show: { y: 0 },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-end overflow-hidden pb-14 pt-32 sm:items-center sm:pb-20"
    >
      <picture>
        <source
          media="(max-width: 767px)"
          srcSet={`${unsplash(HERO_ID, 640, 1140)} 640w, ${unsplash(HERO_ID, 900, 1600)} 900w`}
          sizes="100vw"
        />
        <img
          src={unsplash(HERO_ID, 1920, 1200)}
          srcSet={[1280, 1920, 2560].map((w) => `${unsplash(HERO_ID, w, Math.round(w * 0.625))} ${w}w`).join(', ')}
          sizes="100vw"
          width={1920}
          height={1200}
          alt="Athlete gripping a loaded barbell at the start of a deadlift"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-20 size-full object-cover object-[65%_center]"
        />
      </picture>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-ink via-ink/85 to-ink/30" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/20 to-ink/50" />

      <Container>
        <m.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          className="max-w-3xl"
        >
          <m.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-ink/60 px-4 py-1.5 text-sm text-fg backdrop-blur-sm"
          >
            <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
            River North, Denver · Open 7 days
          </m.p>

          <m.h1
            id="hero-title"
            variants={slideUp}
            className="mt-6 font-display text-[clamp(3.5rem,13vw,8.5rem)] font-bold uppercase leading-[0.88] tracking-tight"
          >
            Train Harder.
            <span className="block text-accent">Feel Stronger.</span>
          </m.h1>

          <m.p variants={slideUp} className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-fg/80 sm:text-xl">
            Expert coaches, 40+ classes a week and a community that holds you to it. Everything you need to
            be stronger next year than you are today.
          </m.p>

          <m.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#signup" size="lg">
              Start Free Trial
              <ArrowRight aria-hidden="true" className="size-5" />
            </Button>
            <Button href="#classes" size="lg" variant="secondary">
              View Classes
            </Button>
          </m.div>

          <m.dl
            variants={fadeUp}
            className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-line-strong border-t border-line-strong pt-7"
          >
            {site.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse px-3 first:pl-0 sm:px-6">
                <dt className="mt-1 text-xs uppercase tracking-wider text-muted sm:text-sm">{stat.label}</dt>
                <dd className="flex items-center gap-1.5 font-display text-3xl font-bold sm:text-4xl">
                  {stat.value}
                  {stat.label === 'Rating' && <Star aria-hidden="true" className="size-5 fill-accent text-accent" />}
                </dd>
              </div>
            ))}
          </m.dl>
        </m.div>
      </Container>
    </section>
  )
}
