# PostgreSQL Database Setup Script for JNTUK Placement Portal
# Run this script in PowerShell as Administrator

$pgBin = "C:\Program Files\PostgreSQL\16\bin"
$pgUser = "postgres"
$pgPassword = "postgres"
$pgHost = "localhost"
$pgPort = 5433
$dbName = "placement_portal"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "JNTUK Placement Portal - Database Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if PostgreSQL exists
if (-not (Test-Path "$pgBin\psql.exe")) {
    Write-Host "ERROR: PostgreSQL not found at $pgBin" -ForegroundColor Red
    Write-Host "Please install PostgreSQL 16 first." -ForegroundColor Red
    exit 1
}

Write-Host "[1/5] Checking PostgreSQL connection..." -ForegroundColor Yellow
$env:PGPASSWORD = $pgPassword
& "$pgBin\psql.exe" -h $pgHost -p $pgPort -U $pgUser -c "SELECT version();" 2>&1 | Out-Null

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Cannot connect to PostgreSQL" -ForegroundColor Red
    Write-Host "Make sure PostgreSQL is running and password is correct." -ForegroundColor Red
    exit 1
}
Write-Host "[OK] PostgreSQL is running" -ForegroundColor Green
Write-Host ""

# Drop existing database
Write-Host "[2/5] Dropping existing database (if exists)..." -ForegroundColor Yellow
& "$pgBin\psql.exe" -h $pgHost -p $pgPort -U $pgUser -c "DROP DATABASE IF EXISTS $dbName;" 2>&1 | Out-Null
Write-Host "[OK] Database dropped" -ForegroundColor Green
Write-Host ""

# Create new database
Write-Host "[3/5] Creating new database..." -ForegroundColor Yellow
& "$pgBin\psql.exe" -h $pgHost -p $pgPort -U $pgUser -c "CREATE DATABASE $dbName;" 2>&1 | Out-Null

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to create database" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Database created" -ForegroundColor Green
Write-Host ""

# Run schema
Write-Host "[4/5] Running SQL schema..." -ForegroundColor Yellow
$schemaFile = "database.sql"
if (-not (Test-Path $schemaFile)) {
    Write-Host "ERROR: $schemaFile not found" -ForegroundColor Red
    exit 1
}

& "$pgBin\psql.exe" -h $pgHost -p $pgPort -U $pgUser -d $dbName -f $schemaFile 2>&1 | Out-Null

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to run SQL schema" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Schema created" -ForegroundColor Green
Write-Host ""

# Run seed data
Write-Host "[5/5] Inserting sample data..." -ForegroundColor Yellow
$seedFile = "seed.sql"
if (-not (Test-Path $seedFile)) {
    Write-Host "WARNING: $seedFile not found, skipping seed data" -ForegroundColor Yellow
} else {
    & "$pgBin\psql.exe" -h $pgHost -p $pgPort -U $pgUser -d $dbName -f $seedFile 2>&1 | Out-Null
    Write-Host "[OK] Sample data inserted" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Database setup completed successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Database Details:" -ForegroundColor Cyan
Write-Host "  Database: $dbName" -ForegroundColor White
Write-Host "  Host: $pgHost`:$pgPort" -ForegroundColor White
Write-Host "  User: $pgUser" -ForegroundColor White
Write-Host ""
Write-Host "You can now start the backend server." -ForegroundColor Green
Write-Host ""
