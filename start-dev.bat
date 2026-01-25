@echo off
echo Starting ContentScope Development Server...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version: 
node --version

REM Install dependencies if needed
if not exist "node_modules" (
    echo Installing root dependencies...
    npm install
)

if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    npm install
    cd ..
)

if not exist "backend\node_modules" (
    echo Installing backend dependencies...
    cd backend
    npm install
    cd ..
)

REM Build backend first
echo Building backend...
cd backend
npm run build
if %errorlevel% neq 0 (
    echo Backend build failed!
    pause
    exit /b 1
)
cd ..

REM Start frontend development server
echo Starting frontend development server...
echo Open http://localhost:3000 in your browser
echo Press Ctrl+C to stop the server
cd frontend
npm run dev