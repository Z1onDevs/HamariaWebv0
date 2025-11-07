# Supabase Integration Plan

## Overview
This document outlines the complete setup for integrating Supabase as the database backend for storing applications, contact forms, and other user submissions.

---

## 1. Database Schema Design

### Applications Table (`applications`)

```sql
CREATE TABLE applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Contact Information
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  
  -- Application Details
  application_type VARCHAR(50) NOT NULL, -- 'contact', 'membership', 'consultation'
  membership_tier VARCHAR(50), -- 'harmony', 'renaissance', 'opulence' (if membership application)
  
  -- Message/Request
  subject VARCHAR(255),
  message TEXT NOT NULL,
  
  -- Preferences
  preferred_language VARCHAR(10) DEFAULT 'en', -- 'en' or 'ar'
  preferred_contact_method VARCHAR(50), -- 'email', 'phone', 'whatsapp'
  
  -- Additional Data (JSON for flexibility)
  metadata JSONB DEFAULT '{}'::jsonb,
  
  -- Status Tracking
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'reviewed', 'contacted', 'completed', 'archived'
  admin_notes TEXT,
  
  -- Indexes for common queries
  INDEX idx_email (email),
  INDEX idx_created_at (created_at),
  INDEX idx_status (status),
  INDEX idx_application_type (application_type)
);

-- Enable Row Level Security
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (for public forms)
CREATE POLICY "Enable insert for all users" 
  ON applications FOR INSERT 
  WITH CHECK (true);

-- Policy: Only authenticated admins can view
CREATE POLICY "Enable read for authenticated users only" 
  ON applications FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Policy: Only authenticated admins can update
CREATE POLICY "Enable update for authenticated users only" 
  ON applications FOR UPDATE 
  USING (auth.role() = 'authenticated');
```

### Optional: Gallery Submissions Table

```sql
CREATE TABLE gallery_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  approved BOOLEAN DEFAULT FALSE,
  
  INDEX idx_approved (approved),
  INDEX idx_created_at (created_at)
);
```

---

## 2. Environment Variables Setup

Create a `.env.local` file in the project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional: For admin authentication
SUPABASE_JWT_SECRET=your_jwt_secret
```

**Note:** Add `.env.local` to `.gitignore` to keep credentials secure.

---

## 3. Required Dependencies

```bash
pnpm add @supabase/supabase-js
```

---

## 4. File Structure

```
lib/
  ├── supabase/
  │   ├── client.ts          # Browser client
  │   ├── server.ts          # Server-side client
  │   └── admin.ts           # Admin client with service role
  ├── types/
  │   └── database.ts        # TypeScript types for database
app/
  ├── api/
  │   ├── applications/
  │   │   ├── route.ts       # GET all, POST new application
  │   │   └── [id]/
  │   │       └── route.ts   # GET, PATCH, DELETE specific application
```

---

## 5. TypeScript Types

```typescript
// lib/types/database.ts
export type ApplicationType = 'contact' | 'membership' | 'consultation';
export type MembershipTier = 'harmony' | 'renaissance' | 'opulence';
export type ApplicationStatus = 'pending' | 'reviewed' | 'contacted' | 'completed' | 'archived';
export type PreferredLanguage = 'en' | 'ar';
export type ContactMethod = 'email' | 'phone' | 'whatsapp';

export interface Application {
  id: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  application_type: ApplicationType;
  membership_tier?: MembershipTier;
  subject?: string;
  message: string;
  preferred_language: PreferredLanguage;
  preferred_contact_method?: ContactMethod;
  metadata?: Record<string, any>;
  status: ApplicationStatus;
  admin_notes?: string;
}

export interface CreateApplicationInput {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  application_type: ApplicationType;
  membership_tier?: MembershipTier;
  subject?: string;
  message: string;
  preferred_language?: PreferredLanguage;
  preferred_contact_method?: ContactMethod;
  metadata?: Record<string, any>;
}
```

---

## 6. Supabase Client Setup

### Browser Client (`lib/supabase/client.ts`)
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### Server Client (`lib/supabase/server.ts`)
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}
```

### Admin Client (`lib/supabase/admin.ts`)
```typescript
import { createClient } from '@supabase/supabase-js'

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
```

---

## 7. API Routes Implementation

### POST New Application (`app/api/applications/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { CreateApplicationInput } from '@/lib/types/database';

export async function POST(request: NextRequest) {
  try {
    const body: CreateApplicationInput = await request.json();
    
    // Validate required fields
    if (!body.first_name || !body.last_name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from('applications')
      .insert({
        ...body,
        preferred_language: body.preferred_language || 'en',
        status: 'pending'
      })
      .select()
      .single();
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create application' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ data, success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    
    let query = supabaseAdmin
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (status) query = query.eq('status', status);
    if (type) query = query.eq('application_type', type);
    
    const { data, error } = await query;
    
    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch applications' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## 8. Frontend Integration

### Update Contact Form to Use Supabase
Replace the current contact API implementation with Supabase integration.

### Example Form Submission:
```typescript
const handleSubmit = async (formData: FormData) => {
  const response = await fetch('/api/applications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      application_type: 'contact',
      subject: formData.subject,
      message: formData.message,
      preferred_language: currentLanguage
    })
  });
  
  if (response.ok) {
    // Show success message
  }
};
```

---

## 9. Security Considerations

1. **Row Level Security (RLS)**: Enabled on all tables
2. **API Rate Limiting**: Implement rate limiting on API routes
3. **Input Validation**: Validate all inputs server-side
4. **Email Verification**: Consider adding email verification for applications
5. **CORS**: Configure CORS policies in Supabase dashboard
6. **Environment Variables**: Never expose service role key to client

---

## 10. Optional Enhancements

### Email Notifications
- Set up Supabase Edge Functions or use a service like Resend/SendGrid
- Send confirmation emails to applicants
- Notify admins of new applications

### Admin Dashboard
- Create protected admin routes for viewing applications
- Implement authentication for admin users
- Add filters, search, and export functionality

### Analytics
- Track application conversion rates
- Monitor application types and sources
- A/B test different form layouts

---

## 11. Testing Checklist

- [ ] Supabase connection established
- [ ] Database tables created with correct schema
- [ ] RLS policies working correctly
- [ ] API routes handle all CRUD operations
- [ ] Form submissions successfully stored
- [ ] Error handling works properly
- [ ] TypeScript types are correct
- [ ] Environment variables configured
- [ ] Test on both development and production

---

## Next Steps

1. **Provide your Supabase credentials** (URL, anon key, service role key)
2. **Run SQL schema** in Supabase SQL editor
3. **Install dependencies** (`pnpm add @supabase/supabase-js`)
4. **Create configuration files** (client, server, admin)
5. **Implement API routes**
6. **Update existing forms** to use new API
7. **Test thoroughly** in development
8. **Deploy** to production

---

## Maintenance

- Monitor application submissions regularly
- Backup database periodically
- Review and update RLS policies as needed
- Keep Supabase client library updated
- Monitor API usage and costs

