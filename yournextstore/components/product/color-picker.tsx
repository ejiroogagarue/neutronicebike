"use client";

import Image from "next/image";
import { ASSETS, COLOR_NAMES } from "@/lib/static/asset-paths";

type ColorPickerProps = {
	selectedColor: number;
	onSelectColor: (index: number) => void;
	/** Override swatch size classes if needed. */
	sizeClassName?: string;
};

export function ColorPicker({
	selectedColor,
	onSelectColor,
	sizeClassName = "w-8 h-8 sm:w-9 sm:h-9 lg:w-11 lg:h-11",
}: ColorPickerProps) {
	return (
		<div className="flex flex-wrap gap-2 sm:gap-2.5 lg:gap-3" role="group" aria-label="Available colors">
			{ASSETS.swatches.map((src, i) => {
				const name = COLOR_NAMES[i] ?? "Yellow";
				const isSelected = i === selectedColor;
				return (
					<button
						key={src}
						type="button"
						onClick={() => onSelectColor(i)}
						className={`relative ${sizeClassName} rounded-full overflow-hidden shrink-0 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-[#fdfdfd] ${
							isSelected
								? "ring-2 ring-foreground ring-offset-2 ring-offset-[#fdfdfd] scale-110"
								: "ring-1 ring-black/10 hover:ring-black/30"
						}`}
						aria-label={name}
						aria-pressed={isSelected}
					>
						<Image
							src={src}
							alt=""
							fill
							sizes="44px"
							className="object-cover"
							loading="lazy"
							decoding="async"
						/>
					</button>
				);
			})}
		</div>
	);
}
