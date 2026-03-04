"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useCart } from "@/app/cart/cart-context";
import { createCheckoutSession } from "@/app/checkout/actions";
import { CURRENCY, LOCALE } from "@/lib/constants";
import { formatMoney } from "@/lib/money";
import { BUTTON_PILL_GHOST, BUTTON_PILL_PRIMARY } from "@/lib/ui-classes";

export default function CheckoutPage() {
	const { items, subtotal, openCart } = useCart();
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);

	const handleCheckout = () => {
		setError(null);
		startTransition(async () => {
			try {
				const lines = items.map((item) => ({
					variantId: item.productVariant.id,
					quantity: item.quantity,
				}));
				const { url } = await createCheckoutSession(lines);
				if (url) window.location.href = url;
			} catch {
				setError(
					"We couldn't start checkout right now. Please try again or contact support@neutronicebike.com.",
				);
			}
		});
	};

	const hasItems = items.length > 0;
	const subtotalFormatted = formatMoney({
		amount: subtotal,
		currency: CURRENCY,
		locale: LOCALE,
	});

	return (
		<main className="min-h-screen bg-[#fdfdfd] text-foreground overflow-x-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
				<header className="mb-6 sm:mb-8 lg:mb-10">
					<h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold italic">Review &amp; checkout</h1>
					<p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
						High-ticket builds deserve a proper once-over. Confirm what&apos;s in your cart before we hand you
						off to secure payment.
					</p>
				</header>

				{!hasItems ? (
					<section aria-label="Empty cart" className="border border-dashed border-border rounded-2xl p-6">
						<p className="text-sm sm:text-base text-muted-foreground">
							Your cart is empty. Add a bike or accessory first, then come back here to check out.
						</p>
						<div className="mt-4 flex flex-wrap gap-3">
							<Link href="/catalog" className={BUTTON_PILL_PRIMARY}>
								Browse bikes
							</Link>
							<Link href="/accessories" className={BUTTON_PILL_GHOST}>
								Browse accessories
							</Link>
						</div>
					</section>
				) : (
					<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-8 lg:gap-10 items-start">
						<section aria-label="Order summary" className="space-y-4">
							<div className="flex items-center justify-between gap-3">
								<h2 className="text-lg sm:text-xl font-semibold">Items in your cart</h2>
								<button
									type="button"
									onClick={openCart}
									className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
								>
									Edit cart
								</button>
							</div>
							<ul className="divide-y divide-border rounded-2xl border border-border bg-white/60">
								{items.map((item) => {
									const { productVariant, quantity } = item;
									const linePrice = BigInt(productVariant.price) * BigInt(quantity);
									const linePriceFormatted = formatMoney({
										amount: linePrice,
										currency: CURRENCY,
										locale: LOCALE,
									});
									return (
										<li key={productVariant.id} className="flex gap-4 p-4 sm:p-5">
											<div className="flex-1 min-w-0">
												<p className="text-sm sm:text-base font-semibold">{productVariant.product.name}</p>
												<p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">Qty {quantity}</p>
											</div>
											<div className="shrink-0 text-sm sm:text-base font-semibold">{linePriceFormatted}</div>
										</li>
									);
								})}
							</ul>
						</section>

						<section aria-label="Totals and payment" className="space-y-4 lg:space-y-6">
							<div className="rounded-2xl border border-border bg-white/70 p-4 sm:p-5">
								<h2 className="text-base sm:text-lg font-semibold mb-3">Order total</h2>
								<div className="flex items-center justify-between text-sm sm:text-base">
									<span className="text-muted-foreground">Subtotal</span>
									<span className="font-semibold">{subtotalFormatted}</span>
								</div>
								<p className="mt-2 text-xs sm:text-sm text-muted-foreground">
									Shipping and taxes are calculated at checkout.
								</p>
								<div className="mt-4 flex flex-col gap-2 text-xs sm:text-sm text-muted-foreground">
									<p>• Secure Stripe-hosted checkout.</p>
									<p>• 3D Secure support where required by your bank.</p>
								</div>
								{error && (
									<p className="mt-2 text-sm text-destructive font-medium" role="alert">
										{error}
									</p>
								)}
								<button
									type="button"
									onClick={handleCheckout}
									disabled={isPending}
									className={`${BUTTON_PILL_PRIMARY} mt-5 w-full bg-[#0f0f0f] text-primary hover:bg-[#1a1a1a] disabled:cursor-not-allowed disabled:opacity-70`}
								>
									{isPending ? "Redirecting to Stripe…" : "Checkout with card"}
								</button>
								<p className="mt-2 text-[0.7rem] sm:text-xs text-muted-foreground">
									Secure Stripe-hosted checkout. You’ll complete payment on Stripe’s page.
								</p>
							</div>
							<div className="text-xs sm:text-sm text-muted-foreground">
								<p>
									By checking out, you agree to Neutronic&apos;s{" "}
									<Link href="/legal/terms-of-service" className="underline underline-offset-4">
										terms
									</Link>
									,{" "}
									<Link href="/legal/warranty" className="underline underline-offset-4">
										warranty
									</Link>
									, and{" "}
									<Link href="/legal/returns-and-refunds" className="underline underline-offset-4">
										return policy
									</Link>
									.
								</p>
								<p className="mt-2">
									Need help before checkout? Email{" "}
									<a href="mailto:support@neutronicebike.com" className="underline underline-offset-4">
										support@neutronicebike.com
									</a>
									.
								</p>
							</div>
						</section>
					</div>
				)}
			</div>
		</main>
	);
}
