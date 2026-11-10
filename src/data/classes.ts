export type ClassType =
  | 'Strength Training'
  | 'HIIT'
  | 'Yoga & Mobility'
  | 'Boxing'
  | 'Personal Training'
  | 'Spin'

export type Intensity = 1 | 2 | 3

export interface ClassItem {
  type: ClassType
  description: string
  intensity: Intensity
  intensityLabel: string
}

export const classes: ClassItem[] = [
  {
    type: 'Strength Training',
    description: 'Coached barbell sessions built around squat, press and deadlift progressions.',
    intensity: 3,
    intensityLabel: 'High',
  },
  {
    type: 'HIIT',
    description: 'Forty minutes of intervals, sleds and bike sprints that leave nothing in the tank.',
    intensity: 3,
    intensityLabel: 'High',
  },
  {
    type: 'Yoga & Mobility',
    description: 'Restore range of motion, ease stiff joints and recover faster between hard days.',
    intensity: 1,
    intensityLabel: 'Low',
  },
  {
    type: 'Boxing',
    description: 'Pad work, footwork and bag rounds that sharpen technique and torch conditioning.',
    intensity: 3,
    intensityLabel: 'High',
  },
  {
    type: 'Personal Training',
    description: 'One-on-one coaching with a plan written around your body, schedule and goals.',
    intensity: 2,
    intensityLabel: 'Adaptive',
  },
  {
    type: 'Spin',
    description: 'Rhythm-driven rides on Stages bikes with live power metrics on the big screen.',
    intensity: 2,
    intensityLabel: 'Moderate',
  },
]

export const classTypes: ClassType[] = classes.map((c) => c.type)
