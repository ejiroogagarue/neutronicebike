import { mutation } from "./_generated/server";

const JOURNEY_VARIANTS = [
	{
		id: "journey-yellow",
		name: "Yellow",
		slug: "yellow",
		price: 459900,
		currency: "USD",
		image: "/images/Journey-yellow.png",
		stripePriceId: "price_1T6chaFUF1mqoB36aO1THbLv",
		attributes: { Color: "Yellow" },
	},
	{
		id: "journey-red",
		name: "Red",
		slug: "red",
		price: 459900,
		currency: "USD",
		image: "/images/Journey-red.png",
		stripePriceId: "price_1T6v02FUF1mqoB36uaWnTXtE",
		attributes: { Color: "Red" },
	},
	{
		id: "journey-green",
		name: "Green",
		slug: "green",
		price: 459900,
		currency: "USD",
		image: "/images/Journey-green.png",
		stripePriceId: "price_1T6v0pFUF1mqoB36GWSTYjSa",
		attributes: { Color: "Green" },
	},
	{
		id: "journey-blue",
		name: "Blue",
		slug: "blue",
		price: 459900,
		currency: "USD",
		image: "/images/Journey-blue.png",
		stripePriceId: "price_1T6v2oFUF1mqoB36HaqrGQyF",
		attributes: { Color: "Blue" },
	},
	{
		id: "journey-brown",
		name: "Brown",
		slug: "brown",
		price: 459900,
		currency: "USD",
		image: "/images/Journey-brown.png",
		stripePriceId: "price_1T6v6RFUF1mqoB365bwhN2Eh",
		attributes: { Color: "Brown" },
	},
	{
		id: "journey-black",
		name: "Black",
		slug: "black",
		price: 459900,
		currency: "USD",
		image: "/images/Journey-black.png",
		stripePriceId: "price_1T6v8cFUF1mqoB36XJgfb9iQ",
		attributes: { Color: "Black" },
	},
];

const HUNTER_VARIANTS = [
	{
		id: "hunter-yellow",
		name: "Yellow",
		slug: "yellow",
		price: 305300,
		currency: "USD",
		image: "/images/Hunter-yellow.png",
		stripePriceId: "price_1T6v9dFUF1mqoB36XuDBoR52",
		attributes: { Color: "Yellow" },
	},
	{
		id: "hunter-red",
		name: "Red",
		slug: "red",
		price: 305300,
		currency: "USD",
		image: "/images/Hunter-red.png",
		stripePriceId: "price_1T6vALFUF1mqoB36cRgp302a",
		attributes: { Color: "Red" },
	},
	{
		id: "hunter-green",
		name: "Green",
		slug: "green",
		price: 305300,
		currency: "USD",
		image: "/images/Hunter-green.png",
		stripePriceId: "price_1T6vCTFUF1mqoB36GReVPVOC",
		attributes: { Color: "Green" },
	},
	{
		id: "hunter-blue",
		name: "Blue",
		slug: "blue",
		price: 305300,
		currency: "USD",
		image: "/images/Hunter-blue.png",
		stripePriceId: "price_1T6vD6FUF1mqoB36SaE8TzFZ",
		attributes: { Color: "Blue" },
	},
	{
		id: "hunter-brown",
		name: "Brown",
		slug: "brown",
		price: 305300,
		currency: "USD",
		image: "/images/Hunter-brown.png",
		stripePriceId: "price_1T6vDhFUF1mqoB36JHqrCYLf",
		attributes: { Color: "Brown" },
	},
	{
		id: "hunter-black",
		name: "Black",
		slug: "black",
		price: 305300,
		currency: "USD",
		image: "/images/Hunter-black.png",
		stripePriceId: "price_1T6vEBFUF1mqoB36J1gsznCz",
		attributes: { Color: "Black" },
	},
];

