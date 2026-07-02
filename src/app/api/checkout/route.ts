import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getStripe, SIGNATURE_PRICE_CENTS } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: { signatureId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body.signatureId) {
    return NextResponse.json({ error: "signatureId is required" }, { status: 400 });
  }

  const { data: signature } = await supabase
    .from("signatures")
    .select("id, is_paid")
    .eq("id", body.signatureId)
    .eq("owner_id", user.id)
    .maybeSingle();
  if (!signature) {
    return NextResponse.json({ error: "Signature not found" }, { status: 404 });
  }
  if (signature.is_paid) {
    return NextResponse.json({ error: "Signature is already paid" }, { status: 409 });
  }

  const admin = createAdminClient();
  const { data: order, error: orderError } = await admin
    .from("orders")
    .insert({ user_id: user.id, signature_id: signature.id, amount: SIGNATURE_PRICE_CENTS })
    .select("id")
    .single();
  if (orderError || !order) {
    return NextResponse.json({ error: "Could not create order" }, { status: 500 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    customer_email: user.email ?? undefined,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: SIGNATURE_PRICE_CENTS,
          product_data: {
            name: "Custom Email Signature",
            description: "One-time purchase — unlock HTML export for one signature.",
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      signature_id: signature.id,
      order_id: order.id,
      user_id: user.id,
    },
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&signature_id=${signature.id}`,
    cancel_url: `${siteUrl}/#builder`,
  });

  await admin
    .from("orders")
    .update({ stripe_checkout_session_id: session.id })
    .eq("id", order.id);

  return NextResponse.json({ url: session.url });
}
