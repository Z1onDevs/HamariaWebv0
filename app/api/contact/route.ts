import { NextResponse } from "next/server"
import { Resend } from "resend"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { sendWelcomeEmail } from "@/lib/email/sendWelcomeEmail"

export async function POST(request: Request) {
  try {
    // Lazy instantiation - create Resend client inside handler
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY environment variable")
      return NextResponse.json({ success: false, error: "Email service not configured" }, { status: 500 })
    }
    const resend = new Resend(apiKey)

    const body = await request.json()
    const { to, subject, name, email, phone, plan, inviteCode, freeMonths } = body

    // Step 1: Store application in Supabase
    const [firstName, ...lastNameParts] = (name || "").split(" ")
    const lastName = lastNameParts.join(" ") || firstName

    const { data: applicationData, error: dbError } = await supabaseAdmin
      .from("applications")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone || null,
        application_type: "membership",
        membership_tier: plan?.toLowerCase() || null,
        subject: subject || "Membership Application",
        message: `Membership application for ${plan} tier`,
        invite_code: inviteCode || null,
        free_months: freeMonths || 0,
        preferred_language: "en",
        status: "pending",
        metadata: {
          submitted_via: "contact_form",
          user_agent: request.headers.get("user-agent") || "unknown"
        }
      })
      .select()
      .single()

    if (dbError) {
      console.error("Supabase error:", dbError)
      // Continue with email even if database fails
    } else {
      console.log("Application stored in database:", applicationData?.id)
    }

    console.log("Sending email to:", to)
    console.log("From applicant:", email)
    console.log("Selected plan:", plan)
    console.log("Free months offer:", freeMonths)

    // Send welcome email to applicant first (non-blocking)
    console.log("=== Sending Welcome Email to Applicant ===")
    sendWelcomeEmail(email, name)
      .then((emailId) => {
        console.log("✓ Welcome email queued/sent successfully:", emailId)
      })
      .catch((welErr) => {
        console.error("✗ Welcome email failed (non-blocking):", welErr)
      })

    // Membership Application Email
    const emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #728E79 0%, #5A7566 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
              .content { background: #FAF8F5; padding: 30px; border-radius: 0 0 8px 8px; }
              .badge { display: inline-block; background: #728E79; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; margin-bottom: 20px; }
              .special-badge { background: #5A7566; box-shadow: 0 4px 12px rgba(114, 142, 121, 0.3); }
              .field { margin-bottom: 15px; }
              .label { font-weight: 600; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
              .value { font-size: 16px; color: #333; margin-top: 4px; }
              hr { border: none; border-top: 1px solid #E5E5E5; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 28px; font-weight: 300;">New Membership Application</h1>
              </div>
              <div class="content">
                ${inviteCode ? `<div class="badge ${inviteCode.toUpperCase() === 'HAMARIA&FRIENDS' ? 'special-badge' : ''}">🎉 Founders Offer: ${freeMonths} Months Free</div>` : ''}
                
                <div class="field">
                  <div class="label">Selected Plan</div>
                  <div class="value">${plan}</div>
                </div>

                <hr />

                <div class="field">
                  <div class="label">Applicant Name</div>
                  <div class="value">${name}</div>
                </div>

                <div class="field">
                  <div class="label">Email Address</div>
                  <div class="value"><a href="mailto:${email}" style="color: #728E79;">${email}</a></div>
                </div>

                <div class="field">
                  <div class="label">Phone Number</div>
                  <div class="value"><a href="tel:${phone}" style="color: #728E79;">${phone}</a></div>
                </div>

                ${inviteCode ? `
                  <div class="field">
                    <div class="label">Invitation Code</div>
                    <div class="value" style="font-weight: 600; ${inviteCode.toUpperCase() === 'HAMARIA&FRIENDS' ? 'color: #728E79;' : ''}">${inviteCode}</div>
                  </div>
                ` : ''}

                <hr />

                <p style="font-size: 14px; color: #666;">
                  This applicant is eligible for the Founders offer with <strong>${freeMonths} months free</strong> (limited to first 42 members).
                </p>
              </div>
            </div>
          </body>
        </html>
      `

    // Send email using Resend
    // Try with custom domain first, fallback to resend.dev if domain not verified
    let fromAddress = "Hamaria Club <memberships@hamaria.com>"
    
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: to,
      subject: subject,
      replyTo: email,
      html: emailHtml,
    })

    if (error) {
      console.error("Resend error:", error)
      console.error("Error details:", JSON.stringify(error, null, 2))
      
      // If domain not verified, try with resend.dev domain
      if (error.message?.includes('domain') || error.message?.includes('verified')) {
        console.log("Retrying with resend.dev domain...")
        const retryResult = await resend.emails.send({
          from: "Hamaria Club <onboarding@resend.dev>",
          to: to,
          subject: subject,
          replyTo: email,
          html: emailHtml,
        })
        
        if (retryResult.error) {
          console.error("Retry failed:", retryResult.error)
          return NextResponse.json({ success: false, error: retryResult.error.message }, { status: 500 })
        }
        
        console.log("Email sent successfully with resend.dev:", retryResult.data)
        return NextResponse.json({ success: true, message: "Application submitted successfully", data: retryResult.data })
      }
      
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    console.log("Email sent successfully:", data)
    return NextResponse.json({ 
      success: true, 
      message: "Application submitted successfully", 
      data: {
        email: data,
        application: applicationData
      }
    })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ success: false, error: "Failed to process request" }, { status: 500 })
  }
}

