import Link from "next/link";
import Image from "next/image";
import type { StaticProduct } from "@/lib/static/products";
import { formatPrice } from "@/lib/static/products";

type Props = {
	products: StaticProduct[];
	title?: string;
	viewAllHref?: string;
};

export function NeutronicProductGrid({
	products,
	title = "Bikes",
	viewAllHref = "/catalog",
}: Props) {
	return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
			{(title || viewAllHref) && (
				<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
					{title && <h2 className="text-2xl sm:text-3xl font-medium text-foreground">{title}</h2>}
					{viewAllHref && (
						<Link
							href={viewAllHref}
							className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
						>
							View all
						</Link>
					)}
				</div>
			)}

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{products.map((product) => {
					const image = product.images[0] ?? "/images/placeholder.svg";
					return (
						<Link
							key={product.id}
							href={`/product/${product.slug}`}
							className="group block"
						>
							<div className="relative aspect-square bg-muted rounded-2xl overflow-hidden mb-4">
								<Image
									src={image}
									alt={product.name}
									fill
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
									className="object-cover transition-opacity duration-300 group-hover:opacity-90"
								/>
							</div>
							<h3 className="text-base font-medium text-foreground">{product.name}</h3>
							<p className="text-base font-semibold text-foreground mt-1">
								{formatPrice(product.price, product.currency)}
							</p>
						</Link>
					);
				})}
			</div>
		</section>
	);
}
