import React from 'react';
import { Sparkles, Calendar, CheckCircle2, Users, Clock } from 'lucide-react';
import { PACKAGES_DATA } from '../data/packagesData';
import { MultiServiceCustomizer } from '../components/MultiServiceCustomizer';

interface PackagesViewProps {
  onNavigate: (view: string, serviceId?: string) => void;
  onOpenBookingModal: (serviceId?: string, preselectedDate?: string, preselectedServices?: string[]) => void;
}

export const PackagesView: React.FC<PackagesViewProps> = ({
  onNavigate,
  onOpenBookingModal,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Curated Event Bundles</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Event Packages & Bundles
        </h1>
        <p className="text-slate-300 text-base leading-relaxed">
          Save time and eliminate stress with our synchronized party packages. Designed for maximum fun, seamless logistics, and one unified point of contact.
        </p>
      </div>

      {/* Packages Grid in Liquid Glass */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {PACKAGES_DATA.map((pkg, idx) => (
          <div
            key={pkg.id}
            className={`bg-slate-950/60 backdrop-blur-2xl rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_50px_-10px_rgba(6,182,212,0.25)] hover:scale-[1.02] hover:-translate-y-1.5 group relative ${
              idx === 0 ? 'border-cyan-400/60 ring-2 ring-cyan-400/30 hover:border-cyan-300' : 'border-white/15 hover:border-cyan-400/60'
            }`}
          >
            {/* Ambient hover glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Top Banner */}
            <div className="relative z-10">
              <div className="relative aspect-16/9 overflow-hidden bg-slate-900">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                {pkg.badge && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-xl shadow-md border border-white/20">
                    {pkg.badge}
                  </div>
                )}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-xs font-semibold text-cyan-300">
                    {pkg.idealFor}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {pkg.name}
                  </h3>
                  <p className="text-xs font-medium text-cyan-400 mt-0.5">
                    {pkg.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                    {pkg.description}
                  </p>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-white/5 backdrop-blur-md p-2.5 rounded-2xl border border-white/10 group-hover:border-white/20 group-hover:bg-white/[0.08] transition-colors">
                  <div className="flex items-center gap-1.5 text-slate-200">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-semibold">{pkg.estimatedGuests}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-200">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-semibold">{pkg.duration}</span>
                  </div>
                </div>

                {/* Included items */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Package Inclusions:
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {pkg.includedServices.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="p-6 pt-0 border-t border-white/10 mt-4 relative z-10">
              <div className="pt-4 space-y-2">
                <button
                  onClick={() => onOpenBookingModal(undefined, undefined, pkg.serviceIds)}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-500 via-indigo-600 to-fuchsia-600 hover:opacity-95 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Request Package Pricing</span>
                </button>
                <p className="text-[10px] text-slate-400 text-center">
                  * Custom quotes provided based on event duration & date.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Multi-Service Builder */}
      <div>
        <MultiServiceCustomizer
          onRequestPackage={(selectedIds) => onOpenBookingModal(undefined, undefined, selectedIds)}
        />
      </div>
    </div>
  );
};
