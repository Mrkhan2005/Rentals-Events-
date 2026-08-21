import React, { useEffect, useState } from 'react';
import { 
  X, Calendar, CheckCircle2, 
  ExternalLink, AlertCircle, Sparkles, Shield
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CALENDLY_CONFIG, BUSINESS_CONFIG } from '../data/businessConfig';
import { SERVICES_DATA } from '../data/servicesData';
import { useToast } from '../context/ToastContext';

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
      initInlineWidget: (options: { url: string; parentElement: HTMLElement | null }) => void;
      showPopupWidget: (url: string) => void;
      closePopupWidget: () => void;
    };
  }
}

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId?: string;
  serviceName?: string;
  preselectedDate?: string;
  preselectedServices?: string[];
  initialGuestCount?: string;
  initialEventType?: string;
}

export const CalendlyModal: React.FC<CalendlyModalProps> = ({
  isOpen,
  onClose,
  serviceId,
  serviceName,
  preselectedDate,
  preselectedServices = [],
  initialGuestCount = '25-50',
  initialEventType = 'Birthday Party',
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(preselectedDate || '');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:00 AM');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventType, setEventType] = useState(initialEventType);
  const [guestCount, setGuestCount] = useState(initialGuestCount);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(
    preselectedServices.length > 0 
      ? preselectedServices 
      : (serviceId ? [serviceId] : ['food-truck-arrangements'])
  );
  
  const [activeTab, setActiveTab] = useState<'interactive' | 'calendly-embed'>('interactive');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { bookingSuccess } = useToast();

  // Sync state when props change
  useEffect(() => {
    if (preselectedDate) setSelectedDate(preselectedDate);
    if (serviceId) {
      setSelectedServices(prev => prev.includes(serviceId) ? prev : [...prev, serviceId]);
    }
    if (preselectedServices.length > 0) {
      setSelectedServices(preselectedServices);
    }
  }, [serviceId, preselectedDate, preselectedServices]);

  // Determine appropriate Calendly URL based on service
  const getCalendlyUrl = () => {
    if (selectedServices.length > 1) {
      return CALENDLY_CONFIG.serviceFlows['consultation'];
    }
    const singleService = selectedServices[0] || serviceId;
    if (singleService && CALENDLY_CONFIG.serviceFlows[singleService as keyof typeof CALENDLY_CONFIG.serviceFlows]) {
      return CALENDLY_CONFIG.serviceFlows[singleService as keyof typeof CALENDLY_CONFIG.serviceFlows];
    }
    return CALENDLY_CONFIG.baseUrl;
  };

  const calendlyUrl = getCalendlyUrl();

  const handleLaunchOfficialPopup = () => {
    if (window.Calendly) {
      try {
        const queryParams = new URLSearchParams();
        if (fullName) queryParams.set('name', fullName);
        if (email) queryParams.set('email', email);
        if (selectedDate) queryParams.set('date', selectedDate);
        
        const fullUrl = `${calendlyUrl}?${queryParams.toString()}`;
        window.Calendly.initPopupWidget({ url: fullUrl });
        return;
      } catch (e) {
        console.warn('Calendly popup failed, redirecting:', e);
      }
    }
    window.open(calendlyUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSubmitBookingRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      bookingSuccess({
        title: 'Booking Request Confirmed!',
        message: `Your reservation request for ${selectedDate || 'your event date'} (${guestCount} guests) has been received. Our event coordinator will confirm details shortly.`,
        date: selectedDate,
      });
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti fallback
      }
    }, 600);
  };

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) 
        ? (prev.length > 1 ? prev.filter(s => s !== id) : prev) 
        : [...prev, id]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-slate-950/90 backdrop-blur-3xl w-full max-w-4xl rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-white/20 overflow-hidden my-8 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        {/* Header in Liquid Glass */}
        <div className="bg-white/5 backdrop-blur-2xl text-white px-6 py-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20 border border-white/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-400/20">
                  Direct Availability & Booking
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">• Powered by Calendly</span>
              </div>
              <h2 id="booking-modal-title" className="text-lg sm:text-xl font-bold text-white leading-tight">
                {serviceName ? `Book: ${serviceName}` : 'Check Event Date & Request Booking'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto grow space-y-6 text-slate-200">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-5 max-w-lg mx-auto">
              <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500 to-emerald-400 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30 border border-white/30">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Booking Request Received!</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Thank you, <strong className="text-white">{fullName || 'Party Host'}</strong>. We have placed a priority reservation hold for <strong className="text-cyan-300">{selectedDate || 'your event date'}</strong>.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-2xl rounded-2xl p-4 text-left border border-white/15 text-xs space-y-2 text-slate-300">
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-slate-400">Selected Services:</span>
                  <span className="font-semibold text-white text-right">
                    {selectedServices.map(s => SERVICES_DATA.find(item => item.id === s)?.name.split('(')[0].trim() || s).join(', ')}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-slate-400">Event Date & Time:</span>
                  <span className="font-semibold text-white">{selectedDate} ({selectedTimeSlot})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-slate-400">Event Type & Guests:</span>
                  <span className="font-semibold text-white">{eventType} • {guestCount} guests</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-semibold text-white">{eventLocation || BUSINESS_CONFIG.serviceAreaPlaceholder}</span>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-2xl p-3 text-left flex items-start gap-2.5 text-xs text-cyan-200">
                <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <p>
                  <strong>What happens next:</strong> Our dispatch team confirms final power & layout details within 2 business hours and emails your complete setup itinerary.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleLaunchOfficialPopup}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg cursor-pointer border border-white/20"
                >
                  <span>Sync with Calendly Calendar</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-white/10 text-white font-medium text-sm hover:bg-white/15 transition-colors cursor-pointer border border-white/15"
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Tab Selector in Liquid Glass */}
              <div className="flex items-center justify-between bg-white/5 backdrop-blur-xl p-1 rounded-2xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveTab('interactive')}
                  className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                    activeTab === 'interactive' 
                      ? 'bg-white/15 text-white shadow-sm border border-white/20' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Fast Event Booking Form
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('calendly-embed')}
                  className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'calendly-embed' 
                      ? 'bg-white/15 text-white shadow-sm border border-white/20' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>Live Calendly Flow</span>
                  <span className="text-[10px] bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 px-1.5 py-0.5 rounded-full font-mono">Sync</span>
                </button>
              </div>

              {activeTab === 'interactive' ? (
                <form onSubmit={handleSubmitBookingRequest} className="space-y-6">
                  {/* Step 1: Services Selection */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                        <span>Step 1: Select Event Services</span>
                        <span className="text-cyan-400 font-normal">({selectedServices.length} selected)</span>
                      </label>
                      <span className="text-[11px] text-slate-400">Tap to toggle multiple</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {SERVICES_DATA.map(service => {
                        const isChecked = selectedServices.includes(service.id);
                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => toggleService(service.id)}
                            className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all text-xs cursor-pointer backdrop-blur-md ${
                              isChecked
                                ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border-cyan-400/50 text-white shadow-sm'
                                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                              isChecked 
                                ? 'bg-gradient-to-r from-cyan-400 to-indigo-500 border-white/40 text-white font-bold' 
                                : 'border-white/20 bg-white/5'
                            }`}>
                              {isChecked ? '✓' : ''}
                            </div>
                            <div className="truncate">
                              <p className="font-semibold truncate text-white">{service.name.split('(')[0]}</p>
                              <span className="text-[10px] text-slate-400 capitalize">{service.category}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                        Step 2: Preferred Event Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/20 rounded-xl text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 [color-scheme:dark]"
                      />
                      <p className="text-[11px] text-slate-400">
                        * Note: Availability is subject to confirmation via dispatch.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                        Preferred Arrival / Setup Window
                      </label>
                      <select
                        value={selectedTimeSlot}
                        onChange={(e) => setSelectedTimeSlot(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/20 rounded-xl text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      >
                        <option value="8:00 AM - 10:00 AM" className="bg-slate-900 text-white">Morning Early (8:00 AM – 10:00 AM)</option>
                        <option value="10:00 AM - 12:00 PM" className="bg-slate-900 text-white">Mid Morning (10:00 AM – 12:00 PM)</option>
                        <option value="12:00 PM - 2:00 PM" className="bg-slate-900 text-white">Early Afternoon (12:00 PM – 2:00 PM)</option>
                        <option value="2:00 PM - 5:00 PM" className="bg-slate-900 text-white">Late Afternoon (2:00 PM – 5:00 PM)</option>
                        <option value="5:00 PM - 8:00 PM" className="bg-slate-900 text-white">Evening Gala / Night Shift (5:00 PM – 8:00 PM)</option>
                      </select>
                      <p className="text-[11px] text-slate-400">
                        We arrive 45–90 min prior to party start time.
                      </p>
                    </div>
                  </div>

                  {/* Step 3: Event Specifications */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                        Event Type
                      </label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      >
                        <option value="Birthday Party" className="bg-slate-900 text-white">Birthday Party</option>
                        <option value="Kids Party" className="bg-slate-900 text-white">Kids Party</option>
                        <option value="School Event" className="bg-slate-900 text-white">School Event / Carnival</option>
                        <option value="Corporate Event" className="bg-slate-900 text-white">Corporate Event / Picnic</option>
                        <option value="Community Festival" className="bg-slate-900 text-white">Community Festival</option>
                        <option value="Wedding / Reception" className="bg-slate-900 text-white">Wedding / Reception</option>
                        <option value="Private Gathering" className="bg-slate-900 text-white">Private Gathering</option>
                        <option value="Other" className="bg-slate-900 text-white">Other Custom Event</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                        Estimated Guests
                      </label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      >
                        <option value="Under 25" className="bg-slate-900 text-white">Under 25 guests</option>
                        <option value="25-50" className="bg-slate-900 text-white">25 – 50 guests</option>
                        <option value="50-100" className="bg-slate-900 text-white">50 – 100 guests</option>
                        <option value="100-250" className="bg-slate-900 text-white">100 – 250 guests</option>
                        <option value="250-500" className="bg-slate-900 text-white">250 – 500 guests</option>
                        <option value="500+" className="bg-slate-900 text-white">500+ guests (Festival Scale)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                        Event Location / Suburb *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Westside Park or Home Address"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  {/* Step 4: Host Contact Info */}
                  <div className="border-t border-white/10 pt-4 space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                      Step 3: Host Contact Details
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name *"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-slate-500"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          required
                          placeholder="Email Address *"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-slate-500"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          required
                          placeholder="Mobile Phone Number *"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-slate-500"
                        />
                      </div>
                    </div>

                    <div>
                      <textarea
                        rows={2}
                        placeholder="Additional details (Surface type e.g. grass vs concrete, power availability, gate width, special requests)..."
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  {/* Submission CTA & Calendly Direct Alternative */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Zero spam. Direct dispatch confirmation.</span>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handleLaunchOfficialPopup}
                        className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/10 text-slate-200 hover:text-white hover:bg-white/15 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        title="Open external Calendly scheduler"
                      >
                        <span>Open Calendly</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-fuchsia-600 hover:opacity-95 active:scale-95 text-white font-bold text-sm shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Submit Booking Request</span>
                            <Sparkles className="w-4 h-4 text-white" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                /* Official Calendly Embed Tab with fallback */
                <div className="space-y-4">
                  <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-2xl p-3 text-xs text-cyan-200 flex items-start gap-2 backdrop-blur-md">
                    <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Live Calendly Schedule for: {serviceName || 'Event Consultation'}</p>
                      <p className="text-slate-300 text-[11px]">
                        Dates blocked by dispatch are automatically disabled. Choose a convenient time slot below or launch the full-screen scheduler.
                      </p>
                    </div>
                  </div>

                  <div className="border border-white/20 rounded-2xl overflow-hidden bg-slate-900/90 shadow-inner min-h-[480px] relative">
                    <iframe
                      src={calendlyUrl}
                      title="Calendly Scheduling Page"
                      className="w-full h-[520px] border-0"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <span>Having trouble loading within frame?</span>
                    <a
                      href={calendlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-cyan-400 font-semibold hover:underline"
                    >
                      <span>Open official Calendly in new tab</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
