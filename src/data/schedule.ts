import type { ClassType } from './classes'

export const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const
export type Day = (typeof days)[number]

export const dayNames: Record<Day, string> = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
  Sun: 'Sunday',
}

export interface ScheduleEntry {
  id: string
  day: Day
  /** 24h "HH:MM", used for sorting; formatted for display in the UI. */
  time: string
  classType: ClassType
  trainer: string
  durationMin: number
  spotsLeft: number
}

export const schedule: ScheduleEntry[] = [
  { id: 'mon-0600', day: 'Mon', time: '06:00', classType: 'HIIT', trainer: 'Theo Lindqvist', durationMin: 45, spotsLeft: 3 },
  { id: 'mon-1200', day: 'Mon', time: '12:00', classType: 'Yoga & Mobility', trainer: 'Elena Varga', durationMin: 50, spotsLeft: 9 },
  { id: 'mon-1730', day: 'Mon', time: '17:30', classType: 'Strength Training', trainer: 'Marcus Reyes', durationMin: 60, spotsLeft: 4 },
  { id: 'mon-1900', day: 'Mon', time: '19:00', classType: 'Boxing', trainer: 'Dana Okafor', durationMin: 55, spotsLeft: 0 },
  { id: 'tue-0615', day: 'Tue', time: '06:15', classType: 'Spin', trainer: 'Elena Varga', durationMin: 45, spotsLeft: 7 },
  { id: 'tue-0900', day: 'Tue', time: '09:00', classType: 'Personal Training', trainer: 'Marcus Reyes', durationMin: 60, spotsLeft: 1 },
  { id: 'tue-1800', day: 'Tue', time: '18:00', classType: 'HIIT', trainer: 'Dana Okafor', durationMin: 45, spotsLeft: 5 },
  { id: 'tue-1915', day: 'Tue', time: '19:15', classType: 'Yoga & Mobility', trainer: 'Elena Varga', durationMin: 60, spotsLeft: 11 },
  { id: 'wed-0600', day: 'Wed', time: '06:00', classType: 'Strength Training', trainer: 'Marcus Reyes', durationMin: 60, spotsLeft: 2 },
  { id: 'wed-1215', day: 'Wed', time: '12:15', classType: 'Spin', trainer: 'Theo Lindqvist', durationMin: 40, spotsLeft: 8 },
  { id: 'wed-1730', day: 'Wed', time: '17:30', classType: 'Boxing', trainer: 'Dana Okafor', durationMin: 55, spotsLeft: 6 },
  { id: 'wed-1900', day: 'Wed', time: '19:00', classType: 'HIIT', trainer: 'Theo Lindqvist', durationMin: 45, spotsLeft: 10 },
  { id: 'thu-0615', day: 'Thu', time: '06:15', classType: 'Boxing', trainer: 'Dana Okafor', durationMin: 55, spotsLeft: 4 },
  { id: 'thu-1000', day: 'Thu', time: '10:00', classType: 'Personal Training', trainer: 'Theo Lindqvist', durationMin: 60, spotsLeft: 1 },
  { id: 'thu-1730', day: 'Thu', time: '17:30', classType: 'Spin', trainer: 'Elena Varga', durationMin: 45, spotsLeft: 0 },
  { id: 'thu-1845', day: 'Thu', time: '18:45', classType: 'Strength Training', trainer: 'Marcus Reyes', durationMin: 60, spotsLeft: 5 },
  { id: 'fri-0600', day: 'Fri', time: '06:00', classType: 'HIIT', trainer: 'Dana Okafor', durationMin: 45, spotsLeft: 2 },
  { id: 'fri-1200', day: 'Fri', time: '12:00', classType: 'Strength Training', trainer: 'Theo Lindqvist', durationMin: 50, spotsLeft: 7 },
  { id: 'fri-1730', day: 'Fri', time: '17:30', classType: 'Yoga & Mobility', trainer: 'Elena Varga', durationMin: 60, spotsLeft: 12 },
  { id: 'sat-0800', day: 'Sat', time: '08:00', classType: 'Boxing', trainer: 'Dana Okafor', durationMin: 60, spotsLeft: 1 },
  { id: 'sat-0930', day: 'Sat', time: '09:30', classType: 'Strength Training', trainer: 'Marcus Reyes', durationMin: 75, spotsLeft: 6 },
  { id: 'sat-1100', day: 'Sat', time: '11:00', classType: 'Spin', trainer: 'Theo Lindqvist', durationMin: 45, spotsLeft: 9 },
  { id: 'sun-0900', day: 'Sun', time: '09:00', classType: 'Yoga & Mobility', trainer: 'Elena Varga', durationMin: 75, spotsLeft: 14 },
  { id: 'sun-1030', day: 'Sun', time: '10:30', classType: 'HIIT', trainer: 'Theo Lindqvist', durationMin: 45, spotsLeft: 8 },
  { id: 'sun-1600', day: 'Sun', time: '16:00', classType: 'Personal Training', trainer: 'Marcus Reyes', durationMin: 60, spotsLeft: 2 },
]
