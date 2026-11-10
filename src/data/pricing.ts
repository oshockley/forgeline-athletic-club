export type BillingCycle = 'monthly' | 'annual'

export interface Plan {
  id: string
  name: string
  summary: string
  monthly: number
  features: string[]
  popular?: boolean
}

/** Annual billing = 10 months of the monthly price (2 months free). */
export const ANNUAL_MONTHS_CHARGED = 10

export const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    summary: 'Open-gym access for self-starters who know their program.',
    monthly: 39,
    features: [
      'Open gym access, 7 days a week',
      'Locker rooms & showers',
      'Forgeline app workout library',
      '1 InBody body-composition scan',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    summary: 'Unlimited classes plus the coaching to make them count.',
    monthly: 69,
    popular: true,
    features: [
      'Everything in Basic',
      'Unlimited group classes',
      'Quarterly goal-setting session',
      'Monthly InBody scans',
      'Recovery lounge & sauna',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    summary: 'Personal coaching for members who want results on a deadline.',
    monthly: 119,
    features: [
      'Everything in Pro',
      '4 personal training sessions / month',
      'Custom nutrition plan',
      'Priority class booking',
      '2 guest passes every month',
    ],
  },
]
