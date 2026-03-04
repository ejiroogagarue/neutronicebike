import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { HomeProductBlock } from "@/components/sections/home-product-block";
import { RentalHero } from "@/components/sections/rental-hero";
import { RentalSignupForm } from "@/components/sections/rental-signup-form";
import { ASSETS } from "@/lib/static/asset-paths";
import { formatRentalPrice, getRentalPlans } from "@/lib/static/rental-plans";
import {
	BODY_COPY,
	BUTTON_PILL_PRIMARY,
	HEADING_SECTION,
	SECTION_CONTAINER,
	SECTION_DIVIDER_TOP,
	SECTION_Y,
} from "@/lib/ui-classes";

export const metadata = {
	title: "Rental — Neutronic",
	description: "High-performance e-bike rentals for modern couriers. Excalibur rentals.",
	alternates: {
		canonical: "/rental",
	},
};

/** Exact pill + body from product-detail Key Features (reference) */
const pillTitleClass =
	"bg-white text-foreground text-[0.8rem] sm:text-[0.85rem] lg:text-[0.9rem] font-bold italic leading-8 sm:leading-9 pl-[3%] pr-3 rounded-r-xl sm:rounded-r-2xl w-[88%] sm:w-[90%]";
const yellowBodyClass =
	"text-[0.8rem] sm:text-[0.85rem] lg:text-[0.9rem] font-medium leading-snug sm:leading-relaxed text-primary-foreground/90 px-[5%] pt-2 sm:pt-2.5";

