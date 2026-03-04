export type StaticAccessory = {
	id: string;
	slug: string;
	name: string;
	tagline: string;
	description: string;
	images: string[];
	highlights: string[];
	/** Stripe price identifier for this accessory (to be filled once Stripe is configured). */
	stripePriceId?: string;
};

export const staticAccessories: StaticAccessory[] = [
	{
		id: "rhino-battery",
		slug: "rhino-battery",
		name: "Rhino Battery",
		tagline: "Extra range when your day runs long.",
		description:
			"Add-on battery option designed for riders who want more miles between charges. Reach out to confirm compatibility and availability.",
		images: [
			"/AccessoriesPage/RhinoBattery/01.webp",
			"/AccessoriesPage/RhinoBattery/02.webp",
			"/AccessoriesPage/RhinoBattery/03.webp",
			"/AccessoriesPage/RhinoBattery/04.webp",
			"/AccessoriesPage/RhinoBattery/05.webp",
		],
		highlights: ["Range extender", "Courier-friendly upgrade", "Compatibility confirmation required"],
	},
	{
		id: "kirin-battery",
		slug: "kirin-battery",
		name: "Kirin Battery",
		tagline: "Compact, reliable, ready to ride.",
		description:
			"Accessory battery option for Neutronic builds. Get in touch to confirm fitment, pricing, and current stock.",
		images: [
			"/AccessoriesPage/KirinBattery/01.webp",
			"/AccessoriesPage/KirinBattery/02.webp",
			"/AccessoriesPage/KirinBattery/03.webp",
		],
		highlights: ["Battery accessory", "Availability varies", "Confirm fitment before purchase"],
	},
];

export function getStaticAccessories(): StaticAccessory[] {
	return staticAccessories;
}

export function getAccessoryBySlug(slug: string): StaticAccessory | undefined {
	return staticAccessories.find((a) => a.slug === slug);
}
