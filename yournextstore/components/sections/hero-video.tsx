"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ASSETS } from "@/lib/static/asset-paths";

type HeroVideoProps = {
	poster: string;
	mp4: string;
	webm: string;
	title: string;
	subtitle: string;
	ctaPrimary?: { label: string; href: string };
	ctaSecondary?: { label: string; href: string };
};

export function HeroVideo({
	poster,
	mp4,
	webm,
	title,
	subtitle,
	ctaPrimary,
	ctaSecondary,
}: HeroVideoProps) {
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
			([e]) => {
				setInView(e.isIntersecting);
			},
			{ rootMargin: "50px", threshold: 0.1 }
		);
		obs.observe(el);
		return () => obs.disconnect();
	}, []);

	useEffect(() => {
		if (prefersReducedMotion || !inView || !videoRef.current) return;
		const v = videoRef.current;
		v.play().catch(() => {});
	}, [inView, prefersReducedMotion]);

	return (
		<header className="relative flex-1 min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#010101]">
			<div className="absolute inset-0 bg-[#010101]">
				{poster ? (
					<Image
						src={poster}
						alt=""
						fill
						className="object-cover"
						sizes="100vw"
						priority
						unoptimized={poster.startsWith("/videos/")}
					/>
				) : null}
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
					{webm ? <source src={webm} type="video/webm" /> : null}
					<source src={mp4} type="video/mp4" />
				</video>
				<div className="absolute inset-0 bg-black/40" aria-hidden />
			</div>

			<div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.375rem] font-semibold italic text-primary tracking-tight max-w-4xl mx-auto leading-tight">
					{title}
				</h1>
				<p className="mt-4 sm:mt-5 md:mt-6 text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
					{subtitle}
				</p>
				<div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
					{ctaPrimary && (
						<Link
							href={ctaPrimary.href}
							className="inline-flex items-center justify-center min-h-[48px] px-6 sm:px-8 bg-primary text-primary-foreground rounded-full text-base font-semibold hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#010101]"
						>
							{ctaPrimary.label}
						</Link>
					)}
					{ctaSecondary && (
						<Link
							href={ctaSecondary.href}
							className="inline-flex items-center justify-center min-h-[48px] px-6 sm:px-8 border border-white/30 text-white rounded-full text-base font-medium hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#010101]"
						>
							{ctaSecondary.label}
						</Link>
					)}
				</div>
			</div>
		</header>
	);
}

export function HomeHero() {
	return (
		<HeroVideo
			poster={ASSETS.hero.poster}
			mp4={ASSETS.hero.mp4}
			webm={ASSETS.hero.webm}
			title="For Those Who Can't Stop"
			subtitle="Courier-tough eBikes, built for bad streets and worse weather."
			ctaPrimary={{ label: "Discover Journey", href: "/product/excalibur-journey" }}
			ctaSecondary={{ label: "Discover Hunter", href: "/product/excalibur-hunter" }}
		/>
	);
}
