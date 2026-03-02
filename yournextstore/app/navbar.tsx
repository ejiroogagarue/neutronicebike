import Link from "next/link";
import { CartButton } from "@/app/cart-button";

const navLinks = [
	{ href: "/catalog", label: "Bikes" },
	{ href: "/accessories", label: "Accessories" },
	{ href: "/rental", label: "Rental" },
	{ href: "/about", label: "About" },
] as const;

export function Navbar() {
	return (
		<nav className="flex items-center gap-6 md:gap-8">
			{navLinks.map(({ href, label }) => (
				<Link
					key={href}
					href={href}
					className="text-sm md:text-base font-medium text-white hover:text-primary transition-colors hover:italic hover:font-bold"
				>
					{label}
				</Link>
			))}
			<CartButton />
		</nav>
	);
}
