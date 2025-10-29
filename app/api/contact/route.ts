import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { to, subject, name, email, phone, plan, inviteCode, discount } = body

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
                ${inviteCode ? `<div class="badge ${inviteCode.toUpperCase() === 'HAMARIA&FRIENDS' ? 'special-badge' : ''}">🎉 Early Bird Offer: ${discount}% Discount</div>` : ''}
                
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
                  This applicant is eligible for the Early Bird offer with <strong>${discount}% discount</strong> (limited to first 42 members).
                </p>
              </div>
            </div>
          </body>
        </html>
      `

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Hamaria Club <onboarding@resend.dev>",
      to: to,
      subject: subject,
      replyTo: email,
      html: emailHtml,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    console.log("Email sent successfully:", data)
    return NextResponse.json({ success: true, message: "Application submitted successfully", data })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ success: false, error: "Failed to process request" }, { status: 500 })
  }
}

