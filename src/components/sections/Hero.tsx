"use client";
import { motion, useMotionValue, useTransform, animate, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const SIGNATURES = [
  {
    name: "Sarah Chen",
    title: "VP of Marketing",
    company: "Stripe",
    email: "sarah.chen@stripe.com",
    website: "stripe.com",
    color: "#635BFF",
    logo: "S",
    cal: "Book a Demo",
    tag: "Fintech",
  },
  {
    name: "Marcus Rivera",
    title: "Head of Growth",
    company: "Linear",
    email: "marcus@linear.app",
    website: "linear.app",
    color: "#5E6AD2",
    logo: "L",
    cal: "Schedule Call",
    tag: "SaaS",
  },
  {
    name: "Priya Kapoor",
    title: "Chief Revenue Officer",
    company: "Notion",
    email: "priya@notion.so",
    website: "notion.so",
    color: "#000000",
    logo: "N",
    cal: "Book Meeting",
    tag: "Productivity",
  },
  {
    name: "James Wilson",
    title: "Director of Sales",
    company: "Figma",
    email: "j.wilson@figma.com",
    website: "figma.com",
    color: "#F24E1E",
    logo: "F",
    cal: "Book a Call",
    tag: "Design",
  },
];

const LOGOS = [
  "Goldman Sachs", "McKinsey & Co.", "Salesforce", "Microsoft", "Google",
  "Amazon", "JPMorgan", "Deloitte", "Apple", "Meta", "Netflix", "Adobe",
  "Stripe", "Notion", "Linear", "Figma",
];

function SocialIcon({ icon }: { icon: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.2, backgroundColor: "rgba(99,102,241,0.3)" }}
      className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-colors"
      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <span className="text-xs">{icon}</span>
    </motion.div>
  );
}

