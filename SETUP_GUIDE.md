# JNTUK Placement Portal - Setup Guide

## 🔐 Admin Login Credentials

```
Email: admin@jntuk.edu.in
Password: admin123
```

## 📊 Database Configuration

```
Host: localhost
Port: 5433
Database: placement_portal
User: postgres
Password: postgres
```

## 🚀 Setup Instructions

### 1. PostgreSQL Setup
- Ensure PostgreSQL 16 is installed and running
- Default password for `postgres` user: `postgres`
- If password is different, update `.env` file in backend folder

### 2. Database Initialization

Run the following commands in PostgreSQL:

```sql
-- Create database
CREATE DATABASE placement_portal;

-- Connect to database
\c placement_portal

-- Run schema (from database.sql)
-- Run seed data (from seed.sql)
```

Or use the batch script:
```bash
cd database
setup.bat
```

### 3. Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend will run on: `http://localhost:5000`

### 4. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on: `http://localhost:5173`

## 📝 API Endpoints

- **Auth**: `POST /api/auth/login`
- **Dashboard**: `GET /api/dashboard/stats`
- **Companies**: `GET /api/admin/companies`
- **Drives**: `GET /api/drives`
- **Stats**: `GET /api/stats`

## 🔑 Admin Panel Access

1. Go to `http://localhost:5173/admin/login`
2. Enter credentials:
   - Email: `admin@jntuk.edu.in`
   - Password: `admin123`
3. Click "Sign In"

## 📱 Public Pages

- Home: `/`
- About: `/about`
- Drives: `/drives`
- Companies: `/companies`
- Statistics: `/statistics`
- Notifications: `/notifications`
- Contact: `/contact`

## 🛠️ Troubleshooting

### Database Connection Failed
- Check PostgreSQL is running: `tasklist | findstr postgres`
- Verify password in `.env` matches PostgreSQL password
- Ensure database `placement_portal` exists

### Port Already in Use
- Backend (5000): `netstat -ano | findstr :5000`
- Frontend (5173): `netstat -ano | findstr :5173`

### Module Not Found
- Run `npm install` in both frontend and backend folders
- Clear node_modules and reinstall if issues persist

## 📚 Sample Data

The `seed.sql` file includes:
- 1 Admin user
- 6 Sample companies
- 6 Sample placement drives
- 3 Years of placement statistics

## 🎨 Theme Colors

- Primary Navy: `#0b1c33`
- Accent Gold: `#d4a853`
- Background: `#faf8f3`

---

**Last Updated**: March 2026
**Version**: 1.0.0
