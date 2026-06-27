"use client";
import { motion } from "framer-motion";

const LINKS = {
  Product: ["Features", "Pricing", "Builder", "Templates", "Integrations", "API"],
  Company: ["About", "Blog", "Careers", "Press Kit", "Partners"],
  Support: ["Help Center", "Contact Us", "Status", "Privacy Policy", "Terms of Service"],
  Enterprise: ["Fortune 500 Solutions", "Team Management", "Security", "Compliance", "White-label"],
};

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-16" style={{ background: "rgba(2,2,8,0.95)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center font-black text-white text-lg">C</div>
              <span className="font-bold text-white">Custom<span className="text-blue-400">Signature</span></span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              The world&apos;s most advanced AI-generated email signature platform for Fortune 500 professionals.
            </p>
            <div className="flex gap-3">
              {["🌐", "📸", "💼", "📘", "▶️"].map((icon, i) => (
                <motion.button key={i} whileHover={{ scale: 1.2 }}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm hover:bg-blue-600/50 transition-colors">
                  {icon}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <div className="text-white font-semibold text-sm mb-4">{category}</div>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-600 text-sm">
            © 2025 Custom Signature. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span>Made with ❤️ for Fortune 500 professionals</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
