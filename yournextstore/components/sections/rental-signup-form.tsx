"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getRentalPlans } from "@/lib/static/rental-plans";
import { BUTTON_PILL_PRIMARY, FORM_SELECT_CLASS } from "@/lib/ui-classes";

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
		try {
			const response = await fetch("/api/support-leads", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					source: "rental",
					email,
					planId: planId || undefined,
					pathname: window.location.pathname,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to submit rental lead.");
			}

			setStatus("success");
			setEmail("");
			setPlanId("");
		} catch {
			setStatus("error");
		}
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
					className={`${BUTTON_PILL_PRIMARY} min-h-[44px] bg-foreground text-primary hover:bg-foreground/90`}
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
					className={FORM_SELECT_CLASS}
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
				className={`${BUTTON_PILL_PRIMARY} w-full bg-foreground text-primary hover:bg-foreground/90`}
			>
				{status === "success" ? "We'll be in touch" : status === "loading" ? "Sending…" : "Get started"}
			</Button>
			{status === "success" && (
				<p className="text-sm text-muted-foreground text-center">
					Thanks! We&apos;ll send you the next steps shortly.
				</p>
			)}
			{status === "error" && (
				<p className="text-sm text-destructive text-center">
					We couldn&apos;t submit your request. Please try again.
				</p>
			)}
		</form>
	);
}
