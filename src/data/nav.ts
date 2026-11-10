export interface NavLink {
  label: string
  href: `#${string}`
}

export const navLinks: NavLink[] = [
  { label: 'Classes', href: '#classes' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Contact', href: '#contact' },
]
