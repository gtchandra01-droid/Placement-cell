# JNTUK Placement Management System - Project Overview

## 1. Project Summary

The JNTUK Placement Management System is a comprehensive web application designed to manage and track placement activities for JNTUK (Jawaharlal Nehru Technological University Kakinada). The system provides a centralized platform for students, companies, and administrators to collaborate on recruitment drives, track placements, and manage placement statistics.

**Key Objective:** Streamline the placement process by providing real-time data, analytics, and management tools for all stakeholders.

---

## 2. Technology Stack

### Frontend
- **Framework:** React 19.2.0 with TypeScript
- **Build Tool:** Vite 7.2.4
- **Styling:** Tailwind CSS 4.1.18
- **UI Components:** Radix UI (Dialog, Navigation Menu, Separator, Slot)
- **Icons:** Lucide React 0.562.0
- **HTTP Client:** Axios 1.13.6
- **Routing:** React Router 7.1.5
- **State Management:** React Context API (Theme Context)
- **Authentication:** JWT (jsonwebtoken 9.0.3)

### Backend
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js 4.22.1
- **Database:** PostgreSQL with Sequelize ORM 6.37.7
- **Authentication:** JWT + bcryptjs 2.4.3
- **File Upload:** Multer 2.1.1
- **CORS:** Enabled for cross-origin requests
- **Development:** Nodemon + ts-node

### Database
- **Type:** PostgreSQL
- **ORM:** Sequelize
- **Models:** Admin, Student, Company, Drive, PlacementStats, Menu, Pages

---

## 3. Project Architecture

### Directory Structure

```
mainproject/
├── frontend/                    # React + TypeScript frontend
│   ├── src/
│   │   ├── admin/              # Admin panel components
│   │   │   ├── components/     # Header, Sidebar
│   │   │   ├── guards/         # Route guards (GuardRoute, RoleRoute)
│   │   │   ├── layouts/        # AdminLayout
│   │   │   ├── pages/          # Admin pages (Dashboard, Companies, etc.)
│   │   │   ├── routes/         # AdminRoutes configuration
│   │   │   ├── services/       # Auth services
│   │   │   └── types/          # TypeScript types
│   │   ├── api/                # API endpoints
│   │   │   ├── auth.ts         # Authentication API
│   │   │   ├── axios.ts        # Axios configuration
│   │   │   ├── companies.ts    # Companies API
│   │   │   ├── dashboard.ts    # Dashboard API
│   │   │   ├── drives.ts       # Drives API
│   │   │   ├── placements.ts   # Placements API
│   │   │   └── statistics.ts   # Statistics API
│   │   ├── components/         # Reusable components
│   │   │   ├── ui/             # UI components (badge, button, card, etc.)
│   │   │   ├── Header.tsx      # Main header
│   │   │   ├── Navbar.tsx      # Navigation bar
│   │   │   ├── Footer.tsx      # Footer
│   │   │   └── ...
│   │   ├── pages/              # Public pages
│   │   │   ├── Landing.tsx     # Home page
│   │   │   ├── About.tsx       # About page
│   │   │   ├── Companies.tsx   # Companies listing
│   │   │   ├── Drives.tsx      # Placement drives
│   │   │   ├── Statistics.tsx  # Placement statistics
│   │   │   ├── Gallery.tsx     # Image gallery
│   │   │   └── ...
│   │   ├── lib/                # Utility functions
│   │   │   ├── dataService.ts  # Data service layer
│   │   │   ├── security.ts     # Security utilities
│   │   │   └── utils.ts        # General utilities
│   │   ├── contexts/           # React contexts
│   │   │   └── ThemeContext.tsx # Theme management
│   │   ├── layouts/            # Layout components
│   │   │   └── MainLayout.tsx  # Main layout wrapper
│   │   ├── App.tsx             # Main app component
│   │   └── main.tsx            # Entry point
│   ├── public/                 # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── backend/                    # Express + TypeScript backend
│   ├── src/
│   │   ├── config/             # Configuration files
│   │   │   ├── db.ts           # Database configuration
│   │   │   └── multer.ts       # File upload configuration
│   │   ├── controllers/        # Request handlers
│   │   │   ├── auth.controller.ts
│   │   │   ├── admin.controller.ts
│   │   │   ├── company.controller.ts
│   │   │   ├── dashboard.controller.ts
│   │   │   ├── drive.controller.ts
│   │   │   ├── placement.controller.ts
│   │   │   ├── stats.controller.ts
│   │   │   └── ...
│   │   ├── models/             # Database models
│   │   │   ├── Admin.ts
│   │   │   ├── Student.ts
│   │   │   ├── Company.ts
│   │   │   ├── Drive.ts
│   │   │   ├── PlacementStats.ts
│   │   │   └── menu.models.ts
│   │   ├── routes/             # API routes
│   │   │   ├── auth.routes.ts
│   │   │   ├── admin.routes.ts
│   │   │   ├── company.routes.ts
│   │   │   ├── dashboard.routes.ts
│   │   │   ├── drive.routes.ts
│   │   │   ├── placement.routes.ts
│   │   │   ├── stats.routes.ts
│   │   │   └── ...
│   │   ├── middleware/         # Express middleware
│   │   │   ├── auth.middleware.ts
│   │   │   ├── error.middleware.ts
│   │   │   ├── rolemiddleware.ts
│   │   │   ├── upload.middleware.ts
│   │   │   └── uploadnotification.middleware.ts
│   │   ├── utils/              # Utility functions
│   │   │   └── jwt.ts          # JWT utilities
│   │   ├── app.ts              # Express app setup
│   │   ├── index.ts            # Server entry point
│   │   └── server.ts
│   ├── uploads/                # File storage
│   │   └── images/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── database/                   # Database scripts
│   ├── database.sql            # Main schema
│   ├── seed.sql                # Seed data
│   ├── companies_seed.sql      # Company data
│   ├── update_companies_2025.sql
│   ├── update_companies_2026.sql
│   ├── setup.bat               # Setup script
│   └── MANUAL_SETUP.md         # Setup guide
│
└── [Setup & Configuration Files]
    ├── start-dev.bat           # Start development environment
    ├── start-backend.bat       # Start backend server
    ├── start-frontend.bat      # Start frontend server
    ├── setup-database.bat      # Setup database
    ├── SETUP_GUIDE.md          # Setup documentation
    └── COMMANDS_REFERENCE.md   # Command reference
```

