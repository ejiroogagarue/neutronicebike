import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getStripe } from "@/lib/stripe";
import { CURRENCY, LOCALE } from "@/lib/constants";
import { formatMoney } from "@/lib/money";

export default async function OrderSuccessPage(props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params;

	const stripe = getStripe();
	let session: Awaited<ReturnType<typeof stripe.checkout.sessions.retrieve>>;

	try {
		session = await stripe.checkout.sessions.retrieve(id, {
			expand: ["line_items.data.price.product"],
		});
	} catch {
		notFound();
	}

	if (!session || session.payment_status !== "paid") {
		notFound();
	}

	const lineItems = session.line_items?.data ?? [];
	const customerEmail = session.customer_details?.email ?? session.customer_email;
	const customerName = session.customer_details?.name;
	const amountTotal = session.amount_total ?? 0;

	return (
		<main className="min-h-screen bg-[#fdfdfd] text-foreground overflow-x-hidden">
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{/* Success Header */}
				<div className="text-center mb-10">
					<div className="flex justify-center mb-4">
						<div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
							<CheckCircle className="h-8 w-8 text-green-600" />
						</div>
					</div>
					<h1 className="text-2xl sm:text-3xl font-semibold italic tracking-tight">
						Thank you for your order!
					</h1>
					<p className="text-muted-foreground mt-2">
						Your payment has been confirmed.
					</p>
					{customerEmail && (
						<p className="text-sm text-muted-foreground mt-1">
							A confirmation email will be sent to {customerEmail}
						</p>
					)}
				</div>

				{/* Order Items */}
				<div className="border border-border rounded-2xl overflow-hidden">
					<div className="bg-secondary/50 px-6 py-4 border-b border-border">
						<h2 className="font-semibold">Order Items</h2>
					</div>
					<div className="divide-y divide-border">
						{lineItems.map((item, idx) => {
							const product = item.price && typeof item.price === "object" ? item.price.product : null;
							const productName =
								product && typeof product === "object" && "name" in product
									? (product.name as string)
									: item.description ?? "Item";
							const qty = item.quantity ?? 1;
							const amount = item.amount_total ?? 0;

							return (
								<div key={item.id ?? idx} className="flex gap-4 p-6">
									<div className="flex min-w-0 flex-1 flex-col justify-between">
										<p className="text-sm font-medium leading-tight text-foreground">
											{productName}
										</p>
										<p className="text-sm text-muted-foreground mt-1">Qty: {qty}</p>
										<p className="text-sm font-semibold mt-2">
											{formatMoney({
												amount: BigInt(amount),
												currency: CURRENCY,
												locale: LOCALE,
											})}
										</p>
									</div>
								</div>
							);
						})}
					</div>

					{/* Order Summary */}
					<div className="bg-secondary/30 px-6 py-4 space-y-2">
						<div className="flex items-center justify-between font-semibold pt-2 border-t border-border">
							<span>Total</span>
							<span>
								{formatMoney({
									amount: BigInt(amountTotal),
									currency: CURRENCY,
									locale: LOCALE,
								})}
							</span>
						</div>
					</div>
				</div>

				{/* Customer details if collected */}
				{customerName && (
					<div className="border border-border rounded-2xl overflow-hidden mt-6">
						<div className="bg-secondary/50 px-6 py-4 border-b border-border">
							<h2 className="font-semibold">Customer</h2>
						</div>
						<div className="px-6 py-4 text-sm text-muted-foreground">
							<p className="text-foreground font-medium">{customerName}</p>
							{customerEmail && <p className="mt-1">{customerEmail}</p>}
						</div>
					</div>
				)}

				{/* Continue Shopping Button */}
				<div className="mt-8 text-center">
					<Button asChild className="min-h-[48px] px-8 rounded-full">
						<Link href="/">Continue Shopping</Link>
					</Button>
				</div>
			</div>
		</main>
	);
}
