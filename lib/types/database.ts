// =============================================
// Database Types for Supabase Integration
// =============================================

export type ApplicationType = 'contact' | 'membership' | 'consultation';
export type MembershipTier = 'harmony' | 'renaissance' | 'opulence';
export type ApplicationStatus = 'pending' | 'reviewed' | 'contacted' | 'completed' | 'archived';
export type PreferredLanguage = 'en' | 'ar';
export type ContactMethod = 'email' | 'phone' | 'whatsapp';

// Main Application Interface
export interface Application {
  id: string;
  created_at: string;
  updated_at: string;
  
  // Contact Information
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  
  // Application Details
  application_type: ApplicationType;
  membership_tier?: MembershipTier;
  
  // Message/Request
  subject?: string;
  message: string;
  
  // Membership Specific
  invite_code?: string;
  free_months?: number;
  
  // Preferences
  preferred_language: PreferredLanguage;
  preferred_contact_method?: ContactMethod;
  
  // Additional Data
  metadata?: Record<string, any>;
  
  // Status Tracking
  status: ApplicationStatus;
  admin_notes?: string;
  contacted_at?: string;
  completed_at?: string;
}

// Create Application Input (for form submission)
export interface CreateApplicationInput {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  application_type: ApplicationType;
  membership_tier?: MembershipTier;
  subject?: string;
  message: string;
  invite_code?: string;
  free_months?: number;
  preferred_language?: PreferredLanguage;
  preferred_contact_method?: ContactMethod;
  metadata?: Record<string, any>;
}

// Update Application Input (for admin updates)
export interface UpdateApplicationInput {
  status?: ApplicationStatus;
  admin_notes?: string;
  contacted_at?: string;
  completed_at?: string;
  metadata?: Record<string, any>;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApplicationListResponse {
  applications: Application[];
  total: number;
  page?: number;
  limit?: number;
}

// Filter/Query Types
export interface ApplicationFilters {
  status?: ApplicationStatus;
  application_type?: ApplicationType;
  membership_tier?: MembershipTier;
  email?: string;
  startDate?: string;
  endDate?: string;
}

