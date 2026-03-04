import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { commerce } from "@/lib/commerce";

type LegalPageProps = {
	params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: LegalPageProps): Promise<Metadata> {
	const { slug } = await props.params;
	const page = await commerce.legalPageGet(slug);
	const title = page?.title ?? "Legal — Neutronic";

	return {
		title: `${title} — Neutronic`,
		description: `Read Neutronic's ${title.toLowerCase()}.`,
		alternates: {
			canonical: `/legal/${slug}`,
		},
		openGraph: {
			title: `${title} — Neutronic`,
			description: `Read Neutronic's ${title.toLowerCase()}.`,
			url: `/legal/${slug}`,
			type: "article",
		},
	};
}

export default async function LegalPage(props: LegalPageProps) {
	"use cache";
	cacheLife("hours");

	const { slug } = await props.params;
	const page = await commerce.legalPageGet(slug);

	if (!page) {
		notFound();
	}

	return (
		<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<h1 className="text-3xl font-bold tracking-tight mb-8">{page.title}</h1>
			{page.content ? (
				<div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: page.content }} />
			) : (
				<p className="text-muted-foreground">No content available.</p>
			)}
		</div>
	);
}
