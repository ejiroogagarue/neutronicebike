import { cookies } from "next/headers";

export const CART_COOKIE = "yns_cart";
export type CartCookieJson = { id: string };

/** Static cart (when YNS API not used): list of variantId + quantity. */
export const STATIC_CART_COOKIE = "yns_static_cart";
export type StaticCartItem = { variantId: string; quantity: number };
export type StaticCartCookieJson = { items: StaticCartItem[] };

export async function setCartCookie(cartCookieJson: CartCookieJson) {
	try {
		(await cookies()).set(CART_COOKIE, JSON.stringify(cartCookieJson), {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
		});
	} catch (error) {
		console.error("Failed to set cart cookie", error);
	}
}

export async function clearCartCookie(): Promise<void> {
	(await cookies()).set(CART_COOKIE, "", { maxAge: 0 });
}

export async function getCartCookieJson(): Promise<null | CartCookieJson> {
	const cartCookieJson_ = (await cookies()).get(CART_COOKIE)?.value;
	try {
		const cartCookieJson = cartCookieJson_ ? JSON.parse(cartCookieJson_) : null;
		if (
			!cartCookieJson ||
			typeof cartCookieJson !== "object" ||
			!("id" in cartCookieJson) ||
			typeof cartCookieJson.id !== "string"
		) {
			return null;
		}
		return cartCookieJson as CartCookieJson;
	} catch {
		return null;
	}
}

export async function getStaticCartCookie(): Promise<StaticCartItem[]> {
	const raw = (await cookies()).get(STATIC_CART_COOKIE)?.value;
	try {
		const parsed = raw ? (JSON.parse(raw) as StaticCartCookieJson) : null;
		if (!parsed || !Array.isArray(parsed.items)) return [];
		return parsed.items.filter(
			(i): i is StaticCartItem => typeof i?.variantId === "string" && typeof i?.quantity === "number" && i.quantity > 0,
		);
	} catch {
		return [];
	}
}

export async function setStaticCartCookie(items: StaticCartItem[]): Promise<void> {
	(await cookies()).set(STATIC_CART_COOKIE, JSON.stringify({ items }), {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 60 * 60 * 24 * 30, // 30 days
	});
}
