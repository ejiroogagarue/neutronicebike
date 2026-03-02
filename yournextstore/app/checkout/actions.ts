"use server";

import { getStripe } from "@/lib/stripe";
import { staticProducts } from "@/lib/static/products";

type CheckoutLineInput = {
	variantId: string;
	quantity: number;
};

function resolveStripePriceId(variantId: string): string {
	for (const product of staticProducts) {
		const match = product.variants.find((v) => v.id === variantId);
		const priceId = match?.stripePriceId;
		if (priceId && !priceId.startsWith("price_TODO")) return priceId;
		if (priceId?.startsWith("price_TODO")) {
			throw new Error(
				`Stripe price IDs are not configured yet. Add real price IDs for each variant in lib/static/products.ts. See Stripe Dashboard → Products.`,
			);
		}
	}

	throw new Error(`No Stripe price configured for variant ${variantId}.`);
}

/**
 * Create a Stripe Checkout Session from a list of cart line items.
 *
 * This expects that each product variant has a `stripePriceId` configured in the static
 * product data (and later, in Convex). Until STRIPE_SECRET_KEY and real price IDs are
 * configured, this action will throw.
 */
export async function createCheckoutSession(lines: CheckoutLineInput[]) {
	if (!lines.length) {
		throw new Error("Cannot create a checkout session for an empty cart.");
	}

	const stripe = getStripe();

	const line_items = lines.map((line) => ({
		price: resolveStripePriceId(line.variantId),
		quantity: line.quantity,
	}));

	const baseUrl =
		process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

	const session = await stripe.checkout.sessions.create({
		mode: "payment",
		line_items,
		success_url: `${baseUrl}/order/success/{CHECKOUT_SESSION_ID}`,
		cancel_url: `${baseUrl}/checkout`,
	});

	if (!session.url) {
		throw new Error("Stripe did not return a checkout URL.");
	}

	return { url: session.url };
}

