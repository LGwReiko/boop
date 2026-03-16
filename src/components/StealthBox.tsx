import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Skull, AlertTriangle, CheckCircle } from "lucide-react";
import TacticalMap, { DangerZone } from "./TacticalMap";

export default function StealthBox({ onEndWalk, onReport }: { onEndWalk: () => void, onReport: () => void }) {
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [dangerState, setDangerState] = useState<'safe' | 'alert'>('safe');
  const [showMap, setShowMap] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [showPoopIcon, setShowPoopIcon] = useState(false);
  const [showMarkIcon, setShowMarkIcon] = useState(false);
  
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 1);
      setDistance(d => d + 0.01);
      
      // Randomly trigger danger state for demo
      if (Math.random() > 0.95 && dangerState === 'safe') {
        setDangerState('alert');
        setShowMap(true);
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
      } else if (Math.random() > 0.9 && dangerState === 'alert') {
        setDangerState('safe');
        setShowMap(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [dangerState]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const activeDangerZones: DangerZone[] = dangerState === 'alert' ? [
    { id: 'alert1', x: 50, y: 30, radius: 100, type: 'dog' }
  ] : [];

  // Invisible Button Handlers
  const handlePoop = () => {
    // Play water drop sound (simulated with visual feedback)
    setShowPoopIcon(true);
    setTimeout(() => setShowPoopIcon(false), 1000);
    if (navigator.vibrate) navigator.vibrate([50]);
  };

  const handleCamera = () => {
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 200);
    if (navigator.vibrate) navigator.vibrate([20]);
  };

  const handleMarkStart = () => {
    holdTimerRef.current = setTimeout(() => {
      setShowMarkIcon(true);
      setTimeout(() => setShowMarkIcon(false), 2000);
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    }, 2000);
  };

  const handleMarkEnd = () => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
  };

  return (
    <div className="h-full flex flex-col relative bg-black overflow-hidden select-none">
      
      {/* Red Alert Edges */}
      <AnimatePresence>
        {dangerState === 'alert' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none z-10 border-4 border-[#FF003C]/60 shadow-[inset_0_0_80px_rgba(255,0,60,0.2)] animate-pulse"
          />
        )}
      </AnimatePresence>

      {/* Camera Flash */}
      <AnimatePresence>
        {showFlash && (
          <motion.div 
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Tactical Map Overlay */}
      <AnimatePresence>
        {showMap && dangerState === 'alert' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 bg-[#050505]"
          >
            <TacticalMap 
              dangerZones={activeDangerZones} 
              className="absolute inset-0 w-full h-full rounded-none border-none opacity-50 !aspect-[9/19]" 
            />
            <div className="absolute top-16 left-4 right-4 flex justify-center z-20">
              <div className="bg-[#FF003C]/20 border border-[#FF003C] px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-2 max-w-[90%]">
                <AlertTriangle className="text-[#FF003C] animate-pulse shrink-0" size={16} />
                <span className="font-mono text-xs text-[#FF003C] tracking-widest uppercase truncate">Proximity Alert</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Minimal Data Display */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-20 pointer-events-none">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-5xl text-[#00FF9D] tracking-widest drop-shadow-[0_0_15px_rgba(0,255,157,0.5)]">
            {formatTime(time)}
          </span>
          <span className="font-mono text-xl text-[#E0E7FF]/50 tracking-widest">
            {distance.toFixed(2)} km
          </span>
        </div>
      </div>

      {/* Invisible Hit Areas */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] flex z-30">
        <div 
          className="flex-1 h-full active:bg-white/5 transition-colors"
          onClick={handlePoop}
        />
        <div 
          className="flex-1 h-full active:bg-[#FF003C]/10 transition-colors"
          onPointerDown={handleMarkStart}
          onPointerUp={handleMarkEnd}
          onPointerLeave={handleMarkEnd}
        />
        <div 
          className="flex-1 h-full active:bg-white/5 transition-colors"
          onClick={handleCamera}
        />
      </div>

      {/* Visual Feedback Overlays */}
      <AnimatePresence>
        {showPoopIcon && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="absolute bottom-32 left-1/6 -translate-x-1/2 z-40 text-[#00FF9D] pointer-events-none"
          >
            <span className="text-4xl">💩</span>
          </motion.div>
        )}
        {showMarkIcon && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="absolute bottom-32 left-1/2 -translate-x-1/2 z-40 bg-[#FF003C] text-black p-4 rounded-full pointer-events-none shadow-[0_0_30px_rgba(255,0,60,0.5)]"
          >
            <Skull size={32} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* End Walk Button */}
      <div className="absolute top-12 right-6 z-40">
        <button 
          onClick={onEndWalk}
          className="w-12 h-12 rounded-full border border-[#333] bg-black/50 backdrop-blur-md flex items-center justify-center text-[#E0E7FF]/50 hover:text-[#E0E7FF] hover:border-[#E0E7FF]/50 transition-colors"
        >
          <CheckCircle size={20} />
        </button>
      </div>

      {/* Report Danger Button */}
      <div className="absolute top-12 left-6 z-40">
        <button 
          onClick={onReport}
          className="w-12 h-12 rounded-full border border-[#FF003C]/50 bg-[#FF003C]/10 backdrop-blur-md flex items-center justify-center text-[#FF003C] hover:bg-[#FF003C]/20 transition-colors shadow-[0_0_15px_rgba(255,0,60,0.2)]"
        >
          <AlertTriangle size={20} />
        </button>
      </div>

      {/* Debug/Guide text (usually hidden, shown here for clarity) */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-between px-12 font-mono text-[8px] text-[#333] uppercase tracking-widest pointer-events-none z-20">
        <span>Tap: Log</span>
        <span>Hold: Mark</span>
        <span>Tap: Snap</span>
      </div>
    </div>
  );
}
