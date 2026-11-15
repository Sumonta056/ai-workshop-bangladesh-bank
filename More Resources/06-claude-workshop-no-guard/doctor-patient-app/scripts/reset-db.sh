#!/usr/bin/env bash

set -e

echo "Starting database reset and seed process..."

# Navigate to the app directory (one level up from the scripts directory)
cd "$(dirname "$0")/.."

# Clean up broken migrations (Error: P3015)
echo "Checking for invalid migration directories..."
for dir in prisma/migrations/*/; do
  if [ -d "$dir" ] && [ ! -f "${dir}migration.sql" ]; then
    echo "Deleting invalid migration directory (missing migration.sql): $dir"
    rm -rf "$dir"
  fi
done

# Reset the database, apply all migrations, and run the seed script
echo "Running Prisma migrate reset (this drops the DB, recreates schemas from migrations, and runs seeding)..."
npx prisma migrate reset --force

# Regenerate the Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Seed the database explicitly
echo "Seeding the database..."
npx prisma db seed

echo "Database reset, migrations applied, and reseeding completed successfully!"
