import React from 'react';
import { GallerySection } from '../components/GallerySection';
import { Calendar } from 'lucide-react';

export const GalleryView: React.FC<{ onOpenBookingModal: () => void }> = ({ onOpenBookingModal }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
      <GallerySection showHeader={true} />

      <div className="bg-slate-950/70 backdrop-blur-3xl text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-5 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
          Like what you see for your upcoming celebration?
        </h3>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">
          Let&apos;s check equipment availability for your event date and reserve your preferred jumping castle or catering setup.
        </p>
        <button
          onClick={onOpenBookingModal}
          className="px-7 py-3.5 bg-gradient-to-r from-cyan-500 via-indigo-600 to-fuchsia-600 hover:opacity-95 active:scale-95 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all inline-flex items-center gap-2 cursor-pointer border border-white/20"
        >
          <Calendar className="w-4 h-4" />
          <span>Check Your Event Date Now</span>
        </button>
      </div>
    </div>
  );
};
