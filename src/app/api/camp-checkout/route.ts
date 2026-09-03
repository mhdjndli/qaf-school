import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const PLANS = {
  monthly: {
    mode: "subscription" as const,
    lineItem: {
      price_data: {
        currency: "cad",
        unit_amount: 19000,
        recurring: { interval: "month" as const },
        product_data: {
          name: "QAF Sunday Camp — Monthly",
          description:
            "Sundays 11 AM–3 PM · Quran, Arabic, Math & STEM, soccer · Ages 8–15",
        },
      },
      quantity: 1,
    },
  },
  annual: {
    mode: "payment" as const,
    lineItem: {
      price_data: {
        currency: "cad",
        unit_amount: 171000,
        product_data: {
          name: "QAF Sunday Camp — Full Year 2026/2027",
          description:
            "Sundays 11 AM–3 PM · Quran, Arabic, Math & STEM, soccer · Ages 8–15 · Save $190",
        },
      },
      quantity: 1,
    },
  },
};

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Payments are not configured yet." },
      { status: 503 },
    );
  }

  let plan: keyof typeof PLANS;
  try {
    const body = await req.json();
    plan = body.plan;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (plan !== "monthly" && plan !== "annual") {
    return NextResponse.json({ error: "Unknown plan." }, { status: 400 });
  }

  const stripe = new Stripe(secretKey);
  const origin =
    req.headers.get("origin") ?? process.env.SITE_URL ?? "https://qafschool.com";
  const config = PLANS[plan];

  try {
    const session = await stripe.checkout.sessions.create({
      mode: config.mode,
      line_items: [config.lineItem],
      phone_number_collection: { enabled: true },
      custom_fields: [
        {
          key: "child_name",
          label: { type: "custom", custom: "Child's full name and age" },
          type: "text",
        },
      ],
      metadata: { program: "sunday-camp", plan },
      ...(config.mode === "subscription"
        ? { subscription_data: { metadata: { program: "sunday-camp", plan } } }
        : {}),
      success_url: `${origin}/sunday-camp/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/sunday-camp#pricing`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("camp-checkout error:", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 },
    );
  }
}
