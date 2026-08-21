import React from 'react';
import { Calendar, ShieldCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { SERVICES_DATA } from '../data/servicesData';

interface FooterProps {
  onNavigate: (view: string, serviceId?: string) => void;
  onOpenBookingModal: (serviceId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBookingModal,
}) => {
  return (
    <footer className="relative bg-slate-950/80 backdrop-blur-3xl text-slate-300 border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Liquid ambient glows */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Top Liquid Banner */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Live Scheduling Active
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to schedule your celebration?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Lock in your date through our direct Calendly reservation flow or submit an inquiry for custom festival catering.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onOpenBookingModal()}
              className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 via-indigo-600 to-fuchsia-600 hover:opacity-95 text-white font-bold text-sm rounded-2xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Your Event Now</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Contact Dispatch</span>
            </button>
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-fuchsia-500 p-0.5 shadow-md shadow-indigo-500/20">
                <div className="w-full h-full bg-slate-950/90 rounded-[10px] flex items-center justify-center text-white font-extrabold text-lg">
                  <span className="bg-gradient-to-r from-cyan-400 to-indigo-300 bg-clip-text text-transparent">E</span>
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                EventsRentals<span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">.io</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Your Complete Event Experience Partner. Commercial bouncy castles, gourmet food trucks, vintage concession carts, and full event infrastructure.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Services & Castles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('packages')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Packages & Bundles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Real Event Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How Booking Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQ & Weather Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Services List */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Core Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {SERVICES_DATA.slice(0, 6).map(s => (
                <li key={s.id}>
                  <button
                    onClick={() => onNavigate('service-detail', s.id)}
                    className="hover:text-white transition-colors text-left truncate max-w-[180px] cursor-pointer"
                  >
                    {s.name.split('(')[0]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Safety & Compliance */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Safety & Trust
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2 bg-white/5 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Commercial insurance covered on every hire</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Clean equipment • Professional setup • On-time delivery guarantee.
              </p>
              <div className="pt-1 flex flex-wrap gap-2 text-[11px]">
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-white transition-colors underline cursor-pointer"
                >
                  Terms & Conditions
                </button>
                <span>•</span>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-white transition-colors underline cursor-pointer"
                >
                  Privacy Policy
                </button>
                <span>•</span>
                <button
                  onClick={() => onNavigate('cancellation')}
                  className="hover:text-white transition-colors underline cursor-pointer"
                >
                  Weather Guarantee
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright in Liquid Glass */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} EventsRentals.io. All rights reserved. Your Complete Event Experience Partner.</p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted for memorable celebrations</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
