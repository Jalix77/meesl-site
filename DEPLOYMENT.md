# 🚀 MEESL Site - Production Deployment Guide

## 📋 Prerequisites
- GitHub account
- Vercel account
- Neon account
- Node.js installed locally

## 🔧 Step 1: GitHub Repository Setup

### Commands to run locally (Windows):
```bash
# If not already done:
git init
git add .
git commit -m "Initial commit - MEESL Site with NextAuth and Prisma"

# Create GitHub repository (via GitHub UI)
# Then:
git remote add origin https://github.com/YOUR_USERNAME/meesl-site.git
git branch -M main
git push -u origin main
```

## 🗄️ Step 2: Neon Database Setup

### Create Neon Project:
1. Go to [neon.tech](https://neon.tech)
2. Sign up/login
3. Create new project: "meesl-site"
4. Choose region closest to your users
5. Copy the **Connection String** (DATABASE_URL)

### Database URL Format:
```
postgresql://username:password@ep-xxxxx-pooler.us-east-1.aws.neon.tech/dbname?sslmode=require&pgbouncer=true
```

### Optional: Get DIRECT_URL:
```
postgresql://username:password@ep-xxxxx.us-east-1.aws.neon.tech/dbname?sslmode=require
```

## 🏗️ Step 3: Database Migration

### Option A: Recommended - Prisma Migrate
```bash
# Create initial migration (if not exists)
npx prisma migrate dev --name init

# Push to production (after Vercel deploy)
npx prisma migrate deploy
```

### Option B: Simple - Prisma Push
```bash
# If no migrations exist yet
npx prisma db push
```

## 🌐 Step 4: Vercel Deployment

### Import Repository:
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import GitHub repository: "meesl-site"
4. Configure settings below

### Vercel Configuration:
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

### Environment Variables (Vercel Dashboard):
```
DATABASE_URL=your-neon-connection-string
DIRECT_URL=your-neon-direct-url (optional)
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-32-character-secret
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

### Generate NEXTAUTH_SECRET:
```bash
# Windows PowerShell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 🔧 Step 5: Build & Runtime Configuration

### Package.json Scripts (already added):
```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

### Prisma Client Singleton (already configured):
- File: `lib/prisma.ts`
- Uses global singleton pattern
- Automatically reads `process.env.DATABASE_URL`

## 🗄️ Step 6: Production Database Setup

### After Vercel Deployment:

#### Option A: Vercel Build Step (Recommended)
Add to `package.json`:
```json
{
  "scripts": {
    "build": "prisma generate && next build"
  }
}
```

#### Option B: Manual Migration
```bash
# Set production DATABASE_URL
set DATABASE_URL=your-production-database-url

# Run migration
npx prisma migrate deploy

# Or if no migrations:
npx prisma db push
```

## ✅ Step 7: Smoke Test Checklist

### Manual Tests:
- [ ] Homepage loads: `https://your-domain.vercel.app`
- [ ] Events page loads: `https://your-domain.vercel.app/evenements`
- [ ] Signup creates user: Test registration form
- [ ] Login works: Test with created user
- [ ] Admin dashboard accessible: `https://your-domain.vercel.app/admin-direct`
- [ ] No infinite loading/blank pages
- [ ] No database auth errors in browser console
- [ ] No secrets exposed in client-side code

### Database Verification:
```sql
-- Connect to Neon dashboard and run:
SELECT * FROM "User" LIMIT 5;
SELECT * FROM "Profile" LIMIT 5;
```

## 🔍 Step 8: Troubleshooting

### Common Issues:
1. **DATABASE_URL not found**: Check Vercel env vars
2. **Prisma generation failed**: Ensure `postinstall` script runs
3. **NextAuth errors**: Verify NEXTAUTH_URL matches domain
4. **Migration conflicts**: Use `prisma migrate reset` if needed

### Debug Commands:
```bash
# Check Prisma connection
npx prisma db pull --print

# Test migration
npx prisma migrate deploy --dry-run

# Regenerate client
npx prisma generate
```

## 🎯 Final Verification Steps

1. **Deploy to Vercel** ✅
2. **Set environment variables** ✅
3. **Run database migration** ✅
4. **Test signup/login flow** ✅
5. **Verify admin functionality** ✅
6. **Check all pages load** ✅

## 📞 Support

If issues arise:
1. Check Vercel build logs
2. Verify Neon database connection
3. Ensure all environment variables are set
4. Check Prisma schema matches database

---

**🎉 Your MEESL site is now live!**
