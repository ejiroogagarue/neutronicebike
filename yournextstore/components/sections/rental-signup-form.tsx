"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getRentalPlans } from "@/lib/static/rental-plans";

type RentalSignupFormProps = {
	/** Prefilled plan e.g. "gig-economy" (optional; also read from ?plan=) */
	prefillPlanId?: string | null;
	/** Variant: "hero" = short (email + notify); "signup" = full (email + plan + submit) */
	variant?: "hero" | "signup";
	className?: string;
};

export function RentalSignupForm({
	prefillPlanId = null,
	variant = "signup",
	className = "",
}: RentalSignupFormProps) {
	const plans = getRentalPlans();
	const searchParams = useSearchParams();
	const planFromUrl = searchParams.get("plan");
	const [email, setEmail] = useState("");
	const [planId, setPlanId] = useState(planFromUrl ?? prefillPlanId ?? "");
	const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

	useEffect(() => {
		const id = planFromUrl ?? prefillPlanId;
		if (id && plans.some((p) => p.id === id)) setPlanId(id);
	}, [planFromUrl, prefillPlanId, plans]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email.trim()) return;
		setStatus("loading");
		// TODO: send to API / Convex (lead or rental_signups collection)
		await new Promise((r) => setTimeout(r, 600));
		setStatus("success");
		setEmail("");
		setPlanId("");
	};

	if (variant === "hero") {
		return (
			<form
				onSubmit={handleSubmit}
				className={`flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto ${className}`}
				aria-label="Get rental updates"
			>
				<label htmlFor="hero-rental-email" className="sr-only">
					Email for rental updates
				</label>
				<Input
					id="hero-rental-email"
					type="email"
					placeholder="you@example.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					disabled={status === "loading" || status === "success"}
					className="min-h-[44px] flex-1 text-base rounded-full border-foreground/20 bg-white/95 text-foreground placeholder:text-muted-foreground"
				/>
				<Button
					type="submit"
					disabled={status === "loading" || status === "success"}
					className="min-h-[44px] px-6 rounded-full font-semibold bg-foreground text-primary hover:bg-foreground/90"
				>
					{status === "success" ? "Done" : status === "loading" ? "Sending…" : "Notify me"}
				</Button>
			</form>
		);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className={`flex flex-col gap-4 sm:gap-5 ${className}`}
			aria-labelledby="signup-heading"
		>
			<div className="space-y-2">
				<Label htmlFor="rental-signup-email" className="text-base font-semibold text-foreground">
					Email
				</Label>
				<Input
					id="rental-signup-email"
					type="email"
					placeholder="you@example.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					disabled={status === "loading" || status === "success"}
					className="min-h-[48px] text-base rounded-lg border-border"
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="rental-signup-plan" className="text-base font-semibold text-foreground">
					I&apos;m interested in
				</Label>
				<select
					id="rental-signup-plan"
					value={planId}
					onChange={(e) => setPlanId(e.target.value)}
					disabled={status === "loading" || status === "success"}
					className="flex h-12 w-full rounded-lg border border-input bg-background px-3 py-2 text-base shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
				>
					<option value="">Select a plan</option>
					{plans.map((p) => (
						<option key={p.id} value={p.id}>
							{p.name}
						</option>
					))}
				</select>
			</div>
			<Button
				type="submit"
				disabled={status === "loading" || status === "success" || !email.trim()}
				className="min-h-[48px] w-full rounded-full text-base font-semibold bg-foreground text-primary hover:bg-foreground/90"
			>
				{status === "success"
					? "We'll be in touch"
					: status === "loading"
						? "Sending…"
						: "Get started"}
			</Button>
			{status === "success" && (
				<p className="text-sm text-muted-foreground text-center">
					Thanks! We&apos;ll send you the next steps shortly.
				</p>
			)}
		</form>
	);
}
