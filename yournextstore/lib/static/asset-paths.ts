/**
 * Central asset paths for Webflow-derived structure.
 * Place files in public/images/ and public/videos/ with these exact names.
 */

export const ASSETS = {
	// Global
	navLogo: "/images/NeutronicMan.jpg",
	trust: {
		shipping: "/images/fast-delivery_black.png",
		assembled: "/images/assembled_black-1.png",
		warranty: "/images/warranty.png",
		protection: "/images/protection.png",
	},

	// Home – hero (Cruising)
	hero: {
		poster: "",
		mp4: "/videos/698641b5325d073affa1688b_Cruising.mp4",
		webm: "",
	},

	// Home – Journey block
	journey: {
		grid1: "/images/Shoot01.jpg",
		grid2: "/images/Shoot04.png",
		logo: "/images/ExcaliburJourneyBlack.png",
		slides: [
			"/images/SideView.jpg",
			"/images/SideView_1.jpg",
			"/images/SideView_2.jpg",
			"/images/SideView_3.jpg",
			"/images/SideView_4.jpg",
			"/images/SideView_5.jpg",
		],
	},

	// Home – mid hero
	midHero: {
		logo: "/images/NeutronicLogo.png",
		poster: "",
		mp4: "/videos/NeutronicCoverVideoTwo.mp4",
		webm: "",
	},

	// Home – Hunter block
	hunter: {
		grid1: "/images/Back.png",
		grid2: "/images/Frony.png",
		logo: "/images/ExcaliburHunterBlack.png",
		slides: [
			"/images/Yellow.jpg",
			"/images/Red.jpg",
			"/images/Green_1.png",
			"/images/Blue_1.png",
			"/images/Black_1.png",
			"/images/Brown_1.png",
		],
	},

	// Catalog – hero images
	catalog: {
		journeyHero: "/images/FrontView.jpg",
		hunterHero: "/images/FrontView_1.jpg",
	},
	swatches: [
		"/images/Yellow.png",
		"/images/Red.png",
		"/images/Green.png",
		"/images/Blue.png",
		"/images/Brown.png",
		"/images/Black.png",
	],

	// Product detail – gallery (Journey)
	productJourney: {
		front: "/images/FrontView.jpg",
		side: "/images/SideView.jpg",
		back: "/images/BackView.jpg",
	},

	// Product detail – gallery (Hunter)
	productHunter: {
		front: "/images/FrontView_1.jpg",
		side: "/images/SideView_1.jpg",
	},

	/**
	 * Catalog – per-color [front, back] from BikePage/, indexed by COLOR_NAMES order.
	 * When DB is added, replace with a query; the component only needs the array shape.
	 */
	catalogColorImages: {
		"excalibur-journey": [
			["/BikePage/ExcaliburJourney/Yellow/FrontView.jpg", "/BikePage/ExcaliburJourney/Yellow/BackView.jpg"],
			["/BikePage/ExcaliburJourney/Red/FrontView.jpg", "/BikePage/ExcaliburJourney/Red/BackView.jpg"],
			["/BikePage/ExcaliburJourney/Green/FrontView.jpg", "/BikePage/ExcaliburJourney/Green/BackView.jpg"],
			["/BikePage/ExcaliburJourney/Blue/FrontView.jpg", "/BikePage/ExcaliburJourney/Blue/BackView.jpg"],
			["/BikePage/ExcaliburJourney/Brown/FrontView.jpg", "/BikePage/ExcaliburJourney/Brown/BackView.jpg"],
			["/BikePage/ExcaliburJourney/Black/FrontView.jpg", "/BikePage/ExcaliburJourney/Black/BackView.jpg"],
		],
		"excalibur-hunter": [
			["/BikePage/ExcaliburHunter/Yellow/FrontView.jpg", "/BikePage/ExcaliburHunter/Yellow/BackView.jpg"],
			["/BikePage/ExcaliburHunter/Red/FrontView.jpg", "/BikePage/ExcaliburHunter/Red/BackView.jpg"],
			["/BikePage/ExcaliburHunter/Green/FrontView.jpg", "/BikePage/ExcaliburHunter/Green/BackView.jpg"],
			["/BikePage/ExcaliburHunter/Blue/FrontView.jpg", "/BikePage/ExcaliburHunter/Blue/BackView.jpg"],
			["/BikePage/ExcaliburHunter/Brown/FrontView.jpg", "/BikePage/ExcaliburHunter/Brown/BackView.jpg"],
			["/BikePage/ExcaliburHunter/Black/FrontView.jpg", "/BikePage/ExcaliburHunter/Black/BackView.jpg"],
		],
	} as Record<string, [string, string][]>,

	/**
	 * Product detail – per-color views from ProductDetail/, indexed by COLOR_NAMES order.
	 * Both products: [front, side, back].
	 */
	productDetailColorImages: {
		"excalibur-journey": [
			["/ProductDetail/ExcaliburJourney/Yellow/FrontView.jpg", "/ProductDetail/ExcaliburJourney/Yellow/SideView.jpg", "/ProductDetail/ExcaliburJourney/Yellow/BackView.jpg"],
			["/ProductDetail/ExcaliburJourney/Red/FrontView.jpg", "/ProductDetail/ExcaliburJourney/Red/SideView.jpg", "/ProductDetail/ExcaliburJourney/Red/BackView.jpg"],
			["/ProductDetail/ExcaliburJourney/Green/FrontView.jpg", "/ProductDetail/ExcaliburJourney/Green/SideView.jpg", "/ProductDetail/ExcaliburJourney/Green/BackView.jpg"],
			["/ProductDetail/ExcaliburJourney/Blue/FrontView.jpg", "/ProductDetail/ExcaliburJourney/Blue/SideView.jpg", "/ProductDetail/ExcaliburJourney/Blue/BackView.jpg"],
			["/ProductDetail/ExcaliburJourney/Brown/FrontView.jpg", "/ProductDetail/ExcaliburJourney/Brown/SideView.jpg", "/ProductDetail/ExcaliburJourney/Brown/BackView.jpg"],
			["/ProductDetail/ExcaliburJourney/Black/FrontView.jpg", "/ProductDetail/ExcaliburJourney/Black/SideView.jpg", "/ProductDetail/ExcaliburJourney/Black/BackView.jpg"],
		],
		"excalibur-hunter": [
			["/ProductDetail/ExcaliburHunter/Yellow/FrontView.jpg", "/ProductDetail/ExcaliburHunter/Yellow/SideView.jpg", "/ProductDetail/ExcaliburHunter/Yellow/BackView.jpg"],
			["/ProductDetail/ExcaliburHunter/Red/FrontView.jpg", "/ProductDetail/ExcaliburHunter/Red/SideView.jpg", "/ProductDetail/ExcaliburHunter/Red/BackView.jpg"],
			["/ProductDetail/ExcaliburHunter/Green/FrontView.jpg", "/ProductDetail/ExcaliburHunter/Green/SideView.jpg", "/ProductDetail/ExcaliburHunter/Green/BackView.jpg"],
			["/ProductDetail/ExcaliburHunter/Blue/FrontView.jpg", "/ProductDetail/ExcaliburHunter/Blue/SideView.jpg", "/ProductDetail/ExcaliburHunter/Blue/BackView.jpg"],
			["/ProductDetail/ExcaliburHunter/Brown/FrontView.jpg", "/ProductDetail/ExcaliburHunter/Brown/SideView.jpg", "/ProductDetail/ExcaliburHunter/Brown/BackView.jpg"],
			["/ProductDetail/ExcaliburHunter/Black/FrontView.jpg", "/ProductDetail/ExcaliburHunter/Black/SideView.jpg", "/ProductDetail/ExcaliburHunter/Black/BackView.jpg"],
		],
	} as Record<string, string[][]>,

	/**
	 * Product detail – per-color 360° preview videos, indexed by COLOR_NAMES order.
	 * Empty string = no video for that color (fallback to shoot image).
	 */
	productDetailVideos: {
		"excalibur-journey": [
			"/ProductDetail/ExcaliburJourney/Yellow/YellowPreview.mp4",
			"/ProductDetail/ExcaliburJourney/Red/RedPreview.mp4",
			"/ProductDetail/ExcaliburJourney/Green/GreenPreview.mp4",
			"/ProductDetail/ExcaliburJourney/Blue/BluePreview.mp4",
			"/ProductDetail/ExcaliburJourney/Brown/BrownPreview.mp4",
			"/ProductDetail/ExcaliburJourney/Black/BlackPreview.mp4",
		],
		"excalibur-hunter": [
			"/ProductDetail/ExcaliburHunter/Yellow/YellowPreview.mp4",
			"/ProductDetail/ExcaliburHunter/Red/RedPreview.mp4",
			"",
			"/ProductDetail/ExcaliburHunter/Blue/BluePreview.mp4",
			"/ProductDetail/ExcaliburHunter/Brown/BrownPreview.mp4",
			"/ProductDetail/ExcaliburHunter/Black/BlackPreview.mp4",
		],
	} as Record<string, string[]>,

	/** Lifestyle / product shoot images for the gallery 4th slot */
	productDetailShoots: {
		"excalibur-journey": [
			"/ProductDetail/ExcaliburJourney/ProductShoot/01.jpg",
			"/ProductDetail/ExcaliburJourney/ProductShoot/02.jpg",
			"/ProductDetail/ExcaliburJourney/ProductShoot/03.jpg",
			"/ProductDetail/ExcaliburJourney/ProductShoot/04.jpg",
		],
		"excalibur-hunter": [
			"/ProductDetail/ExcaliburHunter/ProductShoot/01.jpg",
			"/ProductDetail/ExcaliburHunter/ProductShoot/02.jpg",
			"/ProductDetail/ExcaliburHunter/ProductShoot/03.jpg",
			"/ProductDetail/ExcaliburHunter/ProductShoot/04.jpg",
		],
	} as Record<string, string[]>,

	/** Product detail logos (from ProductDetail folder) */
	productDetailLogos: {
		"excalibur-journey": "/ProductDetail/ExcaliburJourney/ExcaliburJourneyBlack.png",
		"excalibur-hunter": "/ProductDetail/ExcaliburHunter/ExcaliburHunterBlack.png",
	} as Record<string, string>,

	// Rental (video: public/videos/rental.mp4; add rental.jpg in public/videos/ for poster)
	rental: {
		poster: "/videos/VID_83780101_080338_744_poster.0000000.jpg",
		mp4: "/videos/rental.mp4",
		webm: "",
		sectionImage: "/images/20240130_145531.jpg",
	},

	// About
	about: {
		history: "/images/20221114_112422.webp",
		missionLogo: "/images/20250921_1337_Enhanced-Video-Icon_remix_01k5pnhp5cebktraw05jhwa9km-1.png",
	},
} as const;

export const COLOR_NAMES = ["Yellow", "Red", "Green", "Blue", "Brown", "Black"] as const;
