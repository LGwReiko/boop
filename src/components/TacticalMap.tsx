import React from 'react';
import { Skull, Dog, ShieldAlert } from 'lucide-react';

export interface DangerZone {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  radius: number; // size in px
  type: 'coyote' | 'poison' | 'dog' | 'glass';
}

interface TacticalMapProps {
  dangerZones: DangerZone[];
  userLocation?: { x: number; y: number };
  showUser?: boolean;
  className?: string;
}

export default function TacticalMap({ 
  dangerZones, 
  userLocation = { x: 50, y: 50 },
  showUser = true,
  className = ""
}: TacticalMapProps) {
  return (
    <div className={`relative w-full aspect-square bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden ${className}`}>
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)',
        backgroundSize: '10% 10%'
      }}></div>
      
      {/* Stylized Roads/Terrain (SVG) */}
      <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M 0 20 Q 50 50 100 20" stroke="#475569" strokeWidth="2" fill="none" />
        <path d="M 30 0 L 30 100" stroke="#475569" strokeWidth="4" fill="none" />
        <path d="M 0 70 L 100 70" stroke="#475569" strokeWidth="3" fill="none" />
        <path d="M 70 20 L 70 100" stroke="#475569" strokeWidth="1.5" fill="none" />
      </svg>

      {/* Danger Zones */}
      {dangerZones.map(zone => (
        <div 
          key={zone.id}
          className="absolute rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center animate-pulse"
          style={{
            left: `${zone.x}%`,
            top: `${zone.y}%`,
            width: `${zone.radius}px`,
            height: `${zone.radius}px`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {zone.type === 'coyote' && <Dog className="text-red-500 w-1/2 h-1/2 opacity-80" />}
          {zone.type === 'poison' && <Skull className="text-red-500 w-1/2 h-1/2 opacity-80" />}
          {zone.type === 'dog' && <ShieldAlert className="text-red-500 w-1/2 h-1/2 opacity-80" />}
          {zone.type === 'glass' && <div className="text-red-500 font-bold opacity-80">!</div>}
        </div>
      ))}

      {/* User Location */}
      {showUser && (
        <div 
          className="absolute flex flex-col items-center justify-center transition-all duration-1000 ease-in-out"
          style={{
            left: `${userLocation.x}%`,
            top: `${userLocation.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 shadow-[0_0_15px_rgba(16,185,129,1)] z-10"></div>
          <div className="absolute w-12 h-12 bg-emerald-500/30 rounded-full animate-ping"></div>
        </div>
      )}
      
      {/* Overlay vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(2,6,23,1)] pointer-events-none"></div>
      
      {/* Scanning Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.5)] animate-[scan_4s_ease-in-out_infinite] opacity-30 pointer-events-none"></div>
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-10px); }
          50% { transform: translateY(1000%); }
          100% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
