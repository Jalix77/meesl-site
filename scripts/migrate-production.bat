@echo off
REM Production Migration Script for MEESL Site (Windows)
REM Run this after deploying to Vercel

echo 🚀 Starting production database migration...

REM Check if DATABASE_URL is set
if "%DATABASE_URL%"=="" (
    echo ❌ ERROR: DATABASE_URL is not set
    exit /b 1
)

echo 📡 Connecting to production database...

REM Run migrations
npx prisma migrate deploy

echo ✅ Migration completed successfully!

REM Generate Prisma client
npx prisma generate

echo 🔧 Prisma client generated

REM Optional: Seed production data (if needed)
REM npx tsx prisma/seed-cms.ts

echo 🎉 Production setup complete!
