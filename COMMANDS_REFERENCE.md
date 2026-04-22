# 🚀 JNTUK Placement System - Complete Command Reference

## 📊 DATABASE COMMANDS

### Initial Database Setup
```bash
# 1. Start PostgreSQL Service (Windows)
net start postgresql-x64-13
# OR through Services: Win+R → services.msc → Start postgresql service

# 2. Create Database
createdb -U postgres placement_portal

# 3. Connect to PostgreSQL
psql -U postgres -d placement_portal

# 4. Run Database Schema
psql -U postgres -d placement_portal -f database/database.sql

# 5. Insert Sample Data (2026)
psql -U postgres -d placement_portal -f database/update_companies_2026.sql
```

### Database Management Commands
```bash
# Connect to database
psql -U postgres -d placement_portal

# List all databases
psql -U postgres -l

# List all tables
psql -U postgres -d placement_portal -c "\dt"

# Check companies data
psql -U postgres -d placement_portal -c "SELECT COUNT(*) FROM companies;"

# Check 2026 placement drives
psql -U postgres -d placement_portal -c "SELECT * FROM placement_drives WHERE drive_date >= '2026-01-01';"

# Check placement statistics
psql -U postgres -d placement_portal -c "SELECT * FROM placement_stats ORDER BY year DESC;"

# Backup database
pg_dump -U postgres placement_portal > backup.sql

# Restore database
psql -U postgres -d placement_portal < backup.sql

# Drop database (if needed)
dropdb -U postgres placement_portal
```

### Quick Database Test
```bash
# Test database connection
setup-database.bat
# OR
test-connection-manual.bat
```

---

## 🔧 BACKEND COMMANDS

### Initial Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (if not exists)
echo DB_HOST=localhost > .env
echo DB_PORT=5433 >> .env
echo DB_USER=postgres >> .env
echo DB_PASSWORD=postgres >> .env
echo DB_NAME=placement_portal >> .env
echo PORT=5000 >> .env
echo JWT_SECRET=placement_secret >> .env
echo NODE_ENV=development >> .env
```

### Development Commands
```bash
# Start development server
npm run dev

# Start production server
npm start

# Install new package
npm install package-name

# Install dev dependency
npm install -D package-name

# Update dependencies
npm update

# Check for outdated packages
npm outdated
```

### Backend Testing Commands
```bash
# Test database connection
node test-db-connection.js

# Complete backend test
node test-backend-complete.js

# Test specific endpoint
curl http://localhost:5000/api/test/health

# Test companies API
curl http://localhost:5000/api/public/companies

# Test placement stats
curl http://localhost:5000/api/placements/stats
```

### Backend Troubleshooting
```bash
# Kill process on port 5000
npx kill-port 5000

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules
npm install

# Check running processes
netstat -ano | findstr :5000

# View server logs
npm run dev > server.log 2>&1
```

### Quick Backend Test
```bash
# Complete backend test
test-backend-complete.bat

# Quick test
quick-test-backend.bat
```

---

## 🎨 FRONTEND COMMANDS

### Initial Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file (if not exists)
echo VITE_API_URL=http://localhost:5000/api > .env
```

### Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Fix linting issues
npm run lint --fix
```

### Frontend Testing Commands
```bash
# Test if frontend loads
curl http://localhost:5173

# Check build output
npm run build && ls dist/

# Test production build
npm run preview
```

### Frontend Troubleshooting
```bash
# Kill process on port 5173
npx kill-port 5173

# Clear Vite cache
rm -rf node_modules/.vite

# Reinstall dependencies
rm -rf node_modules
npm install

# Check for TypeScript errors
npx tsc --noEmit

# Clear browser cache
# Ctrl+Shift+R (hard refresh)
```

---

## 🔄 COMPLETE SYSTEM COMMANDS

### Full System Setup (First Time)
```bash
# 1. Setup Database
setup-database.bat

# 2. Setup Backend
cd backend
npm install
npm run dev

# 3. Setup Frontend (in new terminal)
cd frontend
npm install
npm run dev
```

### Daily Development Workflow
```bash
# Terminal 1: Start Backend
cd backend
npm run dev

# Terminal 2: Start Frontend
cd frontend
npm run dev

# Terminal 3: Database operations (if needed)
psql -U postgres -d placement_portal
```

### System Health Check
```bash
# Complete system check
health-check.bat

# Test all components
test-backend-complete.bat
```

### Production Deployment
```bash
# Build frontend
cd frontend
npm run build

# Start backend in production
cd backend
npm start

# Serve frontend (using a web server)
# Copy dist/ folder to web server
```

---

## 🌐 IMPORTANT URLs

### Development URLs
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/api/test/health
- **Companies API**: http://localhost:5000/api/public/companies
- **Placement Stats**: http://localhost:5000/api/placements/stats

### Database Connection
- **Host**: localhost
- **Port**: 5433
- **User**: postgres
- **Password**: postgres
- **Database**: placement_portal

---

## 🚨 EMERGENCY COMMANDS

### If Everything Breaks
```bash
# 1. Stop all processes
taskkill /f /im node.exe

# 2. Reset database
dropdb -U postgres placement_portal
createdb -U postgres placement_portal
psql -U postgres -d placement_portal -f database/database.sql
psql -U postgres -d placement_portal -f database/update_companies_2026.sql

# 3. Reset backend
cd backend
rm -rf node_modules
npm install

# 4. Reset frontend
cd frontend
rm -rf node_modules
npm install

# 5. Test everything
test-backend-complete.bat
```

### Port Issues
```bash
# Kill specific ports
npx kill-port 5000    # Backend
npx kill-port 5173    # Frontend
npx kill-port 5433    # PostgreSQL (don't kill this)

# Find what's using a port
netstat -ano | findstr :5000
```

### Permission Issues
```bash
# Run as administrator
# Right-click Command Prompt → "Run as administrator"

# Or use PowerShell as admin
# Win+X → Windows PowerShell (Admin)
```

---

## 📋 QUICK START CHECKLIST

### ✅ First Time Setup
- [ ] Install Node.js (v18+)
- [ ] Install PostgreSQL (v13+)
- [ ] Run `setup-database.bat`
- [ ] Run `cd backend && npm install`
- [ ] Run `cd frontend && npm install`
- [ ] Test with `test-backend-complete.bat`

### ✅ Daily Development
- [ ] Start PostgreSQL service
- [ ] Run `cd backend && npm run dev`
- [ ] Run `cd frontend && npm run dev`
- [ ] Open http://localhost:5173

### ✅ Before Deployment
- [ ] Run `npm run build` in frontend
- [ ] Test production build
- [ ] Backup database
- [ ] Update environment variables

---

## 🆘 HELP & SUPPORT

### Common Issues
1. **"Database connection failed"** → Run `setup-database.bat`
2. **"Port already in use"** → Run `npx kill-port 5000`
3. **"Module not found"** → Run `npm install`
4. **"Permission denied"** → Run as administrator

### Get Help
- Check server logs in terminal
- Use browser DevTools (F12)
- Run health check scripts
- Check this command reference

---

**Save this file as reference! 📖**