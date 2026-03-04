"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BUTTON_PILL_PRIMARY, FORM_SELECT_CLASS, FORM_TEXTAREA_CLASS } from "@/lib/ui-classes";

type AccessoryOption = {
	id: string;
	name: string;
};

type AccessoriesLeadFormProps = {
	options: AccessoryOption[];
};

export function AccessoriesLeadForm({ options }: AccessoriesLeadFormProps) {
	const [email, setEmail] = useState("");
	const [accessoryId, setAccessoryId] = useState("");
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!email.trim()) return;

		setStatus("loading");

		try {
			const response = await fetch("/api/support-leads", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					source: "accessories",
					email,
					accessoryId: accessoryId || undefined,
					message: message || undefined,
					pathname: window.location.pathname,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to submit accessories lead.");
			}

			setStatus("success");
			setEmail("");
			setAccessoryId("");
			setMessage("");
		} catch {
			setStatus("error");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="max-w-xl space-y-4">
			<div className="space-y-2">
				<Label htmlFor="accessories-email" className="text-base font-semibold text-foreground">
					Email
				</Label>
				<Input
					id="accessories-email"
					type="email"
					placeholder="you@example.com"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					required
					disabled={status === "loading" || status === "success"}
					className="min-h-[48px] text-base rounded-lg border-border"
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="accessories-item" className="text-base font-semibold text-foreground">
					Accessory (optional)
				</Label>
				<select
					id="accessories-item"
					value={accessoryId}
					onChange={(event) => setAccessoryId(event.target.value)}
					disabled={status === "loading" || status === "success"}
					className={FORM_SELECT_CLASS}
				>
					<option value="">Any accessory</option>
					{options.map((option) => (
						<option key={option.id} value={option.id}>
							{option.name}
						</option>
					))}
				</select>
			</div>

			<div className="space-y-2">
				<Label htmlFor="accessories-message" className="text-base font-semibold text-foreground">
					Message (optional)
				</Label>
				<textarea
					id="accessories-message"
					value={message}
					onChange={(event) => setMessage(event.target.value)}
					disabled={status === "loading" || status === "success"}
					className={FORM_TEXTAREA_CLASS}
					placeholder="Tell us what you need help with."
				/>
			</div>

			<Button
				type="submit"
				disabled={status === "loading" || status === "success" || !email.trim()}
				className={`${BUTTON_PILL_PRIMARY} w-full bg-foreground text-primary hover:bg-foreground/90`}
			>
				{status === "success" ? "Request sent" : status === "loading" ? "Sending…" : "Get pricing & fitment"}
			</Button>

			{status === "success" && (
				<p className="text-sm text-muted-foreground text-center">
					Thanks! We&apos;ll reply from support@neutronicebike.com.
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
