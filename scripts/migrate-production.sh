#!/bin/bash

# Production Migration Script for MEESL Site
# Run this after deploying to Vercel

echo "🚀 Starting production database migration..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERROR: DATABASE_URL is not set"
    exit 1
fi

echo "📡 Connecting to production database..."

# Run migrations
npx prisma migrate deploy

echo "✅ Migration completed successfully!"

# Generate Prisma client
npx prisma generate

echo "🔧 Prisma client generated"

# Optional: Seed production data (if needed)
# npx tsx prisma/seed-cms.ts

echo "🎉 Production setup complete!"
