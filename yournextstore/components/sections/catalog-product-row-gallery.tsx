"use client";

import Image from "next/image";
import { useState } from "react";

type CatalogProductRowGalleryProps = {
	front: string;
	side: string;
	productName: string;
	isFirstRow: boolean;
};

export function CatalogProductRowGallery({
	front,
	side,
	productName,
	isFirstRow,
}: CatalogProductRowGalleryProps) {
	const [hovered, setHovered] = useState(false);
	const [toggled, setToggled] = useState(false);
	const showSide = hovered || toggled;

	return (
		<div
			className="group relative aspect-square w-full max-w-xl mx-auto min-h-0 rounded-2xl overflow-hidden bg-muted order-1"
			aria-label={`${productName}, hover or tap to view side`}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			onClick={() => setToggled((t) => !t)}
			role="button"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					setToggled((t) => !t);
				}
			}}
		>
			<Image
				src={front}
				alt={`${productName}, front view`}
				fill
				sizes="(max-width: 1024px) 100vw, 50vw"
				className="object-cover"
				priority={isFirstRow}
				loading={isFirstRow ? undefined : "lazy"}
				decoding="async"
			/>
			<Image
				src={side}
				alt={`${productName}, side view`}
				fill
				sizes="(max-width: 1024px) 100vw, 50vw"
				className={`object-cover absolute inset-0 transition-opacity duration-200 ${showSide ? "opacity-100" : "opacity-0"}`}
				loading="lazy"
				decoding="async"
			/>
		</div>
	);
}
