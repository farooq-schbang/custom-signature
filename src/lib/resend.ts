import { Resend } from "resend";

export async function sendReceiptEmail({ to, signatureId }: { to: string; signatureId: string }) {
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "CustomSig <onboarding@resend.dev>",
    to,
    subject: "Your signature is ready — payment confirmed",
    html: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;">
        <div style="font-weight:800;font-size:18px;margin-bottom:24px;">Custom<span style="color:#0047FF;">Sig</span></div>
        <h1 style="font-size:20px;margin:0 0 12px;">Payment confirmed ✓</h1>
        <p style="font-size:14px;color:#3f3f46;line-height:1.6;margin:0 0 20px;">
          Thanks for your purchase! Your $8.00 one-time payment went through and your
          email signature is now unlocked. You can copy the HTML anytime from your dashboard.
        </p>
        <a href="${siteUrl}/dashboard" style="display:inline-block;background:#0047FF;color:#ffffff;padding:11px 22px;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">Open your dashboard</a>
        <p style="font-size:12px;color:#a1a1aa;margin-top:28px;">Order reference: ${signatureId}</p>
      </div>
    `,
  });
}
