"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/cart/cart-context";

export function CartButton() {
	const { itemCount, openCart } = useCart();

	return (
		<button
			type="button"
			onClick={openCart}
			className="p-2 text-white hover:text-primary hover:bg-white/5 rounded-full transition-colors relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#010101]"
			aria-label="Shopping cart"
		>
			<ShoppingCart className="w-6 h-6" />
			{itemCount > 0 ? (
				<span className="absolute -top-1 -right-1 bg-foreground text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
					{itemCount}
				</span>
			) : null}
		</button>
	);
}
