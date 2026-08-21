import React from 'react';
import { 
  Sparkles, Calendar, Clock, Truck, FileCheck, Layers 
} from 'lucide-react';
import { AvailabilityChecker } from '../components/AvailabilityChecker';

export const HowItWorksView: React.FC<{
  onOpenBookingModal: (serviceId?: string, date?: string) => void;
  onNavigate: (view: string) => void;
}> = ({ onOpenBookingModal, onNavigate }) => {
  const steps = [
    {
      num: '01',
      title: 'Choose Your Services & Bundles',
      desc: 'Browse our catalog of commercial jumping castles, curated food trucks, vintage popcorn carts, and party gear. You can hire individual items or configure a combined multi-service package.',
      icon: Layers,
      highlight: 'Transparent specifications & space requirements provided for every item.'
    },
    {
      num: '02',
      title: 'Check Date & Availability in Calendly',
      desc: 'Pick your preferred celebration date. Our integrated Calendly schedule checks real-time equipment availability and lets you reserve your exact delivery & setup window.',
      icon: Calendar,
      highlight: 'Live calendar sync with zero double-booking risk.'
    },
    {
      num: '03',
      title: 'Confirm Event Details & Requirements',
      desc: 'Enter your host contact information, venue location, power availability, ground surface (grass vs concrete), and any dietary or theme requirements.',
      icon: FileCheck,
      highlight: 'Instant confirmation email & dispatch review within 2 business hours.'
    },
    {
      num: '04',
      title: 'We Handle Delivery, Setup & Cleanup',
      desc: 'Our uniformed, trained delivery crew arrives 45 to 90 minutes before your party. We inflate, safely anchor with stakes/sandbags, test power, and demonstrate operation. At event conclusion, we pack everything down cleanly.',
      icon: Truck,
      highlight: 'Zero heavy lifting for you — just enjoy your party!'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Simple 4-Step Process</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          How Event Booking Works
        </h1>
        <p className="text-slate-300 text-base leading-relaxed">
          We believe organizing event rentals and food catering should be as effortless as enjoying the party. Here is our straightforward process from first click to final teardown.
        </p>
      </div>

      {/* Steps List in Liquid Glass */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="bg-slate-950/60 backdrop-blur-2xl rounded-3xl p-8 border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:border-cyan-400/60 hover:shadow-[0_25px_50px_-10px_rgba(6,182,212,0.25)] hover:scale-[1.02] hover:-translate-y-1.5 transition-all duration-300 space-y-4 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-colors pointer-events-none" />

              <div className="flex items-center justify-between relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-400/30 text-cyan-300 flex items-center justify-center font-bold group-hover:bg-cyan-500/30 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent font-heading group-hover:scale-105 transition-transform origin-right">
                  {step.num}
                </span>
              </div>

              <div className="space-y-2 relative z-10">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-cyan-300 font-semibold bg-cyan-500/10 p-3 rounded-2xl border border-cyan-400/20 group-hover:border-cyan-400/40 group-hover:bg-cyan-500/15 transition-all relative z-10">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{step.highlight}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Day-of-Event Timeline Breakdown in Liquid Glass */}
      <div className="bg-slate-950/70 backdrop-blur-3xl text-white rounded-3xl p-8 sm:p-12 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Day-of Timeline
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            What to Expect on Event Day
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2 hover:bg-white/[0.08] hover:border-cyan-400/50 hover:shadow-[0_15px_30px_rgba(6,182,212,0.18)] hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 group">
            <span className="text-cyan-400 font-bold text-base block group-hover:text-cyan-300 transition-colors">T - 90 Minutes</span>
            <h4 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">Arrival & Site Inspection</h4>
            <p className="text-slate-300 leading-relaxed">
              Our truck arrives, verifies level ground and electrical power sources, and sets up safety perimeter barriers.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2 hover:bg-white/[0.08] hover:border-cyan-400/50 hover:shadow-[0_15px_30px_rgba(6,182,212,0.18)] hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 group">
            <span className="text-cyan-400 font-bold text-base block group-hover:text-cyan-300 transition-colors">T - 30 Minutes</span>
            <h4 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">Safety Test & Demonstration</h4>
            <p className="text-slate-300 leading-relaxed">
              Inflatables fully blown and anchored; concession machines heated; safety checklist signed off with host.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2 hover:bg-white/[0.08] hover:border-cyan-400/50 hover:shadow-[0_15px_30px_rgba(6,182,212,0.18)] hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 group">
            <span className="text-cyan-400 font-bold text-base block group-hover:text-cyan-300 transition-colors">Post-Event</span>
            <h4 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">Prompt Collection & Cleanup</h4>
            <p className="text-slate-300 leading-relaxed">
              We return at your agreed wrap-up time for swift deflation, sanitized equipment packdown, and trash staging.
            </p>
          </div>
        </div>
      </div>

      {/* Date Check CTA */}
      <AvailabilityChecker
        onCheckAvailability={(date, sId) => onOpenBookingModal(sId, date)}
      />
    </div>
  );
};
