export type ServiceCategory = 
  | 'all'
  | 'inflatables'
  | 'food-trucks'
  | 'concessions'
  | 'party-gear'
  | 'entertainment';

export interface ServiceRequirement {
  space: string;
  surface: string;
  power: string;
  access: string;
  weather: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  badge?: string;
  category: 'inflatables' | 'food-trucks' | 'concessions' | 'party-gear' | 'entertainment';
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  gallery: string[];
  features: string[];
  whatIncluded: {
    title: string;
    description: string;
    iconName: string;
  }[];
  requirements: ServiceRequirement;
  recommendedFor: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  startingPrice?: string;
  pricingNote: string;
  ctaText: string;
  calendlySlug: string;
  calendlyUrl: string;
  faqs: ServiceFAQ[];
  isFeatured?: boolean;
  isCore?: boolean;
}

export interface EventPackage {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  badge?: string;
  description: string;
  includedServices: string[];
  serviceIds: string[];
  idealFor: string;
  estimatedGuests: string;
  duration: string;
  features: string[];
  startingPrice?: string;
  ctaText: string;
  calendlySlug: string;
  image: string;
}

export interface EventTypeItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  popularServices: string[];
  attendeeRange: string;
  image: string;
  highlight: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'jumping-castles' | 'food-trucks' | 'popcorn-carts' | 'event-setup' | 'kids-parties' | 'corporate-events' | 'outdoor-events';
  categoryLabel: string;
  image: string;
  serviceName: string;
  eventType: string;
  aspectRatio?: 'square' | 'landscape' | 'portrait';
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  eventType: string;
  content: string;
  rating: number;
  location: string;
  avatar: string;
  servicesUsed: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: 'booking' | 'equipment' | 'weather' | 'pricing' | 'logistics';
}

export interface BookingFormData {
  selectedServices: string[];
  packageId?: string;
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventTime?: string;
  eventDurationHours?: string;
  eventType: string;
  eventLocation: string;
  guestCount: string;
  surfaceType?: string;
  notes?: string;
}

export interface BusinessInfo {
  name: string;
  domain: string;
  tagline: string;
  phonePlaceholder: string;
  emailPlaceholder: string;
  serviceAreaPlaceholder: string;
  operatingHours: string;
  defaultCalendlyUrl: string;
}
