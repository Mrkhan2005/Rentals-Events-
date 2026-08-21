import React, { useState } from 'react';
import { 
  Sparkles, Calendar, ArrowRight, ShieldCheck, Clock, CheckCircle2, 
  ChevronRight, Star, Truck, Utensils, HelpCircle, ChevronDown, Check 
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { EVENT_TYPES_DATA } from '../data/eventTypesData';
import { TESTIMONIALS_DATA, FAQ_DATA } from '../data/faqData';
import { AvailabilityChecker } from '../components/AvailabilityChecker';
import { MultiServiceCustomizer } from '../components/MultiServiceCustomizer';
import { GallerySection } from '../components/GallerySection';
import { SafetySection } from '../components/SafetySection';
import { SmartEventPlanner } from '../components/SmartEventPlanner';
import { useImagePreloader } from '../hooks/useImagePreloader';
import { useParallaxScroll } from '../hooks/useParallax';
import heroMontageImg from '../assets/images/regenerated_image_1787122820695.jpg';

interface HomeViewProps {
  onNavigate: (view: string, serviceId?: string) => void;
  onOpenBookingModal: (serviceId?: string, preselectedDate?: string, preselectedServices?: string[]) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenBookingModal,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Parallax scroll offsets for liquid glass depth
  const heroImageParallax = useParallaxScroll(0.09, 50);
  const badgeParallax = useParallaxScroll(-0.14, 40);
  const ambientGlowParallax = useParallaxScroll(0.18, 70);

  // Preload critical high-resolution hero and featured event images
  const criticalHeroImages = [
    heroMontageImg,
    SERVICES_DATA[0]?.heroImage,
    SERVICES_DATA[1]?.heroImage,
    SERVICES_DATA[2]?.heroImage,
  ].filter(Boolean);

  const { isLoaded: isHeroImagesLoaded } = useImagePreloader(criticalHeroImages, { timeoutMs: 1800 });

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleDateCheck = (date: string, serviceId?: string) => {
    onOpenBookingModal(serviceId, date);
  };

  const handleRequestCustomPackage = (selectedIds: string[]) => {
    onOpenBookingModal(undefined, undefined, selectedIds);
  };

  const trustHighlights = [
    {
      title: 'Professional Setup & Rigging',
      desc: 'Our trained crew handles precise on-site positioning, commercial anchoring, and electrical safety testing.'
    },
    {
      title: 'Reliable, Punctual Dispatch',
      desc: 'Guaranteed arrival 45 to 90 minutes prior to your event start so everything is ready when guests arrive.'
    },
    {
      title: 'Hospital-Grade Sanitized Gear',
      desc: 'All inflatables, concession kettles, and catering units undergo detailed sanitization before every hire.'
    },
    {
      title: 'Easy Calendly Booking',
      desc: 'Effortless date checking, instant scheduling flow, transparent requirements, and live confirmation.'
    },
    {
      title: 'Flexible Event Solutions',
      desc: 'From intimate 15-person birthday parties to multi-thousand guest community festivals, scaled to your needs.'
    },
    {
      title: 'Customer-Focused Service',
      desc: 'Transparent pricing guides, bad-weather rescheduling options, and proactive event dispatch coordination.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION IN LIQUID GLASS */}
      <section className="relative overflow-hidden pt-6 pb-12 lg:pt-12 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Headlines & CTAs */}
            <div className={`lg:col-span-7 space-y-6 text-center lg:text-left transition-all duration-700 ease-out ${
              isHeroImagesLoaded ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-2'
            }`}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-cyan-300 text-xs font-bold uppercase tracking-widest shadow-lg shadow-cyan-500/10">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400" />
                <span>Your Complete Event Experience Partner</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
                MAKE YOUR EVENT <br />
                <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent drop-shadow-sm">
                  UNFORGETTABLE
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                Everything you need to bring your event to life — from food trucks and jumping castles to popcorn carts and more.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onOpenBookingModal()}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 via-indigo-600 to-fuchsia-600 hover:opacity-95 active:scale-95 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 group cursor-pointer border border-white/20"
                >
                  <Calendar className="w-5 h-5 text-white" />
                  <span>Book Your Event</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => onNavigate('services')}
                  className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/15 backdrop-blur-xl text-white font-bold text-base rounded-2xl border border-white/20 shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Services</span>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </button>
              </div>

              {/* Quick trust metrics in Liquid Glass */}
              <div className="pt-6 grid grid-cols-3 gap-3 border-t border-white/10 text-left max-w-lg mx-auto lg:mx-0">
                <div className="bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-[0_8px_20px_rgba(6,182,212,0.15)]">
                  <h4 className="text-2xl font-black bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">100%</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Commercial Sanitized</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-[0_8px_20px_rgba(6,182,212,0.15)]">
                  <h4 className="text-2xl font-black bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">On-Time</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Dispatch Guarantee</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-[0_8px_20px_rgba(6,182,212,0.15)]">
                  <h4 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Calendly</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Live Calendar Sync</p>
                </div>
              </div>
            </div>

            {/* Right Col: Sleek Liquid Glass Card & Imagery Montage with 0 CLS preloader & Parallax Depth */}
            <div className={`lg:col-span-5 relative transition-all duration-700 ease-out ${
              isHeroImagesLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-80 translate-y-3 scale-[0.98]'
            }`}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Parallax Ambient Glow Orb behind glass */}
                <div
                  className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-fuchsia-500/20 rounded-3xl blur-2xl pointer-events-none transition-transform duration-200 ease-out will-change-transform"
                  style={{ transform: `translate3d(0, ${ambientGlowParallax}px, 0)` }}
                />

                {/* Main hero image card with parallax translation, liquid glass border, and fixed aspect-4/3 */}
                <div
                  className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/20 bg-slate-900/80 backdrop-blur-xl aspect-4/3 p-2 transition-transform duration-200 ease-out will-change-transform"
                  style={{ transform: `translate3d(0, ${heroImageParallax}px, 0)` }}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900">
                    {/* Liquid Glass Shimmer Placeholder during preload */}
                    {!isHeroImagesLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-pulse flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full border-2 border-cyan-400/40 border-t-cyan-400 animate-spin" />
                      </div>
                    )}

                    <img
                      src={heroMontageImg}
                      alt="Professionally organized party with jumping castle, food trucks, and happy families"
                      className={`w-full h-full object-cover transition-opacity duration-700 ${
                        isHeroImagesLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading="eager"
                      fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />
                    <div className={`absolute bottom-4 left-4 right-4 text-white transition-all duration-500 delay-100 ${
                      isHeroImagesLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}>
                      <div className="inline-block bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full mb-1 border border-white/20">
                        Turnkey Setup
                      </div>
                      <p className="font-bold text-sm text-slate-100">Clean inflatables, gourmet food & seamless flow</p>
                    </div>
                  </div>
                </div>

                {/* Floating Liquid Glass Badge 2: Punctual Delivery with Inverse Parallax Speed */}
                <div
                  className={`absolute -top-4 -right-4 sm:-right-6 bg-slate-950/80 backdrop-blur-2xl rounded-2xl p-3 shadow-[0_15px_35px_rgba(0,0,0,0.6)] border border-white/20 flex items-center gap-2.5 transition-all duration-500 delay-200 will-change-transform ${
                    isHeroImagesLoaded ? 'opacity-100' : 'opacity-0 -translate-y-2'
                  }`}
                  style={{ transform: `translate3d(0, ${badgeParallax}px, 0)` }}
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">100% Inspected & Ready</p>
                    <p className="text-[10px] text-slate-400">Safe ground anchoring</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Availability Checker Bar in Liquid Glass */}
          <div className="mt-12 sm:mt-16">
            <AvailabilityChecker onCheckAvailability={handleDateCheck} />
          </div>
        </div>
      </section>

      {/* 2. TRUSTED / QUALITY STATEMENT LIQUID BANNER */}
      <section className="bg-white/5 backdrop-blur-2xl text-white py-8 border-y border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                The EventsRentals.io Commitment
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                “Tell us what you&apos;re planning. We&apos;ll help make it happen.”
              </h3>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Check className="w-4 h-4 text-cyan-400" />
                <span>Commercial Grade Equipment</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Check className="w-4 h-4 text-cyan-400" />
                <span>Dedicated Single Contact</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Check className="w-4 h-4 text-cyan-400" />
                <span>Flexible Weather Rescheduling</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES OVERVIEW & FEATURED SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Core Event Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Curated Event Solutions
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl animate-fade-in-up">
              From gourmet food truck catering to commercial jumping castles and nostalgic popcorn carts, choose the individual services you need or bundle them together.
            </p>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors group cursor-pointer"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Services Grid with Liquid Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.slice(0, 6).map(service => (
            <div
              key={service.id}
              className="bg-slate-950/60 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:border-cyan-400/60 hover:shadow-[0_25px_50px_-10px_rgba(6,182,212,0.25)] hover:scale-[1.02] hover:-translate-y-1.5 transition-all duration-300 flex flex-col group relative"
            >
              {/* Subtle top ambient lighting sheen on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Card Image */}
              <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                <img
                  src={service.heroImage}
                  alt={service.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between grow space-y-4 relative z-10">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Key specs pill */}
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-2.5 text-xs text-slate-300 space-y-1 border border-white/10 group-hover:border-white/20 group-hover:bg-white/[0.08] transition-colors">
                  <p className="font-semibold text-cyan-400 text-[11px] uppercase tracking-wider">
                    Recommended For:
                  </p>
                  <p className="text-[11px] text-slate-300 truncate">
                    {service.recommendedFor.slice(0, 3).join(', ')}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-2 flex items-center gap-2 border-t border-white/10">
                  <button
                    onClick={() => onNavigate('service-detail', service.id)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all text-center cursor-pointer border border-white/10 hover:border-white/25 active:scale-95"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onOpenBookingModal(service.id)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-95 active:scale-95 text-white font-bold text-xs transition-all text-center shadow-md cursor-pointer border border-white/20"
                  >
                    {service.ctaText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MULTI-SERVICE PACKAGE CUSTOMIZER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MultiServiceCustomizer onRequestPackage={handleRequestCustomPackage} />
      </section>

      {/* 5. HOW BOOKING WORKS (01 - 04 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Frictionless 4-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Booking Works
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            We make event hire effortless. From initial date check to on-site rigging, your event is managed by professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Choose Your Services',
              desc: 'Browse individual inflatables, food trucks, concession carts, or configure a multi-service package.'
            },
            {
              step: '02',
              title: 'Select Your Date',
              desc: 'Check live dispatch availability through our synchronized Calendly scheduling system.'
            },
            {
              step: '03',
              title: 'Confirm Event Details',
              desc: 'Provide your guest count, venue surface requirements, access notes, and arrival time.'
            },
            {
              step: '04',
              title: 'We Handle the Setup',
              desc: 'Our team arrives 45–90 min early to deliver, inflate, stake, and inspect all equipment safely.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-950/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.5)] relative group hover:border-cyan-400/50 hover:shadow-[0_20px_40px_rgba(6,182,212,0.2)] hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-colors pointer-events-none" />
              <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent font-heading block mb-3 group-hover:scale-105 transition-transform origin-left">
                {item.step}
              </span>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. EVENT TYPES ("PERFECT FOR EVERY EVENT") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Versatile Entertainment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            PERFECT FOR EVERY EVENT
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Tailored packages and compliant setups designed for private backyards, public parks, corporate grounds, and school facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EVENT_TYPES_DATA.map(event => (
            <div
              key={event.id}
              onClick={() => onOpenBookingModal(undefined, undefined, undefined)}
              className="group relative rounded-3xl overflow-hidden bg-slate-900 aspect-4/3 cursor-pointer shadow-[0_15px_35px_rgba(0,0,0,0.6)] border border-white/15 hover:border-cyan-400/60 hover:shadow-[0_20px_45px_rgba(6,182,212,0.25)] hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 p-1"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <img
                  src={event.image}
                  alt={event.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 opacity-80 group-hover:opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent group-hover:from-slate-950/95 transition-colors" />

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                    {event.attendeeRange}
                  </span>
                  <h3 className="text-base font-bold leading-tight group-hover:text-cyan-300 transition-colors">
                    {event.name}
                  </h3>
                  <p className="text-[11px] text-slate-300 line-clamp-1">
                    {event.highlight}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. AI EVENT PLANNER ASSISTANT IN LIQUID GLASS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SmartEventPlanner
          onApplyPlan={(ids) => onOpenBookingModal(undefined, undefined, ids)}
          onOpenBookingWithDate={(date, serviceId) => onOpenBookingModal(serviceId, date)}
        />
      </section>

      {/* 8. WHY CHOOSE EVENTSRENTALS.IO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            WHY CHOOSE EVENTSRENTALS.IO?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            We hold ourselves to the highest standards in commercial equipment safety, punctuality, and client communication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustHighlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-950/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.5)] space-y-3 hover:border-cyan-400/50 hover:shadow-[0_20px_40px_rgba(6,182,212,0.2)] hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform pointer-events-none" />
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center font-bold group-hover:bg-cyan-500/20 group-hover:scale-105 transition-all">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. SAFETY & STANDARDS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SafetySection />
      </section>

      {/* 10. REAL EVENT GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GallerySection limit={6} />
        <div className="text-center mt-8">
          <button
            onClick={() => onNavigate('gallery')}
            className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-xl text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-cyan-500/10 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            View Full Event Gallery (12+ Real Photos) →
          </button>
        </div>
      </section>

      {/* 11. CLIENT EXPERIENCES & REVIEWS IN LIQUID GLASS */}
      <section className="bg-white/5 backdrop-blur-2xl py-16 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Verified Host Feedback
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Loved by Parents, Companies & Schools
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_DATA.map(t => (
              <div
                key={t.id}
                className="bg-slate-950/70 backdrop-blur-2xl rounded-3xl p-6 border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.5)] space-y-4 flex flex-col justify-between hover:border-cyan-400/50 hover:shadow-[0_20px_40px_rgba(6,182,212,0.18)] hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/15 transition-colors pointer-events-none" />
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center gap-1 text-cyan-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-cyan-400 group-hover:scale-110 transition-transform" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center gap-3 relative z-10">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover border border-white/20 group-hover:border-cyan-400/60 transition-colors"
                  />
                  <div>
                    <h3 className="font-bold text-xs text-white group-hover:text-cyan-300 transition-colors">{t.author}</h3>
                    <p className="text-[11px] text-slate-400">{t.role} • {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FAQ ACCORDION IN LIQUID GLASS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Answers to Common Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-300 text-sm">
            Everything you need to know about date availability, setup logistics, power requirements, and weather policies.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_DATA.slice(0, 6).map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-slate-950/60 backdrop-blur-2xl rounded-2xl border border-white/15 shadow-sm overflow-hidden hover:border-cyan-400/40 hover:shadow-[0_8px_20px_rgba(6,182,212,0.12)] transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/10 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => onNavigate('faq')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4 cursor-pointer"
          >
            View all 10+ FAQ answers & equipment policies →
          </button>
        </div>
      </section>

      {/* 13. FINAL HIGH CONVERSION BOOKING CTA IN LIQUID GLASS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-pink-500 shadow-[0_25px_60px_-15px_rgba(99,102,241,0.3)]">
          <div className="bg-slate-950/80 backdrop-blur-3xl text-white rounded-3xl p-8 sm:p-14 text-center space-y-6">
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Ready to create something special?
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Tell Us What You&apos;re Planning. <br />
                <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">We&apos;ll Help Make It Happen.</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Check real-time availability for your event date or launch a direct Calendly consultation with our dispatch coordinator.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onOpenBookingModal()}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 via-indigo-600 to-fuchsia-600 hover:opacity-95 active:scale-95 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
              >
                <Calendar className="w-5 h-5 text-white" />
                <span>Book Your Event Now</span>
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white font-bold text-base rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Contact Dispatch Team</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
