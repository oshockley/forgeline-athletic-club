import { AnimatePresence, m } from 'framer-motion'
import { useElementInView } from '../../hooks/useElementInView'
import { Button } from '../ui/Button'

/**
 * Mobile-only call to action that slides in once the hero is out of view,
 * and steps aside while the signup form itself is on screen.
 */
export function MobileJoinBar() {
  const heroVisible = useElementInView('top', true)
  const signupVisible = useElementInView('signup', false)
  const show = !heroVisible && !signupVisible

  return (
    <AnimatePresence>
      {show && (
        <m.div
          role="region"
          aria-label="Join Forgeline Athletic Club"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 px-gutter pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-lg md:hidden"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm leading-tight">
              <span className="block font-semibold text-fg">7-day free trial</span>
              <span className="text-muted">No card. No contract.</span>
            </p>
            <Button href="#signup" size="sm" className="shrink-0">
              Join Now
            </Button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
