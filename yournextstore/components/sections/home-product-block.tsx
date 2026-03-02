import Image from "next/image";
import Link from "next/link";
import { ASSETS, COLOR_NAMES } from "@/lib/static/asset-paths";
import { formatPrice } from "@/lib/static/products";

/** Design-system product swatch hex colors (DESIGN-SYSTEM.md §3.2) */
const COLOR_SWATCH_HEX: Record<string, string> = {
	Yellow: "#FFF63A",
	Red: "#c5271e",
	Green: "#1b7624",
	Blue: "#2f6da5",
	Brown: "#e5c8a0",
	Black: "#000000",
};

type HomeProductBlockProps = {
	variant: "journey" | "hunter";
	productName: string;
	tagline: string;
	productSlug: string;
	ctaLabel: string;
	priceCents: number;
	/** When true, first grid image loads with priority for LCP (use for first block above the fold). */
	priorityFirstImage?: boolean;
};

export function HomeProductBlock({
	variant,
	productName,
	tagline,
	productSlug,
	ctaLabel,
	priceCents,
	priorityFirstImage = false,
}: HomeProductBlockProps) {
	const assets = variant === "journey" ? ASSETS.journey : ASSETS.hunter;
	const priceStr = formatPrice(priceCents, "USD");

	return (
		<section className="bg-[#fdfdfd] text-foreground overflow-hidden" aria-labelledby={`${variant}-heading`}>
			{/* Hero imagery – simple full-bleed pair with subtle gap */}
			<div className="w-full pt-6 sm:pt-8 lg:pt-10">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
					{/* Left image – full bleed (priority when first block for LCP) */}
					<div className="relative aspect-4/3 w-full min-h-0 overflow-hidden">
						<Image
							src={assets.grid1}
							alt=""
							fill
							sizes="(max-width: 640px) 100vw, 50vw"
							className="object-cover"
							priority={priorityFirstImage}
							fetchPriority={priorityFirstImage ? "high" : undefined}
							loading={priorityFirstImage ? undefined : "lazy"}
							decoding="async"
						/>
					</div>
					{/* Right image – full bleed, separated only by the gap */}
					<div className="relative aspect-4/3 w-full min-h-0 overflow-hidden">
						<Image
							src={assets.grid2}
							alt=""
							fill
							sizes="(max-width: 640px) 100vw, 50vw"
							className="object-cover"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</div>
			</div>

			{/* Content: padding only on text areas; gallery fills width */}
			<div className="w-full pb-12 sm:pb-16 md:pb-20 lg:pb-24">
				{/* Full-width yellow bar – Webflow: column, logo 40%/48%, tagline below (product-gallery__header) */}
				<div
					id={`${variant}-heading`}
					className="bg-primary flex flex-col gap-2.5 py-[1.5%] px-[5%] rounded-b-xl sm:rounded-none min-h-0"
				>
					<div className="max-w-7xl mx-auto w-full flex flex-col gap-2.5 min-w-0">
						{/* Logo as anchor – 40% width desktop, 48% tablet (product-logo__container) */}
						<div className="relative w-[40%] sm:w-[48%] min-w-[140px] h-12 sm:h-14 md:h-16 shrink-0">
							<Image
								src={assets.logo}
								alt=""
								fill
								className="object-contain object-left"
								sizes="(max-width: 640px) 40vw, 48vw"
								loading="lazy"
							/>
						</div>
						{/* Tagline below – text-block-11: 1.2rem italic font-medium */}
						<p className="text-primary-foreground text-[1.2rem] italic font-medium leading-relaxed min-w-0 wrap-break-word">
							{tagline}
						</p>
					</div>
				</div>

				{/* Horizontal color gallery – full width, tight vertical spacing for scrollability */}
				<div
					className="overflow-x-auto no-scrollbar snap-x snap-mandatory w-full pl-5 pr-5 sm:pl-8 sm:pr-8 py-2 mt-4 sm:mt-6 md:mt-8"
					style={{ WebkitOverflowScrolling: "touch" }}
					role="region"
					aria-label={`${productName} color options`}
					tabIndex={0}
				>
					<div className="flex gap-5 sm:gap-6 md:gap-7 pb-3 sm:pb-4 min-w-0 w-max">
						{assets.slides.map((src, i) => {
							const colorName = COLOR_NAMES[i] ?? "Yellow";
							const swatchHex = COLOR_SWATCH_HEX[colorName] ?? "#FFF63A";
							return (
								<Link
									key={src}
									href={`/product/${productSlug}?color=${colorName.toLowerCase()}`}
									className="shrink-0 w-[260px] sm:w-[300px] md:w-[340px] lg:w-[380px] snap-center group min-h-[44px]"
								>
									<div className="relative aspect-3/4 rounded-xl overflow-hidden bg-transparent mb-3 sm:mb-4">
										<div className="absolute inset-0">
											<Image
												src={src}
												alt={`${productName} ${colorName}`}
												fill
												sizes="(max-width: 640px) 260px, (max-width: 768px) 300px, (max-width: 1024px) 340px, 380px"
												className="object-contain object-center transition-opacity duration-200 group-hover:opacity-90"
												loading="lazy"
												decoding="async"
											/>
										</div>
									</div>
									<div className="flex flex-col gap-1.5 px-0.5">
										<p className="text-sm sm:text-base font-semibold text-foreground">{productName}</p>
										<div className="flex items-center gap-2">
											<span
												className="shrink-0 w-4 h-4 rounded-sm"
												style={{ backgroundColor: swatchHex }}
												aria-hidden
											/>
											<span className="text-sm font-medium text-muted-foreground">{colorName}</span>
										</div>
									</div>
								</Link>
							);
						})}
					</div>
				</div>

				{/* CTA – padding for text spacing only */}
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-10 sm:mt-12 md:mt-14">
					<Link
						href={`/product/${productSlug}`}
						className="inline-flex items-center justify-center min-h-[48px] px-6 sm:px-8 bg-primary text-primary-foreground rounded-full text-sm sm:text-base font-semibold hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#fdfdfd]"
					>
						{ctaLabel}
					</Link>
				</div>
			</div>
		</section>
	);
}
