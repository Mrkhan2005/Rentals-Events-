import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, ChevronDown, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { SERVICES_DATA } from '../data/servicesData';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, serviceId?: string) => void;
  onOpenBookingModal: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenBookingModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', view: 'home' },
    { label: 'Services', view: 'services', hasDropdown: true },
    { label: 'Packages', view: 'packages' },
    { label: 'Gallery', view: 'gallery' },
    { label: 'How It Works', view: 'how-it-works' },
    { label: 'FAQ', view: 'faq' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNavClick = (view: string, serviceId?: string) => {
    onNavigate(view, serviceId);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  return (
    <>
      {/* Main Sticky Navbar in Liquid Glass */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-950/75 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] border-b border-white/15 py-3'
            : 'bg-slate-900/40 backdrop-blur-xl border-b border-white/10 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-fuchsia-500 p-0.5 shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950/80 backdrop-blur-md rounded-[10px] flex items-center justify-center text-white font-extrabold text-lg">
                  <span className="bg-gradient-to-r from-cyan-400 to-indigo-300 bg-clip-text text-transparent">E</span>
                </div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-300 pointer-events-none" />
            </div>

            <div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                EventsRentals<span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">.io</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links with Frosted Pills */}
          <nav className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] text-xs sm:text-sm font-medium text-slate-300">
            {navItems.map(item => {
              const isActive = currentView === item.view;

              if (item.hasDropdown) {
                return (
                  <div
                    key={item.view}
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => handleNavClick('services')}
                      className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white/15 text-white font-bold shadow-sm shadow-indigo-500/20 border border-white/20'
                          : 'hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                    </button>

                    {/* Services Dropdown Liquid Glass */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-84 bg-slate-950/90 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/20 p-3 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-cyan-400/80 border-b border-white/10 mb-1 flex items-center justify-between">
                          <span>Core Event Services</span>
                          <Sparkles className="w-3 h-3 text-cyan-400" />
                        </div>
                        {SERVICES_DATA.map(service => (
                          <div
                            key={service.id}
                            onClick={() => handleNavClick('service-detail', service.id)}
                            className="p-2.5 rounded-xl hover:bg-white/10 text-slate-200 hover:text-white cursor-pointer transition-colors group/item border border-transparent hover:border-white/10"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs group-hover/item:text-cyan-300">
                                {service.name.split('(')[0]}
                              </span>
                              {service.badge && (
                                <span className="text-[9px] font-semibold bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 text-cyan-300 px-1.5 py-0.5 rounded">
                                  {service.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                              {service.shortDescription}
                            </p>
                          </div>
                        ))}
                        <div className="pt-2 border-t border-white/10">
                          <button
                            type="button"
                            onClick={() => handleNavClick('services')}
                            className="w-full text-center py-2 text-xs font-bold text-cyan-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                          >
                            View All Services & Gear →
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white/15 text-white font-bold shadow-sm shadow-indigo-500/20 border border-white/20'
                      : 'hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Primary CTA with Liquid Glowing Gradient */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenBookingModal()}
              className="relative group overflow-hidden rounded-full p-[1px] cursor-pointer active:scale-95 transition-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-indigo-500 to-pink-500 rounded-full animate-pulse-glow" />
              <div className="relative px-5 sm:px-6 py-2.5 rounded-full bg-slate-950/80 backdrop-blur-xl text-white text-xs sm:text-sm font-bold flex items-center gap-2 group-hover:bg-slate-900/60 transition-colors border border-white/20 shadow-lg">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>Book Your Event</span>
              </div>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/15 bg-slate-950/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-4 duration-200">
            {navItems.map(item => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  currentView === item.view
                    ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-500/40 text-cyan-300'
                    : 'text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-3 border-t border-white/15 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookingModal();
                }}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 via-indigo-600 to-pink-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Your Event Now</span>
              </button>

              <div className="p-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 text-xs text-slate-300 space-y-1">
                <p className="font-semibold text-white">EventsRentals.io Service Region</p>
                <p>{BUSINESS_CONFIG.serviceAreaPlaceholder}</p>
                <p className="text-[11px] text-slate-400">{BUSINESS_CONFIG.operatingHours}</p>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
