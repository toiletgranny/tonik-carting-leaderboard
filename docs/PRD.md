# Product Requirements Document: Tonik Carting Leaderboard

## 1. Overview

### 1.1 Product Vision
A simple, public web application to view and track karting lap times for a group of friends (posse). The app displays historical lap time data, leaderboards, event details, and individual driver statistics.

### 1.2 Goals
- Provide an easy way to view best lap times across all drivers
- Browse historical events and sessions
- View detailed statistics for individual drivers
- Maintain a simple, editable data source (Supabase)
- Clean, modern UI matching provided Figma designs

### 1.3 Non-Goals (v1)
- User authentication or accounts
- Adding new lap times via the UI (data managed in Supabase directly)
- Mobile-first responsive design (desktop-first, mobile later)
- Real-time updates during races
- Driver profiles with photos

## 2. Tech Stack

### 2.1 Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Hosting**: Vercel

### 2.2 Backend/Database
- **Database**: Supabase (PostgreSQL)
- **Authentication**: None (public read-only access)
- **API**: Supabase auto-generated REST API

### 2.3 Development Tools
- Node.js 18+
- npm/yarn/pnpm
- Git + GitHub

## 3. Data Model

### 3.1 Source Data Format (CSV)
The application ingests data from a CSV file with the following structure:
```csv
Date,Place,Name,Lap Time,Weight,Include
29/08/2024 20:15,1,kosin.ski,44.956,90 kg,TRUE
29/08/2024 20:15,2,Goszczu,45.065,90 kg,TRUE
```

**Fields:**
- `Date`: Session timestamp in format "DD/MM/YYYY HH:mm"
- `Place`: Position within that session (1st, 2nd, 3rd, etc.)
- `Name`: Driver name/nickname
- `Lap Time`: Lap time in seconds (e.g., "44.956") or minutes:seconds (e.g., "1:11.701")
- `Weight`: Kart weight class (currently all "90 kg")
- `Include`: Boolean flag to filter out certain entries (FALSE = exclude from leaderboards)

### 3.2 Database Schema

**Table: `lap_times`**

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `date` | timestamptz | Full timestamp of the session |
| `session_time` | text | Time portion extracted (e.g., "20:15") |
| `driver_name` | text | Driver's name/nickname |
| `lap_time_seconds` | decimal | Normalized lap time in seconds for sorting |
| `lap_time_display` | text | Original formatted time for display |
| `place` | integer | Position within the session |
| `weight` | text | Weight class (e.g., "90 kg") |
| `include` | boolean | Whether to include in leaderboards (TRUE/FALSE) |
| `created_at` | timestamptz | Record creation timestamp |

**Indexes:**
- `idx_lap_times_driver` on `driver_name`
- `idx_lap_times_date` on `date`
- `idx_lap_times_include` on `include`

### 3.3 Data Transformations

**Time Parsing:**
- Input: "44.956" → Output: 44.956 seconds
- Input: "1:11.701" → Output: 71.701 seconds (1 * 60 + 11.701)

**Date Parsing:**
- Input: "29/08/2024 20:15" (DD/MM/YYYY HH:mm)
- Output: ISO 8601 timestamp

**Event Grouping:**
- Events = Group by date only (e.g., all sessions from "29/08/2024")
- Sessions = Group by date + time (e.g., "29/08/2024 20:15")

## 4. Features & User Flows

### 4.1 Leaderboard View (Priority 1)
**Route:** `/`

**Description:** Main landing page showing the all-time best lap time for each driver.

**Data Requirements:**
- For each unique driver (WHERE include = TRUE):
  - Get the fastest lap time (MIN lap_time_seconds)
  - Show the timestamp when that lap was recorded
  - Calculate time delta from the driver ranked above them

**Display:**
- Rank (1, 2, 3...)
- Driver name
- Best lap time (formatted)
- Timestamp of best lap
- Time delta (e.g., "+0.109s" from previous driver)

**Figma Reference:** https://www.figma.com/design/03yLZQYsdPVHcpIzc5t8xW/Tonik-Carting-Leaderboard?node-id=41-3492

### 4.2 Events List View (Priority 2)
**Route:** `/events`

**Description:** Browse all karting events grouped by date.

**Data Requirements:**
- Group all lap_times by date
- For each event, show:
  - Event date
  - Number of unique sessions
  - Number of participants
  - Total laps recorded

**Display:**
- List of event cards
- Each card is clickable → navigates to Event Details

**Figma Reference:** https://www.figma.com/design/03yLZQYsdPVHcpIzc5t8xW/Tonik-Carting-Leaderboard?node-id=51-2896

### 4.3 Event Details View (Priority 3)
**Route:** `/events/[date]`

**Description:** View all sessions within a specific event date.

**Data Requirements:**
- Filter lap_times WHERE date matches the selected event
- Group by session_time
- For each session, show all drivers with their lap times and positions

**Display:**
- Event date header
- Session breakdown (e.g., "Session 1 - 19:15", "Session 2 - 19:45")
- For each session: full results table (Place, Driver, Time)

**Figma Reference:** https://www.figma.com/design/03yLZQYsdPVHcpIzc5t8xW/Tonik-Carting-Leaderboard?node-id=51-3954

### 4.4 Driver Details View (Priority 4)
**Route:** `/drivers/[name]`

**Description:** View statistics and lap history for a specific driver.

**Data Requirements:**
- Filter lap_times WHERE driver_name = [name] AND include = TRUE
- Calculate:
  - Best lap time
  - Average lap time
  - Total number of laps
  - Number of events participated in
- Show chronological lap history

