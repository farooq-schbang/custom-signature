// Canonical email-signature HTML generator. Server-only: the client never
// receives this output until the signature is paid (see /api/signatures/[id]/export).

export interface SignatureConfig {
  fields: {
    name?: string;
    title?: string;
    company?: string;
    email?: string;
    phone?: string;
    website?: string;
  };
  color?: string;
  badge?: boolean;
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function generateSignatureHTML(config: SignatureConfig): string {
  const f = config.fields || {};
  const color = config.color || "#0047FF";
  const name = esc(f.name || "");
  const title = esc(f.title || "");
  const company = esc(f.company || "");
  const email = esc(f.email || "");
  const phone = esc(f.phone || "");
  const website = esc(f.website || "");
  const initial = (name || "A")[0].toUpperCase();

  const badgeHtml = config.badge
    ? `<span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:#1d9bf0;color:#ffffff;font-size:9px;line-height:14px;text-align:center;vertical-align:middle;margin-left:5px;">&#10003;</span>`
    : "";

  const websiteHref = website.startsWith("http") ? website : `https://${website}`;

  return `<!-- CustomSig signature -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <tr>
    <td style="border-top:2.5px solid ${color};padding-top:14px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="vertical-align:top;padding-right:12px;">
            <div style="width:44px;height:44px;border-radius:50%;background:${color};color:#ffffff;font-weight:800;font-size:16px;text-align:center;line-height:44px;">${initial}</div>
          </td>
          <td style="vertical-align:top;">
            <div style="font-weight:700;font-size:14px;color:#111827;">${name}${badgeHtml}</div>
            <div style="font-size:12px;color:#6b7280;margin:2px 0 7px;">${title}${company ? ` &middot; <span style="color:${color};font-weight:600;">${company}</span>` : ""}</div>
            ${email ? `<div style="font-size:11px;margin-bottom:2px;"><a href="mailto:${email}" style="color:#6b7280;text-decoration:none;"><span style="color:${color};">&#9993;</span> ${email}</a></div>` : ""}
            ${phone ? `<div style="font-size:11px;margin-bottom:2px;color:#6b7280;"><span style="color:${color};">&#9742;</span> ${phone}</div>` : ""}
            ${website ? `<div style="font-size:11px;"><a href="${websiteHref}" style="color:#6b7280;text-decoration:none;"><span style="color:${color};">&#127760;</span> ${website}</a></div>` : ""}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- End CustomSig signature -->`;
}
