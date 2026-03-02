import Image from "next/image";
import { ASSETS } from "@/lib/static/asset-paths";

const TRUST_ITEMS = [
	{ label: "Free Worldwide Shipping", icon: ASSETS.trust.shipping },
	{ label: "95% Assembled", icon: ASSETS.trust.assembled },
	{ label: "12-Month Warranty", icon: ASSETS.trust.warranty },
	{ label: "Premium Build Quality", icon: ASSETS.trust.protection },
] as const;

export function TrustBar() {
	return (
		<section className="bg-primary shrink-0 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12" aria-label="Service highlights">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
					{TRUST_ITEMS.map(({ label, icon }) => (
						<div
							key={label}
							className="flex flex-col items-center gap-2 sm:gap-3 text-center"
						>
							<div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0">
								<Image
									src={icon}
									alt=""
									width={48}
									height={48}
									loading="lazy"
									className="object-contain"
								/>
							</div>
							<span className="text-sm sm:text-base font-medium text-primary-foreground wrap-break-word">{label}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
