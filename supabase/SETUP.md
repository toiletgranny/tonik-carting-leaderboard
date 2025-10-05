# Supabase Setup Guide

This guide will walk you through setting up your Supabase database for the Tonik Carting Leaderboard app.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in the details:
   - **Name**: Tonik Carting Leaderboard
   - **Database Password**: (choose a strong password)
   - **Region**: Choose the region closest to you
   - **Pricing Plan**: Free tier is perfect for this project
5. Click "Create new project"
6. Wait a few minutes for the project to be provisioned

## Step 2: Run the Database Schema

1. In your Supabase project dashboard, click on the **SQL Editor** icon in the left sidebar
2. Click "New Query"
3. Copy the entire contents of `supabase/schema.sql` from this project
4. Paste it into the SQL Editor
5. Click "Run" (or press Cmd+Enter / Ctrl+Enter)
6. You should see a success message: "Success. No rows returned"

This creates:
- The `lap_times` table with all necessary columns
- Indexes for better query performance
- Row Level Security policies for public read access
- Two helpful views: `leaderboard` and `events_summary`

## Step 3: Get Your API Credentials

1. In your Supabase project, click on the **Settings** icon (gear) in the left sidebar
2. Click on **API** in the settings menu
3. You'll see two important values:

   - **Project URL**: Something like `https://abcdefghijklm.supabase.co`
   - **Project API Keys > anon public**: A long string starting with `eyJ...`

4. Copy these values - you'll need them next

## Step 4: Configure Environment Variables

1. In your project root directory, create a file called `.env.local`
2. Add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Replace the values with your actual credentials from Step 3.

**Important**: Never commit `.env.local` to Git! It's already in `.gitignore`.

## Step 5: Import Your CSV Data

Now that Supabase is configured, import your lap times data:

```bash
npm run import-csv
```

This script will:
- Read `test_dataset.csv`
- Parse all lap times
- Clear any existing data (if any)
- Import all valid records to Supabase
- Show you statistics about the import

You should see output like:
```
🏁 Starting CSV import...
📄 Found 1000 rows in CSV
✅ 159 valid records to import
...
✅ Import complete! 159 records imported successfully.
```

## Step 6: Verify Your Data

1. Go back to Supabase
2. Click on **Table Editor** in the left sidebar
3. Click on the `lap_times` table
4. You should see all your imported lap times!

You can also test the views:
- In SQL Editor, run: `SELECT * FROM leaderboard ORDER BY lap_time_seconds LIMIT 10;`
- This should show the top 10 fastest drivers

## Troubleshooting

### "Missing Supabase credentials" error

Make sure your `.env.local` file exists and has the correct format. The environment variable names must be exactly:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Import script fails

1. Check that your Supabase project is fully provisioned (not still setting up)
2. Verify your API credentials are correct
3. Make sure Row Level Security policies are set up (run the schema.sql again)
4. Check that `test_dataset.csv` exists in your project root

### No data appears in the app

1. Verify data imported successfully by checking the Table Editor
2. Make sure the `include` column is set to `true` for the records you want to see
3. Check browser console for any errors
4. Verify your `.env.local` is configured correctly

## Managing Data

### Adding New Lap Times

**Option 1: Via Supabase Dashboard**
1. Go to Table Editor → `lap_times`
2. Click "Insert row"
3. Fill in the fields:
   - `date`: Use the date/time picker
   - `session_time`: e.g., "20:15"
   - `driver_name`: Driver's name
   - `lap_time_seconds`: Time in seconds (e.g., 44.956)
   - `lap_time_display`: Formatted time (e.g., "44.956")
   - `place`: Position in session
   - `weight`: e.g., "90 kg"
   - `include`: true
4. Click "Save"

**Option 2: Update CSV and Re-import**
1. Edit your `test_dataset.csv`
2. Add new rows with the same format
3. Run `npm run import-csv` again

**Note**: The import script clears all existing data before importing. If you want to append instead of replace, comment out the "Clear existing data" section in `scripts/import-csv.ts`.

### Excluding Drivers from Leaderboard

Set the `include` column to `false` for any lap times you want to exclude from leaderboards and statistics.

## Security Notes

### Row Level Security (RLS)

The schema sets up RLS with a public read policy. This means:
- ✅ Anyone can view the data (perfect for a public leaderboard)
- ❌ No one can insert, update, or delete data through the API

All data management must be done through:
- Supabase Dashboard (you're logged in as admin)
- The import script (uses your API key)

### API Keys

The `anon` public key is safe to expose in your frontend code. It only allows the operations permitted by your RLS policies (in this case, read-only access).

Never expose your `service_role` key - that bypasses all RLS policies!

## Next Steps

Once your Supabase is set up and data is imported:

1. Start the development server: `npm run dev`
2. Open [http://localhost:3000](http://localhost:3000)
3. You should see your leaderboard data!

## Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com/)
- Check your Supabase project logs in the dashboard
