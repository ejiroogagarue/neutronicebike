"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ASSETS } from "@/lib/static/asset-paths";
import { RentalSignupForm } from "@/components/sections/rental-signup-form";

export function RentalHero() {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [videoLoaded, setVideoLoaded] = useState(false);
	const [inView, setInView] = useState(false);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setPrefersReducedMotion(mq.matches);
		const handler = () => setPrefersReducedMotion(mq.matches);
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);

	useEffect(() => {
		const el = videoRef.current;
		if (!el) return;
		const obs = new IntersectionObserver(
			([e]) => setInView(e.isIntersecting),
			{ rootMargin: "50px", threshold: 0.1 }
		);
		obs.observe(el);
		return () => obs.disconnect();
	}, []);

	useEffect(() => {
		if (prefersReducedMotion || !inView || !videoRef.current) return;
		videoRef.current.play().catch(() => {});
	}, [inView, prefersReducedMotion]);

	return (
		<header className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#010101]" style={{ minHeight: "80dvh" }}>
			{/* Fixed aspect area for poster/video — CLS-safe */}
			<div className="absolute inset-0 min-h-[80vh]">
				<Image
					src={ASSETS.rental.poster}
					alt=""
					fill
					className="object-cover"
					sizes="100vw"
					priority
					fetchPriority="high"
					unoptimized={ASSETS.rental.poster.startsWith("/videos/")}
				/>
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
					{ASSETS.rental.webm && <source src={ASSETS.rental.webm} type="video/webm" />}
					<source src={ASSETS.rental.mp4} type="video/mp4" />
				</video>
				<div className="absolute inset-0 bg-black/40" aria-hidden />
			</div>
			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
				<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold italic text-[#ffff01] max-w-2xl mx-auto leading-tight">
					EXCALIBUR E-Bike Rentals
				</h1>
				<p className="mt-3 sm:mt-4 text-sm sm:text-base text-white/90 max-w-md mx-auto">
					E-bikes for couriers. Weekly plans. No big upfront cost.
				</p>
				<Link
					href="#plans"
					className="inline-flex items-center justify-center min-h-[44px] sm:min-h-[48px] px-6 sm:px-8 mt-6 sm:mt-8 bg-primary text-primary-foreground rounded-full text-sm sm:text-base font-semibold hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#010101]"
				>
					Rent A Bike
				</Link>
				<p className="mt-3 sm:mt-4 text-xs sm:text-sm text-white/80">Get updates.</p>
				<div className="mt-2 sm:mt-3 w-full max-w-md mx-auto min-h-[44px]">
					<RentalSignupForm variant="hero" className="w-full" />
				</div>
			</div>
		</header>
	);
}
