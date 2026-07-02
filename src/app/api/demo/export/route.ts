import { NextRequest, NextResponse } from "next/server";
import { generateSignatureHTML, type SignatureConfig } from "@/lib/signature-html";

// Demo-mode only: generates signature HTML without auth/payment.
// Hard-disabled unless NEXT_PUBLIC_DEMO_MODE=1, so it cannot leak the
// paywalled generator in production.
export async function POST(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_DEMO_MODE !== "1") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  try {
    const { config } = await req.json();
    if (!config) return NextResponse.json({ error: "config required" }, { status: 400 });
    return NextResponse.json({ html: generateSignatureHTML(config as SignatureConfig) });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
