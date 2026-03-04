"use client";

import { ArrowRightIcon, CheckIcon } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { subscribeToNewsletter } from "@/app/newsletter/action";
import { BUTTON_PILL_BASE } from "@/lib/ui-classes";

export function Newsletter() {
	const [state, action, isPending] = useActionState(subscribeToNewsletter, null);

	return (
		<section className="bg-foreground text-background overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
				<div className="max-w-2xl mx-auto text-center">
					{state?.success ? (
						<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
							<div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-background/10">
								<CheckIcon className="h-6 w-6" />
							</div>
							<h2 className="text-2xl sm:text-3xl font-medium tracking-tight">You&apos;re in</h2>
							<p className="mt-3 text-background/60">{state.message}</p>
							<div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
								<Link
									href="/catalog"
									className={`${BUTTON_PILL_BASE} min-h-[48px] bg-primary text-primary-foreground hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground`}
								>
									Explore bikes
								</Link>
								<Link
									href="/rental"
									className={`${BUTTON_PILL_BASE} min-h-[48px] border border-background/20 text-background hover:bg-background/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground`}
								>
									See rentals
								</Link>
							</div>
						</div>
					) : (
						<>
							<h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight">
								Get drops, restocks, and rental openings
							</h2>
							<p className="mt-4 text-lg leading-relaxed text-background/60 max-w-xl mx-auto">
								One email gets you early access to new Excalibur builds, accessory restocks, and first pick of
								rental spots.
							</p>
							<ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left text-sm text-background/70 max-w-xl mx-auto">
								<li className="flex gap-2">
									<span className="mt-0.5 h-2 w-2 rounded-full bg-primary shrink-0" aria-hidden />
									New drops + limited runs
								</li>
								<li className="flex gap-2">
									<span className="mt-0.5 h-2 w-2 rounded-full bg-primary shrink-0" aria-hidden />
									Accessory restocks
								</li>
								<li className="flex gap-2">
									<span className="mt-0.5 h-2 w-2 rounded-full bg-primary shrink-0" aria-hidden />
									Rental openings + promos
								</li>
								<li className="flex gap-2">
									<span className="mt-0.5 h-2 w-2 rounded-full bg-primary shrink-0" aria-hidden />
									Courier-first updates
								</li>
							</ul>
							<form action={action} className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
								<input
									type="email"
									name="email"
									placeholder="you@example.com"
									required
									className="h-12 w-full flex-1 rounded-full border border-background/20 bg-background/10 px-5 text-background outline-none transition-all placeholder:text-background/30 focus:border-background/40 focus:ring-2 focus:ring-background/10"
								/>
								<button
									type="submit"
									disabled={isPending}
									className={`${BUTTON_PILL_BASE} min-h-[48px] shrink-0 gap-2 bg-background text-foreground hover:bg-background/90 disabled:opacity-50`}
								>
									{isPending ? "Joining\u2026" : "Get updates"}
									{!isPending && <ArrowRightIcon className="h-4 w-4" />}
								</button>
							</form>
							<p className="mt-3 text-xs text-background/50">No spam. Just drops, restocks, and openings.</p>
							{state?.error && <p className="mt-4 text-sm text-red-300">{state.error}</p>}
						</>
					)}
				</div>
			</div>
		</section>
	);
}
