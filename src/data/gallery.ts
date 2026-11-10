import { unsplash, unsplashSrcSet } from '../lib/images'

export interface GalleryImage {
  id: string
  thumb: string
  thumbSrcSet: string
  full: string
  alt: string
  caption: string
}

const image = (id: string, alt: string, caption: string): GalleryImage => ({
  id,
  thumb: unsplash(id, 600, 600),
  thumbSrcSet: unsplashSrcSet(id, 600, 600),
  full: unsplash(id, 1600, 1200, 80),
  alt,
  caption,
})

export const gallery: GalleryImage[] = [
  image(
    '1541534741688-6078c6bfb5c5',
    'Member pressing a loaded barbell overhead in a squat rack',
    'Priya · Strict press 25 kg → 50 kg in 14 months',
  ),
  image(
    '1532029837206-abbe2b7620e3',
    'Member pressing a barbell overhead in the squat rack',
    'Andre · Down 18 kg and pressing bodyweight',
  ),
  image(
    '1534367610401-9f5ed68180aa',
    'Close-up of a tattooed lifter gripping a barbell',
    'Rosa · First 140 kg squat at age 41',
  ),
  image(
    '1574680096145-d05b474e2155',
    'Member holding a barbell across her shoulders in black and white',
    'Kate · Back-squat PR after shoulder rehab',
  ),
  image(
    '1599058917765-a780eda07a3e',
    'Member slamming battle ropes in an industrial training space',
    'Luis · Finished his first Spartan Race',
  ),
  image(
    '1566241142559-40e1dab266c6',
    'Member holding a forearm plank on the gym floor',
    'Mia · Three-minute plank, pain-free back',
  ),
]
