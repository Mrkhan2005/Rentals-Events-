import React from 'react';
import { ShieldCheck, CheckCircle2, CloudRain, Zap, Users, Sparkles } from 'lucide-react';
import { SAFETY_CHECKLIST, WEATHER_POLICY } from '../data/safetyData';

export const SafetySection: React.FC = () => {
  return (
    <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-cyan-400/20 via-indigo-500/20 to-fuchsia-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      <div className="bg-slate-950/70 backdrop-blur-3xl text-white rounded-3xl p-6 sm:p-10 border border-white/10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Safety, Sanitization & Weather Guarantees</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Our Safety Standards & Host Peace of Mind
            </h3>
          </div>

          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-2 rounded-2xl text-xs font-semibold backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Commercial Insurance Covered</span>
          </div>
        </div>

        {/* 4 Key Pillars in Liquid Glass */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 space-y-2 hover:bg-white/[0.08] hover:border-cyan-400/50 hover:shadow-[0_15px_30px_rgba(6,182,212,0.18)] hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 flex items-center justify-center font-bold group-hover:bg-cyan-500/30 group-hover:scale-110 transition-all duration-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">Commercial Grade Rigging</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              18oz commercial fire-retardant vinyl, double-stitched stress points, and 18-inch heavy duty steel ground stakes or 150lb sandbag ballasts.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 space-y-2 hover:bg-white/[0.08] hover:border-cyan-400/50 hover:shadow-[0_15px_30px_rgba(6,182,212,0.18)] hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 flex items-center justify-center font-bold group-hover:bg-cyan-500/30 group-hover:scale-110 transition-all duration-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">Sanitized Before Every Hire</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every bounce house, food truck surface, and popcorn cart kettle is thoroughly sanitized with EPA-approved, kid-safe solutions.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 space-y-2 hover:bg-white/[0.08] hover:border-cyan-400/50 hover:shadow-[0_15px_30px_rgba(6,182,212,0.18)] hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 flex items-center justify-center font-bold group-hover:bg-cyan-500/30 group-hover:scale-110 transition-all duration-300">
              <CloudRain className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">Weather Flexibility</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Zero-penalty date rescheduling up to 7:00 AM on event day in cases of persistent torrential rain or sustained high winds &gt; 15-20mph.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 space-y-2 hover:bg-white/[0.08] hover:border-cyan-400/50 hover:shadow-[0_15px_30px_rgba(6,182,212,0.18)] hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 flex items-center justify-center font-bold group-hover:bg-cyan-500/30 group-hover:scale-110 transition-all duration-300">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">Electrical & GFCI Checked</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Commercial waterproof GFCI extension cords and heavy-duty blowers tested on-site before we hand over the setup to your host.
            </p>
          </div>
        </div>

        {/* Safety checklist grid in Liquid Glass */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2 border-t border-white/10">
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Inspection & Operational Protocol</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {SAFETY_CHECKLIST.slice(0, 4).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-white/5 backdrop-blur-md p-2.5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-cyan-400/40 hover:scale-[1.01] transition-all duration-200">
                  <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-cyan-400" />
              <span>Weather Policy & Wind Thresholds</span>
            </h4>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-2 text-xs text-slate-300 hover:bg-white/[0.08] hover:border-cyan-400/40 hover:shadow-[0_10px_25px_rgba(6,182,212,0.12)] transition-all duration-300">
              <p>
                <strong>Wind Limits:</strong> {WEATHER_POLICY.windThreshold}
              </p>
              <p>
                <strong>Rain & Storms:</strong> {WEATHER_POLICY.rainPolicy}
              </p>
              <p className="text-slate-400 text-[11px] pt-1">
                {WEATHER_POLICY.temperature}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
