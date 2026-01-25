@echo off
echo Building all ContentScope components...
echo.

REM Build backend
echo [1/3] Building backend...
cd backend
npm run build
if %errorlevel% neq 0 (
    echo Backend build failed!
    pause
    exit /b 1
)
cd ..
echo Backend build successful!

REM Build frontend
echo [2/3] Building frontend...
cd frontend
npm run build
if %errorlevel% neq 0 (
    echo Frontend build failed!
    pause
    exit /b 1
)
cd ..
echo Frontend build successful!

REM Build infrastructure
echo [3/3] Building infrastructure...
cd infrastructure
npm run build
if %errorlevel% neq 0 (
    echo Infrastructure build failed!
    pause
    exit /b 1
)
cd ..
echo Infrastructure build successful!

echo.
echo ✅ All components built successfully!
echo.
echo Next steps:
echo 1. Set your OPENAI_API_KEY environment variable
echo 2. Configure AWS CLI: aws configure
echo 3. Deploy to AWS: npm run deploy
echo.
pause