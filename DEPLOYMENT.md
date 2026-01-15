# 🚀 MEESL Site - Production Deployment Guide

## 📋 Prerequisites
- GitHub account (jajepierre@gmail.com)
- Vercel account
- Neon account
- Node.js installed locally

## 🔧 Step 1: GitHub Repository Setup

### Commands to run locally (Windows PowerShell):
```powershell
# If not already done:
git init
git add .
git commit -m "Initial commit - MEESL Site with NextAuth and Prisma"

# Create GitHub repository named "meesl-site" via GitHub UI
# Then:
git remote add origin https://github.com/jajepierre/meesl-site.git
git branch -M main
git push -u origin main
```

### Commands to run locally (Windows CMD):
```cmd
git init
git add .
git commit -m "Initial commit - MEESL Site with NextAuth and Prisma"
git remote add origin https://github.com/jajepierre/meesl-site.git
git branch -M main
git push -u origin main
```

## 🗄️ Step 2: Neon Database Setup

### Create Neon Project:
1. Go to [neon.tech](https://neon.tech)
2. Sign up/login
3. Create new project: "meesl-site"
4. Choose region closest to your users
5. Copy both connection strings

### Neon Connection Strings:
```
# DATABASE_URL (Pooled) - For runtime queries
postgresql://username:password@ep-xxxxx-pooler.us-east-1.aws.neon.tech/dbname?sslmode=require&pgbouncer=true

# DIRECT_URL (Direct) - For migrations only
postgresql://username:password@ep-xxxxx.us-east-1.aws.neon.tech/dbname?sslmode=require
```

### Generate NEXTAUTH_SECRET (PowerShell):
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Generate NEXTAUTH_SECRET (CMD):
```cmd
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 🌐 Step 3: Vercel Deployment

### Import Repository:
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import GitHub repository: "meesl-site" from jajepierre
4. Configure settings below

### Vercel Configuration:
```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Node.js Version: 18.x or higher
```

### Environment Variables (Vercel Dashboard → Settings → Environment Variables):
```
DATABASE_URL=postgresql://username:password@ep-xxxxx-pooler.us-east-1.aws.neon.tech/dbname?sslmode=require&pgbouncer=true
DIRECT_URL=postgresql://username:password@ep-xxxxx.us-east-1.aws.neon.tech/dbname?sslmode=require
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-32-character-secret
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### Deploy Steps:
1. Click "Deploy"
2. Wait for build to complete
3. Note your Vercel domain (e.g., `meesl-site-jajepierre.vercel.app`)
4. Update NEXTAUTH_URL and NEXT_PUBLIC_SITE_URL with your actual domain
5. Redeploy

## 🔧 Step 4: Database Migration Strategy

### Option A: Automatic (Recommended)
The build script includes migrations:
```json
{
  "scripts": {
    "build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

### Option B: Manual Migration
If automatic migration fails, run manually:

#### PowerShell:
```powershell
$env:DATABASE_URL = "your-production-database-url"
npx prisma migrate deploy
```

#### CMD:
```cmd
set DATABASE_URL=your-production-database-url
npx prisma migrate deploy
```

#### One-time Database Setup (if no migrations exist):
```bash
npx prisma db push
```

## 🔍 Step 5: Production Configuration Details

### Files Modified:
- `package.json` - Added migration deployment to build
- `lib/prisma.ts` - Production-safe singleton with logging
- `prisma/schema.prisma` - Added DIRECT_URL support
- `.env.production` - Correct Neon URL structure

### Prisma Configuration:
- Uses `DATABASE_URL` for runtime queries (pooled)
- Uses `DIRECT_URL` for migrations (direct connection)
- Singleton pattern prevents multiple connections
- Error logging in production only

### NextAuth Configuration:
- `NEXTAUTH_URL` set to production domain
- `NEXTAUTH_SECRET` generated securely
- No secrets exposed to client-side

## ✅ Step 6: Smoke Test Checklist

### Manual Tests (run after deployment):
- [ ] Homepage loads: `https://your-domain.vercel.app`
- [ ] Events page loads: `https://your-domain.vercel.app/evenements`
- [ ] Registration form works: Test signup with new user
- [ ] Login works: Test with created user credentials
- [ ] Admin dashboard accessible: `https://your-domain.vercel.app/admin-direct`
- [ ] No infinite loading or blank pages
- [ ] No database auth errors in browser console
- [ ] No secrets exposed in client-side code

### Database Verification:
1. Go to Neon dashboard
2. Open SQL Editor
3. Run: `SELECT * FROM "User" LIMIT 5;`
4. Verify test users appear after signup

### Error Handling Tests:
- [ ] Invalid signup shows user-friendly error
- [ ] Duplicate email shows proper error message
- [ ] Database errors don't expose credentials

## 🔧 Step 7: Troubleshooting

### Common Issues & Solutions:

#### Build Fails:
```bash
# Check Prisma connection locally
npx prisma db pull --print

# Regenerate client
npx prisma generate
```

#### Migration Fails:
```bash
# Check migration status
npx prisma migrate status

# Reset if needed (WARNING: deletes data)
npx prisma migrate reset
```

#### NextAuth Errors:
- Verify NEXTAUTH_URL matches exact domain
- Check NEXTAUTH_SECRET is set
- Ensure no trailing slashes in URLs

#### Database Connection:
- Verify DATABASE_URL includes `?pgbouncer=true`
- Verify DIRECT_URL excludes `?pgbouncer=true`
- Check Neon database is active

### Debug Commands:
```bash
# Test database connection
npx prisma db execute --stdin

# Check environment variables
vercel env ls

# View build logs
vercel logs
```

## 🎯 Step 8: Final Verification

### Production URL Tests:
1. **Homepage**: `https://your-domain.vercel.app`
2. **Registration**: `https://your-domain.vercel.app/register`
3. **Login**: `https://your-domain.vercel.app/login`
4. **Admin**: `https://your-domain.vercel.app/admin-direct`

### Database Flow Test:
1. Register new user → Check appears in Neon DB
2. Login with new user → Verify session works
3. Access admin → Verify role-based access

### Performance Checks:
- Page load time < 3 seconds
- No console errors
- Responsive design works

## 📞 Support & Monitoring

### Vercel Analytics:
- Monitor build success rate
- Track page performance
- Check error rates

### Neon Monitoring:
- Monitor database connections
- Check query performance
- Verify storage usage

### Next Steps:
- Set up custom domain
- Configure SSL certificates
- Set up monitoring alerts

---

## 🎉 Production Deployment Complete!

Your MEESL site is now live with:
✅ Secure Neon PostgreSQL database  
✅ Prisma ORM with proper migrations  
✅ NextAuth authentication  
✅ Production-ready error handling  
✅ Optimized for Vercel hosting  

**Live URL**: `https://your-domain.vercel.app`
