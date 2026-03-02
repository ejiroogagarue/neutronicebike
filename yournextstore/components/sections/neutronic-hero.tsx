import Link from "next/link";

export function NeutronicHero() {
	return (
		<section className="relative overflow-hidden bg-[#010101] min-h-[70vh] flex items-center justify-center">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold italic text-primary tracking-tight">
					For Those Who Can&apos;t Stop
				</h1>
				<p className="mt-6 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
					Courier-tough eBikes, built for bad streets and worse weather.
				</p>
				<div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
					<Link
						href="/product/excalibur-journey"
						className="inline-flex items-center justify-center h-12 px-8 bg-primary text-primary-foreground rounded-full text-base font-semibold hover:opacity-90 transition-opacity"
					>
						Discover Journey
					</Link>
					<Link
						href="/product/excalibur-hunter"
						className="inline-flex items-center justify-center h-12 px-8 border border-white/30 text-white rounded-full text-base font-medium hover:bg-white/10 transition-colors"
					>
						Discover Hunter
					</Link>
				</div>
			</div>
		</section>
	);
}
