# Supabase Frontend Setup Instructions

## Environment Variables Required

To fix the authentication initialization error, you need to create a `.env` file in your project root directory with the following Supabase configuration:

### Step 1: Create `.env` file
Create a new file called `.env` in your project root (same level as package.json) with the following content:

```bash
# Supabase Configuration
REACT_APP_SUPABASE_URL=your_supabase_project_url_here
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Step 2: Get Your Supabase Credentials

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy the following values:
   - **Project URL** → Replace `your_supabase_project_url_here`
   - **anon public** key → Replace `your_supabase_anon_key_here`

### Step 3: Example `.env` file
Your `.env` file should look something like this:

```bash
REACT_APP_SUPABASE_URL=https://xyzabc123.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSI...
```

### Step 4: Restart Development Server
After creating the `.env` file:
1. Stop your React development server (Ctrl+C)
2. Restart it with `npm start`

## Important Notes

- Never commit your `.env` file to version control
- Add `.env` to your `.gitignore` file if it's not already there
- Environment variables starting with `REACT_APP_` are the only ones exposed to the frontend
- The authentication error you encountered was due to missing these environment variables

## Troubleshooting

If you still get errors after setting up the environment variables:
1. Double-check that the variable names are exactly as shown (case-sensitive)
2. Ensure there are no spaces around the `=` sign
3. Restart your development server completely
4. Check the browser console for any remaining errors

## Backend Configuration

Don't forget to also configure your backend with the same Supabase credentials if you haven't already done so in your `backend/` directory. 