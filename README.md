# Tonik Carting Leaderboard

A web application to track and display karting lap times for your racing crew.

## Features

- **Leaderboard**: View all-time best lap times for each driver
- **Events**: Browse historical racing events grouped by date
- **Event Details**: See detailed results for each racing session
- **Driver Details**: View statistics and lap history for individual drivers

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tonik-carting-leaderboard.git
cd tonik-carting-leaderboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the SQL schema from `supabase/schema.sql` in the SQL Editor
   - Enable Row Level Security and add the public read policy

4. Configure environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

5. Import your CSV data:
```bash
npm run import-csv
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
├── app/                  # Next.js app router pages
│   ├── page.tsx         # Leaderboard (home)
│   ├── events/          # Events list and details
│   └── drivers/         # Driver details
├── components/          # React components
├── lib/                 # Utilities and data layer
│   ├── supabase/       # Supabase client and types
│   ├── data/           # Data fetching functions
│   └── utils/          # Helper utilities
├── scripts/            # Data import scripts
└── supabase/           # Database schema and migrations
```

## Data Management

### Adding New Lap Times

You can add new lap times in two ways:

1. **Via Supabase Dashboard**: 
   - Go to your Supabase project
   - Navigate to Table Editor → `lap_times`
   - Insert new rows manually

2. **Via CSV Import**:
   - Update your CSV file with new data
   - Run `npm run import-csv`

### CSV Format

Your CSV should follow this format:
```csv
Date,Place,Name,Lap Time,Weight,Include
29/08/2024 20:15,1,kosin.ski,44.956,90 kg,TRUE
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub

2. Go to [vercel.com](https://vercel.com) and import your repository

3. Add environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. Deploy!

Your app will be live at `https://your-project.vercel.app`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run import-csv` - Import CSV data to Supabase

### Adding New Features

See `PRD.md` for detailed product requirements and future enhancement ideas.

## License

Private project for personal use.

## Support

For questions or issues, contact the project maintainer.
