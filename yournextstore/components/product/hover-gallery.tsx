"use client";

import Image from "next/image";

type HoverGalleryProps = {
	frontSrc: string;
	backSrc: string;
	alt: string;
	/** Responsive sizes hint for next/image. Defaults to catalog sizing. */
	sizes?: string;
	/** Mark as priority (above-fold). */
	priority?: boolean;
	/** Aspect ratio classes. Defaults to "aspect-square sm:aspect-4/5 lg:aspect-square". */
	aspectClassName?: string;
};

export function HoverGallery({
	frontSrc,
	backSrc,
	alt,
	sizes = "(max-width: 1024px) 92vw, 45vw",
	priority = false,
	aspectClassName = "aspect-square sm:aspect-4/5 lg:aspect-square",
}: HoverGalleryProps) {
	return (
		<div className="group relative w-full">
			<div className={`relative w-full ${aspectClassName}`}>
				<Image
					src={frontSrc}
					alt={`${alt}, front view`}
					fill
					sizes={sizes}
					className="object-contain transition-opacity duration-300"
					priority={priority}
					loading={priority ? undefined : "lazy"}
					decoding="async"
				/>
				<Image
					src={backSrc}
					alt={`${alt}, back view`}
					fill
					sizes={sizes}
					className="object-contain absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					loading="lazy"
					decoding="async"
				/>
			</div>
		</div>
	);
}
