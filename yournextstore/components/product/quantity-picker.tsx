"use client";

type QuantityPickerProps = {
	value: number;
	onChange: (next: number) => void;
	min?: number;
	max?: number;
};

export function QuantityPicker({ value, onChange, min = 1, max = 10 }: QuantityPickerProps) {
	return (
		<div className="inline-flex items-center rounded-lg border border-foreground/20 overflow-hidden">
			<button
				type="button"
				onClick={() => onChange(Math.max(min, value - 1))}
				disabled={value <= min}
				className="w-11 h-11 flex items-center justify-center text-lg font-light text-foreground hover:bg-foreground/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
				aria-label="Decrease quantity"
			>
				&minus;
			</button>
			<span className="w-10 text-center text-base font-medium text-foreground tabular-nums">{value}</span>
			<button
				type="button"
				onClick={() => onChange(Math.min(max, value + 1))}
				disabled={value >= max}
				className="w-11 h-11 flex items-center justify-center text-lg font-light text-foreground hover:bg-foreground/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
				aria-label="Increase quantity"
			>
				+
			</button>
		</div>
	);
}
