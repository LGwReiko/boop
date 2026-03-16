import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Radio, MapPin, Skull, ShieldAlert, Navigation, Eye, EyeOff, Bell, BellOff } from "lucide-react";
import TacticalMap, { DangerZone } from "./TacticalMap";

export default function RadarView() {
  const [isActive, setIsActive] = useState(() => {
    const saved = localStorage.getItem('radar_isActive');
    return saved ? JSON.parse(saved) : false;
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const saved = localStorage.getItem('radar_notificationsEnabled');
    return saved ? JSON.parse(saved) : true;
  });
  
  const [dangerLevel, setDangerLevel] = useState(0); // 0-100
  const [showMap, setShowMap] = useState(false);

  // Save settings to local storage when they change
  useEffect(() => {
    localStorage.setItem('radar_isActive', JSON.stringify(isActive));
  }, [isActive]);

  useEffect(() => {
    localStorage.setItem('radar_notificationsEnabled', JSON.stringify(notificationsEnabled));
  }, [notificationsEnabled]);

  // Simulate geiger counter when active
  useEffect(() => {
    if (!isActive) {
      setDangerLevel(0);
      setShowMap(false);
      return;
    }

    const interval = setInterval(() => {
      // Randomly spike danger level to simulate walking near something
      if (Math.random() > 0.8) {
        const newDanger = Math.min(100, dangerLevel + Math.random() * 40 + 20);
        setDangerLevel(newDanger);
        if (newDanger > 50) {
          setShowMap(true);
          if (notificationsEnabled && navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
          }
        }
      } else {
        setDangerLevel((prev) => Math.max(0, prev - 10));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isActive, dangerLevel, notificationsEnabled]);

  const activeDangerZones: DangerZone[] = dangerLevel > 50 ? [
    { id: 'alert1', x: 50, y: 30, radius: 100, type: 'dog' }
  ] : [];

  return (
    <div className="h-full flex flex-col relative pb-24 bg-black">
      {/* Stealth Mode Map Overlay */}
      <AnimatePresence>
        {showMap && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 bg-slate-950 flex flex-col"
          >
            <div className="p-6 pt-12 flex justify-between items-center bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-30">
              <div className="flex items-center gap-2 text-red-500">
                <ShieldAlert className="animate-pulse" />
                <span className="font-bold tracking-widest uppercase">Danger Proximity</span>
              </div>
              <button 
                onClick={() => setShowMap(false)}
                className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white"
              >
                <EyeOff size={20} />
              </button>
            </div>
            <div className="flex-1 relative">
              <TacticalMap 
                dangerZones={activeDangerZones} 
                className="h-full rounded-none border-none" 
              />
              <div className="absolute bottom-24 left-6 right-6 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-red-500/30">
                <h3 className="text-red-400 font-bold mb-1">Aggressive Dog Reported</h3>
                <p className="text-slate-300 text-sm">150ft ahead. Please leash your dog and consider an alternate route.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Background (Stylized) */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-slate-800 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-slate-800 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-slate-800 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-slate-800 rounded-full" />

        {/* Grid lines */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-slate-800" />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-800" />
      </div>

      <div className="p-6 flex-1 flex flex-col z-10">
        <div className="text-center mb-8 flex justify-between items-start">
          <div className="text-left">
            <h2 className="text-2xl font-bold text-slate-300">Stealth Radar</h2>
            <p className="text-slate-500 text-sm mt-1">
              Phone in pocket, eyes on dog.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`p-2 rounded-full border transition-colors ${
                notificationsEnabled 
                  ? 'bg-emerald-900/20 border-emerald-500/50 text-emerald-400' 
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              {notificationsEnabled ? <Bell size={20} /> : <BellOff size={20} />}
            </button>
            {isActive && (
              <button 
                onClick={() => setShowMap(true)}
                className="p-2 bg-slate-900 border border-slate-800 rounded-full text-slate-400 hover:text-white"
              >
                <Eye size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center relative">
          {/* Radar Ping Animation */}
          <AnimatePresence>
            {isActive && (
              <>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0.8 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeOut",
                  }}
                  className={`absolute w-32 h-32 rounded-full border-2 ${dangerLevel > 50 ? 'border-red-500/50' : 'border-emerald-500/30'}`}
                />
                <motion.div
                  initial={{ scale: 0.5, opacity: 0.8 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    delay: 1,
                    ease: "easeOut",
                  }}
                  className={`absolute w-32 h-32 rounded-full border-2 ${dangerLevel > 50 ? 'border-red-500/50' : 'border-emerald-500/30'}`}
                />
              </>
            )}
          </AnimatePresence>

          {/* Main Toggle Button */}
          <button
            onClick={() => setIsActive(!isActive)}
            className={`relative z-10 w-48 h-48 rounded-full flex flex-col items-center justify-center transition-all duration-500 ${
              isActive
                ? dangerLevel > 50
                  ? "bg-red-900/50 border-2 border-red-500 shadow-[0_0_60px_rgba(239,68,68,0.4)]"
                  : "bg-emerald-900/20 border-2 border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.1)]"
                : "bg-slate-900 border-2 border-slate-800 shadow-xl opacity-50"
            }`}
          >
            <Radio
              size={48}
              className={`mb-2 ${isActive ? (dangerLevel > 50 ? "text-red-400" : "text-emerald-400") : "text-slate-600"}`}
            />
            <span
              className={`font-bold tracking-widest uppercase ${isActive ? (dangerLevel > 50 ? "text-red-400" : "text-emerald-400") : "text-slate-600"}`}
            >
              {isActive ? (dangerLevel > 50 ? "DANGER" : "Guarding...") : "Standby"}
            </span>
          </button>
        </div>

        {/* Nearby Alerts List - Only visible when active but not in danger */}
        <div className={`mt-8 transition-opacity duration-500 ${isActive && dangerLevel <= 50 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-800/50 p-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">
              Nearby Reports
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/30">
                <div className="p-2 bg-red-500/10 text-red-500/70 rounded-xl">
                  <Skull size={16} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-slate-400">Poison Bait</h4>
                  <p className="text-xs text-slate-500">
                    0.2 mi • Reported by @karen_w
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/30">
                <div className="p-2 bg-amber-500/10 text-amber-500/70 rounded-xl">
                  <ShieldAlert size={16} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-slate-400">
                    Aggressive Dog (Off-leash)
                  </h4>
                  <p className="text-xs text-slate-500">
                    0.4 mi • Verified by 3 neighbors
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
