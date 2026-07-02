"use client";
import { ReactNode } from "react";

export function AuthCard({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="dot-grid" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px", background: "#fafafa" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 9, justifyContent: "center", marginBottom: 28, textDecoration: "none" }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "#0047FF", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 15 }}>C</div>
          <span style={{ fontWeight: 800, fontSize: 17, color: "#09090b" }}>Custom<span style={{ color: "#0047FF" }}>Sig</span></span>
        </a>
        <div className="card-light" style={{ padding: 28 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#09090b", marginBottom: 6, letterSpacing: "-0.02em" }}>{title}</h1>
          {subtitle && <p className="t-small" style={{ marginBottom: 20 }}>{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}

export function AuthInput(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 5 }}>{label}</label>
      <input {...rest} style={{ width: "100%", padding: "10px 13px", borderRadius: 9, background: "#fafafa", border: "1px solid rgba(0,0,0,0.1)", color: "#09090b", fontSize: 14, outline: "none", fontFamily: "inherit" }} />
    </div>
  );
}

export function GoogleButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className="btn btn-ghost btn-md" style={{ width: "100%", justifyContent: "center", marginBottom: 14 }}>
      <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
      Continue with Google
    </button>
  );
}
