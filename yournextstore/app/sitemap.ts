import type { MetadataRoute } from "next";
import { commerce } from "@/lib/commerce";
import { getStaticProducts } from "@/lib/static/products";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const staticRoutes = ["", "/catalog", "/accessories", "/rental", "/about"] as const;

	const staticEntries = staticRoutes.map((path) => ({
		url: `${siteUrl}${path}`,
		changeFrequency: path === "" ? "daily" : "weekly",
		priority: path === "" ? 1 : 0.8,
	})) satisfies MetadataRoute.Sitemap;

	const productEntries = getStaticProducts().map((product) => ({
		url: `${siteUrl}/product/${product.slug}`,
		changeFrequency: "weekly" as const,
		priority: 0.9,
	}));

	const [collectionsResult, legalPagesResult] = await Promise.all([
		commerce.collectionBrowse({}),
		commerce.legalPageBrowse(),
	]);

	const collectionEntries = collectionsResult.data.map((collection) => ({
		url: `${siteUrl}/collection/${collection.slug}`,
		changeFrequency: "weekly" as const,
		priority: 0.7,
	}));

	const legalEntries = legalPagesResult.data.map((page) => ({
		url: `${siteUrl}${page.path}`,
		changeFrequency: "monthly" as const,
		priority: 0.5,
	}));

	return [...staticEntries, ...productEntries, ...collectionEntries, ...legalEntries];
}
