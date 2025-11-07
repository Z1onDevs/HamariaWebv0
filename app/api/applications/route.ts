// =============================================
// Applications API Route
// =============================================
// Handles CRUD operations for applications

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { CreateApplicationInput, ApplicationFilters } from '@/lib/types/database'

// =============================================
// POST - Create New Application
// =============================================
export async function POST(request: NextRequest) {
  try {
    const body: CreateApplicationInput = await request.json()

    // Validate required fields
    const requiredFields = ['first_name', 'last_name', 'email', 'message', 'application_type']
    const missingFields = requiredFields.filter(field => !body[field as keyof CreateApplicationInput])

    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from('applications')
      .insert({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        phone: body.phone || null,
        application_type: body.application_type,
        membership_tier: body.membership_tier || null,
        subject: body.subject || null,
        message: body.message,
        invite_code: body.invite_code || null,
        free_months: body.free_months || 0,
        preferred_language: body.preferred_language || 'en',
        preferred_contact_method: body.preferred_contact_method || null,
        metadata: body.metadata || {},
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to create application', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Application submitted successfully', 
        data 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating application:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// =============================================
// GET - Retrieve Applications (with filters)
// =============================================
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    
    // Extract filter parameters
    const filters: ApplicationFilters = {
      status: searchParams.get('status') as any,
      application_type: searchParams.get('application_type') as any,
      membership_tier: searchParams.get('membership_tier') as any,
      email: searchParams.get('email') || undefined,
      startDate: searchParams.get('startDate') || undefined,
      endDate: searchParams.get('endDate') || undefined,
    }

    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = (page - 1) * limit

    // Build query
    let query = supabaseAdmin
      .from('applications')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    // Apply filters
    if (filters.status) {
      query = query.eq('status', filters.status)
    }
    if (filters.application_type) {
      query = query.eq('application_type', filters.application_type)
    }
    if (filters.membership_tier) {
      query = query.eq('membership_tier', filters.membership_tier)
    }
    if (filters.email) {
      query = query.ilike('email', `%${filters.email}%`)
    }
    if (filters.startDate) {
      query = query.gte('created_at', filters.startDate)
    }
    if (filters.endDate) {
      query = query.lte('created_at', filters.endDate)
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      console.error('Supabase fetch error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch applications' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data,
      total: count || 0,
      page,
      limit,
      totalPages: count ? Math.ceil(count / limit) : 0
    })
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

