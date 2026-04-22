# JNTUK Placement System - Complete Setup & Health Check Guide

## 🚀 Quick Health Check

Run the health check script to verify your system:

**Windows:**
```bash
health-check.bat
```

**Linux/Mac:**
```bash
chmod +x health-check.sh
./health-check.sh
```

## 📋 System Requirements

- **Node.js**: v18+ 
- **npm**: v8+
- **PostgreSQL**: v13+
- **Git**: Latest version

## 🔧 Complete Setup Process

### 1. Database Setup

```bash
# Start PostgreSQL service
# Windows: Start PostgreSQL service from Services
# Linux: sudo systemctl start postgresql
# Mac: brew services start postgresql

# Create database
createdb placement_portal

# Run database schema
psql -d placement_portal -f database/database.sql

# Seed with 2026 data
psql -d placement_portal -f database/update_companies_2026.sql
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Check environment variables
# Ensure .env file has:
# DB_HOST=localhost
# DB_PORT=5433
# DB_USER=postgres
# DB_PASSWORD=your_password
# DB_NAME=placement_portal
# PORT=5000
# JWT_SECRET=placement_secret

# Start development server
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Check environment variables
# Ensure .env file has:
# VITE_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

## 🔍 System Health Verification

### Backend Health Check
Visit: `http://localhost:5000`
Expected response:
```json
{
  "message": "JNTUK Placement Portal API 🚀",
  "version": "1.0.0",
  "endpoints": {
    "companies": "/api/admin/companies | /api/public/companies",
    "placements": "/api/admin/placements | /api/placements/stats"
  }
}
```

### API Endpoints Test

**Public Companies:**
```bash
curl http://localhost:5000/api/public/companies
```

**Placement Stats:**
```bash
curl http://localhost:5000/api/placements/stats
```

### Frontend Health Check
Visit: `http://localhost:5173`
- ✅ Hero section loads with theme toggle
- ✅ Company logos display properly
- ✅ Navigation works
- ✅ Theme switching works
- ✅ Companies page shows logos and registration links
- ✅ Drives page shows 2026 dates

## 🐛 Common Issues & Solutions

### Database Connection Issues

**Error:** `Database connection failed`
**Solutions:**
1. Check PostgreSQL is running
2. Verify credentials in `.env`
3. Ensure database exists: `createdb placement_portal`
4. Check firewall settings

### Backend Port Issues

**Error:** `Port 5000 already in use`
**Solutions:**
1. Kill existing process: `npx kill-port 5000`
2. Change port in `.env`: `PORT=5001`
3. Update frontend `.env`: `VITE_API_URL=http://localhost:5001/api`

### Frontend Build Issues

**Error:** `Module not found`
**Solutions:**
1. Delete `node_modules`: `rm -rf node_modules`
2. Clear npm cache: `npm cache clean --force`
3. Reinstall: `npm install`

### Theme Toggle Not Working

**Solutions:**
1. Check ThemeContext is imported in App.tsx
2. Verify Tailwind config has `darkMode: 'class'`
3. Clear browser cache

### Company Logos Not Loading

**Solutions:**
1. Check internet connection (uses Clearbit API)
2. Verify logo URLs in database
3. Check browser console for CORS errors

## 📊 Database Schema Verification

Run this query to verify your database setup:

```sql
-- Check if all tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check companies data
SELECT COUNT(*) as company_count FROM companies;

-- Check placement drives for 2026
SELECT company_id, drive_date, role, package_lpa 
FROM placement_drives 
WHERE drive_date >= '2026-01-01' 
ORDER BY drive_date;

-- Check placement statistics
SELECT * FROM placement_stats ORDER BY year DESC;
```

Expected results:
- **Tables**: companies, placement_drives, placements, placement_stats, students, admins
- **Companies**: 20+ companies with logos
- **2026 Drives**: 10+ drives scheduled
- **Stats**: Data for 2024, 2025, 2026

## 🔄 System Update Process

### Adding New Companies

1. **Database:**
```sql
INSERT INTO companies (name, sector, location, logo_url, registration_link) 
VALUES ('New Company', 'Tech', 'Location', 'logo_url', 'registration_url');
```

2. **Frontend:** Companies will auto-load from API

### Adding New Drives

1. **Database:**
```sql
INSERT INTO placement_drives (company_id, drive_date, package_lpa, role) 
VALUES ((SELECT id FROM companies WHERE name = 'Company'), '2026-XX-XX', XX, 'Role');
```

2. **Frontend:** Update `Drives.tsx` if using static data

## 📱 Mobile Responsiveness Check

Test on different screen sizes:
- ✅ Desktop (1920x1080)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667)

## 🔐 Security Checklist

- ✅ JWT tokens for authentication
- ✅ Environment variables for secrets
- ✅ CORS configured properly
- ✅ SQL injection prevention (parameterized queries)
- ✅ Input validation on forms

## 📈 Performance Optimization

- ✅ Image optimization (WebP format)
- ✅ Lazy loading for images
- ✅ API response caching
- ✅ Database indexing
- ✅ Minified production builds

## 🎯 Feature Verification Checklist

### Core Features
- [ ] Theme switching (Light/Dark)
- [ ] Company logos display
- [ ] Registration links work
- [ ] 2026 placement drives show
- [ ] Statistics are accurate
- [ ] Mobile responsive design
- [ ] API endpoints respond correctly

### Admin Features (if implemented)
- [ ] Admin login works
- [ ] Company CRUD operations
- [ ] Placement management
- [ ] Statistics dashboard

### Public Features
- [ ] Home page loads
- [ ] Companies page shows all companies
- [ ] Drives page shows 2026 dates
- [ ] Statistics page displays correctly
- [ ] About page information is current

## 📞 Support & Troubleshooting

If you encounter issues:

1. **Run health check script first**
2. **Check browser console for errors**
3. **Verify database connection**
4. **Check network requests in DevTools**
5. **Review server logs**

## 🎉 Success Indicators

Your system is working properly when:
- ✅ Health check script shows all green checkmarks
- ✅ Frontend loads without console errors
- ✅ Backend API responds to all endpoints
- ✅ Database queries return expected data
- ✅ Theme switching works smoothly
- ✅ Company logos load properly
- ✅ All 2026 dates are displayed correctly

---

**Last Updated:** January 2025
**Version:** 2026.1.0