export const dynamic = "force-static";
import { NextRequest, NextResponse } from "next/server";

interface SignatureRequest {
  name: string;
  title: string;
  company: string;
  email: string;
  website: string;
  calendly?: string;
  accentColor?: string;
  socials?: {
    website?: string;
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    youtube?: string;
  };
  gifUrl?: string;
}

function generateSignatureHTML(data: SignatureRequest): string {
  const color = data.accentColor || "#2563eb";
  const socials = data.socials || {};

  const socialLinks = [
    socials.website && `<a href="${socials.website}" style="display:block;width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,0.1);text-align:center;line-height:24px;text-decoration:none;font-size:12px;margin-bottom:6px;" title="Website">🌐</a>`,
    socials.instagram && `<a href="${socials.instagram}" style="display:block;width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,0.1);text-align:center;line-height:24px;text-decoration:none;font-size:12px;margin-bottom:6px;" title="Instagram">📸</a>`,
    socials.linkedin && `<a href="${socials.linkedin}" style="display:block;width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,0.1);text-align:center;line-height:24px;text-decoration:none;font-size:12px;margin-bottom:6px;" title="LinkedIn">💼</a>`,
    socials.facebook && `<a href="${socials.facebook}" style="display:block;width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,0.1);text-align:center;line-height:24px;text-decoration:none;font-size:12px;margin-bottom:6px;" title="Facebook">📘</a>`,
    socials.youtube && `<a href="${socials.youtube}" style="display:block;width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,0.1);text-align:center;line-height:24px;text-decoration:none;font-size:12px;" title="YouTube">▶️</a>`,
  ].filter(Boolean).join("");

  const gifBlock = data.gifUrl
    ? `<img src="${data.gifUrl}" width="80" height="80" style="border-radius:8px;object-fit:cover;" alt="Product showcase" />`
    : "";

  const calendarBlock = data.calendly
    ? `<a href="${data.calendly}" style="display:inline-block;margin-top:8px;padding:5px 14px;background:${color};color:#ffffff;border-radius:20px;text-decoration:none;font-size:11px;font-weight:600;font-family:sans-serif;">📅 Book a Meeting</a>`
    : "";

  return `<!-- Custom Signature by CustomSignature.com -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:13px;max-width:480px;">
  <tr>
    <td style="vertical-align:middle;padding-right:10px;border-right:2px solid rgba(255,255,255,0.1);">
      ${socialLinks}
    </td>
    <td style="vertical-align:top;padding-left:12px;padding-right:12px;">
      <div style="color:${color};font-weight:700;font-size:14px;margin-bottom:4px;">${data.company}</div>
      <div style="color:#ffffff;font-weight:700;font-size:14px;margin-bottom:2px;">
        ${data.name} <span style="color:#1d9bf0;font-size:11px;">✓</span>
      </div>
      <div style="color:#9ca3af;font-size:12px;margin-bottom:6px;">${data.title}</div>
      <div style="color:#6b7280;font-size:11px;margin-bottom:2px;">
        <a href="mailto:${data.email}" style="color:#6b7280;text-decoration:none;">${data.email}</a>
      </div>
      <div style="color:#6b7280;font-size:11px;">
        <a href="https://${data.website}" style="color:#6b7280;text-decoration:none;">${data.website}</a>
      </div>
      ${calendarBlock}
    </td>
    ${gifBlock ? `<td style="vertical-align:middle;padding-left:8px;">${gifBlock}</td>` : ""}
  </tr>
</table>
<!-- End Custom Signature -->`;
}

export async function POST(req: NextRequest) {
  try {
    const body: SignatureRequest = await req.json();

    if (!body.name || !body.email || !body.company) {
      return NextResponse.json({ error: "name, email, and company are required" }, { status: 400 });
    }

    const html = generateSignatureHTML(body);

    return NextResponse.json({
      success: true,
      html,
      preview: {
        name: body.name,
        title: body.title,
        company: body.company,
        email: body.email,
        website: body.website,
        accentColor: body.accentColor || "#2563eb",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to generate signature" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Custom Signature API",
    version: "1.0.0",
    endpoints: {
      "POST /api/generate-signature": "Generate HTML email signature",
      "POST /api/contact": "Contact form submission",
      "POST /api/subscribe": "Newsletter subscription",
    },
  });
}
