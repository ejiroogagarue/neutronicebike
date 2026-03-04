import type Stripe from "stripe";

declare const process: {
	env: {
		STRIPE_SECRET_KEY?: string;
		NODE_ENV?: string;
	};
};

let stripeClient: Stripe | null = null;

/**
 * Lazily instantiate and return a Stripe client.
 *
 * This helper is safe to import in server-only code. It will only throw
 * when you actually call it without STRIPE_SECRET_KEY configured, so the
 * app can still boot in environments where Stripe isn't set up yet.
 */
export function getStripe(): Stripe {
	if (stripeClient) return stripeClient;

	const secretKey = process.env.STRIPE_SECRET_KEY;
	if (!secretKey) {
		throw new Error(
			"Stripe secret key is not configured. Set STRIPE_SECRET_KEY in your environment before calling getStripe().",
		);
	}

	// The version here should be kept in sync with your Stripe account's API version.
	// Using `require` avoids hard coupling to ESM/CJS in environments where this file
	// may be bundled differently.
	// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports
	const StripeCtor: typeof Stripe = require("stripe");

	stripeClient = new StripeCtor(secretKey, {
		apiVersion: "2025-02-24.acacia",
	});

	return stripeClient;
}
