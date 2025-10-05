# Quick Start - Get Running in 5 Minutes

## Prerequisites
- Node.js 18+ installed
- A Supabase account (free)

## Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Supabase Project
1. Go to https://supabase.com
2. Create new project
3. Wait for it to provision (~2 min)

### 3. Set Up Database
1. Open SQL Editor in Supabase
2. Copy contents of `supabase/schema.sql`
3. Paste and run

### 4. Get API Credentials
1. Go to Settings → API
2. Copy Project URL and anon public key

### 5. Create `.env.local`
```bash
echo 'NEXT_PUBLIC_SUPABASE_URL=your-url' > .env.local
echo 'NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key' >> .env.local
```
(Replace with your actual values)

### 6. Import Data
```bash
npm run import-csv
```

### 7. Run!
```bash
npm run dev
```

Open http://localhost:3000 🎉

## Deploy to Vercel (Optional)

```bash
git init
git add .
git commit -m "Initial commit"
```

Then:
1. Push to GitHub
2. Import in Vercel
3. Add env vars
4. Deploy!

---

**Need help?** See `SETUP_GUIDE.md` for detailed instructions and troubleshooting.
