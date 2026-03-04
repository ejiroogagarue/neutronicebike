"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CartButton } from "@/app/cart-button";

const navLinks = [
	{ href: "/catalog", label: "Bikes" },
	{ href: "/accessories", label: "Accessories" },
	{ href: "/rental", label: "Rental" },
	{ href: "/about", label: "About" },
] as const;

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	const closeMenu = () => setIsOpen(false);

	return (
		<div className="relative">
			<nav className="hidden md:flex items-center gap-6 md:gap-8">
				{navLinks.map(({ href, label }) => (
					<Link
						key={href}
						href={href}
						prefetch
						className="text-sm md:text-base font-medium text-white hover:text-primary transition-colors hover:italic hover:font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#010101] rounded-sm"
					>
						{label}
					</Link>
				))}
				<CartButton />
			</nav>

			<div className="md:hidden flex items-center gap-2">
				<CartButton />
				<button
					type="button"
					onClick={() => setIsOpen((prev) => !prev)}
					aria-expanded={isOpen}
					aria-controls="mobile-nav-menu"
					aria-label={isOpen ? "Close menu" : "Open menu"}
					className="p-2 text-white hover:text-primary hover:bg-white/5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#010101]"
				>
					{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
				</button>
			</div>

			{isOpen && (
				<div
					id="mobile-nav-menu"
					className="md:hidden absolute right-0 top-[calc(100%+0.5rem)] z-50 w-56 rounded-xl border border-white/10 bg-[#0a0d0f] p-2 shadow-xl"
				>
					{navLinks.map(({ href, label }) => (
						<Link
							key={href}
							href={href}
							onClick={closeMenu}
							className="block rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-white/5 hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d0f]"
						>
							{label}
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
