import { Commerce } from "commerce-kit";

const token = process.env.YNS_API_KEY?.trim();

/**
 * Stub commerce client used when YNS_API_KEY is not set (e.g. static Neutronic build).
 * All methods return empty/null so the app runs without the YNS API.
 */
function createStubCommerce() {
	const emptyData = { data: [] };
	const noop = async () => undefined;
	return {
		productBrowse: async () => emptyData,
		productGet: async () => null,
		collectionBrowse: async () => emptyData,
		collectionGet: async () => null,
		cartGet: async () => null,
		cartUpsert: async () => null,
		orderGet: async () => null,
		legalPageBrowse: async () => emptyData,
		legalPageGet: async () => null,
		subscriberCreate: noop,
		meGet: async () => ({
			store: { subdomain: "store" },
			publicUrl: "https://example.com",
		}),
	};
}

export const commerce = token
	? Commerce({ token })
	: (createStubCommerce() as unknown as ReturnType<typeof Commerce>);
