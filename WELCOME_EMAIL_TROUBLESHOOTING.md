# Welcome Email Troubleshooting Guide

## ✅ Issues Fixed (Latest Update)

### Problems Identified & Resolved:

1. **❌ Welcome email only sent after admin email succeeded**
   - **Fixed:** Now sends immediately and independently (non-blocking)

2. **❌ Silent failures - no visibility into errors**
   - **Fixed:** Added detailed logging with `[Welcome Email]` prefix

3. **❌ Fallback logic too narrow**
   - **Fixed:** Now falls back to resend.dev for ANY error, not just domain errors

---

## 🔍 How to Check If It's Working

### 1. Check Server Logs

When a membership application is submitted, you should see:

```bash
=== Sending Welcome Email to Applicant ===
[Welcome Email] Starting send to: user@example.com Name: John Doe
[Welcome Email] ✓ API key found
[Welcome Email] Attempting send from: Hamaria Club <welcome@hamaria.com>

# If custom domain works:
[Welcome Email] ✓ Email sent via custom domain: abc123-xyz

# OR if fallback to resend.dev:
[Welcome Email] ⚠️ First attempt failed: Domain not verified
[Welcome Email] Retrying with resend.dev domain...
[Welcome Email] ✓ Email sent via resend.dev: def456-uvw
```

### 2. Check Resend Dashboard

1. Go to https://resend.com/emails
2. Look for emails to your test address
3. Check status: "Delivered" or "Bounced"

### 3. Test Email

Submit a real application with your email address and check:
- [ ] Email arrives in inbox (or spam)
- [ ] Email has correct branding
- [ ] Name is personalized correctly

---

## ⚠️ Common Issues & Solutions

### Issue: "Missing RESEND_API_KEY environment variable"

**Symptoms:**
```bash
[Welcome Email] ❌ Missing RESEND_API_KEY environment variable
```

**Solution:**
1. Check `.env.local` file exists in project root
2. Verify it contains:
   ```bash
   RESEND_API_KEY=re_your_actual_key_here
   ```
3. Restart your dev server: `pnpm dev` or `npm run dev`
4. For production: Add env variable to Vercel/Netlify/Railway dashboard

**Verify:**
```bash
# In project root
cat .env.local | grep RESEND_API_KEY
```

---

### Issue: Email sends but never arrives

**Symptoms:**
```bash
[Welcome Email] ✓ Email sent via resend.dev: abc123
```
But email never arrives in inbox.

**Solutions:**

1. **Check Spam Folder** 📧
   - Resend emails often land in spam initially
   - Mark as "Not Spam" to train filters

2. **Verify Email Address**
   - Make sure test email is valid
   - Try a different email provider (Gmail, Outlook, etc.)

3. **Check Resend Dashboard Status**
   - Go to https://resend.com/emails
   - Find the email by ID (abc123)
   - Check delivery status and error messages

4. **Check Resend Account Status**
   - Free tier: 100 emails/day, 3000/month
   - Make sure you haven't hit limits

---

### Issue: "Domain not verified" errors

**Symptoms:**
```bash
[Welcome Email] ⚠️ First attempt failed: Domain not verified
[Welcome Email] Retrying with resend.dev domain...
```

**This is NORMAL!** The system automatically falls back to `resend.dev` which works immediately.

**To Fix (Optional):**
1. Resend Dashboard → **Domains**
2. Click **Add Domain** → Enter `hamaria.com`
3. Add DNS records provided by Resend:
   ```
   TXT record for verification
   MX records for receiving
   DKIM for authentication
   ```
4. Wait 5-60 minutes for DNS propagation
5. Click **Verify** in Resend

**After verification**, emails will send from `welcome@hamaria.com` instead of `onboarding@resend.dev`.

---

### Issue: Emails sending from wrong address

**Expected:**
- Before domain verification: `Hamaria Club <onboarding@resend.dev>` ✓
- After domain verification: `Hamaria Club <welcome@hamaria.com>` ⭐

**If you see a different address:**
1. Check `lib/email/sendWelcomeEmail.ts` line 42
2. Verify domain is fully verified in Resend dashboard

---

### Issue: Welcome email sent twice

**This should NOT happen after the latest fix.** If it does:

1. Check for duplicate form submissions
2. Verify only ONE `sendWelcomeEmail()` call in code:
   ```bash
   grep -r "sendWelcomeEmail" app/api/
   ```
3. Should only appear ONCE in `app/api/contact/route.ts` around line 60

---

### Issue: Name not personalized correctly

**Symptoms:**
Email says "Hi there," instead of "Hi John,"

**Cause:**
`name` parameter is empty or not passed correctly.

**Check:**
1. Form submission includes `name` field
2. Console log shows: `[Welcome Email] Starting send to: ... Name: John Doe`
3. If name is undefined, check form data structure

---

### Issue: HTML looks broken in email

**Cause:**
Email client stripping styles or HTML issues.

**Test:**
1. View email in different clients (Gmail, Outlook, Apple Mail)
2. Check Resend preview in dashboard
3. Verify HTML in `lib/email/sendWelcomeEmail.ts` lines 15-39

