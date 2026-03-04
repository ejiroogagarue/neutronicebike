import { NextResponse } from "next/server";
import { sendSupportLeadEmail } from "@/lib/support-email";

type SupportLeadRequestBody = {
	source?: "newsletter" | "rental" | "accessories";
	email?: string;
	planId?: string;
	accessoryId?: string;
	message?: string;
	pathname?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_SOURCES = new Set(["newsletter", "rental", "accessories"]);

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as SupportLeadRequestBody;
		const source = body.source;
		const email = body.email?.trim();

		if (!source || !VALID_SOURCES.has(source)) {
			return NextResponse.json({ error: "Invalid lead source." }, { status: 400 });
		}

		if (!email || !EMAIL_REGEX.test(email)) {
			return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
		}

		await sendSupportLeadEmail({
			source,
			email,
			planId: body.planId?.trim() || undefined,
			accessoryId: body.accessoryId?.trim() || undefined,
			message: body.message?.trim() || undefined,
			pathname: body.pathname?.trim() || undefined,
		});

		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json({ error: "Unable to submit right now. Please try again." }, { status: 500 });
	}
}
