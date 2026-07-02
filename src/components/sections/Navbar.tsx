"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { createClient } from "@/lib/supabase/client";
import { isDemo, demoGetUser } from "@/lib/demo";

const NAV = [
  { label: "Features", href: "#features" },
  { label: "Examples", href: "#compare" },
  { label: "How It Works", href: "#howitworks" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    if (isDemo) {
      setLoggedIn(!!demoGetUser());
    } else {
      const supabase = createClient();
      supabase.auth.getUser().then(({ data }) => setLoggedIn(!!data.user));
    }
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0)",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "1px solid transparent",
        transition: "all 0.3s",
      }}>
      <Container>
        <div style={{ height: 62, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "#0047FF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 15 }}>C</div>
            <span style={{ fontWeight: 800, fontSize: 15, color: "#09090b", letterSpacing: "-0.02em" }}>Custom<span style={{ color: "#0047FF" }}>Sig</span></span>
          </a>

          {/* Nav */}
          <nav style={{ display: "flex", gap: 2 }} className="hidden md:flex">
            {NAV.map(l => (
              <a key={l.label} href={l.href}
                style={{ padding: "6px 14px", borderRadius: 8, fontSize: 14, fontWeight: 500, color: "#3f3f46", textDecoration: "none", transition: "color 0.15s, background 0.15s" }}
                onMouseOver={e => { e.currentTarget.style.color = "#09090b"; e.currentTarget.style.background = "#f4f4f5"; }}
                onMouseOut={e => { e.currentTarget.style.color = "#3f3f46"; e.currentTarget.style.background = "transparent"; }}
              >{l.label}</a>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {loggedIn ? (
              <a href="/dashboard" className="btn btn-primary btn-sm">Dashboard</a>
            ) : (
              <>
                <a href="/login" className="btn btn-sm hidden md:inline-flex"
                  style={{ color: "#3f3f46", background: "transparent", fontWeight: 500 }}
                  onMouseOver={e => e.currentTarget.style.color = "#09090b"}
                  onMouseOut={e => e.currentTarget.style.color = "#3f3f46"}
                >Log in</a>
                <a href="#builder" className="btn btn-primary btn-sm">Get Started Free</a>
              </>
            )}
          </div>
        </div>
      </Container>
    </motion.header>
  );
}
