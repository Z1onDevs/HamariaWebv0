// =============================================
// Supabase Generated Types
// =============================================
// This file contains auto-generated types from your Supabase schema
// Run: npx supabase gen types typescript --project-id gwztcvzxzoprmepjcneq > lib/types/supabase.ts

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
      applications: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          application_type: string
          membership_tier: string | null
          subject: string | null
          message: string
          invite_code: string | null
          free_months: number | null
          preferred_language: string
          preferred_contact_method: string | null
          metadata: Json | null
          status: string
          admin_notes: string | null
          contacted_at: string | null
          completed_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          application_type?: string
          membership_tier?: string | null
          subject?: string | null
          message: string
          invite_code?: string | null
          free_months?: number | null
          preferred_language?: string
          preferred_contact_method?: string | null
          metadata?: Json | null
          status?: string
          admin_notes?: string | null
          contacted_at?: string | null
          completed_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          application_type?: string
          membership_tier?: string | null
          subject?: string | null
          message?: string
          invite_code?: string | null
          free_months?: number | null
          preferred_language?: string
          preferred_contact_method?: string | null
          metadata?: Json | null
          status?: string
          admin_notes?: string | null
          contacted_at?: string | null
          completed_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

