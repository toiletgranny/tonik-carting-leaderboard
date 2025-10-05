export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      lap_times: {
        Row: {
          id: string
          date: string
          session_time: string
          driver_name: string
          lap_time_seconds: number
          lap_time_display: string
          place: number | null
          weight: string | null
          include: boolean
          created_at: string
        }
        Insert: {
          id?: string
          date: string
          session_time: string
          driver_name: string
          lap_time_seconds: number
          lap_time_display: string
          place?: number | null
          weight?: string | null
          include?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          date?: string
          session_time?: string
          driver_name?: string
          lap_time_seconds?: number
          lap_time_display?: string
          place?: number | null
          weight?: string | null
          include?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      leaderboard: {
        Row: {
          driver_name: string
          lap_time_seconds: number
          lap_time_display: string
          date: string
          session_time: string
        }
      }
      events_summary: {
        Row: {
          event_date: string
          session_count: number
          driver_count: number
          total_laps: number
          fastest_lap: number
        }
      }
    }
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

export type LapTime = Database['public']['Tables']['lap_times']['Row']
export type LeaderboardEntry = Database['public']['Views']['leaderboard']['Row']
export type EventSummary = Database['public']['Views']['events_summary']['Row']
