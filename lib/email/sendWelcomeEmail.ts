import { Resend } from 'resend'
import { emailQueue } from './emailQueue'

export async function sendWelcomeEmail(to: string, name?: string) {
  console.log('[Welcome Email] Queueing send to:', to, 'Name:', name)
  
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[Welcome Email] ❌ Missing RESEND_API_KEY environment variable')
    throw new Error('Email service not configured')
  }

  console.log('[Welcome Email] ✓ API key found')
  const resend = new Resend(apiKey)

  const html = `
  <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; margin: 0; line-height: 1.6; }
        .header { background: linear-gradient(135deg, #728E79 0%, #5A7566 100%); color: #fff; padding: 28px; }
        .container { max-width: 640px; margin: 0 auto; background: #FAF8F5; padding: 28px; }
        .btn { display: inline-block; background: #728E79; color: #fff; padding: 10px 16px; border-radius: 8px; text-decoration: none; }
        p { margin: 0 0 14px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 style="margin:0;font-weight:400">Welcome to Hamaria</h1>
      </div>
      <div class="container">
        <p>Hi ${name ? name.split(' ')[0] : 'there'},</p>
        <p>Thanks for joining Hamaria. We’re excited to have you with us.</p>
        <p>We’ll be in touch shortly with next steps. If you have any questions, just reply to this email.</p>
        <p style="margin-top:24px">Warmly,<br/>Hamaria Team</p>
      </div>
    </body>
  </html>`

  // Try to send using the branded domain first, fall back to resend.dev if not verified
  const fromBranded = 'Hamaria Club <welcome@hamaria.com>'
  const subject = 'Welcome to Hamaria'

  // Queue the email send to respect rate limits
  return emailQueue.add(async () => {
    console.log('[Welcome Email] Attempting send from:', fromBranded)
    
    const firstAttempt = await resend.emails.send({
      from: fromBranded,
      to,
      subject,
      html
    })

    if (firstAttempt.error) {
      const message = firstAttempt.error.message || ''
      console.error('[Welcome Email] ⚠️ First attempt failed:', message)
      
      // Try with resend.dev domain for any error
      console.log('[Welcome Email] Retrying with resend.dev domain...')
      const retry = await resend.emails.send({
        from: 'Hamaria Club <onboarding@resend.dev>',
        to,
        subject,
        html
      })
      
      if (retry.error) {
        console.error('[Welcome Email] ❌ Retry failed:', retry.error.message)
        throw new Error(retry.error.message)
      }
      
      console.log('[Welcome Email] ✓ Email sent via resend.dev:', retry.data?.id)
      return retry.data?.id
    }

    console.log('[Welcome Email] ✓ Email sent via custom domain:', firstAttempt.data?.id)
    return firstAttempt.data?.id
  })
}


