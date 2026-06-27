"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SignatureCard } from "@/components/signature/SignatureCard";

const SIGNATURE_EXAMPLES = [
  {
    name: "Chris Evans",
    title: "Financial Analyst",
    company: "Robinhood",
    email: "c.evan@robinhood.com",
    website: "www.robinhood.com",
    accentColor: "#00C805",
    logoText: "🪶 Robinhood",
    tagline: "Finance",
  },
  {
    name: "Kayla Green",
    title: "Dir. Marketing",
    company: "Webflow — Pixel Perfect",
    email: "k.green@webflow.com",
    website: "www.webflow.com",
    accentColor: "#4353FF",
    logoText: "⬡ Webflow",
    tagline: "Design",
  },
  {
    name: "Jessica Brooks",
    title: "Head of Partnerships",
    company: "Zapier",
    email: "j.brooks@zapier.com",
    website: "www.zapier.com",
    accentColor: "#FF4A00",
    logoText: "⚡ Zapier",
    tagline: "Automation",
  },
  {
    name: "Devin Miller",
    title: "Founder",
    company: "Avish Ai",
    email: "d.miller@avishai.com",
    website: "www.avishai.com",
    accentColor: "#F59E0B",
    logoText: "∆ Avish Ai",
    tagline: "AI",
  },
];

const LOGOS = [
  "Goldman Sachs", "McKinsey", "Salesforce", "Microsoft", "Google",
  "Amazon", "JPMorgan", "Deloitte", "Apple", "Meta", "Netflix", "Adobe",
];

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const controls = animate(0, to, {
      duration: 2.5,
      ease: "easeOut",
      onUpdate(v) { node.textContent = Math.round(v) + suffix; },
    });
    return () => controls.stop();
  }, [to, suffix]);
  return <span ref={nodeRef}>0{suffix}</span>;
}

export function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [8, -8]);
  const rotateY = useTransform(mouseX, [-300, 300], [-8, 8]);

  useEffect(() => {
    const timer = setInterval(() => setActiveIdx((i) => (i + 1) % SIGNATURE_EXAMPLES.length), 3000);
    return () => clearInterval(timer);
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }
  function handleMouseLeave() { mouseX.set(0); mouseY.set(0); }

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1d4ed820, transparent)" }}>
      {/* Grid background */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Top rating bar */}
        <div className="flex justify-center pt-28 pb-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6 text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">G2</span>
              <div className="flex">{"★★★★★".split("").map((s, i) => <span key={i} className="text-yellow-400">{s}</span>)}</div>
              <span className="text-gray-400">5.0</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="font-bold" style={{ background: "linear-gradient(90deg,#4285F4,#EA4335,#FBBC05,#34A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>G</span>
              <div className="flex">{"★★★★★".split("").map((s, i) => <span key={i} className="text-yellow-400">{s}</span>)}</div>
              <span className="text-gray-400">5.0</span>
            </div>
          </motion.div>
        </div>

        {/* Main hero content */}
        <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-2 gap-12 items-center flex-1">
          {/* Left column */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Badge icon="⚡">AI-Powered Email Signatures</Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-5xl md:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight"
            >
              Your Email.
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                Their First
              </span>
              <br />
              Impression.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-6 text-lg text-gray-400 leading-relaxed max-w-lg"
            >
              The world&apos;s only AI-generated email signature with interactive nav bar,
              animated brand logo, and GIF product showcase — trusted by Fortune 500 professionals.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-8 flex gap-8"
            >
              {[
                { value: 42, suffix: "%", label: "Higher Reply Rate" },
                { value: 3, suffix: "X", label: "More Link Clicks" },
                { value: 50, suffix: "k+", label: "Users Trust Us" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-black text-white">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button size="lg" href="#builder">
                ✦ Create Your Signature Free
              </Button>
              <Button variant="secondary" size="lg" href="#compare">
                See the Difference →
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-4 text-sm text-gray-600"
            >
              No credit card required · Setup in under 2 minutes
            </motion.p>
          </div>

          {/* Right column — Signature showcase */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ perspective: 1200 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Email mockup */}
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d", background: "rgba(12,12,20,0.95)" }}
              className="rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-white/10"
            >
              {/* Email header */}
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center font-bold text-sm">C</div>
                  <div>
                    <div className="text-white text-sm font-medium">Custom Signature</div>
                    <div className="text-gray-500 text-xs">to: johmsmith@example.com</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs cursor-pointer hover:bg-white/20">↩</div>
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs cursor-pointer hover:bg-white/20">🗑</div>
                </div>
              </div>

              {/* Email body */}
              <div className="px-5 py-4">
                <p className="text-gray-400 text-sm mb-3">Hey John,</p>
                <div className="space-y-1.5 mb-3">
                  <div className="h-2 bg-white/10 rounded w-4/5" />
                  <div className="h-2 bg-white/10 rounded w-3/5" />
                </div>
                <p className="text-gray-400 text-sm mb-4">Best,</p>

                {/* Signature cards carousel */}
                <div className="relative">
                  {SIGNATURE_EXAMPLES.map((sig, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        opacity: i === activeIdx ? 1 : 0,
                        scale: i === activeIdx ? 1 : 0.95,
                      }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                      style={{ pointerEvents: i === activeIdx ? "auto" : "none" }}
                    >
                      {i === activeIdx && <SignatureCard data={sig} active />}
                    </motion.div>
                  ))}
                  {/* Placeholder height */}
                  <div className="opacity-0 pointer-events-none">
                    <SignatureCard data={SIGNATURE_EXAMPLES[0]} />
                  </div>
                </div>

                {/* Signature dots */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-10 h-6 rounded-full transition-all duration-300 relative cursor-pointer"
                      style={{ background: "#2563eb" }}
                    >
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                    <span className="text-gray-400 text-xs">Custom Signature</span>
                  </div>
                  <div className="flex gap-1.5">
                    {SIGNATURE_EXAMPLES.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIdx(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeIdx ? "bg-blue-400 w-4" : "bg-white/30"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Logo marquee */}
        <div className="border-t border-white/10 py-6 overflow-hidden">
          <p className="text-center text-xs text-gray-600 uppercase tracking-widest mb-4">Trusted by teams at</p>
          <div className="flex">
            <div className="flex gap-12 animate-marquee whitespace-nowrap">
              {[...LOGOS, ...LOGOS].map((logo, i) => (
                <span key={i} className="text-gray-600 font-semibold text-sm">{logo}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
