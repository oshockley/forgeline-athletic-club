import { Star } from 'lucide-react'

export function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div role="img" aria-label={`Rated ${rating} out of ${max}`} className="flex gap-1">
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={i < rating ? 'size-4 fill-accent text-accent' : 'size-4 text-line-strong'}
        />
      ))}
    </div>
  )
}
