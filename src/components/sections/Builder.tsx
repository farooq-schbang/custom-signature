"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { createClient } from "@/lib/supabase/client";

const FIELDS = [
  { key: "name", label: "Full Name", placeholder: "Alex Johnson" },
  { key: "title", label: "Job Title", placeholder: "VP of Sales" },
  { key: "company", label: "Company", placeholder: "Acme Corp" },
  { key: "email", label: "Work Email", placeholder: "alex@acme.com" },
  { key: "phone", label: "Phone", placeholder: "+1 (555) 000-0000" },
  { key: "website", label: "Website", placeholder: "https://acme.com" },
];

const COLORS = ["#0047FF","#5E6AD2","#7C3AED","#00A1E0","#059669","#D97706","#DC2626","#FF7A59"];
const TABS = ["Design","Links","Banner","Analytics"];

export function Builder() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [fields, setFields] = useState<Record<string,string>>({ name: "Alex Johnson", title: "VP of Sales", company: "Acme Corp", email: "alex@acme.com", phone: "+1 (555) 012-3456", website: "acme.com" });
  const [color, setColor] = useState("#0047FF");
  const [badge, setBadge] = useState(true);
  const [tab, setTab] = useState("Design");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = (k: string, v: string) => setFields(p => ({ ...p, [k]: v }));

  // Restore a signature the user built before being sent through login.
  useEffect(() => {
    try {
      const stashed = localStorage.getItem("pending_signature");
      if (stashed) {
        const cfg = JSON.parse(stashed);
        if (cfg.fields) setFields(cfg.fields);
        if (cfg.color) setColor(cfg.color);
        if (typeof cfg.badge === "boolean") setBadge(cfg.badge);
        localStorage.removeItem("pending_signature");
      }
    } catch {
      // ignore corrupt stash
    }
  }, []);

  // Free to build, $8 to export: save the signature, then send to Stripe Checkout.
  // The HTML itself is only ever generated server-side after payment.
  const handleGetSignature = async () => {
    setBusy(true);
    setError(null);
    const config = { fields, color, badge };
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        localStorage.setItem("pending_signature", JSON.stringify(config));
        window.location.href = `/login?next=${encodeURIComponent("/#builder")}`;
        return;
      }
      const saveRes = await fetch("/api/signatures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config }),
      });
      if (!saveRes.ok) throw new Error("Could not save your signature. Please try again.");
      const { id } = await saveRes.json();

      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signatureId: id }),
      });
      if (!checkoutRes.ok) throw new Error("Could not start checkout. Please try again.");
      const { url } = await checkoutRes.json();
      window.location.href = url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setBusy(false);
    }
  };

  return (
    <section id="builder" ref={ref} style={{ background: "#fafafa", padding: "100px 0", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <Container>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="tag tag-green" style={{ marginBottom: 16 }}>Live Builder</div>
          <h2 className="t-heading" style={{ color: "#09090b", marginBottom: 12 }}>Your signature. Live. Right now.</h2>
          <p className="t-body" style={{ maxWidth: 400, margin: "0 auto" }}>Type your details and watch your signature build itself. No account needed to start.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 28, alignItems: "start" }} className="grid md:grid-cols-2">
          {/* Editor */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 }}>
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.08)", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              {/* Tab bar */}
              <div style={{ background: "#f9fafb", borderBottom: "1px solid rgba(0,0,0,0.06)", padding: "0 16px", display: "flex" }}>
                {TABS.map(t => (
                  <button key={t} onClick={() => setTab(t)} style={{
                    padding: "11px 14px", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer", background: "transparent",
                    color: tab === t ? "#09090b" : "#a1a1aa",
                    borderBottom: tab === t ? "2px solid #0047FF" : "2px solid transparent",
                    transition: "all 0.15s",
                  }}>{t}</button>
                ))}
              </div>
              <div style={{ padding: 20 }}>
                {/* Color */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Brand Color</div>
                  <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                    {COLORS.map(c => (
                      <button key={c} onClick={() => setColor(c)} style={{ width: 28, height: 28, borderRadius: "50%", background: c, border: c === color ? "3px solid #fff" : "2px solid transparent", outline: c === color ? `2px solid ${c}` : "none", cursor: "pointer", transition: "all 0.15s" }} />
                    ))}
                  </div>
                </div>
                {/* Fields */}
                <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                  {FIELDS.map(f => (
                    <div key={f.key}>
                      <label style={{ fontSize: 11, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 4 }}>{f.label}</label>
                      <input type="text" value={fields[f.key] || ""} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder}
                        style={{ width: "100%", padding: "9px 12px", borderRadius: 8, background: "#fafafa", border: "1px solid rgba(0,0,0,0.1)", color: "#09090b", fontSize: 13, outline: "none", fontFamily: "inherit", transition: "border-color 0.15s" }}
                        onFocus={e => e.target.style.borderColor = color}
                        onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"}
                      />
                    </div>
                  ))}
                </div>
                {/* Badge toggle */}
                <div style={{ marginTop: 16 }}>
                  <button onClick={() => setBadge(b => !b)} style={{
                    display: "flex", alignItems: "center", gap: 8, padding: "8px 13px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit",
                    border: badge ? `1.5px solid ${color}` : "1.5px solid rgba(0,0,0,0.1)",
                    background: badge ? `${color}08` : "transparent",
                    color: badge ? color : "#a1a1aa", fontSize: 13, fontWeight: 600, transition: "all 0.15s",
                  }}>
                    {badge ? "✓" : "○"} Verified Blue Badge
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Preview */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.15 }}>
            <div style={{ position: "sticky", top: 88 }}>
              <div className="email-client">
                <div className="email-titlebar">
                  <div className="mac-dot" style={{ background: "#ff5f57" }} />
                  <div className="mac-dot" style={{ background: "#febc2e" }} />
                  <div className="mac-dot" style={{ background: "#28c840" }} />
                  <div style={{ flex: 1, textAlign: "center", fontSize: 12, color: "#9ca3af" }}>Live Preview</div>
                </div>
                <div style={{ background: "#fff", padding: "12px 18px 20px" }}>
                  <div style={{ padding: "8px 0", borderBottom: "1px solid #f3f4f6", fontSize: 12, color: "#9ca3af" }}>To: <span style={{ color: "#374151" }}>sarah@prospect.com</span></div>
                  <div style={{ padding: "8px 0", borderBottom: "1px solid #f3f4f6", fontSize: 12, color: "#9ca3af" }}>Subject: <span style={{ color: "#09090b", fontWeight: 500 }}>Following up on our call</span></div>
                  <div style={{ padding: "14px 0 0", fontSize: 13, color: "#6b7280", lineHeight: 1.75 }}>
                    <p style={{ color: "#374151" }}>Hi Sarah,</p>
                    <p style={{ margin: "6px 0" }}>Great talking today — excited about what we can build together.</p>
                    <p style={{ marginBottom: 0 }}>Best,</p>
                    {/* Live signature preview */}
                    <motion.div key={color + JSON.stringify(fields)} initial={{ opacity: 0.7 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
                      style={{ borderTop: `2.5px solid ${color}`, paddingTop: 14, marginTop: 4 }}>
                      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${color}, ${color}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, color: "#fff", flexShrink: 0 }}>
                          {(fields.name || "A")[0].toUpperCase()}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 2 }}>
                            <span style={{ fontWeight: 700, fontSize: 13, color: "#111827" }}>{fields.name || "Your Name"}</span>
                            {badge && <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#1d9bf0", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 7 }}>✓</span></div>}
                          </div>
                          <div style={{ fontSize: 11.5, color: "#6b7280", marginBottom: 7 }}>
                            {fields.title || "Your Title"}
                            {fields.company && <> · <span style={{ color, fontWeight: 600 }}>{fields.company}</span></>}
                          </div>
                          {fields.email && <div style={{ fontSize: 10.5, color: "#9ca3af", marginBottom: 3 }}><span style={{ color }}>✉ </span>{fields.email}</div>}
                          {fields.phone && <div style={{ fontSize: 10.5, color: "#9ca3af", marginBottom: 9 }}><span style={{ color }}>☎ </span>{fields.phone}</div>}
                          <div style={{ display: "flex", gap: 4 }}>
                            {[["in","#0077b5"],["𝕏","#111"],["📅",color],["🌐",color]].map(([ic, bg], ii) => (
                              <div key={ii} style={{ width: 21, height: 21, borderRadius: 5, background: bg as string, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#fff" }}>{ic}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <button onClick={handleGetSignature} disabled={busy} className="btn btn-primary btn-md" style={{ flex: 1, justifyContent: "center", borderRadius: 10, transition: "all 0.2s" }}>
                  {busy ? "One moment…" : "Get my signature — $8"}
                </button>
                <a href="/dashboard" className="btn btn-ghost btn-md">My signatures</a>
              </div>
              {error && <p style={{ textAlign: "center", fontSize: 12, color: "#DC2626", marginTop: 8 }}>{error}</p>}
              <p style={{ textAlign: "center", fontSize: 12, color: "#a1a1aa", marginTop: 8 }}>One-time payment · No subscription · Paste into Gmail, Outlook, Apple Mail & any CRM</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
