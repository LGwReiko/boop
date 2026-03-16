import { useState } from "react";
import { motion } from "motion/react";
import {
  Dog,
  Leaf,
  ThermometerSun,
  Droplets,
  Skull,
  ShieldAlert,
  AlertTriangle,
  Bird,
  CircleDot,
  MapPin,
  CheckCircle2,
  X
} from "lucide-react";

export default function ReportView({ onClose }: { onClose?: () => void }) {
  const [reported, setReported] = useState(false);

  const reportTypes = [
    {
      id: "coyote",
      name: "Coyote",
      icon: <Dog size={22} />,
      color: "text-[#FF9D00] border-[#FF9D00]",
      bg: "bg-[#FF9D00]/10",
      hoverBorder: "hover:border-[#FF9D00]/50",
      shadow: "hover:shadow-[0_0_20px_rgba(255,157,0,0.2)]"
    },
    {
      id: "foxtails",
      name: "Foxtails",
      icon: <Leaf size={22} />,
      color: "text-[#FFD700] border-[#FFD700]",
      bg: "bg-[#FFD700]/10",
      hoverBorder: "hover:border-[#FFD700]/50",
      shadow: "hover:shadow-[0_0_20px_rgba(255,215,0,0.2)]"
    },
    {
      id: "heat",
      name: "Hot Pavement",
      icon: <ThermometerSun size={22} />,
      color: "text-[#FF3C00] border-[#FF3C00]",
      bg: "bg-[#FF3C00]/10",
      hoverBorder: "hover:border-[#FF3C00]/50",
      shadow: "hover:shadow-[0_0_20px_rgba(255,60,0,0.2)]"
    },
    {
      id: "algae",
      name: "Toxic Algae",
      icon: <Droplets size={22} />,
      color: "text-[#00FF9D] border-[#00FF9D]",
      bg: "bg-[#00FF9D]/10",
      hoverBorder: "hover:border-[#00FF9D]/50",
      shadow: "hover:shadow-[0_0_20px_rgba(0,255,157,0.2)]"
    },
    {
      id: "poison",
      name: "Poison Bait",
      icon: <Skull size={22} />,
      color: "text-[#B000FF] border-[#B000FF]",
      bg: "bg-[#B000FF]/10",
      hoverBorder: "hover:border-[#B000FF]/50",
      shadow: "hover:shadow-[0_0_20px_rgba(176,0,255,0.2)]"
    },
    {
      id: "dog",
      name: "Aggressive Dog",
      icon: <ShieldAlert size={22} />,
      color: "text-[#FF003C] border-[#FF003C]",
      bg: "bg-[#FF003C]/10",
      hoverBorder: "hover:border-[#FF003C]/50",
      shadow: "hover:shadow-[0_0_20px_rgba(255,0,60,0.2)]"
    },
    {
      id: "glass",
      name: "Glass",
      icon: <AlertTriangle size={28} />,
      color: "text-[#94A3B8] border-[#94A3B8]",
      bg: "bg-[#94A3B8]/10",
      hoverBorder: "hover:border-[#94A3B8]/50",
      shadow: "hover:shadow-[0_0_20px_rgba(148,163,184,0.2)]"
    },
    {
      id: "wildlife",
      name: "Wildlife",
      icon: <Bird size={22} />,
      color: "text-[#38BDF8] border-[#38BDF8]",
      bg: "bg-[#38BDF8]/10",
      hoverBorder: "hover:border-[#38BDF8]/50",
      shadow: "hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]"
    },
    {
      id: "other",
      name: "Other",
      icon: <CircleDot size={22} />,
      color: "text-[#E0E7FF] border-[#E0E7FF]",
      bg: "bg-[#E0E7FF]/10",
      hoverBorder: "hover:border-[#E0E7FF]/50",
      shadow: "hover:shadow-[0_0_20px_rgba(224,231,255,0.2)]"
    },
  ];

  const handleReport = () => {
    setReported(true);
    setTimeout(() => {
      setReported(false);
      if (onClose) onClose();
    }, 3000);
  };

  if (reported) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center pb-24 bg-black">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-[#00FF9D]/20 border border-[#00FF9D] rounded-full flex items-center justify-center mb-6 text-[#00FF9D] shadow-[0_0_30px_rgba(0,255,157,0.3)]"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h2 className="text-2xl font-serif tracking-widest text-[#E0E7FF] mb-2 uppercase">Report Logged</h2>
        <p className="font-mono text-xs text-[#E0E7FF]/50 uppercase tracking-widest">
          The pack has been warned.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-black p-6 pb-24 overflow-y-auto items-center">
      <div className="flex justify-between items-start mb-6 pt-6 w-full max-w-sm">
        <div>
          <h2 className="text-3xl font-serif tracking-widest text-[#FF003C] uppercase">Report Danger</h2>
          <p className="font-mono text-xs text-[#E0E7FF]/50 mt-2 uppercase tracking-widest">
            Alert the pack. Mark the ether.
          </p>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="p-2 border border-[#333] rounded-full text-[#E0E7FF]/50 hover:text-[#E0E7FF] hover:border-[#E0E7FF]/50 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="bg-[#111] border border-[#333] rounded-2xl p-4 mb-6 flex items-center gap-3 w-full max-w-sm">
        <MapPin className="text-[#00FF9D]" size={20} />
        <div className="flex-1">
          <p className="font-mono text-xs text-[#E0E7FF] uppercase tracking-widest">Current Coordinates</p>
          <p className="font-mono text-[10px] text-[#E0E7FF]/50 uppercase tracking-widest mt-1">Dolores Park, Sector 4</p>
        </div>
        <button className="font-mono text-[10px] text-[#00FF9D] uppercase tracking-widest border-b border-[#00FF9D]/30 pb-1">
          Edit
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 w-full max-w-sm">
        {reportTypes.map((type) => (
          <motion.button
            key={type.id}
            onClick={handleReport}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`aspect-square bg-[#050505] border border-[#333] rounded-xl p-2 flex flex-col items-center justify-center gap-1 transition-all duration-300 ${type.hoverBorder} ${type.shadow} relative overflow-hidden group`}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-transparent to-white/[0.02]" />
            <div
              className={`w-9 h-9 rounded-lg border ${type.color} ${type.bg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              {type.icon}
            </div>
            <span className="font-mono text-[9px] text-[#E0E7FF] uppercase tracking-widest text-center leading-tight">{type.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
