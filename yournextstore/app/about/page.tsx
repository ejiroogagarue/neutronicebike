import Image from "next/image";
import { Newsletter } from "@/components/sections/newsletter";
import { ASSETS } from "@/lib/static/asset-paths";
import { SECTION_CONTAINER } from "@/lib/ui-classes";

export const metadata = {
	title: "About — Neutronic",
	description: "About Neutronic. Courier-tough eBikes for those who can't stop.",
	alternates: {
		canonical: "/about",
	},
};

const pillClasses =
	"bg-primary text-[#0a0d0f] font-bold italic pl-[5%] pr-4 rounded-r-2xl sm:rounded-r-3xl w-[70%] sm:w-[55%] lg:w-[40%] text-[1.4rem] sm:text-[2rem] lg:text-[2.8rem] leading-[3rem] sm:leading-[3.5rem] lg:leading-[4.5rem]";

const bodyClasses =
	"text-primary text-justify text-[0.938rem] sm:text-base lg:text-[1.1rem] leading-relaxed sm:leading-[26px]";

export default function AboutPage() {
	return (
		<main className="min-h-screen bg-[#0a0d0f] overflow-x-hidden">
			<div className={SECTION_CONTAINER}>
				{/* Our History */}
				<div className="pt-6 sm:pt-8 lg:pt-10">
					<h1 className={pillClasses}>Our History</h1>
				</div>
			</div>

			{/* History image — full-bleed, fixed aspect for CLS */}
			<div className="mt-2 sm:mt-3 w-full relative aspect-3/2 bg-[#0a0d0f]">
				<Image
					src={ASSETS.about.history}
					alt="Neutronic — Evans on the road"
					fill
					className="object-cover"
					sizes="100vw"
					priority
				/>
			</div>

			{/* History text */}
			<div
				className={`${SECTION_CONTAINER} flex flex-col gap-4 sm:gap-5 pt-4 sm:pt-5 lg:pt-6 pb-6 sm:pb-8 lg:pb-10`}
			>
				<p className={bodyClasses}>
					Evans, the founder and driving force behind Neutronic Ebike, has been a stalwart in the world of
					independent delivery biking since 2015. Over the years, he has encountered a myriad of challenges,
					each met with unwavering determination. In 2017, a life-altering fall left him with a lifelong knee
					injury, a setback that could have deterred a lesser individual. However, Evans&apos;s indomitable
					spirit shone through as he continued to pursue his passion for biking. Under his steadfast
					leadership, Neutronic Ebike has not only weathered the storm but thrived, leaving an indelible mark
					on the delivery industry.
				</p>
				<p className={bodyClasses}>
					In 2019, Evans made a pivotal decision to transition to electric bicycles, a move that quickly
					transformed this mode of transportation from a side hustle into his primary source of livelihood.
					With a profound background spanning three decades in the bicycle industry, Evans remains at the
					forefront by engaging in hands-on research and staying ahead of the competition. His proactive
					approach has led to the exploration of new business horizons, ensuring that Neutronic Ebike remains
					at the cutting edge of innovation.
				</p>
				<p className={bodyClasses}>
					At Neutronic Ebike, Evans&apos;s personal journey shapes the core values and mission of the company.
					He intimately understands the imperative of offering electric bicycles that are not only of the
					highest quality but also exceedingly reliable, catering to the diverse needs of riders, including
					delivery couriers and the broader community. Evans&apos;s unwavering dedication to the business,
					coupled with his profound expertise, has elevated Neutronic Ebike into a trusted and esteemed
					provider of electric bicycles. Even in the face of adversity, Evans&apos;s resilience and
					determination remain the driving force propelling Neutronic Ebike to unparalleled success, leaving
					an indelible positive impact on the delivery industry and far beyond.
				</p>
			</div>

			{/* Mission — section spacing per §15.15 */}
			<div
				className={`${SECTION_CONTAINER} mt-6 sm:mt-8 lg:mt-10 border-t border-white/10 pt-5 sm:pt-6 lg:pt-8`}
			>
				<h2 className={pillClasses}>Mission</h2>
			</div>

			<div
				className={`${SECTION_CONTAINER} flex flex-col gap-4 sm:gap-5 pt-4 sm:pt-5 lg:pt-6 pb-6 sm:pb-8 lg:pb-10`}
			>
				<div className="w-[80%] sm:w-[65%] lg:w-[50%] mx-auto">
					<Image
						src={ASSETS.about.missionLogo}
						alt="Neutronic logo"
						width={1024}
						height={1024}
						className="w-full h-auto"
						sizes="(max-width: 640px) 80vw, (max-width: 1024px) 65vw, 50vw"
						loading="lazy"
					/>
				</div>
				<p className={bodyClasses}>
					At Neutronic Ebikes, our mission stands at the forefront of our purpose: to spearhead a global
					transformation towards electric mobility. We firmly believe that the journey to an electrified
					future encompasses all aspects of transportation, and electric bicycles play a pivotal role in this
					monumental shift. Our unwavering commitment is to offer exceptional long-range electric bikes to our
					valued customers, igniting the progress towards sustainable transport on a massive scale.
				</p>
				<p className={bodyClasses}>
					Our aspirations extend far beyond mere innovation; we seek to expedite the arrival of a world where
					transportation is synonymous with sustainability. Through our endeavors, we aim to champion not only
					eco-conscious practices but also the enhancement of health and overall well-being for all
					individuals.
				</p>
				<p className={bodyClasses}>
					At Neutronic Ebikes, our mission is not merely a statement but a relentless pursuit that propels us
					forward every day. Join us in the journey toward a cleaner, healthier, and more sustainable world.
				</p>
			</div>

			{/* Vision — section spacing per §15.15 */}
			<div
				className={`${SECTION_CONTAINER} mt-6 sm:mt-8 lg:mt-10 border-t border-white/10 pt-5 sm:pt-6 lg:pt-8`}
			>
				<h2 className={pillClasses}>Vision</h2>
			</div>

			<div
				className={`${SECTION_CONTAINER} flex flex-col gap-4 sm:gap-5 pt-4 sm:pt-5 lg:pt-6 pb-6 sm:pb-8 lg:pb-10`}
			>
				<p className={bodyClasses}>
					At Neutronic Ebikes, our vision is clear and concise: to be the top provider of high-end, long-range
					electric bicycles. We&apos;re dedicated to relentless growth and innovation, consistently exceeding
					customer expectations. Guided by our values of integrity, service, excellence, and teamwork, we
					strive to make a positive impact on the world through our products and services.
				</p>
			</div>

			<Newsletter />
		</main>
	);
}
