/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Home, Map as MapIcon, PlusCircle, Shield, Compass } from "lucide-react";
import PortalView from "./components/PortalView";
import StealthBox from "./components/StealthBox";
import MemoryLog from "./components/MemoryLog";
import ReportView from "./components/ReportView";
import ProfileView from "./components/ProfileView";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [walkState, setWalkState] = useState<'idle' | 'active' | 'log'>('idle');

  const handleStartWalk = () => {
    setWalkState('active');
    setActiveTab('walk');
  };

  const handleEndWalk = () => {
    setWalkState('log');
    setActiveTab('walk');
  };

  const handleHome = () => {
    setWalkState('idle');
    setActiveTab('home');
  };

  return (
    <div className="flex flex-col h-screen bg-black text-[#E0E7FF] font-sans overflow-hidden">
      {/* Header - Only show when not in active walk or log */}
      {walkState === 'idle' && (
        <header className="pt-12 pb-4 px-6 bg-black border-b border-[#333] flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#00FF9D] rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-black font-serif">B</span>
            </div>
            <h1 className="text-xl font-serif tracking-widest text-[#E0E7FF]">BOOP</h1>
          </div>
          <div className="flex items-center gap-2 bg-[#111] border border-[#333] px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#00FF9D]">
            <Shield size={14} />
            <span>Lv.4</span>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-black">
        {activeTab === "home" && walkState === 'idle' && <PortalView onStartWalk={handleStartWalk} />}
        
        {/* Keep StealthBox mounted during active walk so timer doesn't reset */}
        <div className={walkState === 'active' ? 'block h-full' : 'hidden'}>
          {walkState === 'active' && (
            <StealthBox 
              onEndWalk={handleEndWalk} 
              onReport={() => setActiveTab('report')} 
            />
          )}
        </div>

        {activeTab === "walk" && walkState === 'log' && <MemoryLog onHome={handleHome} />}
        
        {/* Report View Overlay */}
        {activeTab === "report" && (
          <div className="absolute inset-0 z-50 bg-black">
            <ReportView onClose={() => setActiveTab(walkState === 'active' ? 'walk' : 'home')} />
          </div>
        )}

        {activeTab === "profile" && walkState === 'idle' && <ProfileView />}
      </main>

      {/* Bottom Nav - Hide during active walk and log */}
      {walkState === 'idle' && (
        <nav className="bg-black border-t border-[#333] pb-safe pt-2 px-6 flex justify-between items-center z-10 absolute bottom-0 w-full">
          <NavItem
            icon={<Compass size={24} />}
            label="Oracle"
            isActive={activeTab === "home"}
            onClick={() => setActiveTab("home")}
          />
          <div className="relative -top-6">
            <button
              onClick={() => setActiveTab("report")}
              className="w-14 h-14 bg-[#111] border border-[#FF003C]/50 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,0,60,0.2)] text-[#FF003C] hover:bg-[#FF003C]/20 transition-colors"
            >
              <PlusCircle size={32} />
            </button>
          </div>
          <NavItem
            icon={<Shield size={24} />}
            label="Watch"
            isActive={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          />
        </nav>
      )}
    </div>
  );
}

function NavItem({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 p-2 transition-colors ${isActive ? "text-[#00FF9D]" : "text-[#E0E7FF]/50 hover:text-[#E0E7FF]"}`}
    >
      {icon}
      <span className="text-[10px] font-mono uppercase tracking-widest">
        {label}
      </span>
    </button>
  );
}
