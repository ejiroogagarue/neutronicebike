import { CatalogProductRow } from "@/components/sections/catalog-product-row";
import { Newsletter } from "@/components/sections/newsletter";
import { ASSETS } from "@/lib/static/asset-paths";
import { getStaticProducts } from "@/lib/static/products";

export const metadata = {
	title: "Bikes — Neutronic",
	description: "Excalibur Journey & Hunter. Courier-tough eBikes.",
	alternates: {
		canonical: "/catalog",
	},
};

const CATALOG_DATA: Record<string, { colorImages: [string, string][]; logo: string }> = {
	"excalibur-journey": {
		colorImages: ASSETS.catalogColorImages["excalibur-journey"] ?? [],
		logo: ASSETS.journey.logo,
	},
	"excalibur-hunter": {
		colorImages: ASSETS.catalogColorImages["excalibur-hunter"] ?? [],
		logo: ASSETS.hunter.logo,
	},
};

export default function CatalogPage() {
	const products = getStaticProducts();
	return (
		<main className="min-h-screen bg-[#fdfdfd] text-foreground overflow-x-hidden">
			<div className="max-w-7xl mx-auto">
				<h1 className="sr-only">Neutronic Bikes Catalog</h1>
				{products.map((product, index) => {
					const data = CATALOG_DATA[product.slug];
					if (!data) return null;
					const isFirst = index === 0;
					return (
						<section
							key={product.id}
							aria-labelledby={`catalog-${product.slug}-heading`}
							className={
								isFirst ? undefined : "mt-6 sm:mt-8 lg:mt-10 border-t border-border pt-5 sm:pt-6 lg:pt-8"
							}
						>
							<CatalogProductRow
								productSlug={product.slug}
								productName={product.name}
								tagline={product.shortDescription}
								colorImages={data.colorImages}
								logoImage={data.logo}
								ctaLabel={`Explore ${product.name.replace("Excalibur ", "")}`}
								isFirstRow={index === 0}
							/>
						</section>
					);
				})}
			</div>
			<Newsletter />
		</main>
	);
}
