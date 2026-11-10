import { Clock, Mail, MapPin, Navigation, Phone, type LucideIcon } from 'lucide-react'
import type { ComponentType, ReactNode, SVGProps } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Container } from '../components/ui/Container'
import { MapIllustration } from '../components/ui/MapIllustration'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { InstagramIcon } from '../components/ui/SocialIcons'
import { site } from '../data/site'

interface ContactItemProps {
  icon: LucideIcon | ComponentType<SVGProps<SVGSVGElement>>
  label: string
  children: ReactNode
}

function ContactItem({ icon: Icon, label, children }: ContactItemProps) {
  return (
    <li className="flex gap-4">
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-btn bg-accent/10 text-accent">
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="font-display text-sm uppercase tracking-eyebrow text-muted">{label}</p>
        <div className="mt-1 text-fg">{children}</div>
      </div>
    </li>
  )
}

const linkClass = 'break-words transition-colors hover:text-accent'

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-t border-line bg-surface/40 py-section lg:py-section-lg"
    >
      <Container>
        <SectionHeading
          id="contact-title"
          eyebrow="Visit us"
          title="Come see the floor"
          description="Drop in any time we're open for a tour. Free member parking in the lot off 22nd Street."
        />

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-[1fr_1.35fr]">
          <Reveal className="h-full">
            <Card className="h-full p-7 sm:p-9">
              <ul className="space-y-7">
                <ContactItem icon={MapPin} label="Address">
                  <address className="not-italic">
                    {site.address.street}
                    <br />
                    {site.address.city}, {site.address.region} {site.address.postalCode}
                  </address>
                </ContactItem>
                <ContactItem icon={Phone} label="Phone">
                  <a href={site.phoneHref} className={linkClass}>
                    {site.phone}
                  </a>
                </ContactItem>
                <ContactItem icon={Mail} label="Email">
                  <a href={`mailto:${site.email}`} className={linkClass}>
                    {site.email}
                  </a>
                </ContactItem>
                <ContactItem icon={InstagramIcon} label="Instagram">
                  <a href={site.instagram.url} target="_blank" rel="noreferrer" className={linkClass}>
                    {site.instagram.handle}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </ContactItem>
                <ContactItem icon={Clock} label="Opening hours">
                  <dl className="space-y-1.5">
                    {site.hours.map((row) => (
                      <div key={row.days} className="flex flex-wrap gap-x-4">
                        <dt className="w-24 text-muted">{row.days}</dt>
                        <dd className="tabular-nums">{row.time}</dd>
                      </div>
                    ))}
                  </dl>
                </ContactItem>
              </ul>
            </Card>
          </Reveal>

          <Reveal delay={0.1} className="h-full">
            <div className="relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface sm:min-h-96">
              <div className="h-64 sm:absolute sm:inset-0 sm:h-auto">
                <MapIllustration />
              </div>
              <div className="flex flex-col gap-4 border-t border-line p-5 sm:absolute sm:inset-x-6 sm:bottom-6 sm:flex-row sm:items-center sm:justify-between sm:rounded-btn sm:border sm:bg-ink/90 sm:backdrop-blur">
                <div>
                  <p className="font-semibold">{site.name}</p>
                  <p className="text-sm text-muted">{site.address.street}, River North Art District</p>
                </div>
                <Button href={site.mapsUrl} target="_blank" rel="noreferrer" variant="secondary" size="sm">
                  <Navigation aria-hidden="true" className="size-4" />
                  Get directions
                  <span className="sr-only"> (opens Google Maps in a new tab)</span>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
