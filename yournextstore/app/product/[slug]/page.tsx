import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { Newsletter } from "@/components/sections/newsletter";
import { ASSETS } from "@/lib/static/asset-paths";
import { getProductBySlug, getStaticProducts } from "@/lib/static/products";
import { ProductDetailContent } from "./product-detail-content";

/** Product detail uses catalog [front, back] per color for consistent gallery with catalog page. */
function getProductAssets(slug: string) {
	const colorImages = ASSETS.catalogColorImages[slug];
	const logo = ASSETS.productDetailLogos[slug];
	if (!colorImages?.length || !logo) return null;
	return { colorImages, logo };
}

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
	"use cache";
	cacheLife("hours");

	const { slug } = await props.params;
	const product = getProductBySlug(slug);

	if (!product) {
		notFound();
	}

	const assets = getProductAssets(slug);
	if (!assets) {
		notFound();
	}

	const otherProducts = getStaticProducts().filter((p) => p.slug !== slug);

	return (
		<main className="min-h-screen bg-[#fdfdfd] text-foreground overflow-x-hidden">
			<ProductDetailContent
				product={product}
				otherProducts={otherProducts}
				colorImages={assets.colorImages}
				logoImage={assets.logo}
			/>
			<Newsletter />
		</main>
	);
}
