# JNTUK Placement Portal - Manual Database Setup Guide

## Step 1: Open PostgreSQL Command Line

Open Command Prompt or PowerShell and run:
```
cd "C:\Program Files\PostgreSQL\16\bin"
psql -U postgres
```

When prompted for password, enter your PostgreSQL password (default is usually "postgres")

## Step 2: Create Database

In the PostgreSQL prompt, run:
```sql
CREATE DATABASE placement_portal;
```

## Step 3: Connect to Database

```sql
\c placement_portal
```

## Step 4: Run Schema

Copy and paste the entire content of `database.sql` into the PostgreSQL prompt.

Or use:
```
\i 'E:/JNTUK PLACEMENT/mainproject/database/database.sql'
```

## Step 5: Insert Sample Data

Copy and paste the entire content of `seed.sql` into the PostgreSQL prompt.

Or use:
```
\i 'E:/JNTUK PLACEMENT/mainproject/database/seed.sql'
```

## Step 6: Verify Setup

Run these commands to verify:
```sql
-- Check tables
\dt

-- Check admin user
SELECT * FROM admins;

-- Check companies
SELECT * FROM companies;

-- Check placement stats
SELECT * FROM placement_stats;
```

## Step 7: Update Backend .env

Make sure your `.env` file has:
```
DB_HOST=localhost
DB_PORT=5433
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=placement_portal
PORT=5000
JWT_SECRET=placement_secret
NODE_ENV=development
```

## Step 8: Start Backend

```bash
cd backend
npm run dev
```

## Troubleshooting

### Cannot connect to PostgreSQL
- Make sure PostgreSQL service is running
- Check if password is correct
- Try: `tasklist | findstr postgres`

### Database already exists
- Drop it first: `DROP DATABASE placement_portal;`
- Then create new one

### Permission denied
- Make sure you're using the correct PostgreSQL user
- Default user is "postgres"

### Port 5433 already in use
- Change DB_PORT in .env to another port (e.g., 5434)
- Or kill the process using port 5433

---

**Admin Credentials:**
- Email: admin@jntuk.edu.in
- Password: admin123

**Database Credentials:**
- Host: localhost
- Port: 5433
- User: postgres
- Password: postgres (or your custom password)
- Database: placement_portal
