/**
 * Builds responsive Unsplash URLs. Every photo on the site goes through
 * this helper, so swapping to self-hosted images later is a one-file change.
 */
const UNSPLASH = 'https://images.unsplash.com/photo-'

export function unsplash(id: string, width: number, height: number, quality = 70): string {
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${width}&h=${height}&q=${quality}`
}

/** srcset at 1x/1.5x/2x of the given display size, preserving aspect ratio. */
export function unsplashSrcSet(id: string, width: number, height: number): string {
  return [1, 1.5, 2]
    .map((scale) => {
      const w = Math.round(width * scale)
      const h = Math.round(height * scale)
      return `${unsplash(id, w, h)} ${w}w`
    })
    .join(', ')
}
