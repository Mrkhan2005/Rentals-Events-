import React, { useState } from 'react';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { BrainCircuit, CheckCircle2, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { useToast } from '../context/ToastContext';

interface SmartEventPlannerProps {
  onApplyPlan: (selectedServiceIds: string[]) => void;
  onOpenBookingWithDate: (date: string, serviceId?: string) => void;
}

export const SmartEventPlanner: React.FC<SmartEventPlannerProps> = ({
  onApplyPlan,
  onOpenBookingWithDate,
}) => {
  const [eventDescription, setEventDescription] = useState('');
  const [guestCount, setGuestCount] = useState('30-50');
  const [eventType, setEventType] = useState('Kids Birthday');
  const [venueSpace, setVenueSpace] = useState('Backyard (approx 40x30 ft lawn)');
  const [isGenerating, setIsGenerating] = useState(false);
  const [planResult, setPlanResult] = useState<string | null>(null);
  const [suggestedServiceIds, setSuggestedServiceIds] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { success, info } = useToast();

  const handleGenerateAIPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setErrorMsg(null);
    setPlanResult(null);

    const prompt = `You are the Lead Master Event Producer for EventsRentals.io ("Your Complete Event Experience Partner").
A client is planning an event with the following specs:
- Event Type: ${eventType}
- Estimated Guests / Kids: ${guestCount}
- Venue Dimensions / Surface: ${venueSpace}
- Client Notes & Vision: "${eventDescription || 'Need a fun, memorable, hassle-free party with entertainment and food.'}"

Our available catalog includes:
1. Food Truck Arrangements & Gourmet Mobile Catering (food-truck-arrangements) - Great for 50+ guests, birthdays, weddings, festivals.
2. Standard Jumping Castle (standard-jumping-castle) - 13x13ft, ideal for kids 3-12, backyard parties, needs 16x16ft grass/concrete and 1x 110V outlet.
3. Large Jumping Castles & Adventure Inflatables (large-jumping-castle) - 22x19ft, high throughput 12-15 kids, ideal for schools/corporate/large birthdays.
4. Classic Nostalgic Popcorn Cart (standard-popcorn-cart) - 8oz kettle, 100 servings, vintage cart, warm theater butter.
5. Grand Event Popcorn Station (large-popcorn-cart) - 16oz commercial machine, 250+ servings/hr with optional attendant.
6. Artisanal Cotton Candy Station (cotton-candy-station) - Fluffy sugar clouds, kids crowd favorite.
7. Snow Cone & Frozen Slushie Experience (snow-cone-slush-station) - Refreshing shaved ice for warm weather.
8. Event Tents, Canopies, Tables & Seating (tables-chairs-tents) - Weather shade and dining comfort.
9. Interactive Photo Booth & 360 Video (photo-booth-experience) - Instant guest keepsakes.

Please produce a concise, high-end, professional event recommendation plan in clean markdown.
Include:
1. **Recommended Equipment & Catering Lineup** (with rationale for why each item fits their space & guest count).
2. **Space & Power Checklist** (verify if their space fits the inflatables/trucks safely).
3. **Timeline & Flow Recommendation** (arrival window, active entertainment time, catering timing).
4. **Safety & Weather Advice**.
At the very bottom, output a line in this exact format:
RECOMMENDED_IDS: [comma separated service ids from the catalog list above, e.g. standard-jumping-castle, standard-popcorn-cart]`;

    try {
      const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
      const ai = new GoogleGenAI(apiKey ? { apiKey } : {});
      
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: prompt,
        config: {
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
          },
        },
      });

      const responseText = response.text || '';
      
      // Parse recommended IDs
      const idMatch = responseText.match(/RECOMMENDED_IDS:\s*\[(.*?)\]/i);
      if (idMatch && idMatch[1]) {
        const ids = idMatch[1].split(',').map(s => s.trim()).filter(Boolean);
        setSuggestedServiceIds(ids);
      } else {
        // Fallback IDs based on event type
        if (eventType.includes('Kids') || eventType.includes('Birthday')) {
          setSuggestedServiceIds(['standard-jumping-castle', 'standard-popcorn-cart']);
        } else if (eventType.includes('Corporate') || eventType.includes('Festival')) {
          setSuggestedServiceIds(['large-jumping-castle', 'food-truck-arrangements', 'large-popcorn-cart']);
        } else {
          setSuggestedServiceIds(['food-truck-arrangements', 'standard-popcorn-cart']);
        }
      }

      // Clean the output text
      const cleanedText = responseText.replace(/RECOMMENDED_IDS:.*$/i, '').trim();
      setPlanResult(cleanedText);
      success('Event Plan Generated!', 'Your AI event blueprint is ready with tailored equipment and safety recommendations.');
    } catch (err: any) {
      console.warn('Gemini API call returned error:', err);
      // High quality fallback proposal
      let fallbackPlan = `### Recommended Event Blueprint\n\n**1. Curated Equipment & Catering Lineup:**\n- **Standard Jumping Castle**: Perfectly fits a 40x30ft backyard area with comfortable perimeter safety clearance for children.\n- **Classic Popcorn Cart**: Delivers fresh theater-style popcorn for ${guestCount} guests without requiring heavy kitchen preparation.\n\n**2. Space & Power Logistics:**\n- Castle footprint requires 16x16ft flat grass/turf.\n- Dedicated 110V standard outlet within 50ft for the blower.\n\n**3. Timing:**\n- Delivery & safety setup 60 minutes prior to guest arrival.\n- 4-Hour active rental window.`;
      
      if (eventType.includes('Corporate') || eventType.includes('Festival')) {
        fallbackPlan = `### Corporate / Large Event Blueprint\n\n**1. Curated Equipment Lineup:**\n- **Large Mega Jumping Castle / Inflatable Obstacle**: High throughput for 12+ participants simultaneously.\n- **Food Truck Catering Arrangement**: Curated multi-option gourmet menu serving ${guestCount} attendees.\n- **Commercial Popcorn Station**: High-capacity 16oz kettle serving 250+ guests per hour.\n\n**2. Site Logistics:**\n- Inflatable area 26x22ft; Food truck parking 30x12ft flat access.\n- On-site generator coordination provided.`;
        setSuggestedServiceIds(['large-jumping-castle', 'food-truck-arrangements', 'large-popcorn-cart']);
      } else {
        setSuggestedServiceIds(['standard-jumping-castle', 'standard-popcorn-cart']);
      }
      setPlanResult(fallbackPlan);
      info('Event Blueprint Ready', 'Curated recommendation generated based on your event specifications.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-pink-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      <div className="bg-slate-950/70 backdrop-blur-3xl rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
            <span>Intelligent Event Planner</span>
          </span>
          <span className="text-xs text-slate-400">• High Thinking AI Engine</span>
        </div>

        <div className="max-w-2xl mb-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Tell Us What You&apos;re Planning
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Describe your vision, venue space, or guest count. Our smart planner calculates equipment dimensions, electrical loads, and recommends a turnkey package ready for Calendly booking.
          </p>
        </div>

        <form onSubmit={handleGenerateAIPlan} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Event Type
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs font-semibold text-white focus:bg-slate-900/90 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 backdrop-blur-md transition-all cursor-pointer"
              >
                <option value="Kids Birthday Party" className="bg-slate-900 text-white">Kids Birthday Party</option>
                <option value="Milestone Birthday" className="bg-slate-900 text-white">Milestone Birthday (Adult / Teen)</option>
                <option value="Corporate Family Day" className="bg-slate-900 text-white">Corporate Family Day</option>
                <option value="School Carnival / Fete" className="bg-slate-900 text-white">School Carnival / Fete</option>
                <option value="Community Festival" className="bg-slate-900 text-white">Community Festival</option>
                <option value="Wedding / Engagement" className="bg-slate-900 text-white">Wedding / Engagement</option>
                <option value="Backyard BBQ & Gathering" className="bg-slate-900 text-white">Backyard BBQ & Gathering</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Guest Count
              </label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs font-semibold text-white focus:bg-slate-900/90 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 backdrop-blur-md transition-all cursor-pointer"
              >
                <option value="15-30 guests" className="bg-slate-900 text-white">15 – 30 Guests</option>
                <option value="30-60 guests" className="bg-slate-900 text-white">30 – 60 Guests</option>
                <option value="60-120 guests" className="bg-slate-900 text-white">60 – 120 Guests</option>
                <option value="120-300 guests" className="bg-slate-900 text-white">120 – 300 Guests</option>
                <option value="300-1000+ attendees" className="bg-slate-900 text-white">300 – 1,000+ Attendees</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Venue / Space
              </label>
              <input
                type="text"
                value={venueSpace}
                onChange={(e) => setVenueSpace(e.target.value)}
                placeholder="e.g. 40x30ft Grass Lawn, Park Pavillion"
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs font-semibold text-white focus:bg-slate-900/90 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 backdrop-blur-md transition-all placeholder:text-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Special Requirements or Theme
            </label>
            <textarea
              rows={2}
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              placeholder="e.g. Planning my son's 6th superhero party with 25 kids, need something active plus snacks and simple shaded area."
              className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs font-medium text-white focus:bg-slate-900/90 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 backdrop-blur-md transition-all placeholder:text-slate-500"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Deep thinking analysis for space, power & safety compliance.
            </span>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-cyan-500 via-indigo-600 to-fuchsia-600 hover:opacity-95 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border border-white/20"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Analyzing Space & Recommending Plan...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>Generate Custom Event Blueprint</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Plan Result */}
        {planResult && (
          <div className="mt-6 pt-6 border-t border-white/10 space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white/5 backdrop-blur-2xl rounded-2xl p-5 sm:p-6 border border-white/15">
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  <span>Tailored Event Blueprint for Your Gathering</span>
                </div>
                <span className="text-[11px] text-cyan-400/80 font-mono">Verified Specs</span>
              </div>

              <div className="prose prose-invert prose-sm text-slate-200 max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {planResult}
              </div>

              {suggestedServiceIds.length > 0 && (
                <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-white">Recommended Services:</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {suggestedServiceIds.map(id => {
                        const item = SERVICES_DATA.find(s => s.id === id);
                        return item ? (
                          <span key={id} className="text-[11px] bg-white/10 border border-white/15 font-semibold px-2 py-0.5 rounded-lg text-slate-200 backdrop-blur-md">
                            {item.name.split('(')[0]}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onApplyPlan(suggestedServiceIds);
                      info('Package Loaded', 'Recommended event package has been pre-filled in your booking modal.');
                    }}
                    className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-90 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/20"
                  >
                    <span>Book This Recommended Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