---

## 4. Core Features

### 4.1 Public Features
- **Landing Page:** Showcase placement statistics and key information
- **About Page:** Information about the placement cell
- **Companies Directory:** Browse all recruiting companies
- **Placement Drives:** View upcoming and ongoing recruitment drives
- **Statistics Dashboard:** View placement statistics, trends, and analytics
- **Gallery:** Image gallery of placement events
- **Notifications:** Stay updated with latest placement news
- **Contact & Help:** Support and contact information

### 4.2 Admin Features
- **Admin Dashboard:** Overview of placement metrics and activities
- **Company Management:** Add, edit, delete companies and manage their details
- **Placement Drive Management:** Create and manage recruitment drives
- **Student Management:** Manage student records and placements
- **Statistics Management:** Update and manage placement statistics
- **Image Management:** Upload and manage gallery images
- **Menu Management:** Configure navigation menus
- **Page Management:** Create and edit custom pages
- **Notifications:** Send notifications to students
- **Settings:** System configuration and preferences

### 4.3 Authentication & Authorization
- **Role-Based Access Control (RBAC):** Admin and Student roles
- **JWT Authentication:** Secure token-based authentication
- **Password Encryption:** bcryptjs for secure password storage
- **Protected Routes:** Route guards for admin and student access

---

## 5. Key Pages & Components

### Frontend Pages

| Page | Purpose | Key Features |
|------|---------|--------------|
| **Landing** | Home page | Hero section, feature cards, company logos, CTA |
| **Statistics** | Placement analytics | Pie charts, sector distribution, top recruiters, key metrics |
| **Companies** | Company listing | Company details, sector filtering, contact info |
| **Drives** | Recruitment drives | Drive schedule, company info, application status |
| **About** | About placement cell | Mission, vision, team information |
| **Gallery** | Event photos | Image gallery with categories |
| **Notifications** | Updates & news | Latest placement news and announcements |
| **Contact** | Contact form | Support and inquiry form |
| **Help & Support** | FAQ & support | Help documentation and support resources |

