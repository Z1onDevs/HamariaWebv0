-- =============================================
-- Hamaria Web Application - Supabase Schema
-- =============================================
-- Run this SQL in your Supabase SQL Editor
-- Dashboard > SQL Editor > New Query
-- =============================================

-- Drop existing table if you want to start fresh (CAUTION!)
-- DROP TABLE IF EXISTS applications CASCADE;

-- =============================================
-- 1. CREATE APPLICATIONS TABLE
-- =============================================

CREATE TABLE IF NOT EXISTS applications (
  -- Primary Key & Timestamps
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Contact Information
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  
  -- Application Details
  application_type VARCHAR(50) NOT NULL DEFAULT 'contact',
  membership_tier VARCHAR(50),
  
  -- Message/Request
  subject VARCHAR(255),
  message TEXT NOT NULL,
  
  -- Membership Specific Fields
  invite_code VARCHAR(100),
  free_months INTEGER DEFAULT 0,
  
  -- Preferences
  preferred_language VARCHAR(10) DEFAULT 'en',
  preferred_contact_method VARCHAR(50),
  
  -- Additional Data (JSON for flexibility)
  metadata JSONB DEFAULT '{}'::jsonb,
  
  -- Status Tracking
  status VARCHAR(50) DEFAULT 'pending',
  admin_notes TEXT,
  contacted_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- =============================================
-- 2. CREATE INDEXES FOR PERFORMANCE
-- =============================================

CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_type ON applications(application_type);
CREATE INDEX IF NOT EXISTS idx_applications_membership_tier ON applications(membership_tier);

-- =============================================
-- 3. CREATE UPDATED_AT TRIGGER
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE
    ON applications FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- =============================================
-- 4. ENABLE ROW LEVEL SECURITY
-- =============================================

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 5. CREATE RLS POLICIES
-- =============================================

-- Policy 1: Anyone can insert (for public forms)
DROP POLICY IF EXISTS "Enable insert for all users" ON applications;
CREATE POLICY "Enable insert for all users" 
  ON applications 
  FOR INSERT 
  WITH CHECK (true);

-- Policy 2: Only authenticated users can view (for admin dashboard)
DROP POLICY IF EXISTS "Enable read for authenticated users" ON applications;
CREATE POLICY "Enable read for authenticated users" 
  ON applications 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Policy 3: Only authenticated users can update
DROP POLICY IF EXISTS "Enable update for authenticated users" ON applications;
CREATE POLICY "Enable update for authenticated users" 
  ON applications 
  FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- Policy 4: Only authenticated users can delete
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON applications;
CREATE POLICY "Enable delete for authenticated users" 
  ON applications 
  FOR DELETE 
  USING (auth.role() = 'authenticated');

-- =============================================
-- 6. CREATE HELPER VIEWS (OPTIONAL)
-- =============================================

-- View for pending applications
CREATE OR REPLACE VIEW pending_applications AS
SELECT 
  id,
  created_at,
  first_name,
  last_name,
  email,
  phone,
  application_type,
  membership_tier,
  invite_code,
  status
FROM applications
WHERE status = 'pending'
ORDER BY created_at DESC;

-- View for membership applications
CREATE OR REPLACE VIEW membership_applications AS
SELECT 
  id,
  created_at,
  first_name,
  last_name,
  email,
  phone,
  membership_tier,
  invite_code,
  free_months,
  status
FROM applications
WHERE application_type = 'membership'
ORDER BY created_at DESC;

-- =============================================
-- 7. INSERT SAMPLE DATA (OPTIONAL - FOR TESTING)
-- =============================================

-- Uncomment to insert sample data
/*
INSERT INTO applications (
  first_name,
  last_name,
  email,
  phone,
  application_type,
  membership_tier,
  message,
  invite_code,
  free_months,
  preferred_language
) VALUES 
(
  'John',
  'Doe',
  'john.doe@example.com',
  '+1234567890',
  'membership',
  'harmony',
  'I am interested in joining the Harmony tier membership.',
  'HAMARIA&FRIENDS',
  2,
  'en'
),
(
  'Jane',
  'Smith',
  'jane.smith@example.com',
  '+9876543210',
  'membership',
  'renaissance',
  'Please provide more information about the Renaissance tier.',
  null,
  0,
  'en'
);
*/

-- =============================================
-- 8. VERIFY SETUP
-- =============================================

-- Check if table exists and has correct structure
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'applications'
ORDER BY ordinal_position;

-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'applications';

-- Count existing applications (should be 0 initially)
SELECT COUNT(*) as total_applications FROM applications;

-- =============================================
-- SETUP COMPLETE!
-- =============================================
-- Next steps:
-- 1. Verify all queries ran successfully
-- 2. Check that RLS policies are active
-- 3. Test inserting a record via API
-- =============================================

