import { EventPackage } from '../types';

export const PACKAGES_DATA: EventPackage[] = [
  {
    id: 'kids-party-package',
    slug: 'kids-party-package',
    name: 'Kids Ultimate Party Package',
    tagline: 'The foolproof recipe for laughter and unforgettable memories',
    badge: 'Most Popular for Birthdays',
    description: 'The complete children’s entertainment package featuring our sanitized jumping castle, delicious hot popcorn cart with unlimited aroma, setup, safety mats, and delivery.',
    includedServices: [
      'Standard Jumping Castle (4 to 8 Hours)',
      'Classic Vintage Popcorn Cart (100 Servings)',
      'Safety Ground Stakes / Heavy Sandbags & Entry Mats',
      'Continuous Air Blower + Heavy-Duty Cables',
      'Delivery, Precision Setup & Post-Event Packdown'
    ],
    serviceIds: ['standard-jumping-castle', 'standard-popcorn-cart'],
    idealFor: 'Backyard Birthdays, Kids Playdays & Family Celebrations',
    estimatedGuests: '15 – 45 Kids',
    duration: '4 to 8 Hours Flexible',
    features: [
      'Sanitized commercial grade inflatable',
      'Complete popcorn supplies (kernels, oil, butter, retro bags)',
      'Safety inspection checklist provided on site',
      'Free flexible bad-weather rescheduling policy'
    ],
    startingPrice: 'Request Package Pricing',
    ctaText: 'Request Package Pricing',
    calendlySlug: 'kids-party-package',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'corporate-family-day',
    slug: 'corporate-family-day',
    name: 'Corporate Family Day & Team Celebration',
    tagline: 'High-capacity entertainment & gourmet catering for company events',
    badge: 'Turnkey Corporate',
    description: 'Elevate your company picnic, team milestone, or brand activation with high-capacity adventure inflatables, curated gourmet food truck line-ups, and unlimited concession stations.',
    includedServices: [
      'Large Mega Jumping Castle / Inflatable Obstacle Slide',
      'Food Truck Vendor Matching & Logistics Coordination',
      'Grand Event Commercial Popcorn Station (250+ Servings)',
      'On-Site Coordinator & Certified Staff Supervisors',
      'Risk Assessment & Comprehensive Public Liability Insurance Docs'
    ],
    serviceIds: ['large-jumping-castle', 'food-truck-arrangements', 'large-popcorn-cart'],
    idealFor: 'Corporate Picnics, Company Anniversaries, Staff Appreciation Days',
    estimatedGuests: '100 – 600+ Guests',
    duration: 'Full Day or Custom Shift Scheduling',
    features: [
      'Dedicated single point-of-contact event producer',
      'High-throughput activity rotation for fast queues',
      'Whisper generator & power distribution included if needed',
      'Branded food packaging & photo booth add-on capability'
    ],
    startingPrice: 'Request Package Pricing',
    ctaText: 'Request Package Pricing',
    calendlySlug: 'corporate-family-day',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'festival-community-extravaganza',
    slug: 'festival-community-extravaganza',
    name: 'Festival, School Fete & Community Extravaganza',
    tagline: 'All-inclusive event infrastructure and multi-vendor coordination',
    badge: 'Large Scale Events',
    description: 'Designed for school carnivals, municipal sports galas, and community festivals requiring multiple food trucks, multi-zone inflatables, concession stands, and power logistics.',
    includedServices: [
      'Multi-Truck Gourmet Food Truck Village (2–5 Trucks)',
      'Large Adventure Jumping Castle + Junior Bounce Zone',
      'Commercial High-Volume Popcorn & Cotton Candy Concessions',
      'Event Layout Plan, Queue Management & Crowd Flow Strategy',
      'Full Teardown, Waste Management & Council Compliance Assistance'
    ],
    serviceIds: ['large-jumping-castle', 'standard-jumping-castle', 'food-truck-arrangements', 'large-popcorn-cart', 'cotton-candy-station'],
    idealFor: 'School Galas, Community Festivals, Sports Tournaments, Block Parties',
    estimatedGuests: '300 – 2,500+ Attendees',
    duration: 'Multi-Hour or Multi-Day',
    features: [
      'Full compliance with council and school district safety protocols',
      'High-volume concessions producing hundreds of servings/hr',
      'Comprehensive on-site technical support through the whole event'
    ],
    startingPrice: 'Request Package Pricing',
    ctaText: 'Request Package Pricing',
    calendlySlug: 'festival-community-extravaganza',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80'
  }
];
