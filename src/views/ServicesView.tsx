import React, { useState } from 'react';
import { Sparkles, Calendar, Search } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { ServiceItem } from '../types';
import { MultiServiceCustomizer } from '../components/MultiServiceCustomizer';

interface ServicesViewProps {
  onNavigate: (view: string, serviceId?: string) => void;
  onOpenBookingModal: (serviceId?: string, preselectedDate?: string, preselectedServices?: string[]) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  onNavigate,
  onOpenBookingModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Services & Gear' },
    { id: 'inflatables', label: 'Castles & Inflatables' },
    { id: 'food-trucks', label: 'Food Trucks & Catering' },
    { id: 'concessions', label: 'Popcorn & Sweet Treats' },
    { id: 'entertainment', label: 'Entertainment & Fun' },
    { id: 'party-gear', label: 'Tents & Event Infrastructure' },
  ];

  const filteredServices = SERVICES_DATA.filter((item: ServiceItem) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.fullDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.recommendedFor.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Complete Event Inventory</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Event Services & Rentals
        </h1>
        <p className="text-slate-300 text-base leading-relaxed">
          Explore our certified jumping castles, gourmet food trucks, nostalgic concession machines, and party infrastructure. Available for individual hire or bundled packages.
        </p>
      </div>

      {/* Filter & Search Bar in Liquid Glass */}
      <div className="space-y-4 bg-slate-950/60 backdrop-blur-2xl p-4 sm:p-6 rounded-3xl border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer backdrop-blur-md ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold shadow-md shadow-indigo-500/20 border border-white/30'
                    : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search castles, food trucks, popcorn..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/15 rounded-2xl text-xs font-medium text-white focus:bg-slate-900/90 focus:outline-none focus:ring-2 focus:ring-cyan-400 backdrop-blur-md placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>

      {/* Services Grid with Liquid Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service: ServiceItem) => (
          <div
            key={service.id}
            className="bg-slate-950/60 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:border-cyan-400/60 hover:shadow-[0_25px_50px_-10px_rgba(6,182,212,0.25)] hover:scale-[1.02] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative"
          >
            {/* Ambient light sheen on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="relative z-10">
              {/* Image Banner */}
              <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                <img
                  src={service.heroImage}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                {service.badge && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold uppercase px-2.5 py-1 rounded-lg shadow-md border border-white/20">
                    {service.badge}
                  </div>
                )}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-black/60 backdrop-blur-md rounded border border-white/10 text-cyan-300">
                    {service.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-1.5">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Specifications Preview */}
                <div className="space-y-1.5 bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10 group-hover:border-white/20 group-hover:bg-white/[0.08] transition-colors text-xs">
                  <p className="font-bold text-cyan-400 text-[11px] uppercase tracking-wider">
                    Key Specifications:
                  </p>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    {service.specifications.slice(0, 3).map((spec, i) => (
                      <li key={i} className="flex items-center gap-1.5 truncate">
                        <span className="font-semibold text-white">{spec.label}:</span> {spec.value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 pt-0 border-t border-white/10 mt-2 relative z-10">
              <div className="pt-4 flex items-center gap-2">
                <button
                  onClick={() => onNavigate('service-detail', service.id)}
                  className="flex-1 py-3 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all text-center cursor-pointer border border-white/10 hover:border-white/25 active:scale-95"
                >
                  Full Specs & Details
                </button>
                <button
                  onClick={() => onOpenBookingModal(service.id)}
                  className="flex-1 py-3 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-95 active:scale-95 text-white font-bold text-xs transition-all text-center shadow-md cursor-pointer border border-white/20"
                >
                  {service.ctaText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Package Customizer Section */}
      <div className="pt-6">
        <MultiServiceCustomizer
          onRequestPackage={(selectedIds) => onOpenBookingModal(undefined, undefined, selectedIds)}
        />
      </div>
    </div>
  );
};
