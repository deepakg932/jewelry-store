// src/config/constants.js
export const APP_CONSTANTS = {
  appName: 'LUMIÈRE',
  appTagline: 'Modern Minimalist Jewelry',
  contactEmail: 'hello@lumiere.com',
  contactPhone: '+1 (555) 123-4567',
  address: '123 Minimalist Ave, Design District, NY 10001',
  socialLinks: {
    instagram: 'https://instagram.com/lumiere',
    pinterest: 'https://pinterest.com/lumiere',
    facebook: 'https://facebook.com/lumiere',
  },
  shipping: {
    freeThreshold: 100,
    standardDays: '3-5',
    expressDays: '1-2',
  },
  returnPolicy: '30-day returns. Free exchanges within 14 days.',
}

export const PRODUCT_CATEGORIES = [
  { id: 'rings', name: 'Rings', icon: '💍' },
  { id: 'necklaces', name: 'Necklaces', icon: '📿' },
  { id: 'earrings', name: 'Earrings', icon: '💎' },
  { id: 'bracelets', name: 'Bracelets', icon: '✨' },
]

export const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
]