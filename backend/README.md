# Jana Portfolio Backend

This is the backend API for Jana's portfolio website, built with Express.js and Supabase.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Database Setup
1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `database/home_tables.sql`
4. Execute the SQL to create the necessary tables

### 3. Environment Variables
Make sure your `.env` file in the root directory contains:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
PORT=5000
```

### 4. Start the Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

## API Endpoints

### Home Component Endpoints

#### GET /api/home
Fetches the home page content (quote, name, title, background image).

**Response:**
```json
{
  "id": 1,
  "quote": "YOU FOCUS ON YOUR BUSINESS. I'LL BUILD YOUR BRAND ONLINE",
  "name": "Jana Virtuales",
  "title": "Social Media Manager",
  "background_image": "homebg.jpg",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

#### PUT /api/home
Updates the home page content (for future admin functionality).

**Request Body:**
```json
{
  "quote": "New quote text",
  "name": "Jana Virtuales",
  "title": "Social Media Manager",
  "background_image": "new_background.jpg"
}
```

#### POST /api/home/visit
Tracks a page visit for analytics.

**Response:**
```json
{
  "id": 1,
  "date": "2024-01-01",
  "visit_count": 5,
  "created_at": "2024-01-01T00:00:00Z"
}
```

#### GET /api/home/analytics
Fetches visitor analytics for the last 30 days.

**Response:**
```json
[
  {
    "id": 1,
    "date": "2024-01-01",
    "visit_count": 5,
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

## Database Tables

### home_content
Stores the dynamic content for the home page:
- `id`: Primary key
- `quote`: Hero section quote
- `name`: Personal name
- `title`: Professional title
- `background_image`: Background image filename
- `created_at`, `updated_at`: Timestamps

### home_analytics
Tracks daily visitor counts:
- `id`: Primary key
- `date`: Date of visits
- `visit_count`: Number of visits for that date
- `created_at`: Timestamp

## Security Features

- Row Level Security (RLS) enabled
- Public read access for content
- Authenticated user access for updates
- CORS enabled for frontend communication

## Next Steps

To integrate this with your React frontend:

1. Install axios in your frontend:
   ```bash
   npm install axios
   ```

2. Create an API service to fetch home data
3. Update your Home.js component to use dynamic data
4. Add visitor tracking on component mount

## Development Notes

- The server runs on `http://localhost:5000` by default
- Use `npm run dev` for development with auto-restart
- All routes are prefixed with `/api`
- Error handling is implemented for all endpoints 