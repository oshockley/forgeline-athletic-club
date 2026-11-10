import { unsplash, unsplashSrcSet } from '../lib/images'

export interface Trainer {
  name: string
  specialty: string
  bio: string
  certifications: string
  photo: { src: string; srcSet: string; alt: string }
}

const photo = (id: string, alt: string) => ({
  src: unsplash(id, 480, 600),
  srcSet: unsplashSrcSet(id, 480, 600),
  alt,
})

export const trainers: Trainer[] = [
  {
    name: 'Marcus Reyes',
    specialty: 'Head Strength Coach',
    bio: 'Former collegiate shot-putter who has coached over 400 members to their first bodyweight squat.',
    certifications: 'CSCS · USAW L2',
    photo: photo('1567013127542-490d757e51fc', 'Marcus Reyes crouching beside a loaded barbell in the gym'),
  },
  {
    name: 'Dana Okafor',
    specialty: 'Boxing & Conditioning',
    bio: 'Golden Gloves finalist who runs the toughest, and most-booked, Saturday class in the building.',
    certifications: 'USA Boxing Coach · NASM-CPT',
    photo: photo('1550345332-09e3ac987658', 'Dana Okafor in a black-and-white portrait between training sets'),
  },
  {
    name: 'Elena Varga',
    specialty: 'Mobility & Recovery',
    bio: 'Physical therapist turned coach who makes stiff hips and cranky shoulders feel ten years younger.',
    certifications: 'DPT · RYT-500',
    photo: photo('1546483875-ad9014c88eba', 'Elena Varga performing a dumbbell row on a bench'),
  },
  {
    name: 'Theo Lindqvist',
    specialty: 'HIIT & Endurance',
    bio: 'Ironman finisher who programs intervals that are brutally hard and surprisingly fun.',
    certifications: 'ACE-CPT · Precision Nutrition L1',
    photo: photo('1597452485669-2c7bb5fef90d', 'Theo Lindqvist resting between rounds on a cable machine'),
  },
]
