# Statistics Page Fix - Setup Guide

## Issue
The Statistics page was not displaying data because the database tables had incorrect schema or were missing.

## Solution

### Step 1: Run the Migration
Execute the migration file to create/fix the statistics tables:

**Using psql (PostgreSQL command line):**
```bash
psql -U postgres -d placement_portal -f database/fix_statistics_tables.sql
```

**Or using pgAdmin:**
1. Open pgAdmin
2. Connect to your database
3. Open Query Tool
4. Copy and paste the contents of `database/fix_statistics_tables.sql`
5. Click Execute

### Step 2: Verify Tables
Run these queries to verify the tables were created:

```sql
SELECT * FROM placement_stats;
SELECT * FROM year_stats;
SELECT * FROM recruiters;
SELECT * FROM branch_placements;
```

You should see data in all tables.

### Step 3: Restart Backend
Stop and restart your Node.js backend server:
```bash
npm run dev
```

### Step 4: Test Frontend
1. Open your browser and navigate to `http://localhost:3000/statistics`
2. You should see:
   - Key stats cards (Total Placed, Placement Rate, Highest Package, Companies)
   - Branch-wise Placement Details with pie chart and table
   - Company Sector Distribution (if companies exist)
   - Top Recruiters with pie chart and table
   - Year-wise Placement Data table

## Troubleshooting

### If data still doesn't show:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Check for error messages
4. Go to Network tab and check API calls:
   - `placement-stats`
   - `year-stats`
   - `recruiters`
   - `branch-placements`
   - `companies`

### If you see "Failed to load statistics":
- Check backend is running on port 5000
- Check database connection in backend logs
- Verify CORS is enabled in backend

### If tables don't exist:
- Make sure you ran the migration file
- Check PostgreSQL is running
- Verify database name is correct

## API Endpoints

All endpoints are public (no authentication required):

- `GET /api/placement-stats` - Get overall placement statistics
- `GET /api/year-stats` - Get year-wise statistics
- `GET /api/recruiters` - Get top recruiters
- `GET /api/branch-placements` - Get branch-wise placements
- `GET /api/companies` - Get companies list

## Admin Endpoints (Protected)

- `PUT /api/admin/placement-stats` - Update placement stats
- `POST /api/admin/year-stats` - Create year stat
- `PUT /api/admin/year-stats/:year` - Update year stat
- `DELETE /api/admin/year-stats/:year` - Delete year stat
- `POST /api/admin/recruiters` - Create recruiter
- `PUT /api/admin/recruiters/:name` - Update recruiter
- `DELETE /api/admin/recruiters/:name` - Delete recruiter
- `POST /api/admin/branch-placements` - Create branch placement
- `PUT /api/admin/branch-placements/:id` - Update branch placement
- `DELETE /api/admin/branch-placements/:id` - Delete branch placement
