import React, { useState } from 'react';
import { Camera, Sparkles, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GALLERY_DATA } from '../data/galleryData';
import { useParallaxScroll } from '../hooks/useParallax';

export const GallerySection: React.FC<{
  limit?: number;
  showHeader?: boolean;
}> = ({ limit, showHeader = true }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Parallax scroll offsets for gallery depth
  const parallaxOffsetA = useParallaxScroll(0.04, 24);
  const parallaxOffsetB = useParallaxScroll(-0.03, 18);
  const parallaxOffsetC = useParallaxScroll(0.02, 12);

  const categories = [
    { id: 'all', label: 'All Event Moments' },
    { id: 'jumping-castles', label: 'Castles & Inflatables' },
    { id: 'food-trucks', label: 'Food Trucks & Catering' },
    { id: 'popcorn-carts', label: 'Popcorn & Sweets' },
    { id: 'corporate-events', label: 'Corporate & Festivals' },
    { id: 'kids-parties', label: 'Kids Parties' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_DATA
    : GALLERY_DATA.filter(item => item.category === selectedCategory);

  const displayItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(activeLightboxIndex === 0 ? displayItems.length - 1 : activeLightboxIndex - 1);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(activeLightboxIndex === displayItems.length - 1 ? 0 : activeLightboxIndex + 1);
    }
  };

  return (
    <div className="space-y-8">
      {showHeader && (
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            <span>Real Event Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            See Our Setups in Action
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            From vibrant backyard birthday inflatables to gourmet food truck clusters and high-volume carnival popcorn carts.
          </p>
        </div>
      )}

      {/* Category Pills in Liquid Glass */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer backdrop-blur-xl hover:scale-105 active:scale-95 ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold shadow-lg shadow-indigo-500/20 border border-white/30'
                : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid in Liquid Glass with Parallax Depth */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayItems.map((item, idx) => {
          // Staggered column parallax offset
          const colIndex = idx % 3;
          const currentParallax = colIndex === 0 ? parallaxOffsetA : colIndex === 1 ? parallaxOffsetB : parallaxOffsetC;

          return (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              style={{ transform: `translate3d(0, ${currentParallax}px, 0)` }}
              className="group relative rounded-3xl overflow-hidden bg-slate-900/60 aspect-4/3 cursor-pointer shadow-[0_15px_35px_rgba(0,0,0,0.6)] border border-white/15 hover:border-cyan-400/60 hover:shadow-[0_20px_45px_rgba(6,182,212,0.25)] hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 p-1 will-change-transform"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all">
                  <Eye className="w-4 h-4 text-cyan-300" />
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                    {item.eventType}
                  </span>
                  <h4 className="text-sm font-bold truncate leading-snug text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 truncate">
                    {item.serviceName}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/20 z-50 cursor-pointer"
            aria-label="Close photo view"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/20 z-50 cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-slate-950/90 rounded-3xl overflow-hidden shadow-2xl border border-white/20 relative"
          >
            <div className="relative aspect-16/10 bg-black">
              <img
                src={displayItems[activeLightboxIndex].image}
                alt={displayItems[activeLightboxIndex].title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-5 text-white bg-slate-900/90 backdrop-blur-md flex items-center justify-between border-t border-white/10">
              <div>
                <span className="text-xs text-cyan-300 font-bold uppercase tracking-wider">
                  {displayItems[activeLightboxIndex].eventType}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {displayItems[activeLightboxIndex].title}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  {displayItems[activeLightboxIndex].serviceName}
                </p>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {activeLightboxIndex + 1} / {displayItems.length}
              </span>
            </div>
          </div>

          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/20 z-50 cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};
