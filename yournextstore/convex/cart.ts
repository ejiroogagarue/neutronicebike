import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
	args: { sessionId: v.string() },
	handler: async (ctx, args) => {
		const cart = await ctx.db
			.query("carts")
			.withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
			.unique();
		if (!cart) return null;
		const items = await ctx.db
			.query("cartItems")
			.withIndex("by_cart", (q) => q.eq("cartId", cart._id))
			.collect();
		return {
			id: cart._id,
			lineItems: items.map((i) => ({
				quantity: i.quantity,
				productVariant: {
					id: i.variantId,
					price: String(i.price),
					images: i.image ? [i.image] : [],
					product: {
						id: i.productSlug,
						name: i.productName,
						slug: i.productSlug,
						images: [],
					},
				},
			})),
		};
	},
});

export const addItem = mutation({
	args: {
		sessionId: v.string(),
		variantId: v.string(),
		quantity: v.number(),
		productSlug: v.string(),
		productName: v.string(),
		variantName: v.string(),
		price: v.number(),
		image: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		let cart = await ctx.db
			.query("carts")
			.withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
			.unique();
		if (!cart) {
			const cartId = await ctx.db.insert("carts", {
				sessionId: args.sessionId,
				updatedAt: Date.now(),
			});
			cart = await ctx.db.get(cartId);
			if (!cart) return;
		}
		const existing = await ctx.db
			.query("cartItems")
			.withIndex("by_cart", (q) => q.eq("cartId", cart?._id))
			.collect();
		const match = existing.find((i) => i.variantId === args.variantId);
		if (match) {
			await ctx.db.patch(match._id, {
				quantity: match.quantity + args.quantity,
			});
		} else {
			await ctx.db.insert("cartItems", {
				cartId: cart._id,
				variantId: args.variantId,
				quantity: args.quantity,
				productSlug: args.productSlug,
				productName: args.productName,
				variantName: args.variantName,
				price: args.price,
				image: args.image,
			});
		}
		await ctx.db.patch(cart._id, { updatedAt: Date.now() });
	},
});

export const updateQuantity = mutation({
	args: {
		sessionId: v.string(),
		variantId: v.string(),
		quantity: v.number(),
	},
	handler: async (ctx, args) => {
		const cart = await ctx.db
			.query("carts")
			.withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
			.unique();
		if (!cart) return;
		const items = await ctx.db
			.query("cartItems")
			.withIndex("by_cart", (q) => q.eq("cartId", cart._id))
			.collect();
		const item = items.find((i) => i.variantId === args.variantId);
		if (!item) return;
		if (args.quantity <= 0) {
			await ctx.db.delete(item._id);
		} else {
			await ctx.db.patch(item._id, { quantity: args.quantity });
		}
		await ctx.db.patch(cart._id, { updatedAt: Date.now() });
	},
});

export const removeItem = mutation({
	args: { sessionId: v.string(), variantId: v.string() },
	handler: async (ctx, args) => {
		const cart = await ctx.db
			.query("carts")
			.withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
			.unique();
		if (!cart) return;
		const items = await ctx.db
			.query("cartItems")
			.withIndex("by_cart", (q) => q.eq("cartId", cart._id))
			.collect();
		const item = items.find((i) => i.variantId === args.variantId);
		if (item) {
			await ctx.db.delete(item._id);
			await ctx.db.patch(cart._id, { updatedAt: Date.now() });
		}
	},
});
