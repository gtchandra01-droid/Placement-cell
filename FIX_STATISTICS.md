# Fix Statistics Page - Quick Setup

## Steps to Fix Statistics Page

### 1. Run Database Migration
Open terminal in the backend directory and run:

```bash
npm run migrate
```

This will:
- Create/fix all statistics tables
- Insert default data
- Verify all tables are ready

### 2. Restart Backend Server
```bash
npm run dev
```

### 3. Test Statistics Page
Open browser and go to: `http://localhost:3000/statistics`

You should now see:
- ✅ Key Stats Cards (Total Placed, Placement Rate, Highest Package, Companies)
- ✅ Branch-wise Placement Details with pie chart
- ✅ Top Recruiters with pie chart
- ✅ Year-wise Placement Data table
- ✅ Company Sector Distribution (if companies exist)

## What Was Fixed

1. **Updated Statistics.tsx** - Added better error handling and logging
2. **Created fix_statistics_tables.sql** - Migration to create/fix all tables with correct schema
3. **Created migrate.ts** - Script to run the migration
4. **Updated package.json** - Added `npm run migrate` command

## Tables Created

- `placement_stats` - Overall placement statistics
- `year_stats` - Year-wise placement data
- `recruiters` - Top recruiters list
- `branch_placements` - Branch-wise placement details

## If Still Not Working

1. Check backend console for errors
2. Open browser DevTools (F12) → Console tab
3. Check Network tab for failed API calls
4. Verify PostgreSQL is running on port 5433
5. Check database credentials in backend/.env

## Admin Features

After migration, you can manage statistics from admin panel:
- `/admin/statistics` - Manage overall stats
- `/admin/year-stats` - Manage year-wise data
- `/admin/recruiters` - Manage top recruiters
- `/admin/branch-placements` - Manage branch placements
