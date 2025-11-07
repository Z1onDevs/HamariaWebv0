# 🚀 Supabase Quick Start Guide

## ⚡ Complete This in 5 Minutes

### Step 1️⃣: Create Environment File (30 seconds)

In your terminal:

```bash
cd /Users/Pico/Desktop/HamariaWebv0
cp .env.local.example .env.local
```

Your `.env.local` already has the correct Supabase credentials! ✅

---

### Step 2️⃣: Run Database Schema (2 minutes)

1. **Open Supabase Dashboard**
   ```
   https://app.supabase.com/project/gwztcvzxzoprmepjcneq
   ```

2. **Navigate to SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "+ New Query"

3. **Copy & Paste SQL Schema**
   - Open `SUPABASE_SQL_SCHEMA.sql` in your project
   - Copy ALL contents (Ctrl/Cmd + A, then Ctrl/Cmd + C)
   - Paste into Supabase SQL Editor
   - Click **RUN** (or press Ctrl/Cmd + Enter)

4. **Verify Success**
   You should see: ✅ "Success. No rows returned"

---

### Step 3️⃣: Test the Integration (2 minutes)

#### Option A: Test API Directly

In a new terminal window:

```bash
curl -X POST http://localhost:3000/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "application_type": "membership",
    "membership_tier": "harmony",
    "message": "Test application from API",
    "preferred_language": "en"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": { ... }
}
```

#### Option B: Test via Admin Dashboard

1. Start your dev server (if not already running):
   ```bash
   pnpm dev
   ```

2. Open your browser and visit:
   ```
   http://localhost:3000/admin/applications
   ```

3. You should see the admin dashboard! 🎉

#### Option C: Test via Membership Form

1. Go to your membership page
2. Fill out the form
3. Submit it
4. Check:
   - ✅ Email received (via Resend)
   - ✅ Application stored in Supabase
   - ✅ Visible in admin dashboard

---

### Step 4️⃣: Verify in Supabase (30 seconds)

1. Go back to Supabase Dashboard
2. Click **Table Editor** in sidebar
3. Select **applications** table
4. You should see your test data! ✅

---

## 🎯 What You Just Built

### Frontend
- ✅ Admin dashboard at `/admin/applications`
- ✅ Fully integrated membership form

### Backend
- ✅ `/api/applications` - List & create applications
- ✅ `/api/applications/[id]` - View, update, delete specific application
- ✅ Updated `/api/contact` - Now stores to Supabase + sends email

### Database
- ✅ `applications` table with full schema
- ✅ Row Level Security enabled
- ✅ Indexes for performance
- ✅ Auto-updating timestamps

---

## 📊 Admin Dashboard Features

Visit: `http://localhost:3000/admin/applications`

- 📋 View all applications in table
- 🔍 Filter by status and type
- ✏️ Update application status inline
- 📧 Click email/phone to contact
- 📈 Real-time statistics dashboard
- 🔄 Refresh button

---

## 🛠️ Useful Commands

### View all applications in Supabase:
```sql
SELECT * FROM applications ORDER BY created_at DESC;
```

### Count applications by status:
```sql
SELECT status, COUNT(*) 
FROM applications 
GROUP BY status;
```

### View pending applications only:
```sql
SELECT * FROM pending_applications;
```

### Clear all test data:
```sql
DELETE FROM applications WHERE email LIKE '%example.com%';
```

---

## 🐛 Troubleshooting

### "Missing environment variable"
```bash
# Make sure .env.local exists:
ls -la .env.local

# If not, create it:
cp .env.local.example .env.local

# Restart dev server:
pnpm dev
```

### "Table does not exist"
```
Run the SQL schema in Supabase SQL Editor
File: SUPABASE_SQL_SCHEMA.sql
```

### "Failed to fetch applications"
```
1. Check Supabase dashboard is accessible
2. Verify table exists in Table Editor
3. Check browser console for errors
```

---

## 🎉 You're Done!

Your Supabase integration is now **fully operational**.

### What happens when someone submits a membership form:
1. ✅ Application stored in Supabase database
2. ✅ Email sent to admin via Resend
3. ✅ Success message shown to user
4. ✅ Viewable in admin dashboard
5. ✅ You can track and update status

---

## 📝 Next Steps (Optional)

- Add authentication to admin dashboard
- Export applications to CSV
- Set up email notifications on status changes
- Create detailed application view modal
- Add analytics and reporting

---

## 📚 Documentation

- **Complete Guide**: `SUPABASE_INTEGRATION_COMPLETE.md`
- **Setup Plan**: `SUPABASE_SETUP_PLAN.md`
- **SQL Schema**: `SUPABASE_SQL_SCHEMA.sql`

---

## 🆘 Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Review `SUPABASE_INTEGRATION_COMPLETE.md`
3. Check Supabase dashboard logs
4. Review browser console and network tab

---

**Estimated Total Setup Time**: 5 minutes ⏱️

**Status**: Ready to go! 🚀