**Display:**
- Driver name header
- Key statistics (best, average, total laps)
- Lap history table (Date, Session, Time, Place)

**Figma Reference:** https://www.figma.com/design/03yLZQYsdPVHcpIzc5t8xW/Tonik-Carting-Leaderboard?node-id=51-7577

### 4.5 Navigation
- Global navigation bar/menu to switch between:
  - Leaderboard
  - Events
- Breadcrumb navigation on detail pages
- Back buttons where appropriate

## 5. Design System

### 5.1 Design Source
Figma file with design tokens and component specs:
https://www.figma.com/design/03yLZQYsdPVHcpIzc5t8xW/Tonik-Carting-Leaderboard

### 5.2 Key Design Elements
- Clean, minimal interface
- Card-based layouts
- Monospaced font for lap times
- Clear visual hierarchy
- Subtle hover states
- Desktop-first layout (mobile breakpoints available in Figma variables)

### 5.3 Components to Build
- `DriverCard` - Leaderboard entry
- `EventCard` - Event summary in list
- `SessionCard` - Session results block
- `TimeDisplay` - Formatted lap time component
- `Navigation` - Global nav bar

## 6. Data Management

### 6.1 Initial Data Import
- CSV file with ~159 valid lap time records
- Import script to parse and bulk insert into Supabase
- Handle both time formats: "44.956" and "1:11.701"
- Filter rows where Include = FALSE

### 6.2 Ongoing Updates
- Data edited directly in Supabase table editor (no UI for adding data)
- Future: Could re-run import script with updated CSV

### 6.3 Data Quality
- Some drivers have `include = FALSE` (e.g., "Szymon", "Paolo Fant") - exclude from all views
- Empty rows at end of CSV (lines 160-1000) should be ignored during import

## 7. Performance Considerations

### 7.1 Optimization Strategies
- Use Next.js Server Components for data fetching (no client-side waterfalls)
- Leverage Next.js caching for database queries
- Supabase queries optimized with proper indexes
- Static page generation where possible

### 7.2 Scalability
- Current dataset: ~159 records (very small)
- Expected growth: Moderate (weekly/monthly additions)
- No immediate need for pagination
- Consider pagination if dataset exceeds 1000+ records

## 8. Security & Access Control

### 8.1 Public Access
- Application is fully public (no login required)
- Anyone with the URL can view all data

### 8.2 Supabase Configuration
- Enable Row Level Security (RLS)
- Create policy: Allow public read access to `lap_times` table
- API keys: Use anon/public key (safe to expose in frontend)

## 9. Deployment

### 9.1 Hosting
- Deploy to Vercel (automatic deployments from GitHub)
- Connect GitHub repository
- Vercel will auto-detect Next.js and configure build

### 9.2 Environment Variables
Required in Vercel:
```
NEXT_PUBLIC_SUPABASE_URL=<your-project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

### 9.3 Domain
- Use default Vercel domain initially (e.g., `tonik-carting.vercel.app`)
- Option to add custom domain later

## 10. Success Metrics (Future)

### 10.1 Usage Metrics
- Page views per view (Leaderboard, Events, Drivers)
- Most viewed drivers
- Most viewed events

### 10.2 Data Metrics
- Number of events tracked
- Number of drivers
- Average laps per event

## 11. Future Enhancements

### Phase 2 Features (Post-MVP)
- Mobile responsive design
- Add new lap times via web form
- Driver profile photos/avatars
- Session weather conditions
- Track/location information
- Export to CSV/PDF
- Share individual results (social media cards)
- Personal best notifications
- Lap time trends/charts

### Phase 3 Features (Advanced)
- User accounts and authentication
- Private/team leaderboards
- Live timing during races
- Comparison tools (driver vs driver)
- Historical trend analysis
- Integration with timing systems

## 12. Open Questions

- Should excluded drivers (include = FALSE) be visible anywhere, or completely hidden?
  - **Decision:** Completely hidden from all views
- How to handle drivers with same name?
  - **Decision:** Assume names are unique (small group of friends)
- Weight class filtering in future?
  - **Decision:** Not in v1, all currently 90kg
- Should "Place" within session be recalculated or trust CSV data?
  - **Decision:** Trust CSV data as-is

## 13. Timeline

### Phase 1: Foundation (Current Sprint)
- Project setup
- Supabase configuration
- Data import
- Core data layer

### Phase 2: Core Views
- Leaderboard implementation
- Events list
- Basic navigation

### Phase 3: Detail Views
- Event details
- Driver details
- Polish and styling

### Phase 4: Deployment
- Production deployment to Vercel
- Testing and bug fixes

**Estimated Total Time:** 1-2 days of focused development

## Appendix A: Sample Queries

**Best time per driver:**
```sql
SELECT DISTINCT ON (driver_name) 
  driver_name, 
  lap_time_seconds, 
  lap_time_display,
  date
FROM lap_times
WHERE include = true
ORDER BY driver_name, lap_time_seconds ASC;
```

**Events grouped by date:**
```sql
SELECT 
  DATE(date) as event_date,
  COUNT(DISTINCT session_time) as session_count,
  COUNT(DISTINCT driver_name) as driver_count,
  COUNT(*) as total_laps
FROM lap_times
WHERE include = true
GROUP BY DATE(date)
ORDER BY event_date DESC;
```

**Driver statistics:**
```sql
SELECT 
  MIN(lap_time_seconds) as best_time,
  AVG(lap_time_seconds) as avg_time,
  COUNT(*) as total_laps,
  COUNT(DISTINCT DATE(date)) as events_participated
FROM lap_times
WHERE driver_name = 'kosin.ski' AND include = true;
```
