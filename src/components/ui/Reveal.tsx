import { m, type HTMLMotionProps } from 'framer-motion'

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number
}

/**
 * Fades content up into view once. Under prefers-reduced-motion the
 * app-level MotionConfig drops the transform and keeps only the fade.
 */
export function Reveal({ delay = 0, ...rest }: RevealProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    />
  )
}
