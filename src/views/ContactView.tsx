import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Clock, Send, 
  CheckCircle2, ShieldCheck, Calendar, MessageSquare 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { SERVICES_DATA } from '../data/servicesData';
import { useToast } from '../context/ToastContext';

export const ContactView: React.FC<{
  onOpenBookingModal: () => void;
}> = ({ onOpenBookingModal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('Birthday Party');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [guestCount, setGuestCount] = useState('25-50');
  const [selectedServices, setSelectedServices] = useState<string[]>(['food-truck-arrangements']);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { success } = useToast();

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) 
        ? (prev.length > 1 ? prev.filter(s => s !== id) : prev) 
        : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
      success(
        'Inquiry Sent Successfully!',
        `Thank you ${name || ''}, our dispatch coordinator will reply to ${email || 'your email'} within 2 business hours.`,
        6000
      );
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback
      }
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
          <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
          <span>Dispatch & Inquiries</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Get in Touch With Our Team
        </h1>
        <p className="text-slate-300 text-base leading-relaxed">
          Need a tailored quote for a large festival, or have specific venue setup questions? Fill out our inquiry form or schedule directly via Calendly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Info & Service Area Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-950/70 backdrop-blur-3xl text-white rounded-3xl p-6 sm:p-8 space-y-6 border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:border-cyan-400/50 hover:shadow-[0_20px_45px_rgba(6,182,212,0.18)] transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-colors pointer-events-none" />
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">Direct Dispatch Office</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We respond to all event inquiries within 2 business hours during operating hours.
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Service Coverage</strong>
                  <span>{BUSINESS_CONFIG.serviceAreaPlaceholder}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Inquiry Telephone</strong>
                  <span>{BUSINESS_CONFIG.phonePlaceholder}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Direct Email</strong>
                  <span>{BUSINESS_CONFIG.emailPlaceholder}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Operating Schedule</strong>
                  <span>{BUSINESS_CONFIG.operatingHours}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={onOpenBookingModal}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 via-indigo-600 to-fuchsia-600 hover:opacity-95 active:scale-95 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
              >
                <Calendar className="w-4 h-4" />
                <span>Launch Calendly Schedule</span>
              </button>
            </div>
          </div>

          {/* Service Area Card in Liquid Glass */}
          <div className="bg-slate-950/60 backdrop-blur-2xl rounded-3xl p-6 border border-white/15 shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:border-cyan-400/40 hover:bg-slate-950/80 hover:scale-[1.02] transition-all duration-300 space-y-3 group">
            <h4 className="font-bold text-white text-sm flex items-center gap-2 group-hover:text-cyan-300 transition-colors">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Local Service Area Notice</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              We deliver throughout our primary metropolitan region and surrounding suburbs. For events outside the standard radius, reasonable travel fees may apply.
            </p>
          </div>
        </div>

        {/* Right: Contact Form in Liquid Glass */}
        <div className="lg:col-span-8 bg-slate-950/70 backdrop-blur-3xl rounded-3xl p-6 sm:p-10 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-cyan-400/30 transition-all duration-300">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white">Message Received!</h3>
              <p className="text-slate-300 text-sm">
                Thank you, <strong>{name}</strong>. Our event dispatch team has received your inquiry for <strong>{eventDate || 'your upcoming date'}</strong> and will follow up promptly via email or phone.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2.5 bg-white/10 text-white rounded-xl text-xs font-bold hover:bg-white/20 border border-white/15 cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white">Send an Event Inquiry</h3>
                <p className="text-xs text-slate-400">
                  Please fill in your event specifications below.
                </p>
              </div>

              {/* Host Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs font-medium text-white focus:bg-slate-900/90 focus:ring-2 focus:ring-cyan-400 placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs font-medium text-white focus:bg-slate-900/90 focus:ring-2 focus:ring-cyan-400 placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs font-medium text-white focus:bg-slate-900/90 focus:ring-2 focus:ring-cyan-400 placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* Event Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Event Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs font-medium text-white focus:bg-slate-900/90 focus:ring-2 focus:ring-cyan-400"
                  >
                    <option value="Birthday Party" className="bg-slate-900 text-white">Birthday Party</option>
                    <option value="Kids Party" className="bg-slate-900 text-white">Kids Party</option>
                    <option value="Corporate Event" className="bg-slate-900 text-white">Corporate Event / Picnic</option>
                    <option value="School Event" className="bg-slate-900 text-white">School Event / Carnival</option>
                    <option value="Community Festival" className="bg-slate-900 text-white">Community Festival</option>
                    <option value="Wedding / Reception" className="bg-slate-900 text-white">Wedding / Reception</option>
                    <option value="Private Gathering" className="bg-slate-900 text-white">Private Gathering</option>
                    <option value="Other" className="bg-slate-900 text-white">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Target Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs font-medium text-white focus:bg-slate-900/90 focus:ring-2 focus:ring-cyan-400 [color-scheme:dark]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Estimated Guests
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs font-medium text-white focus:bg-slate-900/90 focus:ring-2 focus:ring-cyan-400"
                  >
                    <option value="Under 25" className="bg-slate-900 text-white">Under 25</option>
                    <option value="25-50" className="bg-slate-900 text-white">25 – 50</option>
                    <option value="50-100" className="bg-slate-900 text-white">50 – 100</option>
                    <option value="100-250" className="bg-slate-900 text-white">100 – 250</option>
                    <option value="250-500" className="bg-slate-900 text-white">250 – 500</option>
                    <option value="500+" className="bg-slate-900 text-white">500+ (Festival)</option>
                  </select>
                </div>
              </div>

              {/* Event Location */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Event Location / Address / Suburb *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 123 Maple Street or Greenfield City Park"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs font-medium text-white focus:bg-slate-900/90 focus:ring-2 focus:ring-cyan-400 placeholder:text-slate-500"
                />
              </div>

              {/* Services Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Services Interested In (Select all that apply)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SERVICES_DATA.map(service => {
                    const isChecked = selectedServices.includes(service.id);
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => toggleService(service.id)}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md ${
                          isChecked
                            ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border-cyan-400/50 text-white font-bold'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[9px] border ${
                          isChecked ? 'bg-gradient-to-r from-cyan-400 to-indigo-500 border-white/40 text-white font-bold' : 'border-white/20'
                        }`}>
                          {isChecked ? '✓' : ''}
                        </span>
                        <span className="truncate">{service.name.split('(')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Message / Special Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about gate access, surface type (grass/concrete), power access, or specific questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs font-medium text-white focus:bg-slate-900/90 focus:ring-2 focus:ring-cyan-400 placeholder:text-slate-500"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Your information is strictly protected and never shared.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-cyan-500 via-indigo-600 to-fuchsia-600 hover:opacity-95 active:scale-95 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
                >
                  {isSending ? (
                    <span>Sending Inquiry...</span>
                  ) : (
                    <>
                      <span>Submit Event Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
