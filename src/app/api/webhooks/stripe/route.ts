import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendReceiptEmail } from "@/lib/resend";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    if (session.payment_status === "paid") {
      const signatureId = session.metadata?.signature_id;
      const orderId = session.metadata?.order_id;

      if (signatureId && orderId) {
        const admin = createAdminClient();

        // Idempotency: skip if this order was already processed.
        const { data: order } = await admin
          .from("orders")
          .select("id, status, user_id")
          .eq("id", orderId)
          .maybeSingle();

        if (order && order.status !== "paid") {
          await admin
            .from("orders")
            .update({
              status: "paid",
              stripe_payment_intent_id:
                typeof session.payment_intent === "string"
                  ? session.payment_intent
                  : session.payment_intent?.id ?? null,
            })
            .eq("id", orderId);

          await admin.from("signatures").update({ is_paid: true }).eq("id", signatureId);

          // Receipt email — failure must not fail the webhook.
          const email = session.customer_details?.email || session.customer_email;
          if (email) {
            try {
              await sendReceiptEmail({ to: email, signatureId });
            } catch (e) {
              console.error("Receipt email failed:", e);
            }
          }
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
