import React, { useState } from 'react';
import { Calendar, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';

interface AvailabilityCheckerProps {
  onCheckAvailability: (selectedDate: string, serviceId?: string) => void;
}

export const AvailabilityChecker: React.FC<AvailabilityCheckerProps> = ({
  onCheckAvailability,
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const [guests, setGuests] = useState('25-50');

  const todayStr = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) {
      // Default to upcoming Saturday if left blank
      const nextSat = new Date();
      nextSat.setDate(nextSat.getDate() + ((6 - nextSat.getDay() + 7) % 7 || 7));
      onCheckAvailability(nextSat.toISOString().split('T')[0], selectedService !== 'all' ? selectedService : undefined);
      return;
    }
    onCheckAvailability(selectedDate, selectedService !== 'all' ? selectedService : undefined);
  };

  return (
    <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-white/20 via-cyan-500/30 to-indigo-500/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] group">
      <div className="bg-slate-950/70 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-5 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Live Event Schedule</span>
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">• Real-time Calendly Dispatch Check</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Check Date Availability for Your Event
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full w-fit backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
            <span>2026 Weekend Slots Open</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Service Dropdown */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Select Service / Package
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-2xl text-xs sm:text-sm font-semibold text-white focus:bg-slate-900/90 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 backdrop-blur-md transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] cursor-pointer"
            >
              <option value="all" className="bg-slate-900 text-white">★ All Services / Custom Package</option>
              {SERVICES_DATA.map(s => (
                <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                  {s.name.split('(')[0]}
                </option>
              ))}
            </select>
          </div>

          {/* Date Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Target Event Date
            </label>
            <input
              type="date"
              min={todayStr}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-2xl text-xs sm:text-sm font-semibold text-white focus:bg-slate-900/90 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 backdrop-blur-md transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] cursor-pointer [color-scheme:dark]"
            />
          </div>

          {/* Estimated Guests */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Estimated Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-2xl text-xs sm:text-sm font-semibold text-white focus:bg-slate-900/90 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 backdrop-blur-md transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] cursor-pointer"
            >
              <option value="15-25" className="bg-slate-900 text-white">15 – 25 Guests (Intimate)</option>
              <option value="25-50" className="bg-slate-900 text-white">25 – 50 Guests (Standard Party)</option>
              <option value="50-100" className="bg-slate-900 text-white">50 – 100 Guests (Medium Event)</option>
              <option value="100-250" className="bg-slate-900 text-white">100 – 250 Guests (Large Event)</option>
              <option value="250+" className="bg-slate-900 text-white">250+ Guests (Festival / Carnival)</option>
            </select>
          </div>

          {/* Action Button with Liquid Glass Glow */}
          <div>
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-fuchsia-600 hover:opacity-95 active:scale-95 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Check Availability</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Instant schedule lookup • Flexible bad-weather guarantee</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Zero deposit to check dates
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
