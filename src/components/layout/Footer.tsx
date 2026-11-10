import { navLinks } from '../../data/nav'
import { fullAddress, site } from '../../data/site'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../ui/SocialIcons'

const socials = [
  { label: 'Instagram', href: site.instagram.url, Icon: InstagramIcon },
  { label: 'Facebook', href: site.facebookUrl, Icon: FacebookIcon },
  { label: 'YouTube', href: site.youtubeUrl, Icon: YoutubeIcon },
]

const headingClass = 'font-display text-sm font-semibold uppercase tracking-eyebrow text-fg'
const linkClass = 'text-muted transition-colors hover:text-accent'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface/40 pb-28 pt-16 md:pb-10">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <a href="#top" className="inline-block rounded-btn" aria-label="Forgeline Athletic Club, back to top">
              <Logo size="lg" />
            </a>
            <p className="mt-5 leading-relaxed text-muted">{site.tagline}</p>
            <ul className="mt-6 flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Forgeline Athletic Club on ${label} (opens in a new tab)`}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-line text-muted transition hover:-translate-y-0.5 hover:border-accent hover:text-accent motion-reduce:hover:translate-y-0"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="footer-explore">
            <h2 id="footer-explore" className={headingClass}>
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#signup" className={linkClass}>
                  Free Trial
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className={headingClass}>Hours</h2>
            <dl className="mt-5 space-y-3">
              {site.hours.map((row) => (
                <div key={row.days}>
                  <dt className="text-sm text-fg">{row.days}</dt>
                  <dd className="text-muted">{row.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className={headingClass}>Visit</h2>
            <address className="mt-5 space-y-3 not-italic">
              <p className="text-muted">{fullAddress}</p>
              <p>
                <a href={site.phoneHref} className={linkClass}>
                  {site.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
                  {site.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Forgeline Athletic Club. All rights reserved.</p>
          <p>Built for people who show up.</p>
        </div>
      </Container>
    </footer>
  )
}
