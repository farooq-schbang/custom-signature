"use client";
import { motion } from "framer-motion";

interface SignatureData {
  name: string;
  title: string;
  company: string;
  email: string;
  website: string;
  accentColor: string;
  logoText: string;
  tagline?: string;
}

const SOCIALS = [
  { label: "Web", icon: "🌐" },
  { label: "IG", icon: "📸" },
  { label: "LI", icon: "💼" },
  { label: "FB", icon: "📘" },
  { label: "YT", icon: "▶️" },
];

export function SignatureCard({ data, active = false }: { data: SignatureData; active?: boolean }) {
  return (
    <motion.div
      className={`rounded-2xl overflow-hidden ${active ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/30" : "opacity-80"}`}
      style={{ background: "rgba(10,10,20,0.95)", minWidth: 340 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex h-full">
        {/* Social sidebar */}
        <div className="flex flex-col items-center justify-center gap-3 px-3 py-4 border-r border-white/10">
          {SOCIALS.map((s) => (
            <div key={s.label} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs cursor-pointer hover:bg-blue-600/50 transition-colors">
              {s.icon}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 flex gap-4">
          <div className="flex-1">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-3">
              <div
                className="text-lg font-black tracking-tight"
                style={{ color: data.accentColor }}
              >
                {data.logoText}
              </div>
            </div>

            {/* Name & title */}
            <div className="mb-2">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white text-sm">{data.name}</span>
                <span className="text-blue-400 text-xs">✓</span>
              </div>
              <div className="text-gray-400 text-xs">{data.title}</div>
            </div>

            {/* Details */}
            <div className="space-y-0.5 text-xs text-gray-400">
              <div style={{ color: data.accentColor }}>{data.company}</div>
              <div>{data.email}</div>
              <div>{data.website}</div>
            </div>

            {/* Calendar CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-3 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: data.accentColor, color: "#fff" }}
            >
              📅 Book a Meeting
            </motion.button>
          </div>

          {/* Photo area */}
          <div className="w-20 flex-shrink-0">
            <div className="w-20 h-24 rounded-lg overflow-hidden relative"
              style={{ background: `linear-gradient(135deg, ${data.accentColor}33, ${data.accentColor}11)` }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                  {data.name.charAt(0)}
                </div>
              </div>
              {/* Diagonal slash overlay */}
              <div className="absolute inset-0" style={{
                background: `repeating-linear-gradient(45deg, transparent, transparent 8px, ${data.accentColor}15 8px, ${data.accentColor}15 10px)`
              }} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
