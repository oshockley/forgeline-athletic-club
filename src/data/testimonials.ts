import { unsplash } from '../lib/images'

export interface Testimonial {
  name: string
  detail: string
  quote: string
  rating: number
  avatar: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Jenna Whitaker',
    detail: 'Member since 2022',
    quote:
      'I came in unable to do a single push-up. Fourteen months later I pulled my first 100 kg deadlift, and the coaches were louder about it than I was.',
    rating: 5,
    avatar: unsplash('1438761681033-6461ffad8d80', 112, 112),
  },
  {
    name: 'Sofia Martinez',
    detail: 'HIIT & Boxing regular',
    quote:
      'The 6 AM crew is the reason I get out of bed. Classes start on time, the programming changes every week, and nobody lets you coast.',
    rating: 5,
    avatar: unsplash('1494790108377-be9c29b29330', 112, 112),
  },
  {
    name: 'Daniel Brooks',
    detail: 'Personal training client',
    quote:
      'Marcus rebuilt my squat after a back injury that two physios gave up on. Every session has a plan, and I can see the progress in the numbers.',
    rating: 5,
    avatar: unsplash('1500648767791-00dcc994a43e', 112, 112),
  },
]