function SignaturePreview({ sig, visible }: { sig: typeof SIGNATURES[0]; visible: boolean }) {
  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 10 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <div className="flex h-full min-h-[120px]" style={{ background: "rgba(8,8,18,0.98)" }}>
        {/* Social sidebar */}
        <div className="flex flex-col items-center gap-2 px-3 py-4 border-r border-white/8">
          <SocialIcon icon="🌐" />
          <SocialIcon icon="in" />
          <SocialIcon icon="▶" />
          <SocialIcon icon="𝕏" />
          <SocialIcon icon="📸" />
        </div>

        {/* Main content */}
        <div className="flex flex-1 items-center gap-4 px-4 py-4">
          <div className="flex-1 min-w-0">
            {/* Company logo row */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-5 h-5 rounded flex items-center justify-center text-xs font-black text-white"
                style={{ background: sig.color === "#000000" ? "#333" : sig.color }}>
                {sig.logo}
              </div>
              <span className="text-xs font-bold tracking-wide" style={{ color: sig.color === "#000000" ? "#aaa" : sig.color }}>
                {sig.company}
              </span>
              <span className="text-blue-400 text-xs ml-0.5">✓</span>
            </div>

            {/* Name */}
            <div className="text-white font-bold text-sm mb-0.5">{sig.name}</div>
            <div className="text-gray-400 text-xs mb-3">{sig.title}</div>

            {/* Contact */}
            <div className="space-y-1 text-xs mb-3">
              <div className="text-gray-500 flex items-center gap-1.5">
                <span style={{ color: sig.color === "#000000" ? "#888" : sig.color }}>✉</span>
                {sig.email}
              </div>
              <div className="text-gray-500 flex items-center gap-1.5">
                <span style={{ color: sig.color === "#000000" ? "#888" : sig.color }}>⌂</span>
                {sig.website}
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white"
              style={{ background: sig.color === "#000000" ? "#333" : sig.color }}
            >
              📅 {sig.cal}
            </motion.button>
          </div>

          {/* Photo with animated GIF badge */}
          <div className="flex-shrink-0">
            <div className="relative w-20 h-24 rounded-xl overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${sig.color === "#000000" ? "#222" : sig.color + "40"}, rgba(0,0,0,0.6))` }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-xl text-white/80"
                  style={{ background: sig.color === "#000000" ? "rgba(255,255,255,0.1)" : sig.color + "40" }}>
                  {sig.name.charAt(0)}
                </div>
              </div>
              {/* Diagonal pattern */}
              <div className="absolute inset-0 opacity-30"
                style={{ background: `repeating-linear-gradient(45deg, transparent, transparent 4px, ${sig.color === "#000000" ? "#fff" : sig.color}18 4px, ${sig.color === "#000000" ? "#fff" : sig.color}18 6px)` }}
              />
              {/* GIF badge */}
              <div className="absolute bottom-1.5 right-1.5 bg-black/60 rounded px-1 py-0.5 text-xs font-bold text-white/70 border border-white/10" style={{ fontSize: 8 }}>
                GIF
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const c = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate(v) { node.textContent = Math.round(v) + suffix; },
    });
    return () => c.stop();
  }, [to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

export function Hero() {
  const [active, setActive] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(useTransform(mouseX, [-400, 400], [-6, 6]), { stiffness: 80, damping: 20 });
  const springY = useSpring(useTransform(mouseY, [-400, 400], [6, -6]), { stiffness: 80, damping: 20 });

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % SIGNATURES.length), 3500);
    return () => clearInterval(t);
  }, []);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - r.left - r.width / 2);
    mouseY.set(e.clientY - r.top - r.height / 2);
  }

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: "#040409" }}>
      {/* Background layers */}
      <div className="absolute inset-0 grid-pattern opacity-100" />
      <div className="orb absolute -top-32 left-1/3 w-[600px] h-[400px]" style={{ background: "rgba(37,99,235,0.12)" }} />
      <div className="orb absolute top-1/2 -right-32 w-[400px] h-[400px]" style={{ background: "rgba(124,58,237,0.08)" }} />
      <div className="orb absolute bottom-0 left-0 w-[500px] h-[300px]" style={{ background: "rgba(6,182,212,0.06)" }} />

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Social proof badge */}
        <div className="flex justify-center pt-28 pb-2">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-5 px-5 py-2.5 rounded-full text-sm"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-xs tracking-wider">G2</span>
              <div className="flex gap-0.5">
                {"★★★★★".split("").map((s, i) => <span key={i} className="text-yellow-400 text-xs">{s}</span>)}
              </div>
              <span className="text-gray-500 text-xs">5.0</span>
            </div>
            <div className="w-px h-3 bg-white/15" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs" style={{ background: "linear-gradient(90deg,#4285F4,#EA4335,#FBBC05,#34A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>G</span>
              <div className="flex gap-0.5">
                {"★★★★★".split("").map((s, i) => <span key={i} className="text-yellow-400 text-xs">{s}</span>)}
              </div>
              <span className="text-gray-500 text-xs">5.0</span>
            </div>
            <div className="w-px h-3 bg-white/15" />
            <span className="text-gray-400 text-xs">Trusted by <span className="text-white font-semibold">50,000+</span> professionals</span>
          </motion.div>
        </div>

        {/* Main grid */}
        <div className="max-w-7xl mx-auto w-full px-6 py-10 grid lg:grid-cols-[1fr_1fr] gap-16 items-center flex-1">

          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)", color: "#60a5fa" }}
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"
              />
              World&apos;s Most Advanced Email Signature Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-5xl md:text-6xl xl:text-[72px] font-black leading-[1.04] tracking-[-0.03em] mb-6"
            >
              Your Email
              <br />
              <span style={{ background: "linear-gradient(135deg, #60a5fa 0%, #34d399 60%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Their First
              </span>
              <br />
              Impression.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-lg text-gray-400 leading-relaxed max-w-lg mb-8"
            >
              The only AI-powered email signature with interactive social nav, animated brand logo,
              GIF product showcase, and one-click calendar booking — trusted by Fortune 500 professionals.
            </motion.p>

            {/* Stats inline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex gap-6 mb-10"
            >
              {[
                { n: 42, s: "%", l: "Higher Reply Rate" },
                { n: 3, s: "×", l: "More Link Clicks" },
                { n: 50, s: "k+", l: "Active Users" },
              ].map((st) => (
                <div key={st.l}>
                  <div className="text-2xl font-black text-white tracking-tight">
                    <CountUp to={st.n} suffix={st.s} />
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{st.l}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap gap-4 mb-5"
            >
              <motion.a
                href="#builder"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-white text-base cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  boxShadow: "0 0 32px rgba(37,99,235,0.4), 0 4px 16px rgba(0,0,0,0.3)",
                }}
              >
                <span>✦</span> Create Your Signature Free
              </motion.a>
              <motion.a
                href="#compare"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-white text-base cursor-pointer"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)" }}
              >
                See the Difference →
              </motion.a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-sm text-gray-600"
            >
              No credit card required &nbsp;·&nbsp; Setup in under 2 minutes &nbsp;·&nbsp; Works with Gmail, Outlook & 1000+ apps
            </motion.p>
          </div>

          {/* Right — Email mockup */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 1200 }}
            onMouseMove={onMouseMove}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
          >
            <motion.div
              style={{ rotateY: springX, rotateX: springY, transformStyle: "preserve-3d" }}
              className="relative rounded-2xl overflow-hidden animate-glow-pulse"
            >
              <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(10,10,22,0.98)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)" }}>
                {/* Email client chrome */}
                <div className="px-5 py-3.5 border-b border-white/8 flex items-center justify-between" style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/70" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                      <div className="w-3 h-3 rounded-full bg-green-500/70" />
                    </div>
                    <span className="text-gray-600 text-xs ml-2">Gmail — New Message</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white/6 flex items-center justify-center text-gray-500 text-xs hover:bg-white/10 transition-colors cursor-pointer">↩</div>
                    <div className="w-7 h-7 rounded-lg bg-white/6 flex items-center justify-center text-gray-500 text-xs hover:bg-white/10 transition-colors cursor-pointer">🗑</div>
                  </div>
                </div>

                {/* Email fields */}
                <div className="px-5 pt-4 pb-3 border-b border-white/6 space-y-2">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-gray-600 w-12">From</span>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center text-white text-xs font-bold">C</div>
                      <span className="text-gray-300">CustomSignature &lt;hello@customsig.com&gt;</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-gray-600 w-12">To</span>
                    <span className="text-gray-400">john.smith@fortune500.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-gray-600 w-12">Subject</span>
                    <span className="text-white font-medium">Following up on our partnership discussion</span>
                  </div>
                </div>

                {/* Email body */}
                <div className="px-5 pt-4 pb-5">
                  <p className="text-gray-400 text-sm mb-2">Hi John,</p>
                  <div className="space-y-1.5 mb-2">
                    <div className="h-2 bg-white/8 rounded-full w-5/6" />
                    <div className="h-2 bg-white/8 rounded-full w-4/6" />
                    <div className="h-2 bg-white/8 rounded-full w-3/6" />
                  </div>
                  <p className="text-gray-400 text-sm mt-3 mb-4">Warm regards,</p>

                  {/* Separator */}
                  <div className="h-px bg-white/8 mb-4" />

                  {/* Signature carousel */}
                  <div className="relative" style={{ minHeight: 140 }}>
                    {SIGNATURES.map((sig, i) => (
                      <SignaturePreview key={i} sig={sig} visible={i === active} />
                    ))}
                    {/* Spacer for height */}
                    <div className="opacity-0 pointer-events-none">
                      <SignaturePreview sig={SIGNATURES[0]} visible={false} />
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/8">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-5 rounded-full relative cursor-pointer" style={{ background: "#2563eb" }}>
                        <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow" />
                      </div>
                      <span className="text-gray-500 text-xs">Signature active</span>
                    </div>
                    {/* Dots */}
                    <div className="flex gap-1.5">
                      {SIGNATURES.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActive(i)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "bg-blue-400 w-5" : "bg-white/25 w-1.5"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating tag */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg"
                style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)", boxShadow: "0 4px 16px rgba(37,99,235,0.4)" }}
              >
                {SIGNATURES[active].tag}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Logo strip */}
        <div className="border-t border-white/6 py-6 overflow-hidden">
          <p className="text-center text-xs text-gray-600 uppercase tracking-[0.2em] mb-5">Trusted by professionals at</p>
          <div className="flex overflow-hidden">
            <div className="flex gap-14 animate-marquee whitespace-nowrap">
              {[...LOGOS, ...LOGOS].map((logo, i) => (
                <span key={i} className="text-gray-600 font-semibold text-sm hover:text-gray-400 transition-colors cursor-default">{logo}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
