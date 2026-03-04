import Link from "next/link";

const footerLinks = {
	shop: [
		{ href: "/catalog", label: "Bikes" },
		{ href: "/rental", label: "Rental" },
	],
	resources: [
		{ href: "/about", label: "About" },
		{ href: "mailto:support@neutronicebike.com", label: "Contact" },
		{ href: "/catalog", label: "Shop" },
		{ href: "/legal/privacy-policy", label: "Privacy" },
		{ href: "/legal/terms-of-service", label: "Terms" },
	],
} as const;

const COPYRIGHT_YEAR = process.env.NEXT_PUBLIC_COPYRIGHT_YEAR ?? "2026";

export function Footer() {
	return (
		<footer className="border-t border-primary/20 bg-primary">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="py-8 sm:py-12 lg:py-14 flex flex-col sm:flex-row gap-6 sm:gap-12 lg:gap-16">
					<div className="sm:max-w-xs lg:max-w-sm shrink-0">
						<Link
							href="/"
							className="text-lg sm:text-xl lg:text-2xl font-bold italic text-[#0a0d0f] hover:text-[#0a0d0f]/80 transition-colors"
						>
							Neutronic E-Bikes
						</Link>
						<p className="mt-3 sm:mt-4 text-xs sm:text-sm text-[#0a0d0f]/70 leading-relaxed">
							Courier-tough eBikes, built for bad streets and worse weather. Excalibur Journey &amp; Hunter.
						</p>
					</div>

					<div className="flex gap-10 sm:gap-12 lg:gap-16">
						<div>
							<h3 className="text-xs sm:text-sm font-semibold text-[#0a0d0f]">Our Shop</h3>
							<ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
								{footerLinks.shop.map(({ href, label }) => (
									<li key={href}>
										<Link
											href={href}
											className="text-xs sm:text-sm text-[#0a0d0f]/70 hover:text-[#0a0d0f] transition-colors"
										>
											{label}
										</Link>
									</li>
								))}
							</ul>
						</div>

						<div>
							<h3 className="text-xs sm:text-sm font-semibold text-[#0a0d0f]">Resources</h3>
							<ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
								{footerLinks.resources.map(({ href, label }) => (
									<li key={href}>
										{href.startsWith("mailto:") ? (
											<a
												href={href}
												className="text-xs sm:text-sm text-[#0a0d0f]/70 hover:text-[#0a0d0f] transition-colors"
											>
												{label}
											</a>
										) : (
											<Link
												href={href}
												className="text-xs sm:text-sm text-[#0a0d0f]/70 hover:text-[#0a0d0f] transition-colors"
											>
												{label}
											</Link>
										)}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				<div className="py-4 sm:py-5 lg:py-6 border-t border-[#0a0d0f]/10">
					<p className="text-xs sm:text-sm text-[#0a0d0f]/60">
						&copy; {COPYRIGHT_YEAR} Neutronic. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
