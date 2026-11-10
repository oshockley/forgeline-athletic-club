import { AnimatePresence, m } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { navLinks } from '../../data/nav'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'

const sectionIds = navLinks.map((link) => link.href.slice(1))

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolled(24)
  const active = useActiveSection(sectionIds)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Close on Escape (returning focus to the toggle) and when resizing to desktop.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 768px)')
    const onResize = () => desktop.matches && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
    }
  }, [menuOpen])

  const solid = scrolled || menuOpen

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        solid ? 'border-line bg-ink/90 backdrop-blur-lg' : 'border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-header items-center justify-between gap-6">
        <a href="#top" className="rounded-btn" aria-label="Forgeline Athletic Club, back to top">
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1)
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'relative rounded-btn px-3 py-2 text-sm font-medium transition-colors',
                      'after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-accent after:transition-transform',
                      isActive
                        ? 'text-fg after:scale-x-100'
                        : 'text-muted after:scale-x-0 hover:text-fg hover:after:scale-x-100',
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button href="#signup" size="sm">
            Join Now
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-btn border border-line text-fg transition-colors hover:border-line-strong hover:bg-surface md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {menuOpen && (
          <m.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="border-t border-line bg-ink md:hidden"
          >
            <Container className="pb-6 pt-2">
              <ul className="divide-y divide-line">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-4 font-display text-2xl font-semibold uppercase tracking-wide text-fg transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <Button href="#signup" size="lg" className="mt-4 w-full" onClick={() => setMenuOpen(false)}>
                Start Free Trial
              </Button>
            </Container>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
