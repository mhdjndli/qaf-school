import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { upsertCampEnrolment } from "@/lib/store";

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secretKey || !webhookSecret) {
    return NextResponse.json({ error: "Not configured." }, { status: 503 });
  }

  const stripe = new Stripe(secretKey);
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const payload = await req.text();
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    console.error("stripe-webhook signature error:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    if (
      session.metadata?.program === "sunday-camp" &&
      session.payment_status === "paid"
    ) {
      const childField = session.custom_fields?.find(
        (f) => f.key === "child_name",
      );
      try {
        await upsertCampEnrolment({
          parentName: session.customer_details?.name ?? "Unknown",
          email: session.customer_details?.email ?? "unknown",
          phone: session.customer_details?.phone ?? null,
          childName: childField?.text?.value ?? null,
          plan: session.metadata.plan === "annual" ? "annual" : "monthly",
          amountCents: session.amount_total ?? 0,
          currency: (session.currency ?? "cad").toUpperCase(),
          stripeSessionId: session.id,
          stripeSubscriptionId:
            typeof session.subscription === "string"
              ? session.subscription
              : (session.subscription?.id ?? null),
        });
      } catch (err) {
        console.error("stripe-webhook store error:", err);
        return NextResponse.json({ error: "Store failed." }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
