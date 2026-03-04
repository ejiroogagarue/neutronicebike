import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { Newsletter } from "@/components/sections/newsletter";
import { ASSETS } from "@/lib/static/asset-paths";
import { getProductBySlug, getStaticProducts } from "@/lib/static/products";
import { ProductDetailContent } from "./product-detail-content";

type ProductPageProps = {
	params: Promise<{ slug: string }>;
};

/** Product detail uses catalog [front, back] per color for consistent gallery with catalog page. */
function getProductAssets(slug: string) {
	const colorImages = ASSETS.catalogColorImages[slug];
	const logo = ASSETS.productDetailLogos[slug];
	if (!colorImages?.length || !logo) return null;
	return { colorImages, logo };
}

export async function generateMetadata(props: ProductPageProps): Promise<Metadata> {
	const { slug } = await props.params;
	const product = getProductBySlug(slug);

	if (!product) {
		return {
			title: "Product not found — Neutronic",
			description: "This product is no longer available.",
		};
	}

	const image = product.images[0] ?? "/images/webclip.png";
	const path = `/product/${product.slug}`;

	return {
		title: `${product.name} — Neutronic`,
		description: product.shortDescription,
		alternates: {
			canonical: path,
		},
		openGraph: {
			title: `${product.name} — Neutronic`,
			description: product.shortDescription,
			url: path,
			type: "website",
			images: [{ url: image, alt: product.name }],
		},
		twitter: {
			card: "summary_large_image",
			title: `${product.name} — Neutronic`,
			description: product.shortDescription,
			images: [image],
		},
	};
}

export default async function ProductPage(props: ProductPageProps) {
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
