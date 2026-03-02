"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { removeFromCart, setCartQuantity } from "@/app/cart/actions";
import { type CartLineItem, useCart } from "@/app/cart/cart-context";
import { YnsLink } from "@/components/yns-link";
import { CURRENCY, LOCALE } from "@/lib/constants";
import { formatMoney } from "@/lib/money";
import { YNSImage } from "@/lib/yns-image";

type CartItemProps = {
	item: CartLineItem;
};

export function CartItem({ item }: CartItemProps) {
	const router = useRouter();
	const { dispatch, closeCart } = useCart();
	const [, startTransition] = useTransition();

	const { productVariant, quantity } = item;
	const { product } = productVariant;

	const image = productVariant.images[0] ?? product.images[0];
	const price = BigInt(productVariant.price);
	const lineTotal = price * BigInt(quantity);

	const handleRemove = () => {
		startTransition(async () => {
			dispatch({ type: "REMOVE", variantId: productVariant.id });
			const result = await removeFromCart(productVariant.id);
			if (result?.success) router.refresh();
		});
	};

	const handleIncrement = () => {
		startTransition(async () => {
			dispatch({ type: "INCREASE", variantId: productVariant.id });
			const result = await setCartQuantity(productVariant.id, quantity + 1);
			if (result?.success) router.refresh();
		});
	};

	const handleDecrement = () => {
		if (quantity <= 1) {
			handleRemove();
			return;
		}
		startTransition(async () => {
			dispatch({ type: "DECREASE", variantId: productVariant.id });
			const result = await setCartQuantity(productVariant.id, quantity - 1);
			if (result?.success) router.refresh();
		});
	};

	return (
		<div className="flex gap-3 py-4">
			{/* Product Image */}
			<YnsLink
				prefetch={"eager"}
				href={`/product/${product.slug}`}
				onClick={closeCart}
				className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-secondary"
			>
				{image && <YNSImage src={image} alt={product.name} fill className="object-cover" sizes="96px" />}
			</YnsLink>

			{/* Product Details */}
			<div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
				<div className="flex items-start justify-between gap-2">
					<YnsLink
						prefetch={"eager"}
						href={`/product/${product.slug}`}
						onClick={closeCart}
						className="text-sm font-medium leading-tight text-foreground hover:underline line-clamp-2"
					>
						{product.name}
					</YnsLink>
					<button
						type="button"
						onClick={handleRemove}
						className="shrink-0 flex min-h-[44px] min-w-[44px] items-center justify-center text-muted-foreground hover:text-destructive transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
						aria-label="Remove from cart"
					>
						<Trash2 className="h-4 w-4" />
					</button>
				</div>

				<div className="flex items-center justify-between">
					{/* Quantity Controls — min 44px touch targets per §10 */}
					<div className="inline-flex items-center rounded-full border border-border">
						<button
							type="button"
							onClick={handleDecrement}
							className="shrink-0 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-l-full hover:bg-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
							aria-label="Decrease quantity"
						>
							<Minus className="h-4 w-4" />
						</button>
						<span className="flex min-h-[44px] min-w-8 items-center justify-center text-sm tabular-nums px-1">{quantity}</span>
						<button
							type="button"
							onClick={handleIncrement}
							className="shrink-0 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-r-full hover:bg-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
							aria-label="Increase quantity"
						>
							<Plus className="h-4 w-4" />
						</button>
					</div>

					{/* Price */}
					<span className="text-sm font-semibold">
						{formatMoney({ amount: lineTotal, currency: CURRENCY, locale: LOCALE })}
					</span>
				</div>
			</div>
		</div>
	);
}
