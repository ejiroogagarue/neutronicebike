"use client";

import { useEffect } from "react";

/** Applies font stylesheet after hydration to avoid mutating DOM before React hydrates (fixes hydration mismatch). */
export function FontLoader() {
	useEffect(() => {
		const link = document.getElementById("zalando-font");
		if (link && link instanceof HTMLLinkElement) {
			link.media = "all";
		}
	}, []);
	return null;
}
