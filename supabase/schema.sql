-- Tonik Carting Leaderboard Database Schema
-- Run this in your Supabase SQL Editor to create the necessary tables

-- Create the lap_times table
CREATE TABLE IF NOT EXISTS lap_times (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  date timestamptz NOT NULL,
  session_time text NOT NULL,
  driver_name text NOT NULL,
  lap_time_seconds decimal NOT NULL,
  lap_time_display text NOT NULL,
  place integer,
  weight text,
  include boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_lap_times_driver ON lap_times(driver_name);
CREATE INDEX IF NOT EXISTS idx_lap_times_date ON lap_times(date);
CREATE INDEX IF NOT EXISTS idx_lap_times_include ON lap_times(include);
CREATE INDEX IF NOT EXISTS idx_lap_times_seconds ON lap_times(lap_time_seconds);

-- Enable Row Level Security
ALTER TABLE lap_times ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON lap_times
  FOR SELECT
  USING (true);

-- Optional: Create policy to allow authenticated users to insert (for future use)
-- CREATE POLICY "Allow authenticated insert" ON lap_times
--   FOR INSERT
--   TO authenticated
--   WITH CHECK (true);

-- Create a view for the leaderboard (best time per driver)
CREATE OR REPLACE VIEW leaderboard AS
SELECT DISTINCT ON (driver_name)
  driver_name,
  lap_time_seconds,
  lap_time_display,
  date,
  session_time
FROM lap_times
WHERE include = true
ORDER BY driver_name, lap_time_seconds ASC;

-- Create a view for events summary
CREATE OR REPLACE VIEW events_summary AS
SELECT 
  DATE(date) as event_date,
  COUNT(DISTINCT session_time) as session_count,
  COUNT(DISTINCT driver_name) as driver_count,
  COUNT(*) as total_laps,
  MIN(lap_time_seconds) as fastest_lap
FROM lap_times
WHERE include = true
GROUP BY DATE(date)
ORDER BY event_date DESC;
