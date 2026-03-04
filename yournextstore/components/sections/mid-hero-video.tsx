"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ASSETS } from "@/lib/static/asset-paths";

export function MidHeroVideo() {
	const mediaRootRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const [videoLoaded, setVideoLoaded] = useState(false);
	const [inView, setInView] = useState(false);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
	const posterSrc = ASSETS.midHero.poster as string;

	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setPrefersReducedMotion(mq.matches);
		const handler = () => setPrefersReducedMotion(mq.matches);
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);

	useEffect(() => {
		const el = mediaRootRef.current;
		if (!el) return;
		const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
			rootMargin: "160px",
			threshold: 0.1,
		});
		obs.observe(el);
		return () => obs.disconnect();
	}, []);

	useEffect(() => {
		const v = videoRef.current;
		if (!v) return;
		if (prefersReducedMotion || !inView) {
			v.pause();
			return;
		}
		v.play().catch(() => {});
	}, [inView, prefersReducedMotion]);

	return (
		<header className="relative min-h-[45vh] sm:min-h-[50vh] md:min-h-[55vh] lg:min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#010101] py-12 sm:py-16 md:py-20">
			<div ref={mediaRootRef} className="absolute inset-0 bg-[#010101]">
				{posterSrc ? (
					<Image
						src={posterSrc}
						alt=""
						fill
						className="object-cover"
						sizes="100vw"
						loading="lazy"
						unoptimized={posterSrc.startsWith("/videos/")}
					/>
				) : null}
				{inView && !prefersReducedMotion && (
					<video
						ref={videoRef}
						className="absolute inset-0 w-full h-full object-cover opacity-0 data-ready:opacity-100 transition-opacity duration-500"
						muted
						playsInline
						loop
						preload="none"
						onLoadedData={() => setVideoLoaded(true)}
						data-ready={videoLoaded ? "" : undefined}
					>
						{ASSETS.midHero.webm ? <source src={ASSETS.midHero.webm} type="video/webm" /> : null}
						<source src={ASSETS.midHero.mp4} type="video/mp4" />
					</video>
				)}
				<div className="absolute inset-0 bg-black/30" aria-hidden />
			</div>
			<div className="relative z-10 flex items-center justify-center w-full px-4 sm:px-6 lg:px-8">
				<div className="relative w-64 h-16 sm:w-80 sm:h-20 md:w-96 md:h-24 lg:w-104 lg:h-28">
					<Image
						src={ASSETS.midHero.logo}
						alt="Neutronic"
						fill
						className="object-contain object-center"
						sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, (max-width: 1024px) 384px, 416px"
					/>
				</div>
			</div>
		</header>
	);
}
