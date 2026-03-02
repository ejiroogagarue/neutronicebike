"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type GalleryGridProps = {
	images: string[];
	videoSrc?: string;
	shootImage?: string;
	alt: string;
	priority?: boolean;
};

const VIEW_LABELS = ["Front", "Side", "Back", "360°"];

export function GalleryGrid({
	images,
	videoSrc,
	shootImage,
	alt,
	priority = false,
}: GalleryGridProps) {
	const allImages = [...images];
	const hasVideo = Boolean(videoSrc);
	const videoIndex = hasVideo ? allImages.length : -1;

	if (!hasVideo && shootImage) {
		allImages.push(shootImage);
	}

	const totalItems = hasVideo ? allImages.length + 1 : allImages.length;

	const [selectedIndex, setSelectedIndex] = useState(0);
	const videoRef = useRef<HTMLVideoElement>(null);

	const isVideoSelected = hasVideo && selectedIndex === videoIndex;

	if (totalItems === 0) return null;

	return (
		<div>
			{/* Main display area */}
			<div className="relative w-full aspect-4/3 bg-[#fdfdfd]">
				{isVideoSelected ? (
					<video
						ref={videoRef}
						src={videoSrc}
						autoPlay
						loop
						muted
						playsInline
						className="absolute inset-0 w-full h-full object-contain"
					/>
				) : (
					<Image
						src={allImages[selectedIndex] ?? allImages[0]}
						alt={`${alt}, ${VIEW_LABELS[selectedIndex] ?? "view"}`}
						fill
						sizes="(max-width: 1024px) 92vw, 50vw"
						className="object-contain"
						priority={priority}
					/>
				)}
			</div>

			{/* Thumbnails */}
			{totalItems > 1 && (
				<div className="flex gap-1.5 sm:gap-2 mt-1.5">
					{allImages.map((src, i) => {
						const isActive = i === selectedIndex && !isVideoSelected;
						return (
							<button
								key={`${src}-${i}`}
								type="button"
								onClick={() => setSelectedIndex(i)}
								className={`relative flex-1 aspect-square rounded-md overflow-hidden transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-[#fdfdfd] ${
									isActive
										? "ring-2 ring-primary ring-offset-1 ring-offset-[#fdfdfd]"
										: "opacity-50 hover:opacity-100 ring-1 ring-black/10"
								}`}
								aria-label={VIEW_LABELS[i] ?? `View ${i + 1}`}
								aria-pressed={isActive}
							>
								<Image
									src={src}
									alt=""
									fill
									sizes={`${Math.round(92 / totalItems)}vw`}
									className="object-contain"
									loading="lazy"
									decoding="async"
								/>
							</button>
						);
					})}

					{/* Video thumbnail */}
					{hasVideo && (
						<button
							type="button"
							onClick={() => setSelectedIndex(videoIndex)}
							className={`relative flex-1 aspect-square rounded-md overflow-hidden transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-[#fdfdfd] ${
								isVideoSelected
									? "ring-2 ring-primary ring-offset-1 ring-offset-[#fdfdfd]"
									: "opacity-50 hover:opacity-100 ring-1 ring-black/10"
							}`}
							aria-label="360° Preview"
							aria-pressed={isVideoSelected}
						>
							<video
								src={videoSrc}
								muted
								playsInline
								preload="metadata"
								className="absolute inset-0 w-full h-full object-contain"
							/>
							{/* Play icon overlay */}
							<div className="absolute inset-0 flex items-center justify-center bg-black/20">
								<svg
									viewBox="0 0 24 24"
									fill="white"
									className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-md"
									aria-hidden="true"
								>
									<path d="M8 5v14l11-7z" />
								</svg>
							</div>
						</button>
					)}
				</div>
			)}
		</div>
	);
}
