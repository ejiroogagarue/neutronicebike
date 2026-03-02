/**
 * Static rental plan data for Neutronic.
 * Shape aligned with DESIGN-SYSTEM.md §12 for future Convex migration.
 */

export type RentalPlan = {
	id: string;
	slug: string;
	name: string;
	price: number; // cents
	interval: "week" | "month";
	description?: string;
	features: string[];
	contract?: string;
};

export const rentalPlans: RentalPlan[] = [
	{
		id: "side-hustler",
		slug: "side-hustler",
		name: "Side Hustler Ready",
		price: 5900, // $59 in cents
		interval: "week",
		description: "For part-time riders, weekend earners, and testing the hustle.",
		features: [
			"Weekly — no long-term commitment",
			"$500 refundable deposit",
			"Best for side hustle and weekend riding",
		],
	},
	{
		id: "gig-economy",
		slug: "gig-economy",
		name: "Gig Economy Ready",
		price: 18900, // $189/week in cents
		interval: "week",
		description: "For full-time couriers who live on the bike.",
		features: ["Month-to-month flexibility", "3-month minimum term", "No deposit required"],
		contract: "3 Month Contract",
	},
	{
		id: "gig-master",
		slug: "gig-master",
		name: "Gig Master Ready",
		price: 15900, // $159/week in cents
		interval: "week",
		description: "For riders who want maximum uptime and lowest weekly cost.",
		features: ["Annual plan", "12-month contract", "No deposit required"],
		contract: "12 Month Contract",
	},
];

export function getRentalPlans(): RentalPlan[] {
	return rentalPlans;
}

export function formatRentalPrice(cents: number): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
	}).format(cents / 100);
}