### Admin Pages

| Page | Purpose | Key Features |
|------|---------|--------------|
| **Dashboard** | Admin overview | Key metrics, recent activities, quick actions |
| **Companies** | Company management | CRUD operations, bulk import, sector management |
| **Placement Stats** | Statistics management | Update placement data, manage statistics |
| **Drives** | Drive management | Create/edit drives, manage applications |
| **Images** | Image management | Upload, organize, delete images |
| **Menus** | Navigation management | Configure menu items and links |
| **Pages** | Content management | Create/edit custom pages |
| **Notifications** | Send notifications | Create and send notifications to students |
| **Settings** | System settings | Configure system preferences |

---

## 6. API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /login` - User login
- `POST /register` - User registration
- `POST /logout` - User logout
- `GET /profile` - Get user profile

### Dashboard Routes (`/api/dashboard`)
- `GET /` - Get dashboard data
- `GET /metrics` - Get key metrics

### Admin Routes (`/api/admin`)
- `GET /users` - List all users
- `POST /users` - Create user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Company Routes (`/api/companies`)
- `GET /` - List all companies
- `POST /` - Create company
- `PUT /:id` - Update company
- `DELETE /:id` - Delete company
- `GET /:id` - Get company details

### Drive Routes (`/api/drives`)
- `GET /` - List all drives
- `POST /` - Create drive
- `PUT /:id` - Update drive
- `DELETE /:id` - Delete drive
- `GET /:id` - Get drive details

### Statistics Routes (`/api/stats`)
- `GET /` - Get placement statistics
- `POST /` - Create statistics record
- `PUT /:id` - Update statistics

### Placement Routes (`/api/placements`)
- `GET /` - List placements
- `POST /` - Create placement record
- `PUT /:id` - Update placement

### Image Routes (`/api/images`)
- `POST /upload` - Upload image
- `GET /` - List images
- `DELETE /:id` - Delete image

### Menu Routes (`/api/menus`)
- `GET /` - List menus
- `POST /` - Create menu
- `PUT /:id` - Update menu
- `DELETE /:id` - Delete menu

### Pages Routes (`/api/pages`)
- `GET /` - List pages
- `POST /` - Create page
- `PUT /:id` - Update page
- `DELETE /:id` - Delete page

---

## 7. Database Schema

### Key Tables

**Admin Table**
- id (Primary Key)
- username (Unique)
- email (Unique)
- password (Hashed)
- role
- created_at
- updated_at

**Student Table**
- id (Primary Key)
- name
- email (Unique)
- roll_number
- branch
- cgpa
- placement_status
- placed_company
- package
- created_at
- updated_at

**Company Table**
- id (Primary Key)
- name (Unique)
- sector
- website
- contact_person
- contact_email
- contact_phone
- logo_url
- description
- created_at
- updated_at

**Drive Table**
- id (Primary Key)
- company_id (Foreign Key)
- drive_date
- location
- job_title
- salary_package
- eligibility_criteria
- status
- created_at
- updated_at

**PlacementStats Table**
- id (Primary Key)
- year
- total_students
- students_placed
- highest_package
- avg_package
- created_at
- updated_at

**Menu Table**
- id (Primary Key)
- title
- link
- order
- parent_id
- created_at
- updated_at

**Pages Table**
- id (Primary Key)
- title
- slug
- content
- meta_description
- created_at
- updated_at

---

## 8. Security Features

1. **Authentication:** JWT-based token authentication
2. **Authorization:** Role-based access control (Admin/Student)
3. **Password Security:** bcryptjs hashing with salt rounds
4. **CORS:** Configured to prevent unauthorized cross-origin requests
5. **Input Validation:** Server-side validation of all inputs
6. **Error Handling:** Centralized error middleware
7. **File Upload Security:** Multer configuration with file type validation
8. **Protected Routes:** Route guards for sensitive operations

---

