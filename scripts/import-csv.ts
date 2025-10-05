import { createClient } from '@supabase/supabase-js';
import { parse } from 'csv-parse/sync';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing Supabase credentials');
  console.error('Please create a .env.local file with:');
  console.error('  NEXT_PUBLIC_SUPABASE_URL=your-project-url');
  console.error('  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface CsvRow {
  Date: string;
  Place: string;
  Name: string;
  'Lap Time': string;
  Weight: string;
  Include: string;
}

function parseTime(timeStr: string): number {
  if (!timeStr || timeStr.trim() === '') {
    return 0;
  }

  // Handle format "1:11.701" (minutes:seconds.milliseconds)
  if (timeStr.includes(':')) {
    const [minutes, seconds] = timeStr.split(':');
    return parseInt(minutes) * 60 + parseFloat(seconds);
  }

  // Handle format "44.956" (seconds.milliseconds)
  return parseFloat(timeStr);
}

function parseDate(dateStr: string): Date | null {
  if (!dateStr || dateStr.trim() === '') {
    return null;
  }

  // Parse "DD/MM/YYYY HH:mm" format
  const [datePart, timePart] = dateStr.split(' ');
  if (!datePart || !timePart) {
    return null;
  }

  const [day, month, year] = datePart.split('/');
  const [hours, minutes] = timePart.split(':');

  // Create date in UTC (months are 0-indexed in JS)
  const date = new Date(
    Date.UTC(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes)
    )
  );

  return isNaN(date.getTime()) ? null : date;
}

function extractSessionTime(dateStr: string): string {
  if (!dateStr || dateStr.trim() === '') {
    return '';
  }

  const [, timePart] = dateStr.split(' ');
  return timePart || '';
}

async function importCsv() {
  console.log('🏁 Starting CSV import...\n');

  // Read CSV file
  const csvPath = path.join(process.cwd(), 'scripts', 'data', 'test_dataset.csv');
  
  if (!fs.existsSync(csvPath)) {
    console.error(`Error: CSV file not found at ${csvPath}`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(csvPath, 'utf-8');

  // Parse CSV
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as CsvRow[];

  console.log(`📄 Found ${records.length} rows in CSV\n`);

  // Transform and filter data
  const validRecords = records
    .filter((row) => {
      // Skip rows with empty essential fields
      return (
        row.Date &&
        row.Name &&
        row['Lap Time'] &&
        row.Date.trim() !== '' &&
        row.Name.trim() !== '' &&
        row['Lap Time'].trim() !== ''
      );
    })
    .map((row) => {
      const date = parseDate(row.Date);
      const lapTimeSeconds = parseTime(row['Lap Time']);
      const sessionTime = extractSessionTime(row.Date);

      return {
        date: date?.toISOString(),
        session_time: sessionTime,
        driver_name: row.Name.trim(),
        lap_time_seconds: lapTimeSeconds,
        lap_time_display: row['Lap Time'].trim(),
        place: row.Place ? parseInt(row.Place) : null,
        weight: row.Weight || null,
        include: row.Include?.toUpperCase() === 'TRUE',
      };
    })
    .filter((row) => row.date && row.lap_time_seconds > 0);

  console.log(`✅ ${validRecords.length} valid records to import\n`);

  if (validRecords.length === 0) {
    console.log('No valid records to import. Exiting.');
    return;
  }

  // Clear existing data (optional - comment out if you want to append instead)
  console.log('🗑️  Clearing existing data...');
  const { error: deleteError } = await supabase.from('lap_times').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  if (deleteError) {
    console.error('Warning: Could not clear existing data:', deleteError.message);
  } else {
    console.log('✅ Existing data cleared\n');
  }

  // Insert records in batches (Supabase has a limit on bulk inserts)
  const batchSize = 100;
  let imported = 0;

  for (let i = 0; i < validRecords.length; i += batchSize) {
    const batch = validRecords.slice(i, i + batchSize);

    const { data, error } = await supabase.from('lap_times').insert(batch).select();

    if (error) {
      console.error(`❌ Error importing batch ${i / batchSize + 1}:`, error.message);
      continue;
    }

    imported += batch.length;
    console.log(`📦 Imported batch ${i / batchSize + 1}: ${batch.length} records (Total: ${imported}/${validRecords.length})`);
  }

  console.log(`\n✅ Import complete! ${imported} records imported successfully.\n`);

  // Show some statistics
  const { data: stats } = await supabase.from('lap_times').select('driver_name', { count: 'exact' }).eq('include', true);

  const uniqueDrivers = new Set(stats?.map((s) => s.driver_name) || []);

  console.log('📊 Statistics:');
  console.log(`  - Total records: ${imported}`);
  console.log(`  - Unique drivers: ${uniqueDrivers.size}`);
  console.log(`  - Records included in leaderboard: ${stats?.length || 0}\n`);
}

// Run the import
importCsv().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
