import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { gallery } from '../data/gallery'
import { cn } from '../lib/cn'

const navButton =
  'inline-flex size-12 items-center justify-center rounded-full border border-line-strong bg-ink/70 text-fg backdrop-blur transition-colors hover:border-accent hover:text-accent'

export function Gallery() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState<number | null>(null)
  const current = index === null ? null : gallery[index]

  // Lock page scroll while the lightbox is open.
  useEffect(() => {
    if (index === null) return
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = previous
    }
  }, [index])

  const open = (i: number) => {
    setIndex(i)
    dialogRef.current?.showModal()
  }
  const close = () => dialogRef.current?.close()
  const step = (delta: number) =>
    setIndex((i) => (i === null ? i : (i + delta + gallery.length) % gallery.length))

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'ArrowRight') step(1)
    if (e.key === 'ArrowLeft') step(-1)
  }

  // Clicking the backdrop area (outside the figure and controls) closes.
  const onBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) close()
  }

  return (
    <section id="results" aria-labelledby="results-title" className="py-section lg:py-section-lg">
      <Container>
        <SectionHeading
          id="results-title"
          eyebrow="Transformations"
          title="Proof, not promises"
          description="Members who started exactly where you are. Tap a photo to see the full story."
        />

        <Reveal>
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-16 lg:grid-cols-3 lg:gap-5">
            {gallery.map((image, i) => (
              <li key={image.id}>
                <button
                  type="button"
                  onClick={() => open(i)}
                  aria-haspopup="dialog"
                  className="group relative block aspect-square w-full overflow-hidden rounded-card bg-surface"
                >
                  <img
                    src={image.thumb}
                    srcSet={image.thumbSrcSet}
                    sizes="(min-width: 1024px) 30vw, 46vw"
                    width={600}
                    height={600}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/10 to-transparent opacity-90 transition-opacity group-hover:opacity-100"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 text-left sm:p-5">
                    <span className="text-xs font-medium leading-snug text-fg sm:text-sm">{image.caption}</span>
                    <span
                      aria-hidden="true"
                      className="hidden size-9 shrink-0 items-center justify-center rounded-full bg-accent text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:inline-flex"
                    >
                      <Expand className="size-4" />
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>

      <dialog
        ref={dialogRef}
        aria-label={current ? `Photo: ${current.caption}` : 'Photo viewer'}
        onClose={() => setIndex(null)}
        onKeyDown={onKeyDown}
        className="m-0 size-full max-h-none max-w-none bg-transparent p-0 text-fg"
      >
        {current && index !== null && (
          <div
            onClick={onBackdropClick}
            className="flex size-full flex-col items-center justify-center gap-4 p-4 sm:p-10"
          >
            <figure className="flex max-h-full min-h-0 w-full max-w-5xl flex-col items-center">
              <img
                src={current.full}
                width={1600}
                height={1200}
                alt={current.alt}
                className="max-h-[calc(100svh-11rem)] w-auto min-w-0 rounded-card object-contain"
              />
              <figcaption className="mt-4 flex w-full flex-wrap items-center justify-between gap-2 text-sm">
                <span className="font-medium">{current.caption}</span>
                <span className="text-muted tabular-nums">
                  {index + 1} / {gallery.length}
                </span>
              </figcaption>
            </figure>

            <div className="flex gap-3">
              <button type="button" onClick={() => step(-1)} className={navButton} aria-label="Previous photo">
                <ChevronLeft aria-hidden="true" className="size-6" />
              </button>
              <button type="button" onClick={() => step(1)} className={navButton} aria-label="Next photo">
                <ChevronRight aria-hidden="true" className="size-6" />
              </button>
            </div>

            <button
              type="button"
              onClick={close}
              autoFocus
              className={cn(navButton, 'absolute right-4 top-4 sm:right-8 sm:top-8')}
              aria-label="Close photo viewer"
            >
              <X aria-hidden="true" className="size-6" />
            </button>
          </div>
        )}
      </dialog>
    </section>
  )
}