## 9. Development Workflow

### Setup & Installation

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd mainproject
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Configure .env file
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   # Configure .env file
   npm run dev
   ```

4. **Database Setup**
   ```bash
   # Run database setup script
   ./setup-database.bat
   ```

### Running the Application

- **Development Mode:** `npm run start-dev.bat`
- **Backend Only:** `npm run start-backend.bat`
- **Frontend Only:** `npm run start-frontend.bat`
- **Database Setup:** `npm run setup-database.bat`

### Build & Deployment

- **Frontend Build:** `npm run build` (generates optimized bundle)
- **Backend:** Runs with ts-node in development, can be compiled to JavaScript for production

---

## 10. Key Functionalities

### 10.1 Placement Statistics
- Real-time placement metrics
- Year-wise statistics (2024, 2025, 2026)
- Sector-wise company distribution
- Top recruiters analysis
- Placement rate tracking
- Package statistics (highest, average)

### 10.2 Company Management
- Company registration and profile management
- Sector categorization
- Contact information management
- Logo and branding
- Drive scheduling

### 10.3 Recruitment Drives
- Drive creation and scheduling
- Eligibility criteria management
- Job title and package information
- Drive status tracking
- Student application management

### 10.4 Student Management
- Student profile management
- Placement status tracking
- Package information
- Branch and CGPA tracking
- Notification preferences

### 10.5 Analytics & Reporting
- Placement statistics dashboard
- Sector distribution charts
- Top recruiters visualization
- Year-wise trend analysis
- Placement rate metrics

---

## 11. Performance Considerations

1. **Frontend Optimization:**
   - Vite for fast build and HMR
   - React 19 with optimized rendering
   - Tailwind CSS for minimal CSS output
   - Lazy loading of routes

2. **Backend Optimization:**
   - Sequelize ORM for efficient database queries
   - Connection pooling with PostgreSQL
   - Middleware for request optimization
   - Error handling and logging

3. **Database Optimization:**
   - Indexed columns for faster queries
   - Proper foreign key relationships
   - Query optimization in controllers

---

## 12. Future Enhancements

1. **Email Notifications:** Automated email alerts for placements
2. **SMS Integration:** SMS notifications for important updates
3. **Resume Management:** Student resume upload and management
4. **Interview Scheduling:** Automated interview scheduling system
5. **Analytics Export:** Export statistics to PDF/Excel
6. **Mobile App:** Native mobile application
7. **Real-time Updates:** WebSocket integration for live updates
8. **Advanced Filtering:** More sophisticated search and filter options
9. **Reporting:** Comprehensive reporting and analytics
10. **Integration:** Third-party integrations (LinkedIn, etc.)

---

## 13. Deployment

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- npm or yarn

### Production Deployment Steps

1. **Environment Configuration**
   - Set production environment variables
   - Configure database connection
   - Set JWT secret

2. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy Backend**
   - Compile TypeScript to JavaScript
   - Set up process manager (PM2)
   - Configure reverse proxy (Nginx)

4. **Database Migration**
   - Run database setup scripts
   - Seed initial data

5. **SSL/TLS Configuration**
   - Install SSL certificates
   - Configure HTTPS

---

## 14. Troubleshooting & Support

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check .env configuration
   - Verify database credentials

2. **Port Already in Use**
   - Change port in .env
   - Kill process using the port

3. **CORS Errors**
   - Verify CORS configuration in backend
   - Check frontend API endpoint configuration

4. **Authentication Issues**
   - Verify JWT secret in .env
   - Check token expiration
   - Clear browser cache and cookies

### Support Resources
- SETUP_GUIDE.md - Detailed setup instructions
- COMMANDS_REFERENCE.md - Available commands
- SYSTEM_HEALTH_GUIDE.md - System health checks

---

## 15. Team & Contributions

This project is developed for JNTUK Placement Cell to streamline the placement management process. The system is designed to be scalable, maintainable, and user-friendly for all stakeholders.

---

## 16. License & Compliance

This project is developed for JNTUK and follows institutional guidelines and policies.

---

**Last Updated:** 2026
**Version:** 1.0.0
**Status:** Production Ready
