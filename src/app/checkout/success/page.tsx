"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AuthCard } from "@/components/auth/AuthCard";

function SuccessContent() {
  const params = useSearchParams();
  const signatureId = params.get("signature_id");
  const [html, setHtml] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const attempts = useRef(0);

  useEffect(() => {
    if (!signatureId) return;
    let stopped = false;

    const poll = async () => {
      if (stopped) return;
      attempts.current += 1;
      try {
        const res = await fetch(`/api/signatures/${signatureId}/export`);
        if (res.ok) {
          const data = await res.json();
          setHtml(data.html);
          return;
        }
      } catch {
        // network hiccup — keep polling
      }
      if (attempts.current >= 20) {
        setTimedOut(true);
        return;
      }
      setTimeout(poll, 2000);
    };
    poll();
    return () => {
      stopped = true;
    };
  }, [signatureId]);

  const handleCopy = async () => {
    if (!html) return;
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  if (!signatureId) {
    return (
      <AuthCard title="Something's missing" subtitle="We couldn't find your signature. Check your dashboard — your purchase is safe.">
        <a href="/dashboard" className="btn btn-primary btn-md" style={{ width: "100%", justifyContent: "center" }}>Go to dashboard</a>
      </AuthCard>
    );
  }

  if (html) {
    return (
      <AuthCard title="🎉 Payment confirmed!" subtitle="Your signature is unlocked. Copy the HTML below and paste it into Gmail, Outlook, or Apple Mail.">
        <button onClick={handleCopy} className="btn btn-primary btn-md" style={{ width: "100%", justifyContent: "center", marginBottom: 10 }}>
          {copied ? "✓ Copied to clipboard!" : "📋 Copy HTML Signature"}
        </button>
        <a href="/dashboard" className="btn btn-ghost btn-md" style={{ width: "100%", justifyContent: "center" }}>Go to dashboard</a>
        <p style={{ fontSize: 12, color: "#a1a1aa", textAlign: "center", marginTop: 14 }}>A receipt has been emailed to you. Re-export anytime from your dashboard.</p>
      </AuthCard>
    );
  }

  if (timedOut) {
    return (
      <AuthCard title="Almost there…" subtitle="Your payment went through, but confirmation is taking longer than usual. Your signature will appear as Paid in your dashboard within a few minutes.">
        <a href="/dashboard" className="btn btn-primary btn-md" style={{ width: "100%", justifyContent: "center" }}>Go to dashboard</a>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Confirming your payment…" subtitle="This usually takes a few seconds. Hang tight.">
      <div style={{ display: "flex", justifyContent: "center", padding: "12px 0" }}>
        <div className="animate-spin-slow" style={{ width: 28, height: 28, borderRadius: "50%", border: "3px solid #EEF2FF", borderTopColor: "#0047FF" }} />
      </div>
    </AuthCard>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
