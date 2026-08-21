import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { useToast } from '../context/ToastContext';

interface MultiServiceCustomizerProps {
  onRequestPackage: (selectedServiceIds: string[]) => void;
}

export const MultiServiceCustomizer: React.FC<MultiServiceCustomizerProps> = ({
  onRequestPackage,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'food-truck-arrangements',
    'standard-jumping-castle',
    'standard-popcorn-cart',
  ]);
  const { info } = useToast();

  const toggleService = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id)
        ? (prev.length > 1 ? prev.filter(s => s !== id) : prev)
        : [...prev, id]
    );
  };

  const selectedServices = SERVICES_DATA.filter(s => selectedIds.includes(s.id));

  return (
    <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-cyan-400/30 via-indigo-500/30 to-fuchsia-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      <div className="bg-slate-950/70 backdrop-blur-3xl text-white rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden">
        {/* Ambient liquid orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-fuchsia-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Multi-Service Builder</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Build Your Custom Event Package
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Combine food trucks, inflatables, concession carts, and party infrastructure into a single, coordinated delivery. Save time and get synchronized on-site logistics.
            </p>
          </div>

          {/* Service Toggle Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {SERVICES_DATA.map(service => {
              const isSelected = selectedIds.includes(service.id);
              return (
                <div
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={`cursor-pointer rounded-2xl p-4 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between backdrop-blur-xl hover:scale-[1.02] hover:-translate-y-0.5 group ${
                    isSelected
                      ? 'bg-gradient-to-br from-cyan-500/15 via-indigo-500/15 to-pink-500/10 border-cyan-400/60 shadow-[0_10px_25px_rgba(6,182,212,0.18)] ring-1 ring-cyan-400/40 hover:border-cyan-300 hover:shadow-[0_15px_30px_rgba(6,182,212,0.25)]'
                      : 'bg-white/5 border-white/10 hover:border-cyan-400/40 text-slate-400 hover:bg-white/10 hover:shadow-[0_8px_20px_rgba(6,182,212,0.12)]'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 px-2 py-0.5 rounded bg-white/10 backdrop-blur-md border border-white/10 group-hover:border-white/20 transition-colors">
                        {service.category}
                      </span>
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all duration-300 group-hover:scale-110 ${
                        isSelected
                          ? 'bg-gradient-to-r from-cyan-400 to-indigo-500 border-white/40 text-white shadow-sm'
                          : 'border-white/20 bg-white/5 text-transparent group-hover:border-cyan-400/40'
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>
                    <h4 className={`text-sm font-bold leading-snug mb-1 transition-colors ${isSelected ? 'text-white group-hover:text-cyan-300' : 'text-slate-200 group-hover:text-white'}`}>
                      {service.name.split('(')[0]}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed group-hover:text-slate-300 transition-colors">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                    <span className={isSelected ? 'text-cyan-300 font-medium' : 'text-slate-400 group-hover:text-slate-300'}>
                      {isSelected ? '✓ Included in package' : '+ Click to add'}
                    </span>
                    <span className="text-slate-400 text-[10px]">
                      {service.isCore ? 'Core Service' : 'Add-on Gear'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Summary Bar & CTA */}
          <div className="bg-white/5 backdrop-blur-2xl rounded-2xl p-5 sm:p-6 border border-white/15 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                  Package Summary
                </span>
                <span className="text-xs text-slate-300">
                  ({selectedIds.length} {selectedIds.length === 1 ? 'Service' : 'Services'} Selected)
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedServices.map(s => (
                  <span
                    key={s.id}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold bg-white/10 text-white border border-white/15 backdrop-blur-md"
                  >
                    <span>{s.name.split('(')[0]}</span>
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Includes synchronized delivery windows, single invoice, and dedicated event producer.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  onRequestPackage(selectedIds);
                  info('Custom Package Prepared', `${selectedIds.length} services loaded into your booking request.`);
                }}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-fuchsia-600 hover:opacity-95 active:scale-95 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 group cursor-pointer border border-white/20"
              >
                <span>Request Your Event Package</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
