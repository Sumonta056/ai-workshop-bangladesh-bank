#!/bin/sh
set -e

# Run migrations
pnpm exec prisma migrate deploy

# Seed only on first run
if [ ! -f /app/data/.seeded ]; then
  pnpm exec prisma db seed
  touch /app/data/.seeded
fi

exec pnpm start
