# 🔐 Simple Admin Setup Guide

## Overview

This is a much simpler admin system that uses just one admin user with username and password. No email verification, no multiple users, no complex authentication - just simple and effective for a personal portfolio.

## 📋 What You'll Get

- ✅ Simple username/password login
- ✅ One admin user (perfect for personal portfolios)
- ✅ Session management with localStorage
- ✅ Protected admin dashboard
- ✅ Content management capabilities
- ✅ Analytics tracking

## 🚀 Quick Setup Steps

### Step 1: Install Dependencies

```bash
npm install bcryptjs
```

### Step 2: Run Database Scripts

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard) → SQL Editor
2. Copy and paste the contents of `backend/database/home_tables.sql` (if not already done)
3. Copy and paste the contents of `backend/database/simple_admin.sql`
4. Click **Run**

### Step 3: Set Your Admin Password

#### Option A: Development (Simple Password)
1. In Supabase SQL Editor, run:
```sql
UPDATE admin_auth 
SET password_hash = 'plain:your_password_here' 
WHERE username = 'admin';
```

Example:
```sql
UPDATE admin_auth 
SET password_hash = 'plain:admin123' 
WHERE username = 'admin';
```

#### Option B: Production (Secure Password)
1. Go to an online bcrypt generator (like https://bcrypt-generator.com/)
2. Hash your password with 10 rounds
3. In Supabase SQL Editor, run:
```sql
UPDATE admin_auth 
SET password_hash = 'your_bcrypt_hash_here' 
WHERE username = 'admin';
```

### Step 4: Test Your Login

1. Start your React app: `npm start`
2. Go to `http://localhost:3000/admin/login`
3. Login with:
   - **Username**: `admin`
   - **Password**: `admin123` (or whatever you set)
4. You should be redirected to the admin dashboard!

## 🔧 Database Schema

### admin_auth Table
```sql
- id (SERIAL PRIMARY KEY)
- username (VARCHAR) - Default: 'admin'
- password_hash (VARCHAR) - Your hashed password
- last_login_at (TIMESTAMP) - Tracks when you last logged in
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## 🛠️ Customization

### Change Username
```sql
UPDATE admin_auth 
SET username = 'your_new_username' 
WHERE username = 'admin';
```

### Change Password
You can also change the password from within the admin dashboard (once we implement that feature), or via SQL:

```sql
UPDATE admin_auth 
SET password_hash = 'your_new_bcrypt_hash' 
WHERE username = 'your_username';
```

## 🔒 Security Features

- **Password Hashing**: Uses bcrypt for secure password storage
- **Session Management**: 24-hour session timeout
- **Protected Routes**: Automatic redirect to login if not authenticated
- **Input Validation**: Basic form validation on login
- **Error Handling**: Clear error messages for failed logins

## 📱 How It Works

1. **Login**: User enters username/password
2. **Verification**: System checks against database
3. **Session**: Creates a session stored in localStorage
4. **Protection**: All admin routes check for valid session
5. **Timeout**: Session expires after 24 hours

## 🎯 Available Features

### Admin Dashboard
- ✏️ Edit home page content
- 📊 View visitor analytics
- 🔄 Real-time updates
- 💾 Save changes instantly

### Content Management
- Update hero quote, name, and title
- Change background images
- Manage portfolio content

### Analytics
- Daily visitor tracking
- Historical data
- Visual charts

## 🔧 Troubleshooting

### "Invalid username or password"
- Check that you've updated the password in the database
- Make sure you're using the correct username (default: 'admin')
- Verify the password hash format

### "Database not configured"
- Ensure your `.env` file has the correct Supabase credentials
- Restart your development server

### "Session expired" 
- Sessions last 24 hours, just login again
- Check browser console for any localStorage errors

## 💡 Pro Tips

- **Development**: Use `plain:password` format for easy testing
- **Production**: Always use bcrypt hashed passwords
- **Security**: Change the default username and use a strong password
- **Backup**: Keep a backup of your admin credentials somewhere safe

## 🚀 Ready to Use!

That's it! Your simple admin system is ready. Much cleaner than the complex multi-user system, and perfect for a personal portfolio where you just need one admin user.

## 🔜 Next Steps

- Test the login system
- Customize your admin dashboard
- Add more content management features
- Set up analytics tracking
- Deploy to production with secure passwords

---

## ⚠️ Security Notes

- Never use plain text passwords in production
- Use strong, unique passwords
- Regularly update your admin password
- Keep your Supabase credentials secure
- Monitor login activity via the `last_login_at` field 


-- 🔐 Admin Setup SQL Commands (Development Mode)
-- Generated on: 7/5/2025, 11:31:10 AM
-- Username: admin
-- Password Type: Plain Text (Development)

-- Step 1: Create admin_auth table if it doesn't exist
CREATE TABLE IF NOT EXISTS admin_auth (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Insert or update admin user
INSERT INTO admin_auth (username, password_hash) 
VALUES ('admin', 'plain:admin1234')
ON CONFLICT (username) 
DO UPDATE SET 
    password_hash = 'plain:admin1234',
    updated_at = NOW();

-- Step 3: Create necessary indexes
CREATE INDEX IF NOT EXISTS idx_admin_auth_username ON admin_auth(username);

-- Step 4: Enable Row Level Security
ALTER TABLE admin_auth ENABLE ROW LEVEL SECURITY;

-- Step 5: Create policy for authentication
DROP POLICY IF EXISTS "Allow read for admin authentication" ON admin_auth;
CREATE POLICY "Allow read for admin authentication" ON admin_auth
    FOR SELECT USING (true);

-- Step 6: Create login function
CREATE OR REPLACE FUNCTION update_admin_last_login(admin_username VARCHAR)
RETURNS VOID AS $$
BEGIN
    UPDATE admin_auth 
    SET last_login_at = NOW(), updated_at = NOW()
    WHERE username = admin_username;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ✅ Setup complete! You can now login with:
-- Username: admin
-- Password: admin1234