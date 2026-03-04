import { v } from "convex/values";
import { query } from "./_generated/server";

export const list = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("products").collect();
	},
});

export const getBySlug = query({
	args: { slug: v.string() },
	handler: async (ctx, args) => {
		return await ctx.db
			.query("products")
			.withIndex("by_slug", (q) => q.eq("slug", args.slug))
			.unique();
	},
});

export const getStripePriceId = query({
	args: { variantId: v.string() },
	handler: async (ctx, args) => {
		const products = await ctx.db.query("products").collect();
		for (const p of products) {
			const v = p.variants.find((x) => x.id === args.variantId);
			if (v?.stripePriceId) {
				return v.stripePriceId;
			}
		}
		return null;
	},
});
