import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQ_DATA } from '../data/faqData';
import { SafetySection } from '../components/SafetySection';

export const FAQView: React.FC<{
  onOpenBookingModal: () => void;
  onNavigate: (view: string) => void;
}> = ({ onOpenBookingModal, onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'booking', label: 'Booking & Calendly' },
    { id: 'equipment', label: 'Equipment & Space' },
    { id: 'weather', label: 'Weather & Safety' },
    { id: 'pricing', label: 'Packages & Pricing' },
    { id: 'logistics', label: 'Delivery & Setup' },
  ];

  const filteredFaqs = activeCategory === 'all'
    ? FAQ_DATA
    : FAQ_DATA.filter(f => f.category === activeCategory);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>Knowledge Base</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-300 text-base leading-relaxed">
          Find transparent answers about booking procedures, weather policies, electrical requirements, and equipment specifications.
        </p>
      </div>

      {/* Category Filter in Liquid Glass */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setOpenIndex(null);
            }}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer backdrop-blur-md hover:scale-105 active:scale-95 ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold shadow-md shadow-indigo-500/20 border border-white/30'
                : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accordion in Liquid Glass */}
      <div className="max-w-3xl mx-auto space-y-3">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-slate-950/60 backdrop-blur-2xl rounded-2xl border border-white/15 shadow-[0_8px_20px_rgba(0,0,0,0.4)] overflow-hidden hover:border-cyan-400/40 hover:shadow-[0_12px_28px_rgba(6,182,212,0.15)] hover:scale-[1.01] transition-all duration-300"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 transition-transform ${
                    isOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/10 animate-in fade-in duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Safety Section Integration */}
      <div className="pt-8">
        <SafetySection />
      </div>

      {/* Still Have Questions CTA */}
      <div className="bg-slate-950/70 backdrop-blur-3xl rounded-3xl p-8 sm:p-10 border border-white/15 text-center max-w-2xl mx-auto space-y-4 shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:border-cyan-400/40 hover:shadow-[0_20px_45px_rgba(6,182,212,0.18)] transition-all duration-300">
        <h3 className="text-xl font-bold text-white">
          Have a unique event question or venue setup requirement?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300">
          Our dispatch team is happy to review your venue map or coordinate special power/timing arrangements.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white font-bold text-xs rounded-xl border border-white/15 hover:border-white/25 active:scale-95 shadow-sm cursor-pointer transition-all"
          >
            Contact Dispatch
          </button>
          <button
            onClick={onOpenBookingModal}
            className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 via-indigo-600 to-fuchsia-600 hover:opacity-95 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer border border-white/20 transition-all"
          >
            Check Event Date
          </button>
        </div>
      </div>
    </div>
  );
};
