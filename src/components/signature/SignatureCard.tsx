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

export function SignatureCard({ data, active = false }: { data: SignatureData; active?: boolean }) {
  const c = data.accentColor;

  return (
    <motion.div
      className="rounded-xl overflow-hidden"
      style={{
        background: "rgba(8,8,18,0.98)",
        border: active ? `1px solid ${c}50` : "1px solid rgba(255,255,255,0.08)",
        boxShadow: active ? `0 0 32px ${c}25, 0 8px 32px rgba(0,0,0,0.4)` : "0 4px 24px rgba(0,0,0,0.3)",
        minWidth: 340,
      }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex">
        {/* Colored left accent bar */}
        <div className="w-1 flex-shrink-0" style={{ background: `linear-gradient(180deg, ${c}, ${c}40)` }} />

        {/* Social sidebar */}
        <div className="flex flex-col items-center gap-2.5 px-2.5 py-4 border-r border-white/6">
          {["🌐", "in", "▶", "𝕏", "📸"].map((icon, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.2, backgroundColor: `${c}30` }}
              className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-colors text-xs"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {icon}
            </motion.div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex flex-1 items-center gap-4 px-4 py-4">
          <div className="flex-1 min-w-0">
            {/* Logo row */}
            <div className="flex items-center gap-2 mb-2.5">
              <span className="font-black text-sm tracking-tight" style={{ color: c }}>{data.logoText}</span>
              <span className="text-blue-400 text-xs">✓</span>
            </div>

            {/* Name */}
            <div className="text-white font-bold text-sm mb-0.5">{data.name}</div>
            <div className="text-gray-400 text-xs mb-3">{data.title}</div>

            {/* Contact */}
            <div className="text-xs space-y-1 mb-3">
              <div className="text-gray-500">{data.email}</div>
              <div className="text-gray-500">{data.website}</div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white"
              style={{ background: c }}
            >
              📅 Book a Meeting
            </motion.button>
          </div>

          {/* Photo area */}
          <div className="w-[72px] h-[88px] rounded-xl overflow-hidden relative flex-shrink-0"
            style={{ background: `linear-gradient(145deg, ${c}35, ${c}08)` }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-lg"
                style={{ background: `${c}30`, color: c }}>
                {data.name.charAt(0)}
              </div>
            </div>
            <div className="absolute inset-0 opacity-20"
              style={{ background: `repeating-linear-gradient(45deg, transparent, transparent 5px, ${c}30 5px, ${c}30 6px)` }}
            />
            <div className="absolute bottom-1.5 right-1.5 bg-black/50 rounded px-1 py-0.5 text-white/60 border border-white/10"
              style={{ fontSize: 7, fontWeight: 700, letterSpacing: "0.05em" }}>
              GIF
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
