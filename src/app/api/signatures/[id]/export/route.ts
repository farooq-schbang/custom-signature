import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateSignatureHTML, type SignatureConfig } from "@/lib/signature-html";

// The paywall gate: returns signature HTML only to the owner, only if paid.
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // RLS also restricts to owner; the explicit filter makes intent clear.
  const { data: signature } = await supabase
    .from("signatures")
    .select("id, config, is_paid")
    .eq("id", id)
    .eq("owner_id", user.id)
    .maybeSingle();

  if (!signature) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (!signature.is_paid) {
    return NextResponse.json({ error: "Payment required" }, { status: 402 });
  }

  const html = generateSignatureHTML(signature.config as SignatureConfig);
  return NextResponse.json({ html });
}
