import { motion } from "motion/react";
import { Share2, Download, MapPin, Clock, Footprints, Activity, AlertTriangle, TrendingDown } from "lucide-react";

export default function MemoryLog({ onHome }: { onHome: () => void }) {
  return (
    <div className="h-full flex flex-col relative bg-[#1A1A1A] overflow-y-auto pb-24 text-[#E0E7FF]">
      {/* Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <div className="p-6 pt-12 flex-1 flex flex-col z-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-serif text-3xl tracking-widest text-[#E0E7FF]">MEMORY LOG</h2>
          <button 
            onClick={onHome}
            className="font-mono text-xs text-[#00FF9D] uppercase tracking-widest hover:text-white transition-colors border-b border-[#00FF9D]/30 pb-1"
          >
            Close
          </button>
        </div>

        {/* The Collage Canvas */}
        <motion.div 
          initial={{ opacity: 0, y: 20, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="bg-[#F5F5F0] text-[#1A1A1A] p-6 rounded-sm shadow-2xl relative mb-8 transform -rotate-1"
        >
          {/* Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/50 backdrop-blur-sm border border-black/5 rotate-2 shadow-sm" />
          
          {/* Stamp */}
          <motion.div 
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 10 }}
            className="absolute -top-4 -right-4 w-24 h-24 border-4 border-[#FF003C] text-[#FF003C] rounded-full flex items-center justify-center rotate-12 shadow-lg bg-[#F5F5F0] z-10"
          >
            <div className="border-2 border-[#FF003C] w-20 h-20 rounded-full flex flex-col items-center justify-center">
              <span className="font-serif text-sm font-bold tracking-widest">SURVIVED</span>
              <span className="font-mono text-[8px] uppercase tracking-widest">Oct 24</span>
            </div>
          </motion.div>

          {/* Photo Placeholder */}
          <div className="aspect-[4/3] bg-slate-200 mb-6 relative overflow-hidden border-4 border-white shadow-md">
            <img 
              src="https://picsum.photos/seed/dogwalk/800/600" 
              alt="Walk Memory" 
              className="w-full h-full object-cover grayscale contrast-125"
              referrerPolicy="no-referrer"
            />
            {/* Tape corners */}
            <div className="absolute -top-2 -left-4 w-12 h-6 bg-white/60 backdrop-blur-sm -rotate-45" />
            <div className="absolute -bottom-2 -right-4 w-12 h-6 bg-white/60 backdrop-blur-sm -rotate-45" />
          </div>

          {/* Handwritten Notes */}
          <div className="space-y-4 font-hand text-2xl leading-relaxed text-[#2A2A2A]">
            <p>
              "The air was crisp, the shadows long. We navigated the concrete canyons, avoiding the scattered glass near 4th St."
            </p>
            <p>
              "Buster was alert, sensing the coyote tracks before the radar even pinged. Good boy."
            </p>
          </div>

          {/* Hard Data Footer */}
          <div className="mt-8 pt-4 border-t border-black/10 flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-[#666]">
            <div className="flex items-center gap-1"><Clock size={12} /> 00:45:12</div>
            <div className="flex items-center gap-1"><Footprints size={12} /> 2.4 km</div>
            <div className="flex items-center gap-1"><MapPin size={12} /> SF, CA</div>
          </div>
        </motion.div>

        {/* Behavioral Analysis Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 border border-[#333] rounded-2xl bg-[#050505] overflow-hidden"
        >
          <div className="p-4 border-b border-[#333] bg-[#111] flex items-center gap-3">
            <Activity className="text-[#00FF9D]" size={20} />
            <h3 className="font-serif text-lg tracking-widest text-[#E0E7FF] uppercase">Behavioral Analysis</h3>
          </div>
          
          <div className="p-5 space-y-6">
            {/* Anomaly 1 */}
            <div className="flex gap-4">
              <div className="mt-1">
                <div className="w-8 h-8 rounded-full bg-[#FF9D00]/10 border border-[#FF9D00]/50 flex items-center justify-center text-[#FF9D00]">
                  <AlertTriangle size={16} />
                </div>
              </div>
              <div>
                <h4 className="font-mono text-xs text-[#FF9D00] uppercase tracking-widest mb-1">Frequent Stops Detected</h4>
                <p className="text-sm text-[#E0E7FF]/70 leading-relaxed">
                  Buster paused 14 times in Sector 4, a 300% increase from baseline. Analysis suggests heightened olfactory interest or potential anxiety regarding recent coyote markings in the area.
                </p>
              </div>
            </div>

            {/* Anomaly 2 */}
            <div className="flex gap-4">
              <div className="mt-1">
                <div className="w-8 h-8 rounded-full bg-[#FF003C]/10 border border-[#FF003C]/50 flex items-center justify-center text-[#FF003C]">
                  <Activity size={16} />
                </div>
              </div>
              <div>
                <h4 className="font-mono text-xs text-[#FF003C] uppercase tracking-widest mb-1">Multiple Sudden Lunges</h4>
                <p className="text-sm text-[#E0E7FF]/70 leading-relaxed">
                  3 sudden acceleration spikes recorded near the dog park perimeter. Leash tension exceeded safe thresholds. Recommendation: Implement "Strict Heel Protocol" in high-distraction zones.
                </p>
              </div>
            </div>

            {/* Anomaly 3 */}
            <div className="flex gap-4">
              <div className="mt-1">
                <div className="w-8 h-8 rounded-full bg-[#00FF9D]/10 border border-[#00FF9D]/50 flex items-center justify-center text-[#00FF9D]">
                  <TrendingDown size={16} />
                </div>
              </div>
              <div>
                <h4 className="font-mono text-xs text-[#00FF9D] uppercase tracking-widest mb-1">Decreased Step Frequency</h4>
                <p className="text-sm text-[#E0E7FF]/70 leading-relaxed">
                  Pace dropped by 25% during the final 10 minutes. Ambient temperature was 72°F. Likely fatigue. Ensure adequate hydration and consider shorter routes during midday sun.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex gap-4">
          <button className="flex-1 py-4 bg-[#00FF9D] text-black font-mono text-sm uppercase tracking-widest hover:bg-[#00FF9D]/80 transition-colors flex items-center justify-center gap-2 rounded-xl">
            <Share2 size={16} /> Share
          </button>
          <button className="py-4 px-6 border border-[#333] text-[#E0E7FF] font-mono text-sm uppercase tracking-widest hover:bg-[#333] transition-colors flex items-center justify-center rounded-xl">
            <Download size={16} />
          </button>
        </div>
        
        <div className="mt-8 text-center">
          <p className="font-serif text-xs text-[#E0E7FF]/30 tracking-widest uppercase">Boop • Protect the Pack</p>
        </div>
      </div>
    </div>
  );
}
