import "@/app/globals.css";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { CartProvider } from "@/app/cart/cart-context";
import { CartSidebar } from "@/app/cart/cart-sidebar";
import { Footer } from "@/app/footer";
import { Navbar } from "@/app/navbar";
import { ErrorOverlayRemover, NavigationReporter } from "@/components/devtools";
import { FontLoader } from "@/components/font-loader";
import { ReferralBadge } from "@/components/referral-badge";
import { getCartCookieJson } from "@/lib/cookies";
import { commerce } from "@/lib/commerce";
import { ASSETS } from "@/lib/static/asset-paths";

export const metadata: Metadata = {
	title: "Neutronic — Courier-tough eBikes",
	description:
		"Courier-tough eBikes, built for bad streets and worse weather. Excalibur Journey & Hunter. Buy or rent.",
};

async function getInitialCart() {
	const cartCookie = await getCartCookieJson();

	if (!cartCookie?.id) {
		return { cart: null, cartId: null };
	}

	try {
		const cart = await commerce.cartGet({ cartId: cartCookie.id });
		return { cart: cart ?? null, cartId: cartCookie.id };
	} catch {
		return { cart: null, cartId: cartCookie.id };
	}
}

async function CartProviderWrapper({ children }: { children: React.ReactNode }) {
	const { cart, cartId } = await getInitialCart();

	return (
		<CartProvider initialCart={cart} initialCartId={cartId}>
			<div className="flex min-h-screen flex-col">
				<header className="sticky top-0 z-50 border-b border-white/10 bg-[#010101] backdrop-blur-md">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex items-center justify-between h-20">
							<Link
								href="/"
								className="flex items-center rounded-lg px-1 py-1.5 transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#010101]"
								aria-label="Neutronic home"
							>
								<span className="relative h-16 w-16 sm:h-[72px] sm:w-[72px] md:h-20 md:w-20 shrink-0 overflow-hidden">
									<Image
										src={ASSETS.navLogo}
										alt="Neutronic"
										fill
										className="object-cover object-center scale-[1.15]"
										sizes="(max-width: 640px) 64px, (max-width: 768px) 72px, 80px"
									/>
								</span>
							</Link>
							<Navbar />
						</div>
					</div>
				</header>
				<div className="flex-1">{children}</div>
				<Footer />
				<ReferralBadge />
			</div>
			<CartSidebar />
		</CartProvider>
	);
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const env = process.env.VERCEL_ENV || "development";

	const fontUrl =
		"https://fonts.googleapis.com/css2?family=Zalando+Sans+Expanded:wght@300;400;500;600;700&display=swap";

	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link rel="preload" href={fontUrl} as="style" />
				<link href={fontUrl} rel="stylesheet" media="print" id="zalando-font" />
			</head>
			<body className="antialiased">
				<FontLoader />
				<Suspense>
					<CartProviderWrapper>{children}</CartProviderWrapper>
				</Suspense>
				{env === "development" && (
					<>
						<NavigationReporter />
						<ErrorOverlayRemover />
					</>
				)}
			</body>
		</html>
	);
}
