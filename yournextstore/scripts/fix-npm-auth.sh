#!/usr/bin/env bash
# Fixes "Access token expired or revoked" - npm revoked classic tokens in Dec 2025.
# Run: bash scripts/fix-npm-auth.sh
# Then: pnpm install  (or npm install)

set -e

echo "Fixing npm auth..."

# Remove auth token for public registry (the one causing the notices)
npm config delete "//registry.npmjs.org/:_authToken" 2>/dev/null || true
npm config delete "_authToken" 2>/dev/null || true
npm config delete "//registry.npmjs.org/:_auth" 2>/dev/null || true

# If you still get the notice: backup and remove ~/.npmrc, then run pnpm install
# (pnpm doesn't use npm's token, so it works without auth for public packages)

echo ""
echo "Done. Try: pnpm install"
echo "(pnpm avoids npm auth - this template has pnpm-lock.yaml)"
