"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { addToCart } from "@/app/cart/actions";
import { useCart } from "@/app/cart/cart-context";
import { ColorPicker } from "@/components/product/color-picker";
import { HoverGallery } from "@/components/product/hover-gallery";
import { QuantityPicker } from "@/components/product/quantity-picker";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ASSETS, COLOR_NAMES } from "@/lib/static/asset-paths";
import type { StaticProduct } from "@/lib/static/products";
import { formatPrice } from "@/lib/static/products";

type ProductDetailContentProps = {
	product: StaticProduct;
	otherProducts: StaticProduct[];
	/** Per-color [front, back] from catalogColorImages (same as catalog page). */
	colorImages: [string, string][];
	logoImage: string;
};

function getInitialColorIndex(searchParams: URLSearchParams): number {
	const colorParam = searchParams.get("color");
	if (!colorParam) return 0;
	const idx = COLOR_NAMES.findIndex((c) => c.toLowerCase() === colorParam.toLowerCase());
	return idx >= 0 ? idx : 0;
}

export function ProductDetailContent({
	product,
	otherProducts,
	colorImages,
	logoImage,
}: ProductDetailContentProps) {
	const searchParams = useSearchParams();
	const { openCart, dispatch } = useCart();
	const [selectedColor, setSelectedColor] = useState(() => getInitialColorIndex(searchParams));
	const [quantity, setQuantity] = useState(1);
	const [isAdding, startTransition] = useTransition();

	const [front, back] = colorImages[selectedColor] ?? colorImages[0] ?? ["", ""];
	const colorName = COLOR_NAMES[selectedColor] ?? "Yellow";

	const selectedVariant = product.variants[selectedColor] ?? product.variants[0];

	/** Use catalog [front, back] images so cart thumbnails resolve (variant.image paths may not exist). */
	const cartImages = (colorImages[selectedColor] ?? colorImages[0])?.filter(Boolean) ?? product.images;

	const handleAddToCart = useCallback(() => {
		if (!selectedVariant) return;
		openCart();
		startTransition(async () => {
			dispatch({
				type: "ADD_ITEM",
				item: {
					quantity,
					productVariant: {
						id: selectedVariant.id,
						price: String(selectedVariant.price),
						images: cartImages.length > 0 ? cartImages : product.images,
						product: {
							id: product.id,
							name: product.name,
							slug: product.slug,
							images: product.images,
						},
					},
				},
			});
			// Keep backend cart in sync when available; local cart remains the fallback.
			try {
				await addToCart(selectedVariant.id, quantity);
			} catch {
				// Ignore backend failures in local/static mode.
			}
			setQuantity(1);
		});
	}, [selectedVariant, quantity, product, openCart, dispatch, cartImages]);

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
			{/* Hero: Hover gallery (front/back) + Info Panel — aligned with catalog pattern */}
			<div className="lg:grid lg:grid-cols-[1fr_0.75fr] lg:gap-4 lg:items-start">
				<div className="lg:sticky lg:top-24 lg:self-start">
					<HoverGallery
						key={selectedColor}
						frontSrc={front}
						backSrc={back}
						alt={`${product.name} ${colorName}`}
						priority
						sizes="(max-width: 1024px) 92vw, 50vw"
						aspectClassName="aspect-square sm:aspect-4/5 lg:aspect-square"
					/>
				</div>

				{/* Yellow info panel */}
				<div className="mt-4 lg:mt-0 bg-primary text-primary-foreground p-4 sm:p-5 lg:p-6 flex flex-col gap-3 sm:gap-3.5">
					{/* Logo */}
					<div className="relative w-full max-w-[360px] h-10 sm:h-12 lg:h-14 shrink-0">
						<Image
							src={logoImage}
							alt={product.name}
							fill
							className="object-contain object-left"
							sizes="(max-width: 640px) 80vw, 360px"
							priority
						/>
					</div>
					<h1 className="sr-only">{product.name}</h1>

					{/* Price */}
					<p className="text-2xl sm:text-3xl font-semibold">{formatPrice(product.price, product.currency)}</p>

					{/* Tagline */}
					<p className="text-[0.95rem] sm:text-base font-medium leading-relaxed opacity-90">
						{product.tagline}
					</p>

					{/* Quick stats */}
					<div className="grid grid-cols-3 gap-x-4 gap-y-2 text-sm">
						{product.quickStats.map((stat) => (
							<div key={stat.label}>
								<span className="block font-semibold">{stat.value}</span>
								<span className="block opacity-70 text-xs">{stat.label}</span>
							</div>
						))}
					</div>

					{/* Color picker */}
					<div>
						<h3 className="text-sm font-semibold mb-2">Color — {colorName}</h3>
						<ColorPicker
							selectedColor={selectedColor}
							onSelectColor={setSelectedColor}
							sizeClassName="w-9 h-9 sm:w-10 sm:h-10"
						/>
					</div>

					{/* Quantity */}
					<div>
						<h3 className="text-sm font-semibold mb-2">Quantity</h3>
						<QuantityPicker value={quantity} onChange={setQuantity} />
					</div>

					{/* CTA — inverted: dark bg, yellow text */}
					<button
						type="button"
						onClick={handleAddToCart}
						disabled={!selectedVariant || isAdding}
						className="inline-flex items-center justify-center min-h-[48px] sm:min-h-[52px] px-8 bg-[#0f0f0f] text-primary rounded-none text-base font-semibold hover:bg-[#1a1a1a] transition-colors w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary disabled:opacity-70 disabled:cursor-not-allowed"
					>
						{isAdding ? "Adding…" : "Add To Cart"}
					</button>

					{/* Trust badges */}
					<div className="grid grid-cols-2 gap-2 text-xs font-medium opacity-80 pt-2">
						<span>Free Worldwide Shipping</span>
						<span>95% Assembled</span>
						<span>12-Month Warranty</span>
						<span>Premium Build Quality</span>
					</div>
				</div>
			</div>

			{/* Accordion */}
			<section className="mt-10 sm:mt-14 border-t border-border pt-6 sm:pt-8" aria-label="Product details">
				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="features">
						<AccordionTrigger className="text-base font-semibold">Key Features</AccordionTrigger>
						<AccordionContent>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
								{product.features.map((feature) => (
									<div key={feature.title} className="rounded-2xl overflow-hidden flex flex-col">
										{/* Image — gray top */}
										<div className="relative aspect-square sm:aspect-4/3 bg-[#f3f3f3] border border-primary shrink-0">
											<Image
												src={feature.image}
												alt={feature.title}
												fill
												className="object-contain p-2 sm:p-3"
												sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 30vw"
												loading="lazy"
											/>
										</div>

										{/* Text — yellow bottom */}
										<div className="bg-primary text-primary-foreground pt-2 sm:pt-2.5 pb-3 sm:pb-4 flex-1 flex flex-col">
											<h4 className="bg-white text-foreground text-[0.8rem] sm:text-[0.85rem] lg:text-[0.9rem] font-bold italic leading-8 sm:leading-9 pl-[3%] pr-3 rounded-r-xl sm:rounded-r-2xl w-[88%] sm:w-[90%]">
												{feature.title}
											</h4>
											<p className="text-[0.8rem] sm:text-[0.85rem] lg:text-[0.9rem] font-medium leading-snug sm:leading-relaxed text-primary-foreground/90 px-[5%] pt-2 sm:pt-2.5">
												{feature.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="specs">
						<AccordionTrigger className="text-base font-semibold">Tech Specs</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-5">
								{product.specs.map((cat) => (
									<div key={cat.category}>
										<h4 className="text-sm font-semibold text-foreground mb-2">{cat.category}</h4>
										<dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm">
											{cat.rows.map((row) => (
												<div key={row.label} className="contents">
													<dt className="font-medium text-foreground/80">{row.label}</dt>
													<dd className="text-muted-foreground">{row.value}</dd>
												</div>
											))}
										</dl>
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="size">
						<AccordionTrigger className="text-base font-semibold">Size Frame & Geometry</AccordionTrigger>
						<AccordionContent className="text-muted-foreground leading-relaxed">
							One size designed for a wide range of riders (5&#39;2&quot; – 6&#39;5&quot;). Contact us for fit
							guidance.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="faq">
						<AccordionTrigger className="text-base font-semibold">FAQ</AccordionTrigger>
						<AccordionContent>
							<dl className="space-y-4 text-sm">
								<div>
									<dt className="font-medium text-foreground">What are the shipping costs?</dt>
									<dd className="text-muted-foreground mt-1">
										Free shipping on all orders that include an eBike.
									</dd>
								</div>
								<div>
									<dt className="font-medium text-foreground">Can I return my order?</dt>
									<dd className="text-muted-foreground mt-1">Yes, we have a 20-day return policy.</dd>
								</div>
								<div>
									<dt className="font-medium text-foreground">Is it easy to assemble?</dt>
									<dd className="text-muted-foreground mt-1">
										Yes, all of our eBikes are 95% assembled out of the box.
									</dd>
								</div>
								<div>
									<dt className="font-medium text-foreground">Can I add a secondary battery later?</dt>
									<dd className="text-muted-foreground mt-1">
										Yes, all models come standard with secondary battery ports.
									</dd>
								</div>
								<div>
									<dt className="font-medium text-foreground">What is the warranty?</dt>
									<dd className="text-muted-foreground mt-1">
										All eBikes come with a standard 12-month warranty.
									</dd>
								</div>
							</dl>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</section>

			{/* You may also like — horizontal color gallery */}
			{otherProducts.length > 0 && (
				<section className="mt-12 sm:mt-16" aria-labelledby="also-like-heading">
					<h2
						id="also-like-heading"
						className="text-lg sm:text-xl font-semibold italic text-foreground mb-4 sm:mb-6"
					>
						You May Also Like
					</h2>
					<div className="overflow-x-auto -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 no-scrollbar">
						<div className="flex gap-4 sm:gap-5 w-max">
							{otherProducts.flatMap((op) =>
								(ASSETS.catalogColorImages[op.slug] ?? []).map(([front], i) => {
									const name = COLOR_NAMES[i] ?? "Color";
									return (
										<Link
											key={`${op.slug}-${name}`}
											href={`/product/${op.slug}?color=${name.toLowerCase()}`}
											className="flex flex-col shrink-0 w-[220px] sm:w-[260px] group"
										>
											<div className="relative aspect-square rounded-lg overflow-hidden">
												<Image
													src={front}
													alt={`${op.name} ${name}`}
													fill
													sizes="260px"
													className="object-contain group-hover:scale-105 transition-transform duration-300"
													loading="lazy"
												/>
											</div>
											<div className="mt-2 px-0.5">
												<p className="text-sm font-medium text-foreground">{op.name}</p>
												<p className="text-xs text-muted-foreground">{name}</p>
											</div>
										</Link>
									);
								}),
							)}
						</div>
					</div>
				</section>
			)}
		</div>
	);
}