---

## 🧪 Testing Checklist

### Pre-Flight Check
- [ ] `.env.local` exists with valid `RESEND_API_KEY`
- [ ] Dev server restarted after adding env variable
- [ ] Resend account has remaining quota

### Test Sequence
1. [ ] Submit membership application with test email
2. [ ] Check terminal/console for welcome email logs
3. [ ] Look for `[Welcome Email] ✓` success message
4. [ ] Check email inbox (and spam folder)
5. [ ] Verify email content and personalization
6. [ ] Check Resend dashboard for delivery status

### Expected Results
- [ ] Application saves to Supabase successfully
- [ ] Admin notification email sent
- [ ] Welcome email sent (see logs)
- [ ] Welcome email delivered to inbox
- [ ] Email has correct branding and content

---

## 🔧 Quick Diagnostic Commands

### Check environment variable is set:
```bash
cd /path/to/HamariaWebv0
grep RESEND_API_KEY .env.local
```

### Check for welcome email calls:
```bash
grep -rn "sendWelcomeEmail" app/
```

### Watch logs in real-time:
```bash
# Run dev server and watch logs
pnpm dev
# Submit form and watch for [Welcome Email] logs
```

### Test Resend API directly:
```bash
# Create test file: test-resend.js
node << 'EOF'
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

resend.emails.send({
  from: 'Test <onboarding@resend.dev>',
  to: 'your-email@example.com',
  subject: 'Test Email',
  html: '<p>If you receive this, Resend is working!</p>'
}).then(console.log).catch(console.error);
EOF
```

---

## 📊 Monitoring Best Practices

### What to Monitor:
1. **Success Rate**: Check Resend dashboard analytics
2. **Delivery Time**: Should be < 5 seconds
3. **Bounce Rate**: Should be < 5%
4. **Spam Rate**: Should be < 0.1%

### Set Up Webhooks (Optional):
Resend Dashboard → **Webhooks** → Add endpoint:
```
URL: https://hamaria.com/api/webhooks/resend
Events: email.delivered, email.bounced, email.complained
```

This lets you track email status in real-time.

---

## 🆘 Still Not Working?

### 1. Verify Resend Integration
Create a test file `test-welcome-email.ts` in your project:

```typescript
import { sendWelcomeEmail } from './lib/email/sendWelcomeEmail'

async function test() {
  try {
    const result = await sendWelcomeEmail('your-email@example.com', 'Test User')
    console.log('Success!', result)
  } catch (error) {
    console.error('Failed:', error)
  }
}

test()
```

Run it:
```bash
npx tsx test-welcome-email.ts
```

### 2. Check Resend Account Status
- Log into https://resend.com/dashboard
- Check "Overview" for any alerts or issues
- Verify API key is active (not deleted/regenerated)

### 3. Review Server Logs
Check your hosting platform logs:
- **Vercel**: Functions → Logs
- **Netlify**: Functions → Logs
- **Railway**: Deployments → Logs

Look for `[Welcome Email]` prefixed logs.

### 4. Test with Different Email
Some email providers (corporate, edu) block automated emails:
- Try Gmail first (most permissive)
- Then Outlook/Yahoo
- Avoid work/school emails for testing

---

## 📝 Configuration Summary

### Current Setup:
```typescript
// lib/email/sendWelcomeEmail.ts
- Primary sender: welcome@hamaria.com
- Fallback sender: onboarding@resend.dev
- Template: Modern, responsive HTML
- Error handling: Comprehensive with logging
```

```typescript
// app/api/contact/route.ts
- Trigger: Immediately after application saved
- Execution: Non-blocking (doesn't delay response)
- Error handling: Logs but doesn't fail request
```

### Environment Variables Required:
```bash
RESEND_API_KEY=re_...  # From Resend dashboard
```

---

## ✅ Success Indicators

You'll know it's working when you see:

```bash
# Terminal logs:
=== Sending Welcome Email to Applicant ===
[Welcome Email] Starting send to: user@example.com Name: John Doe
[Welcome Email] ✓ API key found
[Welcome Email] Attempting send from: Hamaria Club <welcome@hamaria.com>
[Welcome Email] ✓ Email sent via resend.dev: abc123-xyz
✓ Welcome email queued/sent successfully: abc123-xyz
```

```
# User receives email:
Subject: Welcome to Hamaria
From: Hamaria Club <onboarding@resend.dev>
---
Hi John,

Thanks for joining Hamaria. We're excited to have you with us.
...
```

---

## 🚀 Next Steps After It Works

1. **Verify Domain** (if you want branded sender)
   - Follow instructions in `WELCOME_EMAIL_SETUP.md`

2. **Monitor Analytics**
   - Check Resend dashboard weekly
   - Watch for bounces or complaints

3. **Customize Template** (optional)
   - Edit `lib/email/sendWelcomeEmail.ts`
   - Add logo, links, or additional content

4. **Set Up Webhooks** (optional)
   - Track delivery status in your database
   - Alert on failures

---

**Last Updated:** November 13, 2025  
**Status:** ✅ Improved & Production Ready

