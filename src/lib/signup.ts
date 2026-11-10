export const goals = [
  'Build strength',
  'Lose body fat',
  'Improve fitness & endurance',
  'Learn to box',
  'Mobility & injury recovery',
  'Train for an event',
] as const

export interface SignupValues {
  name: string
  email: string
  phone: string
  goal: string
}

export type SignupField = keyof SignupValues
export type SignupErrors = Partial<Record<SignupField, string>>

export const emptySignup: SignupValues = { name: '', email: '', phone: '', goal: '' }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateField(field: SignupField, raw: string): string | undefined {
  const value = raw.trim()
  switch (field) {
    case 'name':
      if (!value) return 'Please enter your full name.'
      if (value.length < 2) return 'Your name looks a little short.'
      return undefined
    case 'email':
      if (!value) return 'Please enter your email address.'
      if (!EMAIL_PATTERN.test(value)) return 'Enter a valid email, like you@example.com.'
      return undefined
    case 'phone': {
      if (!value) return 'Please enter your phone number.'
      const digits = value.replace(/\D/g, '').length
      if (digits < 10 || digits > 15 || /[^\d\s()+.-]/.test(value)) {
        return 'Enter a valid phone number, like (303) 555-0148.'
      }
      return undefined
    }
    case 'goal':
      return value ? undefined : 'Choose the goal that fits you best.'
  }
}

export function validateSignup(values: SignupValues): SignupErrors {
  const errors: SignupErrors = {}
  for (const field of Object.keys(values) as SignupField[]) {
    const error = validateField(field, values[field])
    if (error) errors[field] = error
  }
  return errors
}

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID?.trim()

/**
 * Sends the signup to Formspree. Without VITE_FORMSPREE_ID set, it simulates
 * a successful submission after one second so demos still work.
 */
export async function submitSignup(values: SignupValues): Promise<void> {
  if (!FORMSPREE_ID) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return
  }

  const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      ...values,
      _subject: `Free trial signup: ${values.name}`,
    }),
  })

  if (!response.ok) {
    throw new Error(`Formspree responded with ${response.status}`)
  }
}
