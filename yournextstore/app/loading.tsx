export default function Loading() {
	return (
		<div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#fdfdfd]" aria-live="polite">
			<div className="flex flex-col items-center gap-4">
				<div
					className="h-10 w-10 animate-spin rounded-full border-2 border-[#FFF63A] border-t-transparent"
					aria-hidden
				/>
				<p className="text-sm text-muted-foreground">Loading…</p>
			</div>
		</div>
	);
}
