import { useEffect, useState } from 'react'

/** Tracks whether the element with the given id intersects the viewport. */
export function useElementInView(id: string, initial = true): boolean {
  const [inView, setInView] = useState(initial)

  useEffect(() => {
    const el = document.getElementById(id)
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [id])

  return inView
}
