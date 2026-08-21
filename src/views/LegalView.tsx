import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';

interface LegalViewProps {
  type: 'privacy' | 'terms' | 'cancellation';
  onNavigate: (view: string) => void;
}

export const LegalView: React.FC<LegalViewProps> = ({ type, onNavigate }) => {
  const content = {
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'How EventsRentals.io protects host information and booking details.',
      sections: [
        {
          heading: 'Information We Collect',
          body: 'We collect customer contact information (name, email address, telephone number, event delivery address) exclusively to coordinate event rental dispatch, safe site setup, and booking confirmations through our Calendly integration.',
        },
        {
          heading: 'Zero Third-Party Data Sharing',
          body: 'EventsRentals.io does not sell, rent, or trade your personal information with third-party advertisers. Information is only shared with our internal dispatch drivers and certified catering food truck operators assigned to your event date.',
        },
        {
          heading: 'Payment & Scheduling Security',
          body: 'Direct calendar scheduling and booking holds are managed through secured, SSL-encrypted systems. We do not store sensitive payment card details directly on our servers.',
        },
      ],
    },
    terms: {
      title: 'Terms & Conditions of Rental',
      subtitle: 'Standard commercial hire terms and operating guidelines.',
      sections: [
        {
          heading: '1. Site Access & Setup Area',
          body: 'The client agrees to provide a clear, unobstructed path (minimum 36-inch gate opening for standard castles, 48-inch for large inflatables) to the designated setup area. Ground surface must be flat, clear of rocks, pet waste, and sharp debris.',
        },
        {
          heading: '2. Dedicated Electrical Requirements',
          body: 'The client must ensure a standard 110V/15A dedicated electrical outlet is available within 50 to 75 feet of the inflatable blower or concession unit. On-site generators can be booked in advance if power is unavailable.',
        },
        {
          heading: '3. Adult Supervision Requirement',
          body: 'A responsible adult (18 years or older) must actively supervise the inflatable or interactive entertainment unit at all times during operation to ensure guest safety and adherence to maximum participant capacities.',
        },
        {
          heading: '4. Equipment Care & Inspection',
          body: 'No shoes, food, drinks, sharp objects, silly string, or face paint are permitted inside jumping castles. Equipment is inspected and documented before hand-off and upon collection.',
        },
      ],
    },
    cancellation: {
      title: 'Inclement Weather & Cancellation Policy',
      subtitle: 'Transparent and flexible rescheduling terms for peace of mind.',
      sections: [
        {
          heading: 'Inclement Weather Guarantee (Free Rescheduling)',
          body: 'Safety is our highest priority. In the event of severe weather (sustained winds exceeding 15 mph, lightning storms, or continuous heavy rainfall), you may reschedule your booking to any available date within 12 months with zero rescheduling penalties.',
        },
        {
          heading: 'Standard Advance Cancellation',
          body: 'Cancellations made at least 7 days prior to the scheduled event date receive a 100% full refund or credit toward a future booking date. Cancellations made 3 to 6 days prior receive a full rental credit.',
        },
        {
          heading: 'Same-Day Weather Decisions',
          body: 'Our dispatch team monitors local radar continuously. We will contact you between 7:00 AM and 8:00 AM on event day to discuss weather forecasts and confirm safe deployment.',
        },
      ],
    },
  }[type];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 pb-24">
      <button
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </button>

      <div className="bg-slate-950/70 backdrop-blur-3xl rounded-3xl p-8 sm:p-12 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-8">
        <div className="space-y-3 border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>Policy & Guidelines</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {content.title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            {content.subtitle}
          </p>
        </div>

        <div className="space-y-6">
          {content.sections.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-white">
                {section.heading}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-300">
            <span className="font-bold text-white block">Questions about our policies?</span>
            <span>Our dispatch office is here to help clarify any details.</span>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-90 text-white rounded-xl text-xs font-bold transition-opacity cursor-pointer border border-white/20"
          >
            Contact Dispatch
          </button>
        </div>
      </div>
    </div>
  );
};
