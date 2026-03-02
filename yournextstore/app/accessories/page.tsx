import Image from "next/image";
import Link from "next/link";
import { Newsletter } from "@/components/sections/newsletter";
import { getStaticAccessories } from "@/lib/static/accessories";

export const metadata = {
	title: "Accessories — Neutronic",
	description: "Range-extending accessories and add-ons for Neutronic builds.",
};

export default function AccessoriesPage() {
	const accessories = getStaticAccessories();

	return (
		<main className="min-h-screen bg-[#fdfdfd] text-foreground overflow-x-hidden">
			<header className="w-full bg-primary">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
					<h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold italic text-primary-foreground">
						Accessories
					</h1>
					<p className="mt-2 sm:mt-3 text-sm sm:text-base text-primary-foreground/80 max-w-2xl">
						Upgrades built for riders who can&apos;t afford downtime. Get availability and fitment help
						in one message.
					</p>
					<div className="mt-5 sm:mt-6">
						<Link
							href="#lead"
							className="inline-flex items-center justify-center min-h-[44px] sm:min-h-[48px] px-6 sm:px-8 bg-foreground text-primary rounded-full text-sm sm:text-base font-semibold hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
						>
							Check availability
						</Link>
					</div>
				</div>
			</header>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
				<section aria-label="Accessories list" className="space-y-10 sm:space-y-12 lg:space-y-14">
					{accessories.map((a, idx) => {
						const [primary] = a.images;
						return (
							<article
								key={a.id}
								className={idx === 0 ? undefined : "border-t border-border pt-8 sm:pt-10 lg:pt-12"}
							>
								<div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 lg:items-start">
									{/* Primary image */}
									<div className="w-full">
										<div className="relative w-full aspect-4/3 bg-muted rounded-2xl overflow-hidden">
											<Image
												src={primary}
												alt={a.name}
												fill
												className="object-contain"
												sizes="(max-width: 1024px) 92vw, 50vw"
												priority={idx === 0}
											/>
										</div>

										{/* Additional images */}
										{a.images.length > 1 && (
											<div className="mt-3 sm:mt-4 overflow-x-auto no-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
												<div className="flex gap-3 w-max">
													{a.images.slice(1).map((src) => (
														<div
															key={src}
															className="relative w-[160px] sm:w-[190px] aspect-4/3 bg-muted rounded-xl overflow-hidden shrink-0"
														>
															<Image
																src={src}
																alt=""
																fill
																className="object-contain"
																sizes="190px"
																loading="lazy"
																decoding="async"
															/>
														</div>
													))}
												</div>
											</div>
										)}
									</div>

									{/* Details */}
									<div className="mt-4 lg:mt-0">
										<h2 className="text-xl sm:text-2xl font-semibold italic text-foreground">
											{a.name}
										</h2>
										<p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl">
											{a.tagline}
										</p>
										<p className="mt-4 text-sm sm:text-base text-foreground/80 max-w-xl leading-relaxed">
											{a.description}
										</p>
										<ul className="mt-4 space-y-1.5 text-sm sm:text-base text-foreground/80">
											{a.highlights.map((h) => (
												<li key={h} className="flex gap-2">
													<span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden />
													<span>{h}</span>
												</li>
											))}
										</ul>
										<div className="mt-6 flex flex-col sm:flex-row gap-3">
											<Link
												href="#lead"
												className="inline-flex items-center justify-center min-h-[44px] sm:min-h-[48px] px-6 sm:px-8 bg-primary text-primary-foreground rounded-full text-sm sm:text-base font-semibold hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#fdfdfd]"
											>
												Get pricing &amp; fitment
											</Link>
											<Link
												href="/rental"
												className="inline-flex items-center justify-center min-h-[44px] sm:min-h-[48px] px-6 sm:px-8 border border-border rounded-full text-sm sm:text-base font-semibold hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#fdfdfd]"
											>
												Prefer to rent?
											</Link>
										</div>
									</div>
								</div>
							</article>
						);
					})}
				</section>

				<section id="lead" className="mt-10 sm:mt-12 lg:mt-14 border-t border-border pt-8 sm:pt-10 lg:pt-12">
					<h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground mb-2">
						Check accessory availability
					</h2>
					<p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-xl">
						Drop your email and we&apos;ll reply with compatibility, pricing, and next steps.
					</p>
				</section>
			</div>

			<Newsletter />
		</main>
	);
}

