import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ThermometerSun,
  Leaf,
  Droplets,
  Dog,
  Shield,
  X,
  Sparkles,
  Moon,
  Sun,
  Wind,
  Skull
} from "lucide-react";
import TacticalMap, { DangerZone } from "./TacticalMap";

export default function ForecastView() {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'done'>('idle');
  const [showCard, setShowCard] = useState(false);

  const handleScan = () => {
    setScanState('scanning');
    setTimeout(() => {
      setScanState('done');
      setShowCard(true);
    }, 2500);
  };

  const dangerZones: DangerZone[] = [
    { id: '1', x: 30, y: 40, radius: 80, type: 'coyote' },
    { id: '2', x: 70, y: 80, radius: 60, type: 'poison' }
  ];

  // Almanac / Tarot style data
  const dailyReading = {
    date: "OCTOBER 24",
    moonPhase: "Waning Crescent",
    verdict: "VIGILANCE", // "AUSPICIOUS", "VIGILANCE", "PERILOUS"
    verdictColor: "text-rose-500",
    verdictBg: "bg-rose-500/10",
    verdictBorder: "border-rose-500/30",
    summary: "The paths are fraught with unseen shadows. Keep your companion close; the wild stirs today.",
    
    // Categorized risks
    categories: [
      {
        title: "The Elements",
        icon: <Sun size={18} />,
        items: [
          { name: "Pavement Heat", status: "safe", value: "72°F", desc: "Cool to the touch." },
          { name: "Air Quality", status: "warning", value: "AQI 65", desc: "Slight haze." }
        ]
      },
      {
        title: "The Flora",
        icon: <Leaf size={18} />,
        items: [
          { name: "Foxtails", status: "danger", value: "High", desc: "Blooming in tall grass." },
          { name: "Toxic Algae", status: "safe", value: "Clear", desc: "Lakes are pristine." }
        ]
      },
      {
        title: "The Fauna",
        icon: <Moon size={18} />,
        items: [
          { name: "Coyotes", status: "danger", value: "Active", desc: "Sightings at dawn/dusk." },
          { name: "Aggressive Dogs", status: "safe", value: "None", desc: "No recent reports." }
        ]
      }
    ]
  };

  return (
    <div className="p-6 space-y-6 pb-24 h-full flex flex-col relative">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold font-serif tracking-wide">Daily Reading</h2>
          <p className="text-slate-400 text-sm mt-1 font-mono uppercase tracking-widest">
            San Francisco • {dailyReading.date}
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {scanState === 'idle' ? (
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleScan}
            className="w-full aspect-[3/4] max-h-[60vh] bg-slate-900 rounded-[2rem] border border-slate-800 flex flex-col items-center justify-center space-y-6 hover:bg-slate-800 transition-colors relative overflow-hidden group"
          >
            {/* Decorative border */}
            <div className="absolute inset-4 border border-slate-700/50 rounded-[1.5rem] pointer-events-none transition-all group-hover:border-emerald-500/30"></div>
            <div className="absolute inset-8 border border-slate-800 rounded-[1rem] pointer-events-none"></div>
            
            <div className="p-6 bg-slate-950 rounded-full border border-slate-800 group-hover:border-emerald-500/50 transition-colors shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]">
              <Sparkles size={48} className="text-emerald-500 opacity-80" />
            </div>
            <div className="text-center space-y-2">
              <span className="font-serif text-xl text-slate-300 tracking-widest">CAST THE RUNES</span>
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Reveal Today's Path</p>
            </div>
          </motion.button>
        ) : scanState === 'scanning' ? (
          <div className="w-full aspect-[3/4] max-h-[60vh] bg-slate-900 rounded-[2rem] border border-slate-800 flex flex-col items-center justify-center space-y-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)] animate-pulse"></div>
            
            {/* Mystical scanning animation */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-slate-700 rounded-full border-t-emerald-500/50 border-b-emerald-500/50"
              />
              <motion.div 
                animate={{ rotate: -360 }} 
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border border-slate-700 rounded-full border-l-emerald-500/50 border-r-emerald-500/50"
              />
              <Shield size={32} className="text-emerald-500/50 animate-pulse" />
            </div>
            
            <div className="text-center space-y-2">
              <p className="font-serif text-lg text-emerald-400 tracking-widest animate-pulse">DIVINING...</p>
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Consulting the elements</p>
            </div>
          </div>
        ) : (
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCard(true)}
            className="w-full aspect-[3/4] max-h-[60vh] bg-slate-900 rounded-[2rem] border border-slate-800 flex flex-col items-center justify-center space-y-6 hover:bg-slate-800 transition-colors relative overflow-hidden group"
          >
            {/* Decorative border */}
            <div className="absolute inset-4 border border-slate-700/50 rounded-[1.5rem] pointer-events-none"></div>
            
            <div className="p-6 bg-slate-950 rounded-full border border-rose-500/30 shadow-[0_0_40px_rgba(244,63,94,0.2)]">
              <Moon size={48} className="text-rose-400" />
            </div>
            <div className="text-center space-y-2">
              <span className="font-serif text-2xl text-rose-400 tracking-widest">VIGILANCE</span>
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Tap to reveal reading</p>
            </div>
          </motion.button>
        )}
      </div>

      {/* The Full Card Modal */}
      <AnimatePresence>
        {showCard && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 sm:p-6 overflow-y-auto flex flex-col"
          >
            <div className="flex-1 w-full max-w-md mx-auto my-auto">
              
              {/* The Card */}
              <div className="bg-[#1a1c23] rounded-[2rem] border border-[#2a2d35] overflow-hidden shadow-2xl relative">
                
                {/* Card Header / Title */}
                <div className="p-6 text-center relative border-b border-[#2a2d35] bg-[#15171c]">
                  <button 
                    onClick={() => setShowCard(false)}
                    className="absolute top-6 right-6 text-slate-500 hover:text-slate-300"
                  >
                    <X size={24} />
                  </button>
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">{dailyReading.date} • {dailyReading.moonPhase}</p>
                  <h2 className={`font-serif text-4xl tracking-widest ${dailyReading.verdictColor}`}>
                    {dailyReading.verdict}
                  </h2>
                  <p className="text-sm text-slate-400 mt-4 font-serif italic px-4">
                    "{dailyReading.summary}"
                  </p>
                </div>

                {/* Tactical Map Snapshot (The "Vision") */}
                <div className="p-4 bg-[#111216]">
                  <div className="relative rounded-2xl overflow-hidden border border-[#2a2d35]">
                    <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700/50 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></div>
                      <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest">The Vision</span>
                    </div>
                    <TacticalMap dangerZones={dangerZones} className="h-48 rounded-none border-none" />
                  </div>
                </div>

                {/* Categorized Risks */}
                <div className="p-6 space-y-6 bg-[#1a1c23]">
                  {dailyReading.categories.map((category, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex items-center gap-2 border-b border-[#2a2d35] pb-2">
                        <div className="text-slate-500">{category.icon}</div>
                        <h3 className="font-serif text-lg text-slate-300 tracking-wide">{category.title}</h3>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {category.items.map((item, i) => (
                          <div key={i} className="bg-[#15171c] p-3 rounded-xl border border-[#2a2d35]">
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">{item.name}</span>
                              <div className={`w-2 h-2 rounded-full ${
                                item.status === 'danger' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' :
                                item.status === 'warning' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]' :
                                'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]'
                              }`} />
                            </div>
                            <div className={`font-serif text-lg ${
                                item.status === 'danger' ? 'text-rose-400' :
                                item.status === 'warning' ? 'text-amber-400' :
                                'text-emerald-400'
                              }`}>
                              {item.value}
                            </div>
                            <div className="text-[10px] text-slate-500 mt-1 leading-tight">
                              {item.desc}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card Footer */}
                <div className="p-4 text-center border-t border-[#2a2d35] bg-[#15171c]">
                  <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                    Boop Oracle • Protect the Pack
                  </p>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
