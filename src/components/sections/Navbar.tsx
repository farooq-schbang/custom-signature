"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "Why Us", href: "#why" },
  { label: "Compare", href: "#compare" },
  { label: "Builder", href: "#builder" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(6,6,15,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        transition: "all 0.3s",
      }}
    >
      <Container>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          {/* Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #2563eb, #1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 18 }}>C</div>
            <span style={{ fontWeight: 700, fontSize: 16, color: "#fff" }}>Custom<span style={{ color: "#60a5fa" }}>Signature</span></span>
          </a>

          {/* Desktop nav */}
          <nav style={{ display: "flex", gap: 32 }} className="hidden md:flex">
            {LINKS.map(l => (
              <a key={l.label} href={l.href} style={{ color: "#9ca3af", fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
                onMouseOver={e => (e.currentTarget.style.color = "#fff")}
                onMouseOut={e => (e.currentTarget.style.color = "#9ca3af")}>
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="hidden md:flex">
            <button className="btn btn-text btn-sm">Log in</button>
            <a href="#builder" className="btn btn-primary btn-sm">Get Started Free</a>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden"
            style={{ padding: 8, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "all 0.3s", transform: open ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <span style={{ display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "all 0.3s", opacity: open ? 0 : 1 }} />
            <span style={{ display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "all 0.3s", transform: open ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            style={{ background: "rgba(6,6,15,0.98)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <Container>
              <div style={{ padding: "16px 0", display: "flex", flexDirection: "column", gap: 0 }}>
                {LINKS.map(l => (
                  <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                    style={{ color: "#9ca3af", fontSize: 15, fontWeight: 500, textDecoration: "none", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    {l.label}
                  </a>
                ))}
                <a href="#builder" className="btn btn-primary btn-md" style={{ marginTop: 16, textAlign: "center", justifyContent: "center" }}>
                  Get Started Free
                </a>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
