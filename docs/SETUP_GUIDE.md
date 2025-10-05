# Setup Guide - Tonik Carting Leaderboard

This guide will walk you through setting up and running your karting leaderboard app from scratch.

## Prerequisites

Before you begin, make sure you have:
- Node.js 18 or higher installed
- A Supabase account (free tier works great!)
- A Vercel account (for deployment)
- Git installed

## Step 1: Install Dependencies

First, install all the required npm packages:

```bash
npm install
```

This will install Next.js, React, Tailwind CSS, Supabase client, and all other dependencies.

## Step 2: Set Up Supabase

### 2.1 Create Your Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "New project"
3. Fill in:
   - **Project name**: `tonik-carting` (or whatever you prefer)
   - **Database password**: Choose a strong password and save it somewhere safe
   - **Region**: Choose the region closest to you
4. Click "Create new project" and wait for it to provision (~2 minutes)

### 2.2 Run the Database Schema

1. Once your project is ready, click **SQL Editor** in the left sidebar
2. Click "New query"
3. Open the file `supabase/schema.sql` from this project
4. Copy the entire contents
5. Paste it into the Supabase SQL Editor
6. Click "Run" (or press Cmd/Ctrl + Enter)
7. You should see "Success. No rows returned"

This creates your `lap_times` table with proper indexes and security policies.

### 2.3 Get Your API Credentials

1. Click the **Settings** icon (gear) in the left sidebar
2. Click **API** in the settings menu
3. You'll need two values:
   - **Project URL**: Something like `https://abcdefghijklm.supabase.co`
   - **anon public key**: A long JWT token starting with `eyJ...`
4. Keep this tab open - you'll need these values next

### 2.4 Configure Environment Variables

1. In your project root, create a file called `.env.local`:

```bash
touch .env.local
```

2. Open `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Replace the values with your actual credentials from step 2.3.

**Important**: Never commit `.env.local` to Git! It's already in `.gitignore`.

## Step 3: Import Your Lap Times Data

Now let's import your CSV data into Supabase:

```bash
npm run import-csv
```

You should see output like:

```
🏁 Starting CSV import...
📄 Found 1000 rows in CSV
✅ 159 valid records to import
🗑️  Clearing existing data...
✅ Existing data cleared
📦 Imported batch 1: 159 records (Total: 159/159)
✅ Import complete! 159 records imported successfully.

📊 Statistics:
  - Total records: 159
  - Unique drivers: 29
  - Records included in leaderboard: 159
```

If you get an error about missing Supabase credentials, double-check your `.env.local` file.

## Step 4: Run the Development Server

Start your local development server:

```bash
npm run dev
```

Open your browser and go to [http://localhost:3000](http://localhost:3000)

You should see your leaderboard! 🎉

Try navigating to:
- `/` - Leaderboard (best time per driver)
- `/events` - List of all events
- `/events/2025-02-10` - Details for a specific event
- `/drivers/kosin.ski` - Stats for a specific driver

## Step 5: Deploy to Vercel

### 5.1 Push to GitHub

1. Initialize a git repository (if you haven't already):

```bash
git init
git add .
git commit -m "Initial commit: Tonik Carting Leaderboard"
```

2. Create a new repository on GitHub
3. Push your code:

```bash
git remote add origin https://github.com/yourusername/tonik-carting-leaderboard.git
git branch -M main
git push -u origin main
```

### 5.2 Deploy to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect it's a Next.js app
5. Before deploying, add your environment variables:
   - Click "Environment Variables"
   - Add `NEXT_PUBLIC_SUPABASE_URL` with your Supabase URL
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your anon key
6. Click "Deploy"

Your app will be live at `https://your-project.vercel.app` in about 2 minutes!

## Common Issues & Solutions

### "Missing Supabase credentials" error

**Problem**: The app can't find your Supabase URL or API key.

**Solution**: 
1. Make sure `.env.local` exists in your project root
2. Check that the variable names are exactly: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Restart your dev server after creating/editing `.env.local`

### Import script shows "No valid records to import"

**Problem**: The CSV file isn't being read correctly.

**Solution**:
1. Make sure `test_dataset.csv` is in your project root
2. Check that the CSV has the correct columns: `Date,Place,Name,Lap Time,Weight,Include`
3. Verify dates are in DD/MM/YYYY HH:mm format

### "Error fetching leaderboard" on the page

**Problem**: The app can't connect to Supabase.

**Solution**:
1. Check your Supabase project is active (not paused)
2. Verify your API credentials in `.env.local`
3. Check the browser console for specific error messages
4. Make sure you ran the schema SQL script in Supabase

### No data appears after import

**Problem**: Data imported but isn't showing in the app.

**Solution**:
1. Go to Supabase → Table Editor → `lap_times`
2. Verify the data is there
3. Check that the `include` column is `true` for records you want to see
4. Try refreshing your browser (hard refresh: Cmd+Shift+R or Ctrl+Shift+R)

## Adding New Lap Times

### Option 1: Via Supabase Dashboard (Easiest)

1. Go to Supabase → Table Editor → `lap_times`
2. Click "Insert row"
3. Fill in:
   - `date`: Select date and time (e.g., "2025-02-10 20:15:00")
   - `session_time`: e.g., "20:15"
   - `driver_name`: Driver's name
   - `lap_time_seconds`: Time in seconds (e.g., 44.956)
   - `lap_time_display`: Formatted time (e.g., "44.956")
   - `place`: Position in session
   - `weight`: "90 kg"
   - `include`: true
4. Click "Save"

The app updates automatically (within 60 seconds due to caching).

### Option 2: Update CSV and Re-import

1. Add new rows to your `test_dataset.csv`
2. Run `npm run import-csv` again
3. **Note**: This clears and replaces all existing data!

To append instead of replace, edit `scripts/import-csv.ts` and comment out the "Clear existing data" section.

## Updating the Design

The app uses Tailwind CSS configured to match your Figma design tokens. Key files:

- `tailwind.config.ts` - Colors, fonts, spacing from Figma
- `app/globals.css` - Global styles
- `components/*.tsx` - Individual components

All colors, spacing, and typography are defined as Tailwind utilities matching your Figma variables.

## Next Steps

### Improvements You Could Make

1. **Add a form to submit new lap times** (no more manual Supabase editing)
2. **Driver profile photos** (store URLs in Supabase)
3. **Track weather conditions** per session
4. **Export results to PDF**
5. **Personal best notifications**
6. **Lap time charts and trends**
7. **Mobile responsive version** (Figma mobile designs are ready!)

### Performance Tips

- The app uses Next.js server components with 60-second caching
- All database queries are indexed for speed
- Static pages are generated at build time when possible

## Getting Help

If you run into issues:

1. Check the error message carefully
2. Review this guide for common solutions
3. Check the Supabase logs (Settings → Logs)
4. Check your browser console for errors
5. Verify your environment variables

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Deployment Docs](https://vercel.com/docs)

---

**Enjoy your carting leaderboard! 🏁**
