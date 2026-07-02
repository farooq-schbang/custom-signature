import Stripe from "stripe";

// Lazy so builds don't require STRIPE_SECRET_KEY at compile time.
let client: Stripe | null = null;

export function getStripe(): Stripe {
  if (!client) {
    client = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  return client;
}

export const SIGNATURE_PRICE_CENTS = 800;
