import React from 'react';
import { 
  ArrowLeft, Calendar, Sparkles
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { ServiceItem } from '../types';
import { SafetySection } from '../components/SafetySection';

interface ServiceDetailViewProps {
  serviceId: string;
  onNavigate: (view: string, serviceId?: string) => void;
  onOpenBookingModal: (serviceId?: string, preselectedDate?: string) => void;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({
  serviceId,
  onNavigate,
  onOpenBookingModal,
}) => {
  const service: ServiceItem = SERVICES_DATA.find(s => s.id === serviceId) || SERVICES_DATA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 pb-24">
      {/* Back Button & Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <button
          onClick={() => onNavigate('services')}
          className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Services</span>
        </button>
        <span>/</span>
        <span className="capitalize">{service.category}</span>
        <span>/</span>
        <span className="text-white truncate max-w-xs">{service.name}</span>
      </div>

      {/* Main Hero & Overview in Liquid Glass */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Image Gallery Montage */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-16/10 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/20 bg-slate-900 p-1">
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <img
                src={service.heroImage}
                alt={service.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              {service.badge && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-xl shadow-md border border-white/20">
                  {service.badge}
                </div>
              )}
            </div>
          </div>

          {/* Secondary images */}
          {service.gallery && service.gallery.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {service.gallery.map((imgUrl, i) => (
                <div
                  key={i}
                  className="relative aspect-4/3 rounded-2xl overflow-hidden border border-white/15 hover:border-cyan-400/60 shadow-sm bg-slate-900 p-0.5 hover:scale-105 transition-all duration-300 group cursor-pointer"
                >
                  <img
                    src={imgUrl}
                    alt={`${service.name} preview ${i + 1}`}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-108 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Key Details & Booking Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="capitalize">{service.category}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {service.name}
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          {/* Booking Action Card in Liquid Glass */}
          <div className="bg-slate-950/70 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-cyan-400/40 hover:shadow-[0_25px_60px_rgba(6,182,212,0.18)] transition-all duration-300 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-xs text-slate-400">Booking Status</span>
                <p className="font-bold text-sm text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available for 2026 Season
                </p>
              </div>
              <span className="text-xs font-mono bg-white/10 px-2 py-1 rounded-lg text-slate-300 border border-white/10">
                Direct Dispatch
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Click below to check real-time availability on our Calendly schedule or request a turnkey event quote.
            </p>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => onOpenBookingModal(service.id)}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-500 via-indigo-600 to-fuchsia-600 hover:opacity-95 active:scale-95 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
              >
                <Calendar className="w-4 h-4" />
                <span>{service.ctaText}</span>
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl border border-white/15 hover:border-white/25 active:scale-95 transition-all cursor-pointer"
              >
                Ask Dispatch a Question About This Item
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/10">
              <span>✓ Free bad-weather rescheduling</span>
              <span>✓ Inspected commercial grade</span>
            </div>
          </div>

          {/* Recommended For List */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/15 hover:border-cyan-400/40 hover:bg-white/[0.08] transition-all duration-300 space-y-2.5">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200">
              Ideal Occasions & Event Types:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {service.recommendedFor.map((rec, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-white/10 text-white rounded-lg text-xs font-medium border border-white/10 hover:bg-white/20 hover:border-cyan-400/30 transition-colors"
                >
                  {rec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Setup Requirements in Liquid Glass */}
      <div className="bg-slate-950/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.5)] space-y-6">
        <div className="border-b border-white/10 pb-4">
          <h3 className="text-2xl font-bold text-white">
            Technical Specifications & Venue Requirements
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Please ensure your venue meets these clear guidelines prior to arrival.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {service.specifications.map((spec, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.08] hover:scale-[1.02] transition-all duration-200 space-y-1">
              <span className="text-[11px] uppercase font-bold text-cyan-400 block">
                {spec.label}
              </span>
              <p className="text-sm font-semibold text-white">
                {spec.value}
              </p>
            </div>
          ))}
        </div>

        {/* Requirements Details */}
        {service.requirements && (
          <div className="pt-4 border-t border-white/10 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-300">
              Site & Power Logistics
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 hover:scale-[1.02] transition-all duration-200">
                <span className="font-bold text-white block mb-1">Space:</span>
                <span className="text-slate-300">{service.requirements.space}</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 hover:scale-[1.02] transition-all duration-200">
                <span className="font-bold text-white block mb-1">Surface:</span>
                <span className="text-slate-300">{service.requirements.surface}</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 hover:scale-[1.02] transition-all duration-200">
                <span className="font-bold text-white block mb-1">Power:</span>
                <span className="text-slate-300">{service.requirements.power}</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 hover:scale-[1.02] transition-all duration-200">
                <span className="font-bold text-white block mb-1">Access:</span>
                <span className="text-slate-300">{service.requirements.access}</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 hover:scale-[1.02] transition-all duration-200">
                <span className="font-bold text-white block mb-1">Weather:</span>
                <span className="text-slate-300">{service.requirements.weather}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Safety Section */}
      <SafetySection />

      {/* Item FAQs if present */}
      {service.faqs && service.faqs.length > 0 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Specific Inquiries
            </span>
            <h3 className="text-2xl font-bold text-white">
              Questions About {service.name}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-slate-950/60 backdrop-blur-2xl rounded-2xl p-5 border border-white/15 hover:border-cyan-400/50 hover:shadow-[0_10px_25px_rgba(6,182,212,0.15)] hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 space-y-2 group"
              >
                <h4 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">{faq.question}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
