"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { demoMarkPaid } from "@/lib/demo";

// Simulated Stripe Checkout page (demo mode only).
function DemoCheckout() {
  const router = useRouter();
  const params = useSearchParams();
  const signatureId = params.get("signature_id");
  const [paying, setPaying] = useState(false);

  const handlePay = () => {
    if (!signatureId) return;
    setPaying(true);
    setTimeout(() => {
      demoMarkPaid(signatureId);
      router.push(`/checkout/success?signature_id=${signatureId}`);
    }, 1400);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f6f8fa", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "inherit" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", color: "#D97706", borderRadius: 10, padding: "10px 14px", fontSize: 13, fontWeight: 600, marginBottom: 16, textAlign: "center" }}>
          🧪 DEMO MODE — simulated Stripe Checkout, no real payment
        </div>
        <div style={{ background: "#fff", borderRadius: 14, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", padding: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: "#09090b" }}>Custom Email Signature</span>
            <span style={{ fontWeight: 800, fontSize: 18, color: "#09090b" }}>$8.00</span>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#71717a", display: "block", marginBottom: 5 }}>Card number</label>
            <input readOnly value="4242 4242 4242 4242" style={{ width: "100%", padding: "10px 13px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 14, color: "#09090b", background: "#fafafa" }} />
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#71717a", display: "block", marginBottom: 5 }}>Expiry</label>
              <input readOnly value="12 / 30" style={{ width: "100%", padding: "10px 13px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 14, color: "#09090b", background: "#fafafa" }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#71717a", display: "block", marginBottom: 5 }}>CVC</label>
              <input readOnly value="424" style={{ width: "100%", padding: "10px 13px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 14, color: "#09090b", background: "#fafafa" }} />
            </div>
          </div>
          <button onClick={handlePay} disabled={paying || !signatureId} style={{ width: "100%", padding: "12px 0", borderRadius: 10, border: "none", background: "#0047FF", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>
            {paying ? "Processing…" : "Pay $8.00"}
          </button>
          <a href="/#builder" style={{ display: "block", textAlign: "center", marginTop: 14, fontSize: 13, color: "#71717a", textDecoration: "none" }}>← Cancel and go back</a>
        </div>
      </div>
    </div>
  );
}

export default function DemoCheckoutPage() {
  return (
    <Suspense>
      <DemoCheckout />
    </Suspense>
  );
}
