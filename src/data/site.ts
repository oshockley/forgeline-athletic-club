export const site = {
  name: 'Forgeline Athletic Club',
  shortName: 'Forgeline',
  tagline: 'Strength, conditioning and coaching in the heart of the River North Art District.',
  address: {
    street: '2150 Ironworks Avenue',
    city: 'Denver',
    region: 'CO',
    postalCode: '80205',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=River+North+Art+District+Denver+CO',
  phone: '(303) 555-0148',
  phoneHref: 'tel:+13035550148',
  email: 'hello@forgelineathletic.com',
  instagram: {
    handle: '@forgelineathletic',
    url: 'https://www.instagram.com/forgelineathletic',
  },
  facebookUrl: 'https://www.facebook.com/forgelineathletic',
  youtubeUrl: 'https://www.youtube.com/@forgelineathletic',
  hours: [
    { days: 'Mon – Fri', time: '5:00 AM – 11:00 PM' },
    { days: 'Saturday', time: '7:00 AM – 9:00 PM' },
    { days: 'Sunday', time: '8:00 AM – 8:00 PM' },
  ],
  stats: [
    { value: '2,500+', label: 'Members' },
    { value: '40+', label: 'Weekly Classes' },
    { value: '4.9', label: 'Rating' },
  ],
  foundedYear: 2016,
} as const

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`
