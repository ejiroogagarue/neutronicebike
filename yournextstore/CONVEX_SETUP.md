# Convex + Stripe Setup

## What's Done

- **Checkout fixed**: The proxy no longer rewrites `/checkout` to example.com. Your local Stripe checkout works.
- **Convex schema**: `products`, `carts`, `cartItems` tables.
- **Convex functions**: `products` (list, getBySlug, getStripePriceId), `cart` (get, addItem, updateQuantity, removeItem), `seed` (seedProducts).
- **ConvexProvider**: Wraps the app when `NEXT_PUBLIC_CONVEX_URL` is set.
- **Checkout**: Uses Convex for Stripe price IDs when configured, falls back to static products.

## Next Steps (run these in order)

### 1. Start Convex and push schema

```bash
cd yournextstore
npx convex dev
```

This will:
- Create/link your Convex project
- Add `NEXT_PUBLIC_CONVEX_URL` to `.env.local`
- Push schema and functions
- Generate `convex/_generated/` for type safety

Keep this running in a separate terminal while developing.

### 2. Seed products into Convex

```bash
npx convex run convex/seed:seedProducts
```

### 3. Restart your Next.js dev server

So it picks up `NEXT_PUBLIC_CONVEX_URL` from `.env.local`.

### 4. Test checkout

1. Add a bike to cart (product page)
2. Go to `/checkout`
3. Click "Checkout with card"
4. You should be redirected to Stripe Checkout

## Optional: Migrate products & cart to Convex

The catalog and product pages still use static data. To fully migrate:

- Replace `getStaticProducts` / `getProductBySlug` with `useQuery(api.products.list)` and `useQuery(api.products.getBySlug)`
- Replace the cart context with Convex cart queries/mutations (using session ID from a cookie)

The Convex cart is session-based: pass a `sessionId` (e.g. from a cookie) to `cart.get` and `cart.addItem`.
