"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ColorPicker } from "@/components/product/color-picker";
import { HoverGallery } from "@/components/product/hover-gallery";
import { COLOR_NAMES } from "@/lib/static/asset-paths";
import { BUTTON_PILL_PRIMARY } from "@/lib/ui-classes";

type CatalogProductRowProps = {
	productSlug: string;
	productName: string;
	tagline: string;
	colorImages: [string, string][];
	logoImage: string;
	ctaLabel: string;
	isFirstRow?: boolean;
};

export function CatalogProductRow({
	productSlug,
	productName,
	tagline,
	colorImages,
	logoImage,
	ctaLabel,
	isFirstRow = false,
}: CatalogProductRowProps) {
	const [selectedColor, setSelectedColor] = useState(0);
	const [front, back] = colorImages[selectedColor] ?? colorImages[0];
	const colorName = COLOR_NAMES[selectedColor] ?? "Yellow";

	const productHref = `/product/${productSlug}?color=${colorName.toLowerCase()}`;

	return (
		<div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 lg:items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-12">
			<Link
				href={productHref}
				className="order-1 block w-full rounded-lg overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#fdfdfd]"
				aria-label={`View ${productName} (${colorName})`}
			>
				<HoverGallery
					frontSrc={front}
					backSrc={back}
					alt={`${productName} ${colorName}`}
					priority={isFirstRow}
				/>
			</Link>

			<div className="flex flex-col order-2 min-w-0 w-full mt-1 sm:mt-2 lg:mt-0">
				<h2 id={`catalog-${productSlug}-heading`} className="sr-only">
					{productName}
				</h2>

				<div className="relative w-[65%] sm:w-[55%] lg:w-[60%] max-w-[340px] h-8 sm:h-10 lg:h-16 mb-1.5 sm:mb-2 lg:mb-3 shrink-0">
					<Image
						src={logoImage}
						alt=""
						fill
						className="object-contain object-left"
						sizes="(max-width: 640px) 65vw, (max-width: 1024px) 55vw, 60vw"
						loading="lazy"
						decoding="async"
					/>
				</div>

				<p className="text-muted-foreground text-[0.85rem] sm:text-[0.9rem] lg:text-[1.05rem] font-light leading-snug sm:leading-relaxed mb-2 sm:mb-2.5 lg:mb-3">
					{tagline}
				</p>

				<div className="mb-2 sm:mb-2.5 lg:mb-3">
					<ColorPicker selectedColor={selectedColor} onSelectColor={setSelectedColor} />
				</div>

				<Link href={productHref} className={`${BUTTON_PILL_PRIMARY} w-full sm:w-auto`}>
					{ctaLabel}
				</Link>
			</div>
		</div>
	);
}
