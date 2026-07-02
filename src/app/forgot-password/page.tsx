"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AuthCard, AuthInput } from "@/components/auth/AuthCard";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setDone(true);
    }
  };

  if (done) {
    return (
      <AuthCard title="Check your email" subtitle={`If an account exists for ${email}, you'll receive a password reset link.`}>
        <a href="/login" className="btn btn-ghost btn-md" style={{ width: "100%", justifyContent: "center" }}>Back to log in</a>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Reset your password" subtitle="Enter your email and we'll send you a reset link.">
      <form onSubmit={handleSubmit}>
        <AuthInput label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
        {error && <p style={{ fontSize: 13, color: "#DC2626", marginBottom: 12 }}>{error}</p>}
        <button type="submit" disabled={loading} className="btn btn-primary btn-md" style={{ width: "100%", justifyContent: "center" }}>
          {loading ? "Sending…" : "Send reset link"}
        </button>
      </form>
      <p style={{ marginTop: 16, fontSize: 13, textAlign: "center" }}>
        <a href="/login" style={{ color: "#0047FF", textDecoration: "none", fontWeight: 600 }}>Back to log in</a>
      </p>
    </AuthCard>
  );
}
