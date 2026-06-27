"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Examples", href: "#compare" },
  { label: "How It Works", href: "#howitworks" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        background: scrolled ? "rgba(2,2,8,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <Container>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          {/* Logo */}
          <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9,
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, color: "#fff", fontSize: 16,
              boxShadow: "0 4px 16px rgba(37,99,235,0.4)",
            }}>C</div>
            <span style={{ fontWeight: 800, fontSize: 15, color: "#fff" }}>
              Custom<span style={{ color: "#60a5fa" }}>Signature</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden md:flex">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} style={{
                padding: "6px 14px", borderRadius: 8, fontSize: 14, fontWeight: 500,
                color: "#94a3b8", textDecoration: "none", transition: "color 0.2s, background 0.2s",
              }}
                onMouseOver={e => { e.currentTarget.style.color = "#e2e8f0"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                onMouseOut={e => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.background = "transparent"; }}
              >{l.label}</a>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="#" style={{ fontSize: 14, fontWeight: 500, color: "#94a3b8", textDecoration: "none", padding: "6px 12px" }}
              onMouseOver={e => e.currentTarget.style.color = "#e2e8f0"}
              onMouseOut={e => e.currentTarget.style.color = "#94a3b8"}
              className="hidden md:block"
            >Log in</a>
            <a href="#builder" className="btn btn-primary btn-sm" style={{ fontSize: 13, padding: "8px 18px" }}>
              Get Started Free
            </a>
          </div>
        </div>
      </Container>
    </motion.header>
  );
}
