import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const STARS = Array.from({ length: 60 }, (_, i) => ({
  x: (i * 11 + 2) % 100,
  y: (i * 17 + 3) % 100,
  size: i % 8 === 0 ? 2.5 : i % 4 === 0 ? 1.5 : 0.8,
  duration: 4 + (i % 9) * 3,
  delay: (i * 0.5) % 6,
  color: i % 11 === 0 ? "#FF003C" : i % 5 === 0 ? "#B388FF" : "#00FF9D",
}));

const NEBULA_ORBS = [
  { x: "20%", y: "30%", color: "rgba(0,255,157,0.08)", size: "40%", dur: 14, del: 0 },
  { x: "80%", y: "60%", color: "rgba(179,136,255,0.06)", size: "50%", dur: 18, del: 2 },
  { x: "50%", y: "80%", color: "rgba(255,0,60,0.04)", size: "35%", dur: 16, del: 1 },
  { x: "70%", y: "20%", color: "rgba(0,255,157,0.05)", size: "30%", dur: 12, del: 3 },
  { x: "30%", y: "70%", color: "rgba(179,136,255,0.05)", size: "45%", dur: 20, del: 1 },
];

function ParticlesBg() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_0%,rgba(10,10,20,0.3),transparent_50%)]" />
      <motion.div
        className="absolute inset-0 opacity-70"
        style={{
          background: "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(0,255,157,0.15) 0%, rgba(179,136,255,0.06) 40%, transparent 70%)",
        }}
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      {NEBULA_ORBS.map((o, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-3xl"
          style={{
            left: o.x,
            top: o.y,
            width: o.size,
            aspectRatio: 1,
            transform: "translate(-50%, -50%)",
            background: o.color,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [0.9, 1.2, 0.9],
          }}
          transition={{
            duration: o.dur,
            repeat: Infinity,
            delay: o.del,
            ease: "easeInOut",
          }}
        />
      ))}
      {STARS.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
import { Compass, Footprints, Share2, MapPin, Dog, Leaf, ThermometerSun, Droplets, Skull, ShieldAlert, AlertTriangle, CircleDot, Bird } from "lucide-react";
import PortalView from "../components/PortalView";
import StealthBox from "../components/StealthBox";

const SCREEN_W = 375;
const SCREEN_H = 812;
const FRAME_W = 300;
const FRAME_H = 650;
const SCALE = Math.max(FRAME_W / SCREEN_W, FRAME_H / SCREEN_H);

function PhoneMockup({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "iframe" }) {
  const frameSize = variant === "iframe" ? "w-[320px]" : "w-[316px]";
  const screenSize = variant === "iframe" ? { w: 304, h: 658 } : { w: FRAME_W, h: FRAME_H };
  return (
    <div className={`relative ${frameSize} flex-shrink-0`}>
      <div className="rounded-[2rem] border-[8px] border-[#2a2a2a] bg-[#1a1a1a] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] p-0.5">
        <div
          className="rounded-[1.5rem] overflow-hidden bg-black"
          style={{ width: screenSize.w, height: screenSize.h }}
        >
          {children}
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#1a1a1a] rounded-b-lg z-10" />
      </div>
    </div>
  );
}

function ScaledApp({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="overflow-hidden bg-black relative"
      style={{ width: FRAME_W, height: FRAME_H }}
    >
      <div
        className="absolute top-0 left-0"
        style={{
          width: SCREEN_W,
          height: SCREEN_H,
          transform: `scale(${SCALE})`,
          transformOrigin: "top left",
        }}
      >
        <div className="w-full h-full bg-black overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

function Section({
  children,
  reverse = false,
}: {
  children: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} md:items-center md:gap-20 gap-12`}
    >
      {children}
    </motion.section>
  );
}

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-[#E0E7FF] overflow-x-hidden relative">
      <ParticlesBg />
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-5 bg-black/80 backdrop-blur-md border-b border-[#333]">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#00FF9D] rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-black font-serif">B</span>
          </div>
          <span className="font-serif tracking-widest">BOOP</span>
        </Link>
        <a
          href="#waitlist"
          className="font-mono text-xs text-[#00FF9D] uppercase tracking-widest border border-[#00FF9D]/50 px-5 py-2 rounded-full hover:bg-[#00FF9D]/10 transition-colors"
        >
          Join Waitlist
        </a>
      </nav>

      <section className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-widest text-[#E0E7FF] mb-6">
            BOOP
          </h1>
          <p className="font-mono text-[#00FF9D] uppercase tracking-[0.3em] text-lg mb-8">
            The Waze for Dog Safety
          </p>
          <p className="text-[#E0E7FF]/70 text-lg leading-relaxed max-w-xl mb-6">
            Daily forecasts, danger radar, and neighborhood watch for your furry friend. Know before you go.
          </p>
          <p className="font-mono text-xs text-[#E0E7FF]/40 uppercase tracking-widest mb-6">Tap the phone to try</p>
          <div className="pt-6 border-t border-[#333]">
            <a href="#waitlist" className="inline-flex items-center justify-center font-mono text-xs text-[#00FF9D] uppercase tracking-widest bg-[#00FF9D]/10 border border-[#00FF9D]/60 px-6 py-3 rounded-full hover:bg-[#00FF9D]/20 transition-colors">
              Join Waitlist
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <PhoneMockup variant="iframe">
            <iframe
              src="/"
              title="BOOP App"
              className="w-full h-full border-0 bg-black"
            />
          </PhoneMockup>
        </motion.div>
      </section>

      <Section>
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#00FF9D]/30 rounded-full font-mono text-xs text-[#00FF9D] uppercase tracking-widest mb-6">
            <Compass size={14} />
            Flow 1
          </div>
          <h2 className="font-serif text-3xl md:text-4xl tracking-widest text-[#E0E7FF] mb-6">
            Midnight Oracle
          </h2>
          <p className="text-[#E0E7FF]/70 text-lg leading-relaxed mb-6 max-w-lg">
            Press & hold to divine today's ether. Safe or danger, risk level, temperature—plus MANIFEST and BANISH suggestions. One scan, then Begin Walk.
          </p>
          <ul className="space-y-2 font-mono text-sm text-[#00FF9D]/80">
            <li>+ Daily safety forecast</li>
            <li>+ Moon phase & verdict</li>
            <li>+ One-tap start walk</li>
          </ul>
          <div className="mt-8 pt-6 border-t border-[#333]">
            <a href="#waitlist" className="inline-flex items-center justify-center font-mono text-xs text-[#00FF9D] uppercase tracking-widest bg-[#00FF9D]/10 border border-[#00FF9D]/60 px-6 py-3 rounded-full hover:bg-[#00FF9D]/20 transition-colors">
              Join Waitlist
            </a>
          </div>
        </div>
        <PhoneMockup>
          <ScaledApp>
            <PortalView onStartWalk={() => {}} largeCard />
          </ScaledApp>
        </PhoneMockup>
      </Section>

      <Section reverse>
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#00FF9D]/30 rounded-full font-mono text-xs text-[#00FF9D] uppercase tracking-widest mb-6">
            <Footprints size={14} />
            Flow 2
          </div>
          <h2 className="font-serif text-3xl md:text-4xl tracking-widest text-[#E0E7FF] mb-6">
            StealthBox
          </h2>
          <p className="text-[#E0E7FF]/70 text-lg leading-relaxed mb-6 max-w-lg">
            Timer, distance, danger alerts. Tactical map when needed. Quick actions: mark poop, report hazard, snap photo—no fumbling.
          </p>
          <ul className="space-y-2 font-mono text-sm text-[#00FF9D]/80">
            <li>+ Real-time danger radar</li>
            <li>+ Invisible gesture shortcuts</li>
            <li>+ One-tap report</li>
          </ul>
          <div className="mt-8 pt-6 border-t border-[#333]">
            <a href="#waitlist" className="inline-flex items-center justify-center font-mono text-xs text-[#00FF9D] uppercase tracking-widest bg-[#00FF9D]/10 border border-[#00FF9D]/60 px-6 py-3 rounded-full hover:bg-[#00FF9D]/20 transition-colors">
              Join Waitlist
            </a>
          </div>
        </div>
        <PhoneMockup>
          <ScaledApp>
            <StealthBox
              onEndWalk={() => {}}
              onReport={() => {}}
            />
          </ScaledApp>
        </PhoneMockup>
      </Section>

      <Section>
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#00FF9D]/30 rounded-full font-mono text-xs text-[#00FF9D] uppercase tracking-widest mb-6">
            <Share2 size={14} />
            Flow 3
          </div>
          <h2 className="font-serif text-3xl md:text-4xl tracking-widest text-[#E0E7FF] mb-6">
            Memory Log
          </h2>
          <p className="text-[#E0E7FF]/70 text-lg leading-relaxed mb-6 max-w-lg">
            Post-walk collage: photo, notes, behavioral analysis. Sudden stops, pace drops—AI reads the signs. Share with pack.
          </p>
          <ul className="space-y-2 font-mono text-sm text-[#00FF9D]/80">
            <li>+ Scrapbook-style records</li>
            <li>+ Behavior anomaly detection</li>
            <li>+ Share-ready cards</li>
          </ul>
          <div className="mt-8 pt-6 border-t border-[#333]">
            <a href="#waitlist" className="inline-flex items-center justify-center font-mono text-xs text-[#00FF9D] uppercase tracking-widest bg-[#00FF9D]/10 border border-[#00FF9D]/60 px-6 py-3 rounded-full hover:bg-[#00FF9D]/20 transition-colors">
              Join Waitlist
            </a>
          </div>
        </div>
        <PhoneMockup>
          <ScaledApp>
            <div className="h-full w-full flex flex-col bg-[#1A1A1A] overflow-y-auto px-4 pt-6 pb-8">
              <div className="flex justify-between items-center mb-5 shrink-0">
                <h2 className="font-serif text-2xl tracking-widest text-[#E0E7FF]">MEMORY LOG</h2>
                <span className="font-mono text-sm text-[#00FF9D] uppercase">Close</span>
              </div>
              <div className="bg-[#F5F5F0] text-[#1A1A1A] p-4 rounded -rotate-1 flex-shrink-0">
                <div className="aspect-[4/3] bg-slate-200 mb-3 rounded overflow-hidden">
                  <img src="https://picsum.photos/seed/dogwalk/200/150" alt="" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                </div>
                <p className="font-hand text-xl text-[#2A2A2A] italic mt-2">"Buster sensed the coyote tracks before the radar pinged. Good boy."</p>
                <div className="mt-3 flex gap-4 font-mono text-sm text-[#666]">
                  <span>00:45:12</span>
                  <span>2.4 km</span>
                </div>
              </div>
              <div className="mt-6 p-4 border border-[#333] rounded-xl bg-[#050505] shrink-0">
                <p className="font-mono text-xs text-[#00FF9D] uppercase tracking-widest mb-2">Behavioral Analysis</p>
                <div className="space-y-2">
                  <div>
                    <p className="font-mono text-sm text-[#FF9D00]">Frequent Stops</p>
                    <p className="text-sm text-[#E0E7FF]/70">14 pauses in Sector 4, 300% above baseline</p>
                  </div>
                  <div>
                    <p className="font-mono text-sm text-[#FF003C]">Pace Drops</p>
                    <p className="text-sm text-[#E0E7FF]/70">25% slower in final 10 min</p>
                  </div>
                </div>
              </div>
              <button className="mt-6 py-3 bg-[#00FF9D] text-black font-mono text-base uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shrink-0">
                <Share2 size={20} /> Share with Pack
              </button>
            </div>
          </ScaledApp>
        </PhoneMockup>
      </Section>

      <Section reverse>
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#00FF9D]/30 rounded-full font-mono text-xs text-[#00FF9D] uppercase tracking-widest mb-6">
            <MapPin size={14} />
            Flow 4
          </div>
          <h2 className="font-serif text-3xl md:text-4xl tracking-widest text-[#E0E7FF] mb-6">
            Community Watch
          </h2>
          <p className="text-[#E0E7FF]/70 text-lg leading-relaxed mb-6 max-w-lg">
            Report coyotes, foxtails, hot pavement, toxic algae, poison bait, aggressive dogs. See hazards on tactical map. Pack protects pack.
          </p>
          <ul className="space-y-2 font-mono text-sm text-[#00FF9D]/80">
            <li>+ 6 hazard types</li>
            <li>+ Live tactical map</li>
            <li>+ Trust Score rewards</li>
          </ul>
          <div className="mt-8 pt-6 border-t border-[#333]">
            <a href="#waitlist" className="inline-flex items-center justify-center font-mono text-xs text-[#00FF9D] uppercase tracking-widest bg-[#00FF9D]/10 border border-[#00FF9D]/60 px-6 py-3 rounded-full hover:bg-[#00FF9D]/20 transition-colors">
              Join Waitlist
            </a>
          </div>
        </div>
        <PhoneMockup>
          <ScaledApp>
            <div className="h-full w-full flex flex-col justify-center items-center bg-black px-6 py-8 overflow-y-auto">
              <div className="w-full shrink-0 mb-5">
                <h2 className="text-2xl font-serif tracking-widest text-[#FF003C] uppercase">Report Danger</h2>
                <p className="font-mono text-sm text-[#E0E7FF]/50 mt-1 uppercase">Alert the pack</p>
              </div>
              <div className="bg-[#111] border border-[#333] rounded-xl p-4 flex items-center gap-3 shrink-0 mb-5 w-full">
                <MapPin className="text-[#00FF9D] shrink-0" size={22} />
                <p className="font-mono text-sm text-[#E0E7FF]">Dolores Park, Sector 4</p>
              </div>
              <div className="grid grid-cols-3 gap-3 w-full flex-1 min-h-0 auto-rows-fr">
                {[
                  { icon: Dog, color: "text-[#FF9D00]", name: "Coyote" },
                  { icon: Leaf, color: "text-[#FFD700]", name: "Foxtails" },
                  { icon: ThermometerSun, color: "text-[#FF3C00]", name: "Heat" },
                  { icon: Droplets, color: "text-[#00FF9D]", name: "Algae" },
                  { icon: Skull, color: "text-[#B000FF]", name: "Poison" },
                  { icon: ShieldAlert, color: "text-[#FF003C]", name: "Dog" },
                  { icon: AlertTriangle, color: "text-[#94A3B8]", name: "Glass" },
                  { icon: Bird, color: "text-[#38BDF8]", name: "Wildlife" },
                  { icon: CircleDot, color: "text-[#E0E7FF]", name: "Other" },
                ].map(({ icon: Icon, color, name }, i) => (
                  <button key={i} className="aspect-square rounded-xl p-3 bg-[#050505] flex flex-col items-center justify-center gap-1.5 border border-[#333] hover:border-[#444] min-h-0">
                    <Icon size={24} className={`shrink-0 ${color}`} />
                    <span className="font-mono text-[10px] text-[#E0E7FF] uppercase leading-tight text-center">{name}</span>
                  </button>
                ))}
              </div>
            </div>
          </ScaledApp>
        </PhoneMockup>
      </Section>

      <section id="waitlist" className="relative z-10 py-32 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl tracking-widest text-[#E0E7FF] mb-4">
            Join the Pack
          </h2>
          <p className="text-[#E0E7FF]/70 mb-10">
            Be the first to know when BOOP launches. No spam, just a bark.
          </p>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 px-6 rounded-2xl border border-[#00FF9D]/50 bg-[#00FF9D]/5"
            >
              <p className="font-mono text-[#00FF9D] uppercase tracking-widest">Thanks! We'll be in touch.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-6 py-4 bg-[#111] border border-[#333] rounded-xl font-mono text-[#E0E7FF] placeholder-[#E0E7FF]/30 focus:border-[#00FF9D]/50 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="w-full py-4 bg-[#00FF9D]/10 border border-[#00FF9D]/50 rounded-xl font-mono text-sm text-[#00FF9D] uppercase tracking-widest hover:bg-[#00FF9D]/20 transition-colors"
              >
                Join Waitlist
              </button>
            </form>
          )}
          <Link to="/" className="inline-block mt-8 font-mono text-xs text-[#E0E7FF]/50 uppercase tracking-widest hover:text-[#00FF9D] transition-colors">
            ← Back to App
          </Link>
        </motion.div>
      </section>

      <footer className="relative z-10 py-12 border-t border-[#333] text-center">
        <p className="font-mono text-xs text-[#E0E7FF]/40 uppercase tracking-widest">BOOP · The Waze for Dog Safety</p>
      </footer>
    </div>
  );
}