export const seedProducts = mutation({
	args: {},
	handler: async (ctx) => {
		const existing = await ctx.db.query("products").first();
		if (existing) {
			console.log("Products already seeded, skipping");
			return { seeded: 0 };
		}
		await ctx.db.insert("products", {
			slug: "excalibur-journey",
			name: "Excalibur Journey",
			tagline: "Endless range. Smooth ride. Built for the long haul.",
			description:
				"Single motor, dual battery, maximum range — designed for couriers and long-distance riders who measure their day in kilometres, not minutes. Quiet, efficient, relentless.",
			shortDescription: "For urban explorers who need comfort, distance, and quiet strength day after day.",
			price: 459900,
			currency: "USD",
			images: ["/images/FrontView.jpg", "/images/SideView.jpg", "/images/BackView.jpg"],
			variants: JOURNEY_VARIANTS,
			motor: "2000W Rear Hub",
			battery: "Dual 35Ah",
			quickStats: [
				{ label: "Motor", value: "2000W Rear Hub" },
				{ label: "Battery", value: "Dual 35Ah" },
				{ label: "Top Speed", value: "75 km/h" },
				{ label: "Range", value: "Up to 128 km" },
				{ label: "Torque", value: "90 Nm" },
				{ label: "Rider Height", value: "5'2\" – 6'5\"" },
			],
			features: [
				{
					image: "/ProductDetail/ExcaliburJourney/Details/TrueDualSuspension.avif",
					title: "True Dual Suspension",
					description: "Full suspension, standard. Absorbs every pothole so you don't have to.",
				},
				{
					image: "/ProductDetail/ExcaliburJourney/Details/2000WattRearHubMotor.avif",
					title: "2000W Rear Hub Motor",
					description: "2000W. 90 Nm torque. Climbs hills like they're flat.",
				},
				{
					image: "/ProductDetail/ExcaliburJourney/Details/TailLight.avif",
					title: "Taillight",
					description: "High beam, low beam, brake light. Visible from every angle, day or night.",
				},
				{
					image: "/ProductDetail/ExcaliburJourney/Details/RearRackAndMudguards.avif",
					title: "Rear Rack & Mudguards",
					description: "Haul groceries, delivery bags, whatever. Stay dry doing it. Standard on every bike.",
				},
				{
					image: "/ProductDetail/ExcaliburJourney/Details/ColourDisplay.avif",
					title: "Colour Display",
					description: "Speed, battery, distance — all at a glance. Rides smart so you can ride hard.",
				},
			],
			specs: [
				{
					category: "Motor",
					rows: [
						{ label: "Motor", value: "2000W Rear Hub" },
						{ label: "Controller", value: "60A" },
					],
				},
				{ category: "Gearing", rows: [{ label: "Gears", value: "8-speed with 9-speed capability PAS" }] },
				{ category: "Display", rows: [{ label: "Display", value: "TFT UKC1 LCD with Bluetooth" }] },
				{ category: "Speed", rows: [{ label: "Top Speed", value: "75 km/h" }] },
				{
					category: "Power",
					rows: [
						{ label: "Throttle", value: "100% Power on Demand" },
						{ label: "Pedal Assist", value: "5 Levels" },
					],
				},
				{
					category: "Battery",
					rows: [
						{ label: "Primary", value: "52V 20Ah Samsung 21700 50E (1040Wh)" },
						{ label: "Secondary", value: "52V 15Ah Samsung 21700 50E (780Wh)" },
					],
				},
				{
					category: "Range",
					rows: [
						{ label: "Primary", value: "Up to 94 km" },
						{ label: "Primary + Secondary", value: "Up to 128 km" },
					],
				},
				{
					category: "Charging",
					rows: [
						{ label: "Charge Cycle", value: "800" },
						{ label: "Charge Time", value: "5 Hours" },
					],
				},
				{
					category: "Frameset",
					rows: [
						{ label: "Frame", value: "6061 Aluminum Alloy" },
						{ label: "Fork", value: "WIBEE Aluminum Oil Lock Suspension" },
					],
				},
				{
					category: "Wheels",
					rows: [
						{ label: "Tire", value: "Kenda Nevegal X" },
						{ label: "Size", value: '26" × 4.0"' },
						{ label: "Rim", value: "Double Wall" },
					],
				},
				{
					category: "Drivetrain",
					rows: [
						{ label: "Shifter", value: "Shimano Rapid Fire 9-Speed" },
						{ label: "Derailleur", value: "Shimano Alivio" },
						{ label: "Crank", value: "44T Single Guard" },
						{ label: "Cassette", value: "11-34T 9-Speed" },
						{ label: "Pedal", value: "Viger D249 Bigfoot" },
					],
				},
				{
					category: "Components",
					rows: [
						{ label: "Saddle", value: "Selle Royal LOOKIN Basic (GEL)" },
						{ label: "Brakes", value: "XOD D610 Hydraulic Disc 200/180mm" },
						{ label: "Brake Lever", value: "Safety Motor Inhibitors" },
						{ label: "PAS Sensor", value: "Torque & Dual Speed" },
					],
				},
				{
					category: "Weight",
					rows: [
						{ label: "Weight", value: "70 lbs (incl. battery)" },
						{ label: "Load Capacity", value: "375 lbs" },
						{ label: "Height Range", value: "5'2\" – 6'5\"" },
					],
				},
			],
		});
		await ctx.db.insert("products", {
			slug: "excalibur-hunter",
			name: "Excalibur Hunter",
			tagline: "All-terrain beast. Dual motors. Total control at speed.",
			description:
				"Dual 1000W hub motors, dual 35Ah Samsung batteries, and dual suspension — built to eat hills, haul weight, and outlast everything. Configure single or dual to match how you ride.",
			shortDescription: "All terrain beast, built for raw climbs, brutal streets and total control at speed.",
			price: 305300,
			currency: "USD",
			images: ["/images/Yellow.jpg", "/images/Red.jpg", "/images/Green_1.png"],
			variants: HUNTER_VARIANTS,
			motor: "Dual 1000W Hub",
			battery: "Dual 35Ah",
			quickStats: [
				{ label: "Motors", value: "Dual 1000W Hub" },
				{ label: "Battery", value: "Dual 35Ah" },
				{ label: "Top Speed", value: "70 km/h" },
				{ label: "Range", value: "Up to 106 km" },
				{ label: "Pedal Assist", value: "5 Levels" },
				{ label: "Rider Height", value: "5'2\" – 6'5\"" },
			],
			features: [
				{
					image: "/ProductDetail/ExcaliburHunter/Details/TrueDualSuspension.avif",
					title: "True Dual Suspension",
					description: "Full suspension, standard. Absorbs every pothole so you don't have to.",
				},
				{
					image: "/ProductDetail/ExcaliburHunter/Details/RearHubMotor.avif",
					title: "Dual 1000W Hub Motors",
					description: "Twin-motor torque. 90 Nm per wheel. Hills don't exist anymore.",
				},
				{
					image: "/ProductDetail/ExcaliburHunter/Details/TailLight.avif",
					title: "Taillight",
					description: "High beam, low beam, brake light. Visible from every angle, day or night.",
				},
				{
					image: "/ProductDetail/ExcaliburHunter/Details/RearRackAndMudguards.avif",
					title: "Rear Rack & Mudguards",
					description: "Haul groceries, delivery bags, whatever. Stay dry doing it. Standard on every bike.",
				},
				{
					image: "/ProductDetail/ExcaliburHunter/Details/ColourDisplay.avif",
					title: "Colour Display",
					description: "Speed, battery, distance — all at a glance. Rides smart so you can ride hard.",
				},
			],
			specs: [
				{
					category: "Motor",
					rows: [
						{ label: "Motor", value: "Dual 1000W Hub" },
						{ label: "Controller", value: "60A" },
					],
				},
				{ category: "Speed", rows: [{ label: "Top Speed", value: "70 km/h" }] },
				{
					category: "Power",
					rows: [
						{ label: "Throttle", value: "100% Power on Demand" },
						{ label: "Pedal Assist", value: "5 Levels" },
					],
				},
				{
					category: "Battery",
					rows: [
						{ label: "Primary", value: "52V 20Ah Samsung 21700 50E (1040Wh)" },
						{ label: "Secondary", value: "52V 15Ah Samsung 21700 50E (780Wh)" },
					],
				},
				{
					category: "Range",
					rows: [
						{ label: "Primary", value: "Up to 83 km" },
						{ label: "Primary + Secondary", value: "Up to 106 km" },
					],
				},
				{
					category: "Charging",
					rows: [
						{ label: "Charge Cycle", value: "800" },
						{ label: "Charge Time", value: "5 Hours" },
					],
				},
				{
					category: "Frameset",
					rows: [
						{ label: "Frame", value: "6061 Aluminum Alloy" },
						{ label: "Fork", value: "WIBEE Aluminum Oil Lock Suspension" },
					],
				},
				{
					category: "Wheels",
					rows: [
						{ label: "Tire", value: "Kenda K1151 Snowmobile" },
						{ label: "Size", value: '24" × 4.0"' },
						{ label: "Rim", value: "Double Wall" },
					],
				},
				{
					category: "Drivetrain",
					rows: [
						{ label: "Shifter", value: "Shimano TX50 7-Speed" },
						{ label: "Derailleur", value: "Shimano 7-Speed" },
						{ label: "Crank", value: "44T Single Guard" },
						{ label: "Cassette", value: "11-34T 9-Speed" },
						{ label: "Pedal", value: "Wellgo Aluminum Platform" },
					],
				},
				{
					category: "Components",
					rows: [
						{ label: "Saddle", value: "Selle Royal LOOKIN Basic (GEL)" },
						{ label: "Brakes", value: "Tektro Hydraulic Disc 180mm" },
						{ label: "Brake Lever", value: "Safety Motor Inhibitors" },
						{ label: "PAS Sensor", value: "Torque & Dual Speed" },
					],
				},
				{
					category: "Weight",
					rows: [
						{ label: "Weight", value: "80 lbs (incl. battery)" },
						{ label: "Load Capacity", value: "245 lbs" },
						{ label: "Height Range", value: "5'2\" – 6'5\"" },
					],
				},
			],
		});
		return { seeded: 2 };
	},
});
