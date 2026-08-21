import { FAQItem } from '../types';

export const FAQ_DATA: FAQItem[] = [
  {
    category: 'booking',
    question: 'How far in advance should I book my event?',
    answer: 'We recommend booking 2 to 6 weeks in advance for weekend birthday parties and jumping castles, and 4 to 8 weeks in advance for peak season food truck catering and large corporate festivals. However, we also accommodate short-notice bookings whenever inventory and schedules permit.'
  },
  {
    category: 'booking',
    question: 'How do I check availability for my specific date?',
    answer: 'You can check real-time availability using our integrated date checker or directly launch the Calendly booking flow for any service or package. Simply pick your preferred date and time window to secure your slot or schedule an event consultation.'
  },
  {
    category: 'booking',
    question: 'How does the Calendly booking flow work?',
    answer: 'When you choose a service or package, you are routed into our dedicated Calendly calendar where you select an available date and time, input your venue details and guest count, and receive an instant booking confirmation with our dispatch team.'
  },
  {
    category: 'booking',
    question: 'Can I book multiple services together?',
    answer: 'Yes! You can select multiple services (such as a Jumping Castle + Popcorn Cart + Food Truck) and request a unified Multi-Service Package. We coordinate delivery times, power logistics, and on-site setup so you only deal with one trusted contact.'
  },
  {
    category: 'logistics',
    question: 'Do you deliver and set up all equipment?',
    answer: 'Yes. Our professional delivery crew handles all heavy lifting, site positioning, safety anchoring, inflation, electrical safety connections, and post-event teardown. You do not have to haul or assemble any heavy gear.'
  },
  {
    category: 'equipment',
    question: 'What space is required for a jumping castle?',
    answer: 'Our Standard Jumping Castle requires a clear level footprint of at least 16 ft x 16 ft with 13 ft overhead clearance. Our Large Inflatables require at least 26 ft x 22 ft with 16 ft vertical clearance. All areas must be free of low-hanging branches, overhead wires, and debris.'
  },
  {
    category: 'weather',
    question: 'What happens if it rains or bad weather is forecasted?',
    answer: 'Safety is paramount. For inflatables, operation is prohibited in sustained winds exceeding 15 mph or torrential thunderstorms. If poor weather is forecast on the morning of your event, we offer free rescheduling or full credit towards a future date.'
  },
  {
    category: 'booking',
    question: 'Can I cancel or reschedule my booking?',
    answer: 'Yes. Rescheduling is completely free with at least 48 hours notice. Cancellations made prior to the cutoff receive flexible rescheduling credit or a refund per our straightforward cancellation policy.'
  },
  {
    category: 'equipment',
    question: 'Do you provide food truck operators and concession attendants?',
    answer: 'Yes! All food truck bookings include fully certified culinary staff and truck operators. For popcorn and concession machines, you can choose DIY hire (with full operating demonstration provided) or add a friendly uniformed attendant.'
  },
  {
    category: 'pricing',
    question: 'Can I request a custom event package tailored to my budget?',
    answer: 'Absolutely. Use our interactive Custom Package Builder or Contact Form to select the exact items you need, and our event specialists will tailor a bundled quote with volume discounts.'
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: 't-1',
    author: 'Sarah Jenkins',
    role: 'Parent & Party Host',
    eventType: '7th Birthday Party',
    content: 'Booking through EventsRentals.io was effortless. The jumping castle was spotless, set up 45 minutes early, and the popcorn cart was a huge hit with all the parents and kids.',
    rating: 5,
    location: 'Metro West Suburbs',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    servicesUsed: ['Standard Jumping Castle', 'Classic Popcorn Cart']
  },
  {
    id: 't-2',
    author: 'Marcus Vance',
    role: 'People & Culture Director',
    eventType: 'Annual Company Picnic (350 Guests)',
    content: 'Coordinating two food trucks and a large obstacle inflatable could have been a logistical headache, but the EventsRentals team handled all power, site mapping, and staffing seamlessly.',
    rating: 5,
    location: 'Downtown Corporate Center',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    servicesUsed: ['Food Truck Arrangements', 'Large Jumping Castle', 'Commercial Popcorn']
  },
  {
    id: 't-3',
    author: 'Elena Rodriguez',
    role: 'PTA Committee Chair',
    eventType: 'Elementary School Spring Carnival',
    content: 'Clean equipment, strict safety compliance documentation for our school district, and punctual friendly staff. We have already booked them for next year’s gala.',
    rating: 5,
    location: 'Oakridge Community School',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    servicesUsed: ['Large Inflatable Slide', 'Popcorn Cart', 'Cotton Candy']
  }
];
