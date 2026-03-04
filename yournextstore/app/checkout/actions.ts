"use server";

import { fetchQuery } from "convex/nextjs";
import { makeFunctionReference } from "convex/server";
import { staticProducts } from "@/lib/static/products";
import { getStripe } from "@/lib/stripe";

type CheckoutLineInput = {
	variantId: string;
	quantity: number;
};

async function resolveStripePriceId(variantId: string): Promise<string> {
	// Prefer Convex when deployed
	if (process.env.NEXT_PUBLIC_CONVEX_URL) {
		try {
			const ref = makeFunctionReference<"query", { variantId: string }, string | null>(
				"products:getStripePriceId",
			);
			const priceId = await fetchQuery(ref, { variantId });
			if (priceId) return priceId;
		} catch {
			// Fall through to static
		}
	}
	// Fallback to static products
	for (const product of staticProducts) {
		const match = product.variants.find((v) => v.id === variantId);
		const priceId = match?.stripePriceId;
		if (priceId) return priceId;
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

	const line_items = await Promise.all(
		lines.map(async (line) => ({
			price: await resolveStripePriceId(line.variantId),
			quantity: line.quantity,
		})),
	);

	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

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
