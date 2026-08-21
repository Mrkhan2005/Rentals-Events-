import { BusinessInfo } from '../types';

export const BUSINESS_CONFIG: BusinessInfo = {
  name: 'EventsRentals.io',
  domain: 'EventsRentals.io',
  tagline: 'Your Complete Event Experience Partner',
  // Clearly marked editable placeholders as specified in project rules
  phonePlaceholder: '+1 (800) 555-RENT [Configurable Phone]',
  emailPlaceholder: 'hello@eventsrentals.io [Configurable Email]',
  serviceAreaPlaceholder: 'Metro Area & Surrounding Suburbs [Configurable Region]',
  operatingHours: 'Mon - Sun: 7:00 AM – 9:00 PM (Setup & Support)',
  defaultCalendlyUrl: 'https://calendly.com/eventsrentals/event-consultation',
};

export const CALENDLY_CONFIG = {
  // Base URLs for specific Calendly routing flows
  baseUrl: 'https://calendly.com/eventsrentals',
  serviceFlows: {
    'food-truck-arrangements': 'https://calendly.com/eventsrentals/food-truck',
    'standard-jumping-castle': 'https://calendly.com/eventsrentals/jumping-castles',
    'large-jumping-castle': 'https://calendly.com/eventsrentals/jumping-castles',
    'standard-popcorn-cart': 'https://calendly.com/eventsrentals/popcorn-cart',
    'large-popcorn-cart': 'https://calendly.com/eventsrentals/popcorn-cart',
    'consultation': 'https://calendly.com/eventsrentals/event-consultation',
    'packages': 'https://calendly.com/eventsrentals/event-package-consultation',
  },
};
