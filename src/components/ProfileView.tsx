import { Link } from "react-router-dom";
import { Shield, Award, CheckCircle2, Clock } from "lucide-react";

export default function ProfileView() {
  return (
    <div className="p-6 pb-24">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 bg-slate-800 rounded-full border-4 border-emerald-500 flex items-center justify-center relative">
          <span className="text-3xl font-bold">B</span>
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-900 text-xs font-bold px-2 py-1 rounded-full border-2 border-slate-950">
            Lv.4
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Alex & Buster</h2>
          <p className="text-slate-400 text-sm">Neighborhood Sentinel</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-8">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
              Trust Score
            </h3>
            <div className="text-3xl font-bold text-emerald-400 mt-1">842</div>
          </div>
          <Award className="text-emerald-500 opacity-20" size={48} />
        </div>

        <div className="w-full bg-slate-800 rounded-full h-2 mb-2">
          <div
            className="bg-emerald-500 h-2 rounded-full"
            style={{ width: "70%" }}
          ></div>
        </div>
        <p className="text-xs text-slate-500">
          158 points to Level 5. Higher levels get priority alerts.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
          Recent Contributions
        </h3>
        <div className="space-y-3">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Reported Coyote</span>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                  Verified
                </span>
              </div>
              <span className="text-xs text-slate-500">2d ago</span>
            </div>
            <p className="text-sm text-slate-400">
              Verified by 4 neighbors. +50 Trust Score.
            </p>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Marked Broken Glass</span>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                  Verified
                </span>
              </div>
              <span className="text-xs text-slate-500">1w ago</span>
            </div>
            <p className="text-sm text-slate-400">
              Area cleaned up. +20 Trust Score.
            </p>
          </div>
        </div>
      </div>

      <Link
        to="/"
        className="block mt-6 py-3 text-center font-mono text-xs text-[#00FF9D] uppercase tracking-widest border border-[#00FF9D]/30 rounded-xl hover:bg-[#00FF9D]/5 transition-colors"
      >
        Invite Friends → Waitlist
      </Link>
    </div>
  );
}
