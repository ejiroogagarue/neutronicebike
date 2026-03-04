import "server-only";

type SupportLeadSource = "newsletter" | "rental" | "accessories";

type SupportLeadInput = {
	source: SupportLeadSource;
	email: string;
	planId?: string;
	accessoryId?: string;
	message?: string;
	pathname?: string;
};

const SUPPORT_EMAIL = "support@neutronicebike.com";

function buildLeadText(input: SupportLeadInput) {
	const lines = [
		`New ${input.source} lead`,
		`Email: ${input.email}`,
		`Source: ${input.source}`,
		input.planId ? `Plan: ${input.planId}` : null,
		input.accessoryId ? `Accessory: ${input.accessoryId}` : null,
		input.message ? `Message: ${input.message}` : null,
		input.pathname ? `Path: ${input.pathname}` : null,
		`Submitted at: ${new Date().toISOString()}`,
	];

	return lines.filter(Boolean).join("\n");
}

export async function sendSupportLeadEmail(input: SupportLeadInput) {
	const resendApiKey = process.env.RESEND_API_KEY?.trim();
	if (!resendApiKey) {
		throw new Error("RESEND_API_KEY is not configured.");
	}

	const from = process.env.SUPPORT_FROM_EMAIL?.trim() ?? "Neutronic <onboarding@resend.dev>";
	const subject = `[Neutronic] ${input.source} lead`;
	const text = buildLeadText(input);

	const response = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${resendApiKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			from,
			to: [SUPPORT_EMAIL],
			reply_to: input.email,
			subject,
			text,
		}),
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Failed to send support email: ${errorText}`);
	}
}
