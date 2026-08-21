import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CalendlyModal } from './components/CalendlyModal';
import { HomeView } from './views/HomeView';
import { ServicesView } from './views/ServicesView';
import { ServiceDetailView } from './views/ServiceDetailView';
import { PackagesView } from './views/PackagesView';
import { GalleryView } from './views/GalleryView';
import { HowItWorksView } from './views/HowItWorksView';
import { FAQView } from './views/FAQView';
import { ContactView } from './views/ContactView';
import { LegalView } from './views/LegalView';
import { SERVICES_DATA } from './data/servicesData';
import { ToastProvider } from './context/ToastContext';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingModalServiceId, setBookingModalServiceId] = useState<string | undefined>();
  const [bookingModalDate, setBookingModalDate] = useState<string | undefined>();
  const [bookingModalServices, setBookingModalServices] = useState<string[]>([]);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedServiceId]);

  const handleNavigate = (view: string, serviceId?: string) => {
    setCurrentView(view);
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
  };

  const handleOpenBookingModal = (
    serviceId?: string,
    preselectedDate?: string,
    preselectedServices?: string[]
  ) => {
    setBookingModalServiceId(serviceId);
    setBookingModalDate(preselectedDate);
    if (preselectedServices) {
      setBookingModalServices(preselectedServices);
    } else if (serviceId) {
      setBookingModalServices([serviceId]);
    } else {
      setBookingModalServices(['food-truck-arrangements']);
    }
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const selectedServiceName = bookingModalServiceId
    ? SERVICES_DATA.find(s => s.id === bookingModalServiceId)?.name
    : undefined;

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[#070b14] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black relative overflow-x-hidden">
        {/* Background Liquid Glass Fluid Orbs & Ambient Mesh */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top Floating Liquid Glass Blob 1 */}
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/30 via-violet-600/25 to-cyan-500/20 rounded-full blur-[140px] animate-float-slow" />
        
        {/* Top Right Vibrant Pink/Purple Orb 2 */}
        <div className="absolute top-20 -right-20 w-[550px] h-[550px] bg-gradient-to-br from-fuchsia-600/25 via-pink-500/20 to-indigo-500/20 rounded-full blur-[130px] animate-pulse-glow" />
        
        {/* Center Cyan/Blue Liquid Orb 3 */}
        <div className="absolute top-[45%] -left-32 w-[650px] h-[650px] bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-teal-500/15 rounded-full blur-[150px] animate-float-reverse" />
        
        {/* Bottom Ambient Glow Orb 4 */}
        <div className="absolute bottom-10 right-10 w-[700px] h-[700px] bg-gradient-to-tl from-indigo-600/25 via-purple-600/20 to-cyan-400/20 rounded-full blur-[160px] animate-float-slow" />

        {/* Liquid Noise/Mesh subtle glass sheen */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-[#070b14]/50 to-[#070b14]/90" />
      </div>

      {/* Navigation Bar in Liquid Glass style */}
      <div className="relative z-40">
        <Navbar
          currentView={currentView}
          onNavigate={handleNavigate}
          onOpenBookingModal={handleOpenBookingModal}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenBookingModal={handleOpenBookingModal}
          />
        )}

        {currentView === 'services' && (
          <ServicesView
            onNavigate={handleNavigate}
            onOpenBookingModal={handleOpenBookingModal}
          />
        )}

        {currentView === 'service-detail' && (
          <ServiceDetailView
            serviceId={selectedServiceId || 'food-truck-arrangements'}
            onNavigate={handleNavigate}
            onOpenBookingModal={handleOpenBookingModal}
          />
        )}

        {currentView === 'packages' && (
          <PackagesView
            onNavigate={handleNavigate}
            onOpenBookingModal={handleOpenBookingModal}
          />
        )}

        {currentView === 'gallery' && (
          <GalleryView
            onOpenBookingModal={() => handleOpenBookingModal()}
          />
        )}

        {currentView === 'how-it-works' && (
          <HowItWorksView
            onOpenBookingModal={handleOpenBookingModal}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'faq' && (
          <FAQView
            onOpenBookingModal={() => handleOpenBookingModal()}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'contact' && (
          <ContactView
            onOpenBookingModal={() => handleOpenBookingModal()}
          />
        )}

        {(currentView === 'privacy' || currentView === 'terms' || currentView === 'cancellation') && (
          <LegalView
            type={currentView as 'privacy' | 'terms' | 'cancellation'}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer in Liquid Glass */}
      <div className="relative z-10">
        <Footer
          onNavigate={handleNavigate}
          onOpenBookingModal={() => handleOpenBookingModal()}
        />
      </div>

      {/* Universal Calendly Booking Modal in Liquid Glass */}
      <CalendlyModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        serviceId={bookingModalServiceId}
        serviceName={selectedServiceName}
        preselectedDate={bookingModalDate}
        preselectedServices={bookingModalServices}
      />
    </div>
    </ToastProvider>
  );
}
