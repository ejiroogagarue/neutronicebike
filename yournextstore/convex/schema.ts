import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/** Product variant: color option with its own Stripe price ID */
const variantSchema = {
	id: v.string(),
	name: v.string(),
	slug: v.string(),
	price: v.number(),
	currency: v.string(),
	image: v.optional(v.string()),
	stripePriceId: v.string(),
	attributes: v.optional(v.record(v.string(), v.string())),
};

/** Quick stat row for product display */
const quickStatSchema = {
	label: v.string(),
	value: v.string(),
};

/** Product feature block */
const featureSchema = {
	image: v.string(),
	title: v.string(),
	description: v.string(),
};

/** Spec row and category */
const specRowSchema = { label: v.string(), value: v.string() };
const specCategorySchema = {
	category: v.string(),
	rows: v.array(v.object(specRowSchema)),
};

export default defineSchema({
	products: defineTable({
		slug: v.string(),
		name: v.string(),
		tagline: v.string(),
		description: v.string(),
		shortDescription: v.string(),
		price: v.number(),
		currency: v.string(),
		images: v.array(v.string()),
		variants: v.array(v.object(variantSchema)),
		motor: v.optional(v.string()),
		battery: v.optional(v.string()),
		quickStats: v.array(v.object(quickStatSchema)),
		features: v.array(v.object(featureSchema)),
		specs: v.array(v.object(specCategorySchema)),
	}).index("by_slug", ["slug"]),

	carts: defineTable({
		sessionId: v.string(),
		updatedAt: v.number(),
	}).index("by_session", ["sessionId"]),

	cartItems: defineTable({
		cartId: v.id("carts"),
		variantId: v.string(),
		quantity: v.number(),
		productSlug: v.string(),
		productName: v.string(),
		variantName: v.string(),
		price: v.number(),
		image: v.optional(v.string()),
	}).index("by_cart", ["cartId"]),
});