export default function RentalPage() {
	const plans = getRentalPlans();

	return (
		<main className="min-h-screen bg-[#fdfdfd] text-foreground overflow-x-hidden">
			<RentalHero />

			{/* Built for the hustle — full-width yellow bar (Journey-header style), not a card */}
			<section className="w-full" aria-labelledby="hustle-heading">
				<div className="bg-primary flex flex-col gap-2.5 py-[1.5%] px-[5%] rounded-b-xl sm:rounded-none min-h-0">
					<div className="max-w-7xl mx-auto w-full flex flex-col gap-2.5 min-w-0">
						<h2 id="hustle-heading" className="text-primary-foreground text-xl sm:text-2xl font-bold italic">
							Built For The Hustle
						</h2>
						<p className="text-primary-foreground text-[1rem] sm:text-[1.1rem] font-medium leading-relaxed max-w-2xl">
							E-bikes for couriers and gig workers. Power, range, and support included.
						</p>
						<ul className="text-primary-foreground/90 text-sm sm:text-base font-medium space-y-1">
							<li>Courier-spec power &amp; range</li>
							<li>Maintenance included</li>
							<li>Weekly to annual plans</li>
						</ul>
					</div>
				</div>
			</section>

			<div className={`${SECTION_CONTAINER} ${SECTION_Y}`}>
				{/* Plans — information only: pill + price + features + CTA, no image placeholder */}
				<section id="plans" className={SECTION_DIVIDER_TOP} aria-labelledby="plans-heading">
					<h2
						id="plans-heading"
						className={`${HEADING_SECTION} text-foreground mb-4 sm:mb-6 uppercase tracking-wide`}
					>
						Pick a plan that matches your schedule
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
						{plans.map((plan) => {
							const isMostPopular = plan.id === "gig-economy";
							return (
								<article
									key={plan.id}
									className="rounded-2xl overflow-hidden flex flex-col min-w-0 bg-primary text-primary-foreground"
								>
									<div className="pt-3 sm:pt-4 pb-4 sm:pb-5 px-4 sm:px-5 flex-1 flex flex-col">
										<h3 className={pillTitleClass}>{plan.name}</h3>
										{isMostPopular && (
											<span className="inline-flex items-center self-start mt-2 px-2.5 py-1 text-xs font-semibold rounded-full bg-foreground/15 text-foreground">
												Most popular
											</span>
										)}
										<p className={`${yellowBodyClass} font-semibold text-foreground`}>
											{formatRentalPrice(plan.price)}/week
										</p>
										{plan.description && <p className={yellowBodyClass}>{plan.description}</p>}
										<ul className={`${yellowBodyClass} list-disc list-inside space-y-1 pb-2`}>
											{plan.features.map((f) => (
												<li key={f}>{f}</li>
											))}
										</ul>
										<Link
											href={`/rental?plan=${plan.id}#signup`}
											className={`${BUTTON_PILL_PRIMARY} mt-auto w-full bg-foreground text-primary focus-visible:ring-foreground focus-visible:ring-offset-primary`}
										>
											Get started
										</Link>
									</div>
								</article>
							);
						})}
					</div>
				</section>
			</div>

			{/* Signup — full-width section, content constrained inside */}
			<section
				id="signup"
				className={`w-full ${SECTION_DIVIDER_TOP} bg-[#fdfdfd]`}
				aria-labelledby="signup-heading"
			>
				<div className={`${SECTION_CONTAINER} ${SECTION_Y}`}>
					<h2 id="signup-heading" className={`${HEADING_SECTION} text-foreground mb-2`}>
						Get started
					</h2>
					<p className={`${BODY_COPY} mb-4 sm:mb-6 max-w-xl`}>
						We&apos;ll send you the next steps and confirm your plan. No commitment until you pick up your
						bike.
					</p>
					<div className="max-w-md w-full min-h-[280px] sm:min-h-[300px]">
						<Suspense
							fallback={
								<div className="h-[280px] sm:h-[300px] animate-pulse rounded-lg bg-muted" aria-hidden />
							}
						>
							<RentalSignupForm variant="signup" />
						</Suspense>
					</div>
				</div>
			</section>

			<div className={`${SECTION_CONTAINER} pb-6 sm:pb-8 lg:pb-10`}>
				{/* How rental works — info only, no image blocks */}
				<section className={SECTION_DIVIDER_TOP} aria-labelledby="how-heading">
					<h2 id="how-heading" className={`${HEADING_SECTION} text-foreground mb-4 sm:mb-6`}>
						How rental works
					</h2>
					<div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-2">
						<div className="rounded-2xl overflow-hidden flex flex-col flex-1 min-w-0 min-h-[120px] sm:min-h-0 bg-primary text-primary-foreground pt-2 sm:pt-2.5 pb-3 sm:pb-4">
							<h3 className={pillTitleClass}>1. Choose your plan</h3>
							<p className={yellowBodyClass}>
								Pick weekly, monthly, or annual depending on how often you ride and how serious your hustle
								is.
							</p>
						</div>
						<ArrowRightIcon
							className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground self-center rotate-90 lg:rotate-0"
							aria-hidden
						/>
						<div className="rounded-2xl overflow-hidden flex flex-col flex-1 min-w-0 min-h-[120px] sm:min-h-0 bg-primary text-primary-foreground pt-2 sm:pt-2.5 pb-3 sm:pb-4">
							<h3 className={pillTitleClass}>2. Pick up your Excalibur</h3>
							<p className={yellowBodyClass}>
								We set up the bike, fit you, and walk you through controls, charging, and best practices.
							</p>
						</div>
						<ArrowRightIcon
							className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground self-center rotate-90 lg:rotate-0"
							aria-hidden
						/>
						<div className="rounded-2xl overflow-hidden flex flex-col flex-1 min-w-0 min-h-[120px] sm:min-h-0 bg-primary text-primary-foreground pt-2 sm:pt-2.5 pb-3 sm:pb-4">
							<h3 className={pillTitleClass}>3. Ride and earn</h3>
							<p className={yellowBodyClass}>
								Use the bike for work or personal riding. We handle ongoing maintenance so you can stay on the
								road.
							</p>
						</div>
					</div>
				</section>
			</div>

			{/* Lifestyle image — fixed aspect for CLS, no gap to cross-sell */}
			<section className="w-full mt-6 sm:mt-8 lg:mt-10">
				<div className="relative w-full aspect-16/10 sm:aspect-21/9 bg-muted">
					<Image
						src={ASSETS.rental.sectionImage}
						alt="Courier riding an Excalibur e-bike"
						fill
						className="object-cover"
						sizes="100vw"
						loading="lazy"
					/>
				</div>
			</section>

			{/* Cross-sell — flush under image, tighter copy */}
			<section className="w-full bg-primary">
				<div className={`${SECTION_CONTAINER} ${SECTION_Y}`}>
					<h2 className={`${HEADING_SECTION} text-foreground`}>Prefer to own?</h2>
					<p className="mt-2 sm:mt-3 max-w-2xl text-sm sm:text-base text-foreground/90">
						Excalibur Journey: same courier-tough build. Yours for good.
					</p>
				</div>
			</section>

			<HomeProductBlock
				variant="journey"
				productName="Excalibur Journey"
				tagline="For urban explorers who need comfort, distance, and quiet strength day after day."
				productSlug="excalibur-journey"
				ctaLabel="Explore Journey ownership"
				priceCents={459900}
			/>
		</main>
	);
}
