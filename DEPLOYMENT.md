# 🚀 Deployment Guide - kocono.com

## Quick Deploy to Vercel

### Step 1: Install dependencies
```bash
npm install
```

### Step 2: Test locally (optional)
```bash
npm run dev
# Open http://localhost:3000
```

### Step 3: Push to GitHub
```bash
git init
git add .
git commit -m "Initial Kocono v1.0"
gh repo create kocono --public --source=. --remote=origin --push
```

### Step 4: Deploy to Vercel
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Select `kocono` repository
5. Click "Deploy"
6. ✅ You'll get: `kocono.vercel.app`

### Step 5: Add custom domain (kocono.com)
1. Vercel Dashboard → Project Settings → Domains
2. Click "Add Domain"
3. Enter: `kocono.com`
4. Vercel will show DNS records to add:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME  
   Name: www
   Value: cname.vercel-dns.com
   ```
5. Add these records in your domain registrar
6. Wait 5-10 minutes for DNS propagation
7. ✅ LIVE at `https://kocono.com`!

## Environment Variables

None needed! Everything runs client-side.

## Build Command

```bash
npm run build
```

## Output Directory

```
.next
```

## Node Version

18.x or higher

---

**That's it! Your app is live at kocono.com** 🎉
