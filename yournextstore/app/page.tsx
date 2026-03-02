import { HomeHero } from "@/components/sections/hero-video";
import { HomeProductBlock } from "@/components/sections/home-product-block";
import { MidHeroVideo } from "@/components/sections/mid-hero-video";
import { Newsletter } from "@/components/sections/newsletter";
import { TrustBar } from "@/components/sections/trust-bar";

export default function Home() {
	return (
		<main className="overflow-x-hidden">
			<div className="min-h-screen flex flex-col">
				<HomeHero />
				<TrustBar />
			</div>
			<HomeProductBlock
				variant="journey"
				productName="Excalibur Journey"
				tagline="For urban explorers who need comfort, distance, and quiet strength day after day."
				productSlug="excalibur-journey"
				ctaLabel="Explore Journey"
				priceCents={200000}
				priorityFirstImage
			/>
			<MidHeroVideo />
			<HomeProductBlock
				variant="hunter"
				productName="Excalibur Hunter"
				tagline="All terrain beast, built for raw climbs, brutal streets and total control at speed."
				productSlug="excalibur-hunter"
				ctaLabel="Explore Hunter"
				priceCents={402900}
			/>
			<Newsletter />
		</main>
	);
}
