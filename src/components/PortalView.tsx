import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Moon, Sun, Wind, Skull, Dog, ShieldAlert } from "lucide-react";
import TacticalMap, { DangerZone } from "./TacticalMap";

export default function PortalView({ onStartWalk, largeCard }: { onStartWalk: () => void; largeCard?: boolean }) {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'card'>('idle');
  const [scanProgress, setScanProgress] = useState(0);
  const [reading, setReading] = useState<any>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handlePointerDown = () => {
    if (scanState === 'card') return;
    setScanState('scanning');
    setScanProgress(0);
    
    // Simulate haptic heartbeat
    if (navigator.vibrate) navigator.vibrate([50, 100, 50]);

    scanIntervalRef.current = setInterval(() => {
      setScanProgress(prev => {
        const next = prev + 5;
        if (next >= 100) {
          if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
          if (navigator.vibrate) navigator.vibrate([200]);
          return 100;
        }
        // Accelerating heartbeat
        if (next % 20 === 0 && navigator.vibrate) navigator.vibrate([30, 50, 30]);
        return next;
      });
    }, 100);
  };

  const handlePointerUp = () => {
    if (scanState === 'card') return;
    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    
    if (scanProgress >= 100) {
      const isSafe = Math.random() > 0.2; // 80% chance of being safe
      const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
      
      setReading(isSafe ? {
        type: 'safe',
        date: today,
        moonPhase: "Waxing Gibbous",
        verdict: "THE FOOL",
        verdictColor: "text-[#00FF9D]",
        summary: "The ether is calm. Let your companion roam free and embrace the joy of the open path.",
        risk: "Low",
        temp: "68°F",
        manifest: [
          "Extended Sniffing",
          "Open Field Exploration",
          "Pack Socialization",
          "New Trail Discovery"
        ],
        banish: [
          "Strict Timetables",
          "Shortened Routes",
          "Tension on Leash",
          "Over-Anxiety"
        ]
      } : {
        type: 'danger',
        date: today,
        moonPhase: "Waning Crescent",
        verdict: "THE SENTINEL",
        verdictColor: "text-[#FF003C]",
        summary: "The paths are fraught with unseen shadows. Keep your companion close; the wild stirs today.",
        risk: "High",
        temp: "55°F",
        manifest: [
          "High-Vis Cyber Gear",
          "Strict Heel Protocol",
          "Paved Paths Only",
          "Constant Vigilance"
        ],
        banish: [
          "Off-Leash Freedom",
          "Tall Grass & Shadows",
          "Unknown Territories",
          "Distracted Walking"
        ]
      });
      setScanState('card');
    } else {
      setScanState('idle');
      setScanProgress(0);
    }
  };

  const dangerZones: DangerZone[] = [
    { id: '1', x: 30, y: 40, radius: 80, type: 'coyote' },
    { id: '2', x: 70, y: 80, radius: 60, type: 'poison' }
  ];

  return (
    <div className="h-full flex flex-col relative bg-black overflow-hidden select-none">
      
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00FF9D] rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random()
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [null, Math.random(), 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {scanState !== 'card' ? (
          <motion.div 
            key="portal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col items-center justify-center relative z-10"
          >
            <div className="text-center mb-16 space-y-2">
              <h1 className="font-serif text-3xl tracking-widest text-[#E0E7FF]">MIDNIGHT ORACLE</h1>
              <p className="font-mono text-xs text-[#E0E7FF]/50 uppercase tracking-[0.3em]">Press & Hold to Divine</p>
            </div>

            {/* The Portal Ring */}
            <div 
              className="relative w-64 h-64 flex items-center justify-center cursor-pointer touch-none"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              {/* Outer breathing ring */}
              <motion.div 
                animate={{ 
                  scale: scanState === 'scanning' ? 0.8 : [1, 1.1, 1],
                  opacity: scanState === 'scanning' ? 0.2 : [0.3, 0.6, 0.3]
                }}
                transition={{ duration: scanState === 'scanning' ? 0.5 : 4, repeat: scanState === 'scanning' ? 0 : Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border border-[#00FF9D]/30 shadow-[0_0_50px_rgba(0,255,157,0.1)]"
              />
              
              {/* Progress ring */}
              {scanState === 'scanning' && (
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle 
                    cx="128" cy="128" r="126" 
                    fill="none" 
                    stroke="#00FF9D" 
                    strokeWidth="2"
                    strokeDasharray="791"
                    strokeDashoffset={791 - (791 * scanProgress) / 100}
                    className="transition-all duration-100 ease-linear"
                  />
                </svg>
              )}

              {/* Inner core */}
              <motion.div 
                animate={{ 
                  scale: scanState === 'scanning' ? 1.2 : 1,
                  boxShadow: scanState === 'scanning' 
                    ? "0 0 60px rgba(0,255,157,0.4), inset 0 0 30px rgba(0,255,157,0.4)" 
                    : "0 0 20px rgba(0,255,157,0.2), inset 0 0 10px rgba(0,255,157,0.2)"
                }}
                className="w-32 h-32 rounded-full border border-[#00FF9D]/50 bg-black flex items-center justify-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,157,0.2)_0%,transparent_70%)]" />
                <Sparkles className={`text-[#00FF9D] ${scanState === 'scanning' ? 'animate-pulse' : 'opacity-50'}`} size={32} />
              </motion.div>
            </div>

            <div className="mt-16 h-8">
              {scanState === 'scanning' && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-mono text-xs text-[#00FF9D] uppercase tracking-[0.2em] animate-pulse"
                >
                  {scanProgress < 50 ? "Scanning Ether..." : "Connecting to the Pack..."}
                </motion.p>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="card"
            initial={{ opacity: 0, y: 100, rotateY: 90 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center pt-16 pb-28 px-4 overflow-y-auto"
          >
            <div className={`w-full ${largeCard ? 'max-w-[98%] max-h-[85vh] min-h-[440px]' : 'max-w-[92%] max-h-[70vh] min-h-[360px]'} aspect-[4/5] border border-[#333] rounded-3xl overflow-hidden flex flex-col relative bg-[#050505] shadow-[0_0_50px_${reading.type === 'danger' ? 'rgba(255,0,60,0.1)' : 'rgba(0,255,157,0.1)'}] shrink-0`}>
              
              {/* Top - Dynamic Illustration */}
              <div className="flex-[2] min-h-[80px] relative border-b border-[#333] overflow-hidden bg-[#111]">
                {reading.type === 'danger' ? (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,60,0.15)_0%,transparent_70%)]" />
                    {/* Stylized Mechanical Hound */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-80">
                      <svg viewBox="0 0 100 100" className="w-48 h-48">
                        <path d="M20,80 L30,50 L50,40 L70,50 L80,80" fill="none" stroke="#FF003C" strokeWidth="2" />
                        <circle cx="35" cy="45" r="2" fill="#FF003C" className="animate-pulse" />
                        <circle cx="65" cy="45" r="2" fill="#FF003C" className="animate-pulse" />
                        <path d="M40,60 L60,60" fill="none" stroke="#FF003C" strokeWidth="1" strokeDasharray="2,2" />
                        <polygon points="50,20 45,35 55,35" fill="none" stroke="#FF003C" strokeWidth="1" />
                      </svg>
                    </div>
                    <div className="absolute top-4 right-4">
                      <ShieldAlert className="text-[#FF003C] opacity-50" size={20} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,157,0.15)_0%,transparent_70%)]" />
                    {/* Stylized Greyhound running in stars */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-80">
                      <svg viewBox="0 0 100 100" className="w-48 h-48">
                        {/* Stars */}
                        <circle cx="20" cy="30" r="0.5" fill="#00FF9D" className="animate-pulse" />
                        <circle cx="80" cy="20" r="1" fill="#00FF9D" className="animate-pulse" style={{ animationDelay: '1s' }} />
                        <circle cx="70" cy="70" r="0.5" fill="#00FF9D" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                        <circle cx="30" cy="80" r="1" fill="#00FF9D" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
                        {/* Greyhound */}
                        <path d="M10,60 Q30,40 50,50 T90,40" fill="none" stroke="#00FF9D" strokeWidth="2" />
                        <path d="M30,50 L20,80 M70,45 L80,75 M50,50 L45,70 M60,48 L65,70" fill="none" stroke="#00FF9D" strokeWidth="1.5" />
                        <circle cx="85" cy="38" r="1.5" fill="#00FF9D" />
                      </svg>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Sparkles className="text-[#00FF9D] opacity-50" size={20} />
                    </div>
                  </>
                )}
                <div className="absolute top-4 left-4">
                  <p className={`font-mono text-[#E0E7FF]/50 uppercase tracking-widest ${largeCard ? 'text-xs' : 'text-[10px]'}`}>{reading.date}</p>
                </div>
              </div>

              {/* Middle - Verdict */}
              <div className={`shrink-0 flex flex-col items-center justify-center text-center border-b border-[#333] relative ${largeCard ? 'py-5' : 'py-4'}`}>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMxMTEiPjwvcmVjdD4KPC9zdmc+')] opacity-50" />
                <h2 className={`font-serif tracking-[0.15em] ${reading.verdictColor} relative z-10 ${largeCard ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
                  {reading.verdict}
                </h2>
                <div className={`mt-4 flex items-center gap-4 font-mono text-[#E0E7FF]/70 relative z-10 ${largeCard ? 'text-sm' : 'text-xs'}`}>
                  <span className="px-2 py-1 border border-[#333] rounded bg-black/50">Risk: {reading.risk}</span>
                  <span className="px-2 py-1 border border-[#333] rounded bg-black/50">Temp: {reading.temp}</span>
                </div>
              </div>

              {/* Bottom - Guide */}
              <div className={`flex-[4] flex relative bg-black ${largeCard ? 'min-h-[140px] p-5' : 'min-h-[120px] p-4'}`}>
                <div className="flex-1 flex flex-col items-start justify-start border-r border-[#333] overflow-hidden pr-4">
                  <span className={`font-serif text-[#00FF9D] tracking-widest mb-2 uppercase self-center ${largeCard ? 'text-base' : 'text-sm'}`}>MANIFEST</span>
                  <ul className={`w-full ${largeCard ? 'space-y-2' : 'space-y-1.5'}`}>
                    {reading.manifest.map((item: string, i: number) => (
                      <li key={i} className={`font-mono text-[#E0E7FF] flex items-start gap-2 uppercase tracking-wider ${largeCard ? 'text-[11px]' : 'text-[9px]'}`}>
                        <span className="text-[#00FF9D] mt-0.5 leading-none shrink-0">+</span>
                        <span className="leading-tight opacity-80 truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 flex flex-col items-start justify-start overflow-hidden pl-4">
                  <span className={`font-serif text-[#FF003C] tracking-widest mb-2 uppercase self-center ${largeCard ? 'text-base' : 'text-sm'}`}>BANISH</span>
                  <ul className={`w-full ${largeCard ? 'space-y-2' : 'space-y-1.5'}`}>
                    {reading.banish.map((item: string, i: number) => (
                      <li key={i} className={`font-mono text-[#E0E7FF] flex items-start gap-2 uppercase tracking-wider ${largeCard ? 'text-[11px]' : 'text-[9px]'}`}>
                        <span className="text-[#FF003C] mt-0.5 leading-none shrink-0">-</span>
                        <span className="leading-tight opacity-80 truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            <div className={`mt-5 space-y-2 shrink-0 w-full ${largeCard ? 'max-w-[98%]' : 'max-w-[92%]'}`}>
              <button 
                onClick={onStartWalk}
                className={`w-full py-4 bg-[#00FF9D]/10 border border-[#00FF9D]/50 rounded-2xl font-mono text-[#00FF9D] uppercase tracking-widest hover:bg-[#00FF9D]/20 transition-colors shadow-[0_0_20px_rgba(0,255,157,0.1)] ${largeCard ? 'text-base' : 'text-sm'}`}
              >
                Begin Walk
              </button>
              <button 
                onClick={() => {
                  setScanState('idle');
                  setScanProgress(0);
                }}
                className={`w-full py-4 bg-transparent border border-[#333] rounded-2xl font-mono text-[#E0E7FF]/50 uppercase tracking-widest hover:bg-[#333]/50 transition-colors ${largeCard ? 'text-base' : 'text-sm'}`}
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
